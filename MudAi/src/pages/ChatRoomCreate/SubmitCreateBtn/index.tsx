import React, {useState} from 'react';
import {Pressable, Text} from 'native-base';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import {
  chatGroupNameAtom,
  selectedGroupImageAtom,
  selectedUsersAtom,
  userStoreAtom,
} from 'src/recoil';
import {uploadingImage} from 'src/js/firebase';
import {genRoom} from 'src/pages/ChatRoom/functionsChatRoom';
import {idMaker} from 'src/js/functions';
import FullScreenLoading from 'src/comp/FullScreenLoading';
import {useAccount} from 'wagmi';

const SubmitCreateBtn = () => {
  const {address} = useAccount();
  const navigation = useNavigation();
  const groupName = useRecoilValue(chatGroupNameAtom);
  const selectedImage = useRecoilValue(selectedGroupImageAtom);
  const selectedUsers = useRecoilValue(selectedUsersAtom);
  const userStore = useRecoilValue(userStoreAtom);
  const [isLoading, setisLoading] = useState(false);

  return (
    <Pressable
      mr="2"
      onPress={async () => {
        if (isLoading) {
          return;
        }

        setisLoading(true);
        const roomId = idMaker(20);
        let groupImage = selectedImage;

        // 画像のアップロード
        if (typeof selectedImage === 'object') {
          const mediaId = idMaker(20);
          const downloadUrl = await uploadingImage(
            `chat/${roomId}/img/${mediaId}`,
            selectedImage.path,
          );
          groupImage = downloadUrl[0];
        }

        const users = [userStore, ...selectedUsers];
        const roomInfo = await genRoom(
          roomId,
          users.map(user => user.address),
          {
            name: groupName || users.map(user => user.name).join(','),
            img: groupImage,
            imgBg: null,
            type: 'group',
            owner: address,
          },
        );

        setisLoading(false);

        navigation.popToTop();
        navigation.goBack();

        navigation.navigate('Chat', {
          screen: 'ChatRoom',
          params: {
            id: roomInfo.id,
          },
        });
      }}>
      {isLoading && <FullScreenLoading isLoading={isLoading} />}
      <Text color="blue.600" fontSize="md">
        Create
      </Text>
    </Pressable>
  );
};

export default SubmitCreateBtn;
