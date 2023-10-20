import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import {
  addUnionStore,
  anonymousSignin,
  authListen,
  listenStore,
  setStore,
} from 'src/js/firebase';
import {
  authInfoAtom,
  userStoreAtom,
  navigationRefReadyAtom,
  hasTokenAtom,
} from 'src/recoil';
import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import RNBootSplash from 'react-native-bootsplash';
import {CommonActions} from '@react-navigation/native';
import {navigationRef} from 'src/js/variables';
import {useAccount} from 'wagmi';
import {useCheckToken} from 'src/js/useCheckToken';

const useFirebaseAuth = () => {
  const {isConnected, address, status} = useAccount();
  const setuserStore = useSetRecoilState(userStoreAtom);
  const [authInfo, setauthInfo] = useRecoilState(authInfoAtom);
  const [fcmToken, setfcmToken] = useState();
  const isNavigationReady = useRecoilValue(navigationRefReadyAtom);
  const hasToken = useRecoilValue(hasTokenAtom);
  useCheckToken();

  const goProlog = () => {
    navigationRef.current.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
            state: {
              routes: [{name: 'Prolog'}],
            },
          },
        ],
      }),
    );
    setTimeout(() => {
      RNBootSplash.hide({fade: true, duration: 200});
    }, 200);
  };

  // walletconnectに接続されているかチェック
  // 接続されていない場合はPrologに遷移してスプラッシュを消す
  useEffect(() => {
    if (isNavigationReady && status === 'disconnected') {
      goProlog();
    }
  }, [status, isNavigationReady]);

  // ログイン後トークンがない時にPrologに遷移
  useEffect(() => {
    if (isNavigationReady && hasToken === false) {
      goProlog();
    }
  }, [hasToken, isNavigationReady]);

  // wallectconnectに接続したらfirebaseに匿名ログイン
  useEffect(() => {
    let subscriber;

    if (hasToken) {
      console.log('auth address', address);

      crashlytics().setUserId(address);

      subscriber = authListen(user => {
        if (!user) {
          anonymousSignin().then(result => {
            if (!result.user.displayName) {
              return result.user.updateProfile({
                displayName: address,
              });
            }
          });
        }

        console.log('auth listen', user);
        setauthInfo(user);
      });

      return () => {
        subscriber;
      };
    }
  }, [hasToken]);

  useEffect(() => {
    const path = `user/${address}`;
    let userStoreSubscriber: () => void;
    if (authInfo && fcmToken) {
      userStoreSubscriber = listenStore(path, v => {
        // firestoreにデータがない場合は作成

        if (v === undefined) {
          setStore(`${path}`, {
            createAt: new Date().getTime(),
            point: 0,
            address: address,
            tokens: [fcmToken],
            uid: authInfo.uid,
          });
        } else {
          setuserStore(v);
          // プッシュ通知のトークンがを更新
          if (!v.tokens || !v.tokens.includes(fcmToken)) {
            addUnionStore(path, 'tokens', fcmToken);
          }
        }
      });

      return () => {
        userStoreSubscriber();
      };
    }
  }, [authInfo, fcmToken]);

  useEffect(() => {
    const getFcmToken = async () => {
      const authStatus = await messaging().requestPermission();

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        const token: string = await messaging().getToken();
        setfcmToken(token);
      }
    };

    getFcmToken();
  }, []);
};

export default useFirebaseAuth;
