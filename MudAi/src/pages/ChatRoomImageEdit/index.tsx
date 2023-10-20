import React, {useState, useEffect, useCallback, memo} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  FlatList,
  Pressable,
} from 'native-base';
import {assets} from 'src/js/configView';
import FastImage from 'react-native-fast-image';
import Spacer from 'src/comp/Spacer';
import {useWindowDimensions} from 'react-native';
import {useRecoilCallback, useRecoilState, useSetRecoilState} from 'recoil';
import {selectedGroupImageAtom, tabbarHeightAtom} from 'src/recoil';
import CustomButton from 'src/comp/CustomButton';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import Typography from 'src/comp/Typography';

const localImages = [
  assets.slider_5,
  assets.slider_3,
  assets.ai_1,
  assets.ai_3,
  assets.slider_1,
  assets.slider_4,
  assets.ai_2,
];

const ChatRoomImageEdit = () => {
  const navigation = useNavigation();
  const setselectedImage = useSetRecoilState(selectedGroupImageAtom);
  const getTabbarHeight = useRecoilCallback(
    ({snapshot}) =>
      async () => {
        const value = await snapshot.getPromise(tabbarHeightAtom);
        return value;
      },
    [],
  );
  const [tabbarHeight, settabbarHeight] = useState(getTabbarHeight());

  useEffect(() => {
    getTabbarHeight().then(res => {
      settabbarHeight(res);
    });
  }, []);

  /*---------------------------------

    flatList

  ---------------------------------*/

  const handleKeyExtractor = useCallback((item, index) => {
    return index;
  }, []);

  const renderItem = ({item}) => {
    return (
      <Pressable
        style={{width: '33.3%', aspectRatio: 1}}
        onPress={() => {
          setselectedImage(item);
          navigation.goBack();
        }}>
        <FastImage source={item} style={{width: '100%', height: '100%'}} />
      </Pressable>
    );
  };

  return (
    <Box flex="1" bg="#000" pb={`${isNaN(tabbarHeight) ? 0 : tabbarHeight}px`}>
      <FlatList
        flex="1"
        mb="4"
        _contentContainerStyle={{
          flexGrow: 1,
        }}
        data={localImages}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={handleKeyExtractor}
      />
      <FooterBtns />
    </Box>
  );
};

const FooterBtns = () => {
  const navigation = useNavigation();
  const setselectedImage = useSetRecoilState(selectedGroupImageAtom);

  return (
    <HStack space="4">
      {/* <Button flex="1" variant="outline" borderColor="#fff">
        <Text color="#fff">キャンセル</Text>
      </Button> */}
      <Center w="100%">
        <CustomButton
          onPress={() => {
            ImageCropPicker.openPicker({
              width: 300,
              height: 300,
              cropping: true,
            }).then(image => {
              setselectedImage(image);
              navigation.goBack();
            });
          }}>
          <Typography type="p_main_eng_bold">Select Photo</Typography>
        </CustomButton>
      </Center>
    </HStack>
  );
};

export default ChatRoomImageEdit;
