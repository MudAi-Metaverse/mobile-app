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
import {useNavigation} from '@react-navigation/native';

const GoNextBtn = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      mr="2"
      onPress={() => {
        navigation.navigate('ChatRoomCreate');
      }}>
      <Text color="blue.600" fontSize="md">
        Next
      </Text>
    </Pressable>
  );
};

export default GoNextBtn;
