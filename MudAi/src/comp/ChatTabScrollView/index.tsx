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
import {InterfaceScrollViewProps} from 'native-base/lib/typescript/components/basic/ScrollView/types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = InterfaceScrollViewProps & {};

const ChatTabScrollView = (props: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      bg="#000"
      _contentContainerStyle={{
        pb: '4',
        pt: insets.top,
        flex: 1,
      }}
      {...props}
    />
  );
};

export default ChatTabScrollView;
