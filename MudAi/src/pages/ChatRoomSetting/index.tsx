import React, {useState, useCallback, useEffect} from 'react';
import {Text, VStack, ScrollView, Container, Input, HStack} from 'native-base';
import RoomImage from 'src/pages/ChatRoomSetting/RoomImage';
import {
  chatGroupNameAtom,
  roomIdAtom,
  selectedGroupImageAtom,
} from 'src/recoil';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {useFocusEffect} from '@react-navigation/native';
import {idMaker} from 'src/js/functions';
import {listenDb, offListenDb, uploadingImage, writeDb} from 'src/js/firebase';
import {
  genChatMetaPath,
  getRoomMeta,
} from 'src/pages/ChatRoom/functionsChatRoom';
import CustomButton from 'src/comp/CustomButton';
import {Alert} from 'react-native';
import FullScreenLoading from 'src/comp/FullScreenLoading';

const ChatRoomSetting = () => {
  const selectedImage = useRecoilValue(selectedGroupImageAtom);
  const resetSelectedImage = useResetRecoilState(selectedGroupImageAtom);
  const roomId = useRecoilValue(roomIdAtom);
  const [meta, setmeta] = useState();
  const [groupName, setgroupName] = useRecoilState(chatGroupNameAtom);
  const [showFullScreenLoading, setshowFullScreenLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const path = genChatMetaPath(roomId);
      getRoomMeta(roomId).then(res => {
        setgroupName(res.name);
      });
      listenDb(path, setmeta);

      return () => {
        offListenDb(path, setmeta);
      };
    }, []),
  );

  // metaに画像をセット
  useFocusEffect(
    useCallback(() => {
      const main = async () => {
        if (!selectedImage) {
          return;
        }

        setshowFullScreenLoading(true);

        let groupImage = selectedImage;

        if (typeof selectedImage === 'object') {
          const mediaId = idMaker(20);
          const downloadUrl = await uploadingImage(
            `chat/${roomId}/img/${mediaId}`,
            selectedImage.path,
          );
          groupImage = downloadUrl[0];
        }

        writeDb(`chatRoom/${roomId}/meta/img`, groupImage);
        resetSelectedImage();

        setshowFullScreenLoading(false);
      };
      main();

      return () => {};
    }, [selectedImage, roomId]),
  );

  return (
    <ScrollView
      bg="#000"
      flex={1}
      _contentContainerStyle={{
        py: 4,
        flexGrow: 1,
      }}>
      <FullScreenLoading isLoading={showFullScreenLoading} />
      <VStack space="4">
        {meta?.type !== 'group' && (
          <Text fontSize="lg">There are no configurable items</Text>
        )}

        {meta?.type === 'group' && (
          <LabelBlock title="Group image">
            <Container>
              <RoomImage image={meta?.img} />
            </Container>
          </LabelBlock>
        )}

        {meta?.type === 'group' && (
          <LabelBlock title="Group name">
            <MyTextInput
              placeholder="Group name"
              value={groupName}
              onChangeText={text => {
                setgroupName(text);
              }}
              saveFunc={() => {
                setshowFullScreenLoading(true);

                writeDb(`chatRoom/${roomId}/meta/name`, groupName).then(res => {
                  Alert.alert('saved');
                  setshowFullScreenLoading(false);
                });
              }}
            />
          </LabelBlock>
        )}
      </VStack>
    </ScrollView>
  );
};

const LabelBlock = props => {
  return (
    <VStack space="2">
      <Text fontSize="md" mb="2" fontWeight="500">
        {props.title}
      </Text>
      {props.children}
    </VStack>
  );
};

const MyTextInput = ({saveFunc, ...others}) => {
  // return <Input {...props} />;
  return (
    <HStack space="2">
      <Input flex="1" {...others} />
      <CustomButton wrapperProps={{width: 100}} py="2" onPress={saveFunc}>
        save
      </CustomButton>
    </HStack>
  );
};

export default ChatRoomSetting;
