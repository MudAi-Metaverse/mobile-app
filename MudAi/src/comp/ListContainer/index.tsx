import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import {InterfaceVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';

type Props = InterfaceVStackProps & {
  children: React.ReactNode;
  _boxStyle?: any;
  label?: string;
  rightElement?: React.ReactNode;
};

const ListContainer = ({
  label,
  children,
  _boxStyle,
  rightElement,
  ...others
}: Props) => {
  return (
    <VStack space="4" {...others}>
      <HStack space="2" justifyContent={'space-between'} alignItems={'center'}>
        {label && (
          <Text fontSize={'lg'} fontWeight={'800'} fontFamily={'Inter'}>
            {label}
          </Text>
        )}
        {rightElement && <>{rightElement}</>}
      </HStack>

      <Box borderRadius={14} bg="#181818" py="10px" px="4" {..._boxStyle}>
        {children}
      </Box>
    </VStack>
  );
};

export default ListContainer;
