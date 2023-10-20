import React, {useState, useEffect} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Container,
} from 'native-base';
import {InterfaceButtonProps} from 'native-base/lib/typescript/components/primitives/Button/types';
import {StyleSheet} from 'react-native';
import {setPadding} from 'src/js/styles';

export const modeArr = [
  'primary',
  'secondary',
  'blue',
  'purple',
  'border',
  'blue-round',
] as const;

type Props = InterfaceButtonProps & {
  mode?: (typeof modeArr)[number];
  wrapperProps?: any;
};

const CustomButton = ({mode = 'primary', wrapperProps, ...others}: Props) => {
  const rounded = '20';

  return (
    <Container
      w="100%"
      rounded={others.rounded || rounded}
      textAlign="center"
      {...styles[mode]}
      {...wrapperProps}>
      <Button
        w="100%"
        px="5"
        py="4"
        bg="transparent"
        rounded={others.rounded || rounded}
        textAlign={'center'}
        // colorScheme="none"
        {...others}
      />
    </Container>
  );
};

// const styles = StyleSheet.create({
//   primary: {
//     linearGradient: {
//       colors: ['#57e4ff', '#8b95f2', '#8b72ee', '#8556ea', '#4138e5'],
//       start: [0, 0],
//       end: [1, 0],
//     },
//   },
// });

const styles = {
  primary: {
    bg: {
      linearGradient: {
        colors: ['#57e4ff', '#8b95f2', '#8b72ee', '#8556ea', '#4138e5'],
        start: [1.16, 0],
        end: [-0.8, 0],
      },
    },
  },
  secondary: {
    bg: '#F1F2F4',
  },
  blue: {
    bg: '#2f6dc9',
  },
  purple: {
    bg: '#7b61ff',
  },
  border: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  'blue-round': {
    bg: '#0066ff',
    rounded: 28,
  },
};

export default CustomButton;
