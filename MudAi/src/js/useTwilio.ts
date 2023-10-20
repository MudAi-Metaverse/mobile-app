import {useEffect, useRef, useState} from 'react';
// import {
//   Voice,
//   Call as TwilioCall,
// } from '@twilio/voice-react-native-sdk/lib/commonjs/index';
import {
  Voice,
  Call as TwilioCall,
} from '@twilio/voice-react-native-sdk/lib/commonjs/index';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import RNCallKeep from 'react-native-callkeep';
import uuid from 'react-native-uuid';
import VoipPushNotification from 'react-native-voip-push-notification';
import {PermissionsAndroid, Platform} from 'react-native';
import {RNTwilioPhone, twilioPhoneEmitter} from 'react-native-twilio-phone';
import {getUniqueId} from 'react-native-device-info';

const callKeepOptions = {
  ios: {
    appName: 'TwilioPhone Example',
    supportsVideo: false,
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'OK',
    additionalPermissions: [],
    // Required to get audio in background when using Android 11
    foregroundService: {
      channelId: 'com.example.reactnativetwiliophone',
      channelName: 'Foreground service for my app',
      notificationTitle: 'My app is running on background',
    },
  },
};

// RNTwilioPhone options
const options = {
  requestPermissionsOnInit: true, // Default: true - Set to false if you want to request permissions manually
};

const useTwilio = () => {
  const [token, settoken] = useState();
  const [callUUID, setcallUUID] = useState('');

  const fetchAccessToken = async () => {
    const uid = await getUniqueId();
    const data = await fetch(
      `https://sample-service-7796.twil.io/token?identity=${uid}`,
    )
      .then(res => res.json())
      .then(res => {
        return res;
      });

    console.log(data);
    settoken(data);

    return data.token;
  };

  useEffect(() => {
    const main = async () => {
      // RNCallKeep.addEventListener('didReceiveStartCallAction', () => {
      //   console.log('didReceiveStartCallAction');
      // });
      // RNCallKeep.addEventListener('didDisplayIncomingCall', () => {
      //   console.log('onIncomingCallDisplayed');
      // });
      // RNCallKeep.addEventListener('didToggleHoldCallAction', () => {
      //   console.log('onToggleHold');
      // });
      // RNCallKeep.addEventListener('didPerformDTMFAction', () => {
      //   console.log('onDTMFAction');
      // });
    };

    console.log('useTwilio initialize');

    return RNTwilioPhone.initialize(callKeepOptions, fetchAccessToken, options);
  }, []);

  useEffect(() => {
    const subscriptions = [
      twilioPhoneEmitter.addListener('CallConnected', data => {
        console.log(data);
      }),
      twilioPhoneEmitter.addListener('CallDisconnected', data => {
        console.log(data);
      }),
      twilioPhoneEmitter.addListener('CallDisconnectedError', data => {
        console.log(data);
      }),
    ];

    return () => {
      subscriptions.map(subscription => {
        subscription.remove();
      });
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }

    // VoipPushNotification.addEventListener('register', token => {
    //   // --- send token to your apn provider server
    //   console.log('voip register token', token);
    // });

    // ===== Step 2: subscribe `notification` event =====
    // --- this.onVoipPushNotificationiReceived
    VoipPushNotification.addEventListener('notification', notification => {
      // --- when receive remote voip push, register your VoIP client, show local notification ... etc
      console.log('voip notification arrived', notification);

      // --- optionally, if you `addCompletionHandler` from the native side, once you have done the js jobs to initiate a call, call `completion()`
      VoipPushNotification.onVoipNotificationCompleted(notification.uuid);
    });

    // ===== Step 3: subscribe `didLoadWithEvents` event =====
    VoipPushNotification.addEventListener('didLoadWithEvents', events => {
      // --- this will fire when there are events occured before js bridge initialized
      // --- use this event to execute your event handler manually by event type

      if (!events || !Array.isArray(events) || events.length < 1) {
        return;
      }
      for (let voipPushEvent of events) {
        let {name, data} = voipPushEvent;
        if (
          name ===
          VoipPushNotification.RNVoipPushRemoteNotificationsRegisteredEvent
        ) {
          // this.onVoipPushNotificationRegistered(data);
          console.log('voip onVoipPushNotificationRegistered', data);
        } else if (
          name ===
          VoipPushNotification.RNVoipPushRemoteNotificationReceivedEvent
        ) {
          // this.onVoipPushNotificationiReceived(data);
          console.log('voip onVoipPushNotificationiReceived', data);
        }
      }
    });

    // ===== Step 4: register =====
    // --- it will be no-op if you have subscribed before (like in native side)
    // --- but will fire `register` event if we have latest cahced voip token ( it may be empty if no token at all )
    VoipPushNotification.registerVoipToken(); // --- register token
  }, []);

  const call = async () => {
    setcallUUID(uuid.v4());
    // const to = '+818099886069';
    const to = '14CF103B-15F0-44C0-95DA-2666B58973B7';

    try {
      await RNTwilioPhone.startCall(to);
    } catch (e) {
      console.log(e);
    }
  };

  const endCall = async () => {
    new RNTwilioPhone.endCall(callUUID);
  };

  useEffect(() => {
    const subscriptions = [
      twilioPhoneEmitter.addListener('CallConnected', data => {
        console.log(data);
      }),
      twilioPhoneEmitter.addListener('CallDisconnected', data => {
        console.log(data);
      }),
      twilioPhoneEmitter.addListener('CallDisconnectedError', data => {
        console.log(data);
      }),
    ];

    return () => {
      subscriptions.map(subscription => {
        subscription.remove();
      });
    };
  }, []);

  return {call, endCall, token};
};

export default useTwilio;
