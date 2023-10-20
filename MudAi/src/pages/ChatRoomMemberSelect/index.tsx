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
import MemberSelected from 'src/pages/ChatRoomMemberSelect/MemberSelected';
import MemberSelectList from 'src/pages/ChatRoomMemberSelect/MemberSelectList';
import MemberSelectSearch from 'src/pages/ChatRoomMemberSelect/MemberSelectSearch';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const ChatRoomMemberSelect = (props: Props) => {
  return (
    <Box bg="#000" h="100%" p="2">
      <MemberSelectSearch />
      <MemberSelected />
      <Box flex="1">
        <MemberSelectList />
      </Box>
    </Box>
  );
};

export default ChatRoomMemberSelect;
