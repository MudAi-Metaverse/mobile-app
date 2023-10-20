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
import {
  functionCall,
  updatesDb,
  uploadingImage,
  writeDb,
} from 'src/js/firebase';
import {useRoute} from '@react-navigation/native';
import {idMaker} from 'src/js/functions';
import {useAccount} from 'wagmi';
import {
  atomFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  androidOpenPickerAtom,
  chatRawDataAtom,
  roomMetaAtomFamily,
  tokensRefAtom,
  uploadingMediaFamily,
  userStoreAtom,
} from 'src/recoil';
import {TChatMedia} from 'src/type';
import {
  addMedia,
  getLocalMediaFile,
} from 'src/pages/ChatRoom/functionsChatRoom';
import {imgMaxSize} from 'src/js/variables';
import {Alert} from 'react-native';

type Props = {};

const ChatImgUpload = (props: Props) => {
  const route = useRoute();
  const {address} = useAccount();
  const tokens = useRecoilValue(tokensRefAtom);
  const setchatRawdata = useSetRecoilState(chatRawDataAtom);
  const userStore = useRecoilValue(userStoreAtom);
  const roomMeta = useRecoilValue(roomMetaAtomFamily(route.params.id));
  const setAndroidOpenPicker = useSetRecoilState(androidOpenPickerAtom);
  const setState = useRecoilCallback(({set}) => (media, id) => {
    set(uploadingMediaFamily(id), media);
  });

  // const openPicker = async () => {
  //   const result = await launchImageLibrary({
  //     presentationStyle: 'popover',
  //     selectionLimit: 0,
  //     assetRepresentationMode: 'current',
  //   });
  // };

  const handleTask = (taskSnapshot, media) => {
    const progress = Math.round(
      (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
    );
    setState({...media, progress}, media.id);
  };

  return (
    <Pressable
      onPress={async () => {
        setAndroidOpenPicker(true);
        ImageCropPicker.openPicker({
          // compressImageMaxWidth: 300,
          multiple: true,
          showsSelectedCount: true,
          smartAlbums: ['UserLibrary'],
          compressVideoPreset: 'HighestQuality',
        }).then(medias => {
          medias.forEach(async media => {
            const mediaId = idMaker(20);
            const unixtime = new Date().getTime();
            const mode = String(media.mime).match(/video\//) ? 'video' : 'img';
            const videoProperty =
              mode === 'video' ? {duration: media.duration / 1000} : {};
            console.log('media', media);

            if (media.size > imgMaxSize) {
              Alert.alert(
                `Maximum file size is ${imgMaxSize / 1024 / 1024}MB`,
                '',
              );
              return;
            }

            setchatRawdata(prev => {
              return [
                {
                  address,
                  unixtime,
                  mode: mode,
                  mediaId: mediaId,
                  width: media.width,
                  height: media.height,
                  ...videoProperty,
                  // uploadingだけのproperty
                  sourceURL: getLocalMediaFile(media),
                  type: 'me',
                },
                ...prev,
              ];
            });

            const downloadUrl = await uploadingImage(
              `chat/${route.params.id}/media/${mediaId}`,
              media.path,
              taskSnapshot => {
                handleTask(taskSnapshot, {
                  ...media,
                  id: mediaId,
                });
              },
            ).catch(e => {
              console.error('uploadingImage Error', e);
              setchatRawdata(prev => prev.shift());
              Alert.alert(e.message);
              return;
            });

            const posterUrl = await functionCall('storage-create_poster', {
              mediaObj: media,
              uploadedPath: `chat/${route.params.id}/media/${mediaId}`,
            }).catch(e => {
              console.error('storage-create_poster', e);
              setchatRawdata(prev => prev.shift());
              Alert.alert(e.message);
              return;
            });

            if (posterUrl) {
              videoProperty.poster = posterUrl.data;
            }

            const mediaObj: TChatMedia = {
              id: mediaId,
              mime: media.mime,
              width: media.width,
              height: media.height,
              filename: media.filename,
              downloadUrl: downloadUrl[0],
              createAt: unixtime,
              ...videoProperty,
            };

            addMedia(
              route.params.id,
              mediaObj,
              address,
              tokens,
              roomMeta,
              userStore,
              unixtime,
            );
          });
        });
        // await openPicker();
      }}>
      <Box w="8" h="8">
        <SvgImagePlaceHolder />
      </Box>
    </Pressable>
  );
};

export default ChatImgUpload;
