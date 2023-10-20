import React, {useState, useEffect, useCallback, memo, useMemo} from 'react';
import {HStack, Text, Box, VStack, Image, Pressable} from 'native-base';
import Badge from 'src/comp/Badge';
import {useFocusEffect} from '@react-navigation/native';
import {formatTimeOrDate, getChatUnreadCount} from 'src/js/functions';
import {getDb, getStore, listenDb} from 'src/js/firebase';
import {useAccount} from 'wagmi';
import {
  getOtherUserInfo,
  getOtherUserStoreArr,
  getRoomName,
  setImageSource,
} from 'src/pages/ChatRoom/functionsChatRoom';
import {useRecoilValue} from 'recoil';
import {initialRoomDataAtomFamily, roomMetaAtomFamily} from 'src/recoil';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {assets} from 'src/js/configView';
import {useRenderInfo} from '@uidotdev/usehooks';

type Props = {
  room: any;
};

const ItemRoom = memo((props: Props) => {
  const navigation = useNavigation();
  const [badgeCount, setbadgeCount] = useState(0);
  const {address} = useAccount();
  const [userStore, setuserStore] = useState();
  const roomMeta = useRecoilValue(roomMetaAtomFamily(props.room.id));
  const initialRoomData = useRecoilValue(
    initialRoomDataAtomFamily(props.room.id),
  );
  // const info = useRenderInfo('RoomItem');

  // privateチャットの時だけ他のユーザー情報を取得
  useEffect(() => {
    if (roomMeta && roomMeta.type === 'group') {
      return;
    }

    const otherUserAddress = props.room.users.filter(
      item => item !== address,
    )[0];
    getStore(`user/${otherUserAddress}`).then(res => {
      setuserStore(res);
    });
  }, [roomMeta]);

  // badgeの更新
  useEffect(() => {
    if (roomMeta) {
      const userPath = `chatRoom/${props.room.id}/users/${address}`;
      listenDb(userPath, user => {
        setUserBadge(user, props.room.id);
      });

      // 画面遷移後も更新し続けたいためoffリッスンしない
    }
  }, [roomMeta]);

  const setUserBadge = (user, roomId) => {
    getChatUnreadCount(roomId, user.lastChat || 0, address).then(
      unreadCount => {
        setbadgeCount(unreadCount);
      },
    );
  };

  const img = useMemo(() => {
    if (roomMeta?.type === 'group') {
      return setImageSource(roomMeta.img || assets.no_image);
    } else if (userStore) {
      return setImageSource(userStore.profileUrl || assets.no_image);
    }
  }, [roomMeta, userStore]);

  return (
    <Pressable
      borderRadius={16}
      py={'2'}
      px={'4'}
      onPress={async () => {
        const users = await getDb(`chatRoom/${props.room.id}/users`);
        const otherUserStoreArr = await getOtherUserStoreArr(
          Object.keys(users),
          address,
        );
        const roomTitle = await getRoomName(roomMeta, address, users);

        navigation.navigate('ChatRoom', {
          id: props.room.id,
          initialData: initialRoomData,
          users,
          otherUserStoreArr,
          title: roomTitle,
        });
      }}>
      <HStack space={4} alignItems={'center'}>
        <Box w="46" h="46" borderRadius="full" position="relative">
          <FastImage
            style={styles.img}
            resizeMode={FastImage.resizeMode.cover}
            source={img || assets.no_image}
            alt=""
          />
          {badgeCount > 0 && (
            <Badge
              position="absolute"
              top="-1"
              w={'18px'}
              h={'18px'}
              zIndex={100}
              alignSelf="flex-end"
              count={badgeCount}
            />
          )}
        </Box>

        <VStack space={1} alignItems={'flex-start'} flex="1">
          <HStack
            space={2}
            justifyContent={'space-between'}
            w="full"
            // h="24px"
          >
            <Text color="#fff" fontSize="md" fontWeight="700" flex="1">
              {roomMeta?.type === 'group' ? roomMeta?.name : userStore?.name}
              {roomMeta?.type === 'group' && `（${props.room.users?.length}）`}
            </Text>
            <Text color="#565656" fontSize="sm">
              {roomMeta?.unixtime && formatTimeOrDate(roomMeta?.unixtime)}
            </Text>
          </HStack>

          <Text
            color="#565656"
            fontSize="sm"
            // h="42px"
            numberOfLines={2}
            ellipsizeMode="tail">
            {roomMeta?.lastChat}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
});

export default ItemRoom;
