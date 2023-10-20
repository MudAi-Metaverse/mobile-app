import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import {HeaderBackButton, getHeaderTitle} from '@react-navigation/elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {};

const CustomHeader = ({navigation, route, options, back}) => {
  // console.log({navigation, route, options, back});
  const title = getHeaderTitle(options, route.name);
  const insets = useSafeAreaInsets();

  return (
    <HStack mt={insets.top} py="2" bg="red.900" alignItems={'center'}>
      <HeaderBackButton label="Back" />
      <Text color="#000" fontSize="20px">
        {title}
      </Text>
    </HStack>
  );
};

export default CustomHeader;
