import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Pressable,
  ScrollView,
} from 'native-base';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {
  currentMediaAtom,
  roomMetaSelectorFamily,
  sheetShareActiveAtom,
  sortedRoomsSelector,
  userStoreAtom,
} from 'src/recoil';
import {useRecoilCallback, useRecoilState, useRecoilValue} from 'recoil';
import {Alert, Keyboard} from 'react-native';
import {
  addMedia,
  getOtherUserInfo,
  getRoomTokens,
  setImageSource,
} from 'src/pages/ChatRoom/functionsChatRoom';
import {useAccount} from 'wagmi';
import SvgClose from 'src/comp/svg/SvgClose';
import SvgCheck from 'src/comp/svg/SvgCheck';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {assets} from 'src/js/configView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {};
const sizeWidth = '50px';

const SheetShare = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {address} = useAccount();

  const [isShow, setisShow] = useRecoilState(sheetShareActiveAtom);
  const currentMedia = useRecoilValue(currentMediaAtom);

  const snapPoints = useMemo(() => ['1%', '40%'], []);
  const [selected, setselected] = useState([]);
  const [otherRooms, setotherRooms] = useState();

  const userStore = useRecoilValue(userStoreAtom);
  const getSortedRooms = useRecoilCallback(({snapshot}) => () => {
    const rooms = snapshot.getLoadable(sortedRoomsSelector).contents;
    return rooms;
  });
  const getMetaArr = useRecoilCallback(({snapshot}) => () => {
    const rooms = snapshot.getLoadable(roomMetaSelectorFamily()).contents;
    return rooms;
  });

  useFocusEffect(
    useCallback(() => {
      const sortedRooms = getSortedRooms();
      const metaArr = getMetaArr();

      const promises = sortedRooms.map(async room => {
        const meta = metaArr.find(meta => meta.id === room.id);
        let otherUserInfo;

        if (meta.type !== 'group') {
          otherUserInfo = await getOtherUserInfo(room.users, address);
        }

        const img = setImageSource(
          meta.type === 'group'
            ? meta.img || assets.no_image
            : otherUserInfo?.profileUrl || assets.no_image,
        );

        const name = meta.type === 'group' ? meta.name : otherUserInfo?.name;

        return {
          ...meta,
          img,
          name,
        };
      });

      Promise.all(promises).then(res => {
        setotherRooms(res);
      });
    }, []),
  );

  useEffect(() => {
    if (isShow) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isShow]);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) {
      setisShow(false);
    }
  }, []);

  const onClose = () => {
    bottomSheetRef.current?.snapToIndex(0);
    Keyboard.dismiss();
  };

  const BackDrop = useCallback(props => {
    return (
      <Pressable
        onPress={onClose}
        // bg="#fff"
        w="100%"
        h="100%"
        position="absolute"
        top="0%"
        left="0%"
      />
    );
  }, []);

  const handleSubmit = () => {
    selected.forEach(async roomId => {
      const tokens = await getRoomTokens(roomId, address);
      const metaArr = getMetaArr();

      addMedia(
        roomId,
        currentMedia,
        address,
        tokens,
        metaArr.filter(meta => meta.id === roomId)[0],
        userStore,
      );
    });

    Alert.alert('Transfer succeeded.');
    setisShow(false);
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        style={{
          zIndex: 9999,
        }}
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
        <Box flex={1}>
          <HStack
            space="1"
            justifyContent="space-between"
            px="2"
            alignItems={'center'}
            mb="4">
            <Box w={sizeWidth}>
              <Pressable
                onPress={() => {
                  setisShow(false);
                }}>
                <Box fontSize="md" textAlign="center" w="5" h="5">
                  <SvgClose color="#fff" />
                </Box>
              </Pressable>
            </Box>
            <Text fontSize="md" fontWeight="bold">
              送信先を選択
            </Text>
            <Box w={sizeWidth}>
              <Pressable onPress={handleSubmit}>
                <Text color={'blue.500'} fontSize="md" textAlign="center">
                  転送
                </Text>
              </Pressable>
            </Box>
          </HStack>

          <RoomList
            otherRooms={otherRooms}
            selected={selected}
            setselected={setselected}
          />
        </Box>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const RoomList = props => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      flex={1}
      _contentContainerStyle={{
        flexGrow: 1,
      }}>
      <HStack
        width="100%"
        h="100%"
        px="2"
        flexWrap={'wrap'}
        pb={`${insets.bottom}`}>
        {props.otherRooms?.map(room => {
          return (
            <Box key={room.id} w="25%" p="2">
              <Pressable
                onPress={() => {
                  props.setselected(prev => {
                    if (prev.includes(room.id)) {
                      return prev.filter(item => item !== room.id);
                    } else {
                      return [...prev, room.id];
                    }
                  });
                }}>
                <VStack space="1" alignItems={'center'}>
                  <Box position="relative" w="64px" h="64px">
                    <FastImage
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 9999,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      source={room.img}
                      alt="Alternate Text"
                    />
                    {props.selected.includes(room.id) && (
                      <Box
                        position="absolute"
                        bottom="0"
                        right="-8px"
                        p="2px"
                        borderRadius={999}
                        bg="#181818">
                        <Center
                          w="6"
                          h="6"
                          bg="rgb(126, 96,234)"
                          borderRadius={999}>
                          <Box w="4" h="4">
                            <SvgCheck color="#fff" />
                          </Box>
                        </Center>
                      </Box>
                    )}
                  </Box>
                  <Text fontSize={'xs'} numberOfLines={1}>
                    {room.name}
                  </Text>
                </VStack>
              </Pressable>
            </Box>
          );
        })}
      </HStack>
    </ScrollView>
  );
};

export default SheetShare;
