import {Unsubscribe} from 'firebase/auth';
import RNBootSplash from 'react-native-bootsplash';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {CommonActions, TabActions} from '@react-navigation/native';
import {useAccount} from 'wagmi';
import {useEffect, useRef, useState} from 'react';
import {addUnionStore, getDb, updateStore} from 'src/js/firebase';
import {navigationRef} from 'src/js/variables';
import {resetChatTabRoute, updateAppBadge} from 'src/js/functions';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';
import {
  fetchLimit,
  getOtherUserStoreArr,
  getRoomName,
} from 'src/pages/ChatRoom/functionsChatRoom';
import {useRecoilValue} from 'recoil';
import {authInfoAtom} from 'src/recoil';

type TNotificationMode = 'initial' | 'foreground' | 'background';

export const androidMainChannelId = 'mudai-main-channel';

PushNotification.configure({
  channelId: androidMainChannelId,
  onNotification: function (notification) {
    // console.log('NOTIFICATION:', notification);

    // ローカルからの通知はisLocalを必ずつける
    if (notification.userInteraction && notification.data.isLocal) {
      switchPageByNotification(notification, notification.data.address);
    }

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});

Platform.OS === 'android' &&
  PushNotification.createChannel(
    {
      channelId: androidMainChannelId,
      channelName: androidMainChannelId,
      channelDescription: 'A channel to categorise your notifications',
      importance: Importance.HIGH,
    },
    // created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

const switchPageByNotification = async (notification, address) => {
  const data = notification.data;

  switch (data.root) {
    case 'ChatRoom':
      const chats = await getDb(`chatRoom/${data.roomId}/chats`, fetchLimit);
      const users = await getDb(`chatRoom/${data.roomId}/users`);
      const otherUserStoreArr = await getOtherUserStoreArr(
        Object.keys(users),
        address,
      );

      Promise.all([chats, users]).then(res => {
        resetChatTabRoute(navigationRef.current, CommonActions, {
          id: data.roomId,
          initialData: res[0],
          users: res[1],
          otherUserStoreArr,
        });
      });
      break;
    default:
      break;
  }
};

// Prologを履歴から削除
export const resetHomeTab = () => {
  navigationRef.current.dispatch(
    CommonActions.reset({
      routes: [
        {
          name: 'Home',
          state: {
            routes: [{name: 'Index'}],
          },
        },
      ],
    }),
  );
};

const useNotificationAuth = () => {
  const {address, isConnected} = useAccount();
  const [refreshedToken, setRefreshedToken] = useState();
  const [remoteMessage, setRemoteMessage] = useState();
  const authInfo = useRecoilValue(authInfoAtom);
  const splashTimeoutId = useRef(null);

  const hideSplashScreen = async () => {
    await RNBootSplash.hide({fade: true, duration: 200});
  };

  /*---------------------------------

    ページの切り替え

  ---------------------------------*/
  useEffect(() => {
    if (!authInfo || !navigationRef.current || remoteMessage === null) {
      return;
    }

    const handleSplashScreen = e => {
      setTimeout(() => {
        hideSplashScreen();
        navigationRef.current!.removeListener('state', handleSplashScreen);
      }, 500);
    };

    if (remoteMessage) {
      clearTimeout(splashTimeoutId.current);

      switch (remoteMessage.type) {
        case 'initial':
          navigationRef.current.addListener('state', handleSplashScreen);
          switchPageByNotification(remoteMessage.messageBody, address);
          break;
        case 'background':
          switchPageByNotification(remoteMessage.messageBody, address);
          break;
        case 'foreground':
          const notification = {
            channelId: androidMainChannelId,
            title: remoteMessage.messageBody.notification.title,
            message: remoteMessage.messageBody.notification.body,
            playSound: true,
            userInfo: {
              isLocal: true,
              address: address,
              ...remoteMessage.messageBody.data,
            },
          };

          if (remoteMessage.messageBody.data.root === 'ChatRoom') {
            if (navigationRef.current.getCurrentRoute().name === 'ChatRoom') {
              if (
                navigationRef.current.getCurrentRoute().params.id !==
                remoteMessage.messageBody.data.roomId
              ) {
                updateAppBadge(1);
                PushNotification.localNotification(notification);
              }
            } else {
              updateAppBadge(1);
              PushNotification.localNotification(notification);
            }
          } else {
            updateAppBadge(1);
            PushNotification.localNotification(notification);
          }
      }
      setRemoteMessage(null);
    } else {
      // アプリアイコンからアプリを起動した時
      navigationRef.current.addListener('state', handleSplashScreen);
    }
  }, [authInfo, remoteMessage]);

  // スプラッシュスクリーンのフォールバック
  useEffect(() => {
    splashTimeoutId.current = setTimeout(() => {
      RNBootSplash.getVisibilityStatus().then(status => {
        if (!isConnected && status === 'visible') {
          console.log('splash timeout');
          hideSplashScreen();
        }
      });
    }, 3000);
  }, []);

  /*---------------------------------

    イベント設定

  ---------------------------------*/

  useEffect(() => {
    // アプリ起動時のプッシュ通知受信
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('on initial notification');
          setRemoteMessage({type: 'initial', messageBody: remoteMessage});
        }
      });

    // プッシュ通知をタップしてバックグラウンドから復帰した際の処理;
    const unsubscribeNotificationOpenedApp =
      messaging().onNotificationOpenedApp(
        (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          console.log('on background notification');
          setRemoteMessage({type: 'background', messageBody: remoteMessage});
        },
      );

    // アプリ起動中のプッシュ通知受信
    const unsubscribeMessage = messaging().onMessage(
      async (message: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('on foreground notification');
        setRemoteMessage({type: 'foreground', messageBody: message});
      },
    );

    return () => {
      unsubscribeNotificationOpenedApp();
      unsubscribeMessage();
    };
  }, []);

  /*---------------------------------

    トークンの更新

  ---------------------------------*/

  useEffect(() => {
    messaging().onTokenRefresh((token: string) => {
      // トークンリフレッシュ時の処理
      console.log('refresh token');
      setRefreshedToken(token);
    });
  }, []);

  useEffect(() => {
    if (refreshedToken && address) {
      const path = `user/${address}`;
      addUnionStore(path, 'tokens', refreshedToken);
    }
  }, [refreshedToken, address]);
};

export default useNotificationAuth;

const aa = [
  {
    createAt: 1694502651025,
    id: '6S5dxu4cod1C3wVIjYG2',
    img: 'http://192.168.10.6:9199/v0/b/mudai-dev.appspot.com/o/chat%2F6S5dxu4cod1C3wVIjYG2%2Fimg%2FSjk1YNKv4Kpf5g28mtKV?alt=media&token=d2eb48bb-76ee-4db9-a3d1-fe6cd34def47',
    lastChat: 'メディアを送信しました',
    name: 'test groupa',
    type: 'group',
    unixtime: 1694502931608,
    users: [
      '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510',
      '0xdEEfB20a093261eD2716cb8AE8208B138395Ae77',
      '0xcF53F7eCf8D500Be06e992CDfFC258B81784485B',
    ],
  },
];
