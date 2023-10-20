import React, {useState, useEffect} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Pressable,
} from 'native-base';
import FullScreenSheet from 'src/comp/FullScreenSheet';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {userProfileAtom} from 'src/recoil';
import AccountInfo from 'src/comp/AccountInfo';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommonActions, useNavigation} from '@react-navigation/native';

const SheetUserProfile = () => {
  const userProfile = useRecoilValue(userProfileAtom);
  const resetuserProfile = useResetRecoilState(userProfileAtom);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <FullScreenSheet
      isShow={userProfile}
      setisShow={() => {
        resetuserProfile();
        navigation.dispatch(state => {
          // Remove the home route from the stack
          const routes = state.routes.filter(r => r.name !== 'ChatUserProfile');

          return CommonActions.reset({
            ...state,
            routes,
            index: routes.length - 1,
          });
        });
      }}
      snapPoints={['1%', '100%']}>
      <Box pt={insets.top} bg="#000" flex={1}>
        <AccountInfo user={userProfile} />
      </Box>
    </FullScreenSheet>
  );
};

export default SheetUserProfile;
