/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {updateAppBadge} from 'src/js/functions';

/**
 * 通知受信時イベント
 */
// androidでは通知数に対応してないためiOSのみ
messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (Platform.OS === 'ios') {
    console.log('setBackgroundMessageHandler');
    // プッシュ通知件数をインクリメント
    PushNotificationIOS.getApplicationIconBadgeNumber(async number => {
      await updateAppBadge(1);
      PushNotificationIOS.setApplicationIconBadgeNumber(number + 1);
    });
  }
});

/**
 * RNFB公式より追加
 * 参考：https://rnfirebase.io/messaging/usage#data-only-messages
 */
HeadlessCheck = ({isHeadless}) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    console.log('isHeadless');
    return null;
  }

  return <App />;
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);
// AppRegistry.registerComponent(appName, () => App);
