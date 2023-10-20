import React, {useState, useEffect, useCallback} from 'react';
import {
  Pressable,
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  ScrollView,
} from 'native-base';
import RoomImage from 'src/pages/ChatRoomSetting/RoomImage';
import {TextInput} from 'react-native';
import {
  chatGroupNameAtom,
  selectedGroupImageAtom,
  selectedUsersAtom,
  userStoreAtom,
} from 'src/recoil';
import {useRecoilState, useRecoilValue} from 'recoil';
import CircleIcon from 'src/comp/CircleIcon';

const ChatRoomCreate = () => {
  const [groupName, setgroupName] = useRecoilState(chatGroupNameAtom);
  const selectedUsers = useRecoilValue(selectedUsersAtom);
  const selectedImage = useRecoilValue(selectedGroupImageAtom);
  const userStore = useRecoilValue(userStoreAtom);
  const list = [userStore, ...selectedUsers];

  return (
    <Box h="100%" bg="#000" p="2">
      <HStack space="4" mb="4">
        <RoomImage image={selectedImage} />
        <TextInput
          value={groupName}
          onChangeText={text => setgroupName(text)}
          placeholder={list.map(item => item.name).join(',')}
          placeholderTextColor={'#72787d'}
          style={{
            flex: 1,
            color: '#fff',
            fontSize: 16,
          }}
        />
      </HStack>
      <MemberList />
    </Box>
  );
};

const MemberList = () => {
  const selectedUsers = useRecoilValue(selectedUsersAtom);
  const userStore = useRecoilValue(userStoreAtom);
  const list = [userStore, ...selectedUsers];

  return (
    <Box>
      <Text mb="3" fontSize="sm" fontWeight={'500'}>
        Members: {list.length}
      </Text>
      <ScrollView
        horizontal
        _contentContainerStyle={{
          flexGrow: 1,
        }}>
        <HStack space="4">
          {list.map(user => {
            return <ItemUser key={user.address} user={user} />;
          })}
        </HStack>
      </ScrollView>
    </Box>
  );
};

const ItemUser = props => {
  return (
    <Box>
      <CircleIcon image={props.user?.profileUrl} />
    </Box>
  );
};
export default ChatRoomCreate;
