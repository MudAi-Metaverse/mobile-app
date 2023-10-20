import React, {useState, useEffect} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Pressable,
  Image,
} from 'native-base';
import ImageCropPicker from 'react-native-image-crop-picker';
import {assets} from 'src/js/configView';
import {launchImageLibrary} from 'react-native-image-picker';
import SvgImagePlaceHolder from 'src/comp/svg/SvgImagePlaceHolder';
import {uploadingImage} from 'src/js/firebase';
import {useRoute} from '@react-navigation/native';
import ChatImgUpload from 'src/comp/ChatInputTools/ChatImgUpload';

type Props = {
  isShow: boolean;
};

const ChatInputTools = (props: Props) => {
  return (
    <Box>
      <ChatImgUpload />
    </Box>
  );
};

export default ChatInputTools;
