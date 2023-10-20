/**
 * @format
 */
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

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

AppRegistry.registerHeadlessTask(
  'RNCallKeepBackgroundMessage',
  () =>
    ({name, callUUID, handle}) => {
      // Make your call here

      return Promise.resolve();
    },
);

AppRegistry.registerComponent(appName, () => HeadlessCheck);
