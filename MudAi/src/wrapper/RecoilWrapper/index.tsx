import React, {useEffect, useState} from 'react';
import useAppSetup from 'src/js/useAppSetup';
// import {useRecoilState} from 'recoil';
import useFirebaseAuth from 'src/js/useFirebaseAuth';
import useNotificationAuth from 'src/js/useNotificationAuth';
import useRemoteConfig from 'src/js/useRemoteConfig';
import useChatTab from 'src/wrapper/RecoilWrapper/useChatTab';
import DeviceInfo, {getDeviceName} from 'react-native-device-info';

const RecoilWrapper = props => {
  useRemoteConfig();
  useFirebaseAuth();
  useNotificationAuth();
  useChatTab();
  useAppSetup();

  useEffect(() => {
    const main = async () => {
      console.log('device Name:', await getDeviceName());
    };

    main();
  }, []);

  return <>{props.children}</>;
};

export default RecoilWrapper;
