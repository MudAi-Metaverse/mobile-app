import * as React from 'react';
import {
  StyleSheet,
  Platform,
  useColorScheme,
  Keyboard,
  TouchableWithoutFeedback,
  Linking,
  Alert,
} from 'react-native';
import {breakPoints} from './configView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import {getDbFromA} from 'src/js/firebase';

export function CreateResponsiveStyle(
  mobileStyles,
  tabletStyles,
  desktopStyles,
) {
  const desktop = StyleSheet.create(desktopStyles);
  const tablet = StyleSheet.create(tabletStyles);
  const mobile = StyleSheet.create(mobileStyles);

  return (layout, breakPoint = breakPoints) =>
    style => {
      if (
        mobile.hasOwnProperty(style) ||
        tablet.hasOwnProperty(style) ||
        desktop.hasOwnProperty(style)
      ) {
        if (layout.width <= breakPoint.sp) {
          return mobile[style];
        } else if (
          layout.width > breakPoint.sp &&
          layout.width <= breakPoint.tb
        ) {
          return StyleSheet.compose(mobile[style], tablet[style]);
        } else {
          return StyleSheet.compose(mobile[style], desktop[style]);
        }
      }
    };
}

export function idMaker(N) {
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from(Array(N))
    .map(() => S[Math.floor(Math.random() * S.length)])
    .join('');
}

export const uidFactory = (min: number, max: number) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

export function zeroPadding(NUM, LEN) {
  // NUM=値 LEN=桁数
  if (String(NUM).length > LEN) {
    LEN = String(NUM).length;
  }
  return (Array(LEN).join('0') + NUM).slice(-LEN);
}

export function fetcher(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export function formatDate(enableZeroPadding, date) {
  const dt = date ? new Date(date) : new Date();
  const y = dt.getFullYear();
  const m = enableZeroPadding
    ? zeroPadding(dt.getMonth() + 1, 2)
    : dt.getMonth() + 1;
  const d = enableZeroPadding ? zeroPadding(dt.getDate(), 2) : dt.getDate();
  const hh = enableZeroPadding ? zeroPadding(dt.getHours(), 2) : dt.getHours();
  const mm = enableZeroPadding
    ? zeroPadding(dt.getMinutes(), 2)
    : dt.getMinutes();
  const ss = enableZeroPadding
    ? zeroPadding(dt.getSeconds(), 2)
    : dt.getSeconds();
  const w = dt.getDay();

  return {
    y,
    m,
    d,
    hh,
    mm,
    ss,
    w,
  };
}

export const convertDayStr = index => {
  // 曜日のindexを日本語に変換
  const dayStr = ['日', '月', '火', '水', '木', '金', '土'];
  return dayStr[index];
};

export const setImgPath = fileName => {
  return process.env === 'development' ? `/${fileName}` : `/ea/${fileName}`;
};

export const toggleBodyScroll = (enable: boolean) => {
  if (enable) {
    document.body.classList.add('forbiddenScroll');
  } else {
    document.body.classList.remove('forbiddenScroll');
  }
};

export const checkBuild = text => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`checkBuild ${text}`);
  }
};

export const alphabets = Array.from({length: 26}, (_, i) =>
  String.fromCharCode(97 + i).toUpperCase(),
);

export const setExcludeStr = (str: string) => {
  if (location.href.match('/exclude/')) {
    return `/exclude${str}`;
  } else {
    return str;
  }
};

export const openUrl = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(
      'エラー',
      'このページを開ませんでした',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }
};

export const showPrompt = (
  title: string,
  message: string,
  onSubmit,
  onCancel = () => {},
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        onPress: onCancel,
        style: 'cancel',
      },
      {text: 'OK', onPress: onSubmit},
    ],
    {
      cancelable: false,
    },
  );
};

/*---------------------------------

  navigation

---------------------------------*/

// チャットタブのルートをChatRoomIndex→ChatRoomにセットし直す
export const resetChatTabRoute = (navigation, CommonActions, params) => {
  navigation.dispatch(state => {
    return CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'Chat',
          state: {
            index: 1,
            routes: [
              {name: 'ChatRoomIndex'},
              {
                name: 'ChatRoom',
                params: params,
              },
            ],
          },
        },
      ],
    });
  });
};

/*---------------------------------

  チャット

---------------------------------*/

export const getChatUnreadCount = (
  roomId: string,
  userLastChatUnix: number,
  address: string,
  after: boolean = true,
) => {
  const chatPath = `chatRoom/${roomId}/chats`;

  return getDbFromA(
    chatPath,
    String(userLastChatUnix + (after ? 1 : 0)),
    'after',
  ).then(res => {
    const unreadArr = Object.keys(res).filter(key => {
      return res[key].address !== address;
    });
    const unreadCount = unreadArr.length || 0;

    // console.log('unreadCount', unreadArr);
    return unreadCount;
  });
};

export const formatTimeOrDate = unixTime => {
  const currentTime = new Date();
  const inputDate = new Date(unixTime); // Convert to milliseconds

  const isToday =
    inputDate.getDate() === currentTime.getDate() &&
    inputDate.getMonth() === currentTime.getMonth() &&
    inputDate.getFullYear() === currentTime.getFullYear();

  const isYesterday =
    inputDate.getDate() === currentTime.getDate() - 1 &&
    inputDate.getMonth() === currentTime.getMonth() &&
    inputDate.getFullYear() === currentTime.getFullYear();

  if (isToday) {
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } else if (isYesterday) {
    return '昨日';
  } else {
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
};

// 桁数を返す
export const countDigits = (number: number) => {
  return number?.toString().length;
};

/*---------------------------------

  AsyncStorage

---------------------------------*/

export const setAsyncStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getAsyncStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
    console.error(e);
  }
};

/*---------------------------------

  プッシュ通知

---------------------------------*/

export const updateAppBadge = async (updateCount: number) => {
  let count: string | null = await AsyncStorage.getItem('badgeCount');
  let newCount: number;

  if (updateCount === 0) {
    return;
  }

  if (count === null) {
    newCount = 0;
  } else {
    newCount = parseInt(count, 10) + updateCount;

    if (newCount < 0) {
      newCount = 0;
    }

    console.log({
      count,
      newCount,
      updateCount,
    });
  }

  await AsyncStorage.setItem('badgeCount', newCount.toString());
  PushNotification.setApplicationIconBadgeNumber(newCount);
  return Promise.resolve(true);
};

export const resetAppBadge = async () => {
  await AsyncStorage.setItem('badgeCount', '0');
  PushNotification.setApplicationIconBadgeNumber(0);
  Alert.alert(
    '通知を削除しました',
    '',
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    {cancelable: false},
  );
};

/*---------------------------------

  video

---------------------------------*/

export const secondsToMinutes = seconds => {
  if (typeof seconds !== 'number') {
    return 'Invalid input';
  }

  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = seconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${Math.floor(secondsRemainder)
    .toString()
    .padStart(2, '0')}`;
};
