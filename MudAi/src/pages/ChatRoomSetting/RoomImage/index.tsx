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
import CircleIcon from 'src/comp/CircleIcon';
import SvgCamera from 'src/comp/svg/SvgCamera';
import {useNavigation} from '@react-navigation/native';
import {setImageSource} from 'src/pages/ChatRoom/functionsChatRoom';

type Props = {
  image: any;
};

const RoomImage = (props: Props) => {
  const navigation = useNavigation();

  return (
    <Pressable
      position={'relative'}
      onPress={() => {
        navigation.navigate('ChatRoomImageEdit');
      }}>
      <Box
        position="absolute"
        zIndex="1"
        bottom="-5px"
        right="-5px"
        p="1"
        borderRadius="full"
        bg="#fff"
        overflow="hidden">
        <Box w="4" h="4">
          <SvgCamera />
        </Box>
      </Box>
      <CircleIcon size={64} image={props.image} />
    </Pressable>
  );
};

export default RoomImage;
