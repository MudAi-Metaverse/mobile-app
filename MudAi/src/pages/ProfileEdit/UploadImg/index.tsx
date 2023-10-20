import React, {useState, useEffect} from 'react';
import {Center, Text, Box, VStack, Pressable, Image} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import SvgImagePlaceHolder from 'src/comp/svg/SvgImagePlaceHolder';
import {updateStore, uploadingImage} from 'src/js/firebase';
import {useAccount} from 'wagmi';
import {userStoreAtom} from 'src/recoil';
import {useRecoilValue} from 'recoil';
import {ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {};

const UploadImg = (props: Props) => {
  const {address} = useAccount();
  const userStore = useRecoilValue(userStoreAtom);
  const [uploading, setuploading] = useState(false);

  const upload = image => {
    const imagePath = image.path;
    const unixtime = new Date().getTime();
    setuploading(true);

    uploadingImage(`account/${address}/${unixtime}`, imagePath).then(path => {
      updateStore(`user/${address}`, {
        profileUrl: path[0],
      }).then(res => {
        setuploading(false);
      });
    });
  };

  return (
    <Pressable
      position={'relative'}
      onPress={() => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
        }).then(image => {
          upload(image);
        });
      }}>
      {uploading && (
        <Center position={'absolute'} w="full" h="full" zIndex="1">
          <ActivityIndicator />
        </Center>
      )}

      {userStore?.profileUrl ? (
        <Center py="6">
          <FastImage
            style={{
              width: 200,
              height: 200,
            }}
            source={{uri: userStore?.profileUrl}}
            alt={userStore?.name}
          />
        </Center>
      ) : (
        <VStack space="1" alignItems={'center'} py="76px">
          <Box w="6" h="6">
            <SvgImagePlaceHolder />
          </Box>
          <Text
            style={{
              color: '#F5F5F5',
              textAlign: 'center',
              fontFamily: 'Poppins',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 20,
            }}>
            Upload your image
          </Text>
        </VStack>
      )}
    </Pressable>
  );
};

export default UploadImg;
