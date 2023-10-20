import React, {createElement, useCallback} from 'react';
import {HStack, Text, Box, VStack, Pressable, ScrollView} from 'native-base';
import SvgGroup from 'src/comp/svg/SvgGroup';
import SvgPersonAdd from 'src/comp/svg/SvgPersonAdd';
import SvgLogout from 'src/comp/svg/SvgLogout';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAccount} from 'wagmi';
import {
  genMemberSelectList,
  getUserDetailArr,
  leaveChatRoom,
} from 'src/pages/ChatRoom/functionsChatRoom';
import {showPrompt} from 'src/js/functions';
import {useRecoilValue} from 'recoil';
import SvgSetting from 'src/comp/svg/SvgSetting';
import ListItem from 'src/pages/ChatRoomEdit/ListItem';
import {followListAtom, roomIdAtom, roomMetaAtomFamily} from 'src/recoil';
import {useFocusEffect} from '@react-navigation/native';
import useResetGroupState from 'src/tab/Chat/useResetGroupState';
import {getDb} from 'src/js/firebase';

const ChatRoomEdit = () => {
  const navigation = useNavigation();
  const roomId = useRecoilValue(roomIdAtom);
  const {resetCreateGroupState} = useResetGroupState();

  useFocusEffect(
    useCallback(() => {
      resetCreateGroupState();
    }, []),
  );

  return (
    <Box flex="1">
      <ScrollView
        bg="#000"
        flex="1"
        _contentContainerStyle={{
          flexGrow: 1,
        }}>
        <Header mb="4" />
        {data.map(item => {
          return (
            <ListItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              onPress={() => {
                navigation.navigate(item.navigate, {
                  id: roomId,
                });
              }}
            />
          );
        })}
      </ScrollView>
    </Box>
  );
};

const data = [
  {
    title: 'settings',
    icon: SvgSetting,
    navigate: 'ChatRoomSetting',
  },
];

const Header = props => {
  const {address} = useAccount();
  const navigation = useNavigation();
  const route = useRoute();
  const roomId = useRecoilValue(roomIdAtom);
  const followList = useRecoilValue(followListAtom);
  const meta = useRecoilValue(roomMetaAtomFamily(roomId));

  const data = [
    {
      id: 'members',
      title: 'Members',
      icon: SvgGroup,
      action: async () => {
        const users = await getDb(`chatUsers/${roomId}`);
        const listData = await getUserDetailArr(Object.keys(users));

        navigation.navigate('ChatRoomMembers', {
          id: route.params.id,
          listData,
        });
      },
    },
    {
      id: 'invite',
      title: 'Invite',
      icon: SvgPersonAdd,
      action: async () => {
        const sections = await genMemberSelectList(followList, roomId);
        navigation.navigate('ChatRoomMemberInvite', {
          id: route.params.id,
          sections: sections,
        });
      },
      otherProps: {
        disabled: meta.type !== 'group',
        style: {
          opacity: meta.type !== 'group' ? 0.5 : 1,
        },
      },
    },
    {
      id: 'leave',
      title: 'Leave',
      icon: SvgLogout,
      action: () => {
        showPrompt(
          'Leave Chat Room',
          "Are you sure you want to leave this chat room? You won't be able to rejoin unless you are invited again.",
          async () => {
            await leaveChatRoom(route.params.id, [address]);
            navigation.navigate('ChatRoomIndex');
          },
        );
      },
    },
  ];

  return (
    <HStack space="2" justifyContent={'space-between'} {...props} py="4">
      {data.map((item, index) => {
        return (
          <Pressable
            key={item.title}
            onPress={item.action}
            {...item?.otherProps}>
            <VStack space="1" alignItems={'center'}>
              <Box w="6" h="6">
                {createElement(item.icon, {color: '#fff'})}
              </Box>
              <Text fontSize="sm" fontWeight="600">
                {item.title}
              </Text>
            </VStack>
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default ChatRoomEdit;
