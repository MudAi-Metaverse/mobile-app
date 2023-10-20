import React, { useState, useEffect } from "react";
import {
  AspectRatio,
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Image,
} from "native-base";

const AutoHeightImage = ({ source, ...others }) => {
  const [ratio, setratio] = useState(0);

  Image.getSize(source, (width, height) => {
    setratio(height / width);
  });

  return (
    <Box w="100%" ratio={{ base: ratio }} position="relative" {...others}>
      <Box pt={`${ratio * 100}%`} />
      <Box position="absolute" top="0" left="0" w="100%" h="100%" zIndex="999">
        <Image w="100%" h="100%" source={{ uri: source }} />
      </Box>
    </Box>
  );
};

export default AutoHeightImage;
