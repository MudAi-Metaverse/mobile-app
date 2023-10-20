import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import FastImage from 'react-native-fast-image';
import {setImageSource} from 'src/pages/ChatRoom/functionsChatRoom';

type Props = {
  image: string;
  size?: number;
};

const CircleIcon = ({image, size = 46}: Props) => {
  return (
    <Box w={`${size}px`} h={`${size}px`} borderRadius="full" overflow="hidden">
      <FastImage
        style={{
          width: '100%',
          height: '100%',
        }}
        source={setImageSource(image)}
        alt="mudai"
        resizeMode={FastImage.resizeMode.cover}
      />
    </Box>
  );
};

export default CircleIcon;
