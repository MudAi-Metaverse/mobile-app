import React, {useState, useEffect} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  ScrollView,
} from 'native-base';
import ChatTabScrollView from 'src/comp/ChatTabScrollView';

const ChatExplore = () => {
  return (
    <ChatTabScrollView>
      <Text>ChatExplore</Text>
    </ChatTabScrollView>
  );
};

export default ChatExplore;
