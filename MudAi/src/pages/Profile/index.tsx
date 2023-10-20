import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  ScrollView,
  Modal,
  useDisclose,
  Pressable,
} from 'native-base';
import AccountForm from 'src/pages/Profile/AccountForm';
import ListContainer from 'src/comp/ListContainer';
import AccountSettingForm from 'src/pages/Profile/AccountSettingForm';
import ChatTabScrollView from 'src/comp/ChatTabScrollView';
import AccountHeader from 'src/comp/AccountHeader';
import {remoteConfigAtomFamily, userStoreAtom} from 'src/recoil';
import {useRecoilValue} from 'recoil';
import {Alert, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getStorageUrl, logout} from 'src/js/firebase';
import ProfileEdit from 'src/pages/ProfileEdit';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import remoteConfig from '@react-native-firebase/remote-config';
import {resetAppBadge} from 'src/js/functions';

const Profile = () => {
  const userStore = useRecoilValue(userStoreAtom);
  const navigation = useNavigation();
  const [showEditModal, setshowEditModal] = useState(false);
  const [showBottomSheet, setshowBottomSheet] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) {
      bottomSheetRef.current?.close();
      setshowBottomSheet(false);
    } else {
    }
  }, []);

  const onClose = () => {
    bottomSheetRef.current?.snapToIndex(0);
    Keyboard.dismiss();
  };

  const expandBottomSheet = () => {
    setshowBottomSheet(true);
  };

  const BackDrop = props => {
    return (
      <Pressable
        onPress={onClose}
        // bg="#fff"
        w="100%"
        h="100%"
        position="absolute"
        top="0"
        left="0"
      />
    );
  };

  return (
    <ChatTabScrollView>
      <Center mb="30px">
        <AccountHeader
          img={userStore?.profileUrl}
          name={userStore?.name}
          info={userStore?.address}
        />
      </Center>
      <VStack space="8" px="4">
        <ListContainer
          label="Personal details"
          rightElement={
            <Pressable onPress={expandBottomSheet}>
              <Text
                fontSize={'lg'}
                fontWeight={'800'}
                fontFamily={'Inter'}
                color="#fff">
                Edit
              </Text>
            </Pressable>
          }>
          <AccountForm />
        </ListContainer>
      </VStack>

      <DevTools />

      {showBottomSheet && (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{
            backgroundColor: '#181818',
          }}
          keyboardBehavior={'interactive'}
          keyboardBlurBehavior={'restore'}
          backdropComponent={BackDrop}>
          <ProfileEdit onClose={onClose} />
        </BottomSheet>
      )}
    </ChatTabScrollView>
  );
};

const DevTools = () => {
  const isDev = useRecoilValue(remoteConfigAtomFamily('dev'));

  if (!isDev) {
    return null;
  }

  return (
    <VStack px={4} space={4} mt="3">
      <Pressable
        onPress={() => {
          logout().then(() => {
            Alert.alert('Success', 'Logout success');
          });
        }}>
        <Text>firebase log out</Text>
      </Pressable>

      <Pressable onPress={resetAppBadge}>
        <Text>reset badge</Text>
      </Pressable>
    </VStack>
  );
};

export default Profile;
