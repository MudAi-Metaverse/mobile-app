import React, {useState, useEffect} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  KeyboardAvoidingView,
} from 'native-base';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HeaderHeightContext} from '@react-navigation/elements';

type Props = {
  children: React.ReactNode;
  threshold?: number;
};

const CustomKeyBoardAvoidingView = (props: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <HeaderHeightContext.Consumer>
      {headerHeight => {
        return (
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // keyboardVerticalOffset={insets.top + insets.bottom}>
            keyboardVerticalOffset={
              (headerHeight || insets.top) + (props.threshold || 0)
            }>
            {props.children}
          </KeyboardAvoidingView>
        );
      }}
    </HeaderHeightContext.Consumer>
  );
};

export default CustomKeyBoardAvoidingView;
