import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {InterfaceBoxProps} from 'native-base/lib/typescript/components/primitives/Box';

type Props = InterfaceBoxProps & {
  count: number;
};

const Badge = ({count, ...others}: Props) => {
  return (
    <Box {...others}>
      <LinearGradient
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 999,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={['#FF0042', '#FFF200']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Center position={'relative'}>
          <Text
            color="#fff"
            fontSize="sm"
            lineHeight="sm"
            fontFamily="Poppins"
            fontWeight={'400'}>
            {count}
          </Text>
        </Center>
      </LinearGradient>
    </Box>
  );
};

export default Badge;
