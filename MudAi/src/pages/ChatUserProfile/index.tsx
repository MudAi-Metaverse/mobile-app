import React, {useCallback, useEffect} from 'react';
import SheetUserProfile from 'src/comp/SheetUserProfile';
import {useFocusEffect} from '@react-navigation/native';
import {useResetRecoilState} from 'recoil';
import {userProfileAtom} from 'src/recoil';
import {useNavigation} from '@react-navigation/native';

const ChatUserProfile = () => {
  const navigation = useNavigation();
  const resetuserProfile = useResetRecoilState(userProfileAtom);

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetuserProfile();
      };
    }, []),
  );

  return <SheetUserProfile />;
};

export default ChatUserProfile;
