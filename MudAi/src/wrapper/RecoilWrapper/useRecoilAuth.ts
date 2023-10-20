import {crashlytics} from '@react-native-firebase/crashlytics';
import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {authListen, listenStore} from 'src/js/firebase/firebase';
import {navigationRef} from 'src/js/variables';
import {authInfoAtom, navigationRefReadyAtom, userStoreAtom} from 'src/recoil';

const useRecoilAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authInfo, setauthInfo] = useState(true);
  // const [authInfo, setauthInfo] = useRecoilState(authInfoAtom);
  const [userStore, setuserStore] = useRecoilState(userStoreAtom);
  const navigationReady = useRecoilValue(navigationRefReadyAtom);

  useEffect(() => {
    if (authInfo && navigationReady) {
      if (authInfo === 'nodata') {
        navigationRef.navigate('main', {screen: 'Login'});
      } else if (authInfo !== 'nodata') {
        navigationRef.navigate('main', {screen: 'Index'});
      }
    }
  }, [authInfo, navigationReady]);

  useEffect(() => {
    if (authInfo && userStore !== null) {
      setIsLoading(false);
    }
  }, [userStore, authInfo]);

  // firestore
  useEffect(() => {
    const subscriber = authListen(checkUser);
    let userStoreSubscriber: () => void;

    async function checkUser(user) {
      if (user) {
        // setauthInfo(user);
        userStoreSubscriber = listenStore(`users/${user.uid}`, setuserStore);
      } else {
        setuserStore('nodata');
        // setauthInfo('nodata');
      }
    }

    return () => {
      subscriber();
      if (userStoreSubscriber) {
        userStoreSubscriber();
      }
    };
  }, []);

  return {
    isLoading,
  };
};

export default useRecoilAuth;
