import React, {useState, memo, useCallback} from 'react';
import {Pressable, HStack, Text, Box, FlatList, Circle} from 'native-base';
import {
  followListAtom,
  roomIdAtom,
  roomMetaAtomFamily,
  userProfileAtom,
} from 'src/recoil';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import Spacer from 'src/comp/Spacer';
import FastImage from 'react-native-fast-image';
import {
  genMemberSelectList,
  getUserDetailArr,
  setImageSource,
} from 'src/pages/ChatRoom/functionsChatRoom';

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import SvgPersonAdd from 'src/comp/svg/SvgPersonAdd';
import {getDb} from 'src/js/firebase';

const ChatRoomMembers = () => {
  const roomId = useRecoilValue(roomIdAtom);
  const route = useRoute();
  const [listData, setlistData] = useState<any[]>(route.params.listData);

  useFocusEffect(
    useCallback(() => {
      getDb(`chatUsers/${roomId}`).then(res => {
        getUserDetailArr(Object.keys(res)).then(res => {
          setlistData(res);
        });
      });
    }, []),
  );

  const handleKeyExtractor = useCallback(item => {
    return item.address;
  }, []);

  const renderItem = ({item}) => {
    return <ItemMember user={item} />;
  };

  const Separator = memo(() => {
    return <Spacer s={12} />;
  });

  return (
    <>
      <FlatList
        flex="1"
        px="2"
        bg="#000"
        _contentContainerStyle={{
          flexGrow: 1,
          py: '4',
        }}
        data={listData}
        ListHeaderComponent={Header}
        ListHeaderComponentStyle={{
          marginBottom: 16,
        }}
        renderItem={renderItem}
        keyExtractor={handleKeyExtractor}
        initialNumToRender={10}
        ItemSeparatorComponent={Separator}
      />
    </>
  );
};

const Header = () => {
  const navigation = useNavigation();
  const roomId = useRecoilValue(roomIdAtom);
  const followList = useRecoilValue(followListAtom);
  const meta = useRecoilValue(roomMetaAtomFamily(roomId));

  return (
    <>
      {meta.type === 'group' && (
        <Pressable
          onPress={async () => {
            const sections = await genMemberSelectList(followList, roomId);
            navigation.navigate('ChatRoomMemberInvite', {
              id: roomId,
              sections,
            });
          }}>
          <HStack space="2" alignItems={'center'}>
            <Circle w="48px" h="48px" bg="#333333">
              <Box w="24px" h="24px">
                <SvgPersonAdd color="#fff" />
              </Box>
            </Circle>
            <Text fontSize="md" fontWeight="600">
              Invite person
            </Text>
          </HStack>
        </Pressable>
      )}
    </>
  );
};

const ItemMember = props => {
  const setUserProfile = useSetRecoilState(userProfileAtom);
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        setUserProfile(props.user);
        navigation.navigate('ChatUserProfile');
      }}>
      <HStack space="4" alignItems="center">
        <Box
          w="46"
          h="46"
          borderRadius="full"
          position="relative"
          overflow="hidden">
          <FastImage
            style={{
              width: '100%',
              height: '100%',
            }}
            source={setImageSource(props.user?.profileUrl)}
            alt="mudai"
            resizeMode={FastImage.resizeMode.cover}
          />
        </Box>
        <Text flex="1" fontSize="md" fontWeight="700">
          {props.user?.name}
        </Text>
      </HStack>
    </Pressable>
  );
};

export default ChatRoomMembers;
