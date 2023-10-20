import React from 'react';
import {HStack, Text, Box, VStack, Pressable} from 'native-base';
import {TFireStoreUser} from 'src/type';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {userProfileAtom, userStoresAtomFamily} from 'src/recoil';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useRenderInfo} from '@uidotdev/usehooks';
import {assets} from 'src/js/configView';
import {StyleSheet} from 'react-native';

type Props = {
  user: TFireStoreUser;
  info?: {
    lastChat: string;
    unixtime: number;
    unread: number;
  };
  userAddress: string;
};

const ItemUser = (props: Props) => {
  const userStoreAtom = useRecoilValue(userStoresAtomFamily(props.userAddress));
  const setUserProfile = useSetRecoilState(userProfileAtom);
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        setUserProfile(userStoreAtom);
        navigation.navigate('ChatUserProfile');
      }}
      borderRadius={16}
      py={'2'}
      px={'4'}>
      <HStack space={4} alignItems={'center'}>
        <Box w="46" h="46" borderRadius="full" position="relative">
          <FastImage
            style={styles.img}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: userStoreAtom?.profileUrl || assets.no_image,
            }}
            alt={userStoreAtom?.name}
          />
        </Box>

        <VStack space={1} alignItems={'flex-start'} flex="1">
          <HStack
            space={1}
            justifyContent={'space-between'}
            w="full"
            // h="24px"
          >
            <Text color="#fff" fontSize="md" fontWeight="700">
              {userStoreAtom?.name}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
});

export default ItemUser;
