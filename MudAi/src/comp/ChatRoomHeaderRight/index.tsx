import React, {useState, useEffect, createElement, useCallback} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Pressable,
} from 'native-base';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import SvgMenu from 'src/comp/svg/SvgMenu';
import {useRecoilValue} from 'recoil';

type Props = {};

const ChatRoomHeaderRight = (props: Props) => {
  const navigation = useNavigation();
  const route = useRoute();

  const data = [
    {
      id: 'menu',
      icon: SvgMenu,
      action: () => {
        navigation.navigate('ChatRoomEdit', {
          id: route.params?.id,
        });
      },
    },
  ];

  return (
    <HStack mr="2">
      {data.map((item, index) => {
        return (
          <Pressable key={item.id} onPress={item.action} w="6" h="6">
            {createElement(item.icon, {
              color: '#fff',
            })}
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default ChatRoomHeaderRight;
