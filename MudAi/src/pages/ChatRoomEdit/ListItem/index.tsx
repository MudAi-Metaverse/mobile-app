import React, {useState, useEffect, createElement} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Pressable,
} from 'native-base';
import ChevronRightRound from 'src/comp/svg/ChevronRightRound';

type Props = {
  title: string;
  icon: React.FC;
};

const ListItem = ({title, icon, ...others}: Props) => {
  return (
    <Pressable {...others}>
      <HStack space="4">
        <Box w="6" h="6">
          {createElement(icon, {color: '#fff'})}
        </Box>
        <Text flex="1" fontSize="md" fontWeight="600">
          {title}
        </Text>
        <Box w="6" h="4">
          <ChevronRightRound />
        </Box>
      </HStack>
    </Pressable>
  );
};

export default ListItem;
