import React, {useState} from 'react';
import {Text, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {useRecoilValue, useResetRecoilState} from 'recoil';
import {selectedUsersAtom, roomIdAtom} from 'src/recoil';
import {Alert} from 'react-native';
import {addMemberChatRoom} from 'src/pages/ChatRoom/functionsChatRoom';
import FullScreenLoading from 'src/comp/FullScreenLoading';

type Props = {};

const HeaderRightMemberInvite = (props: Props) => {
  const navigation = useNavigation();
  const selectedUsers = useRecoilValue(selectedUsersAtom);
  const [isLoading, setisLoading] = useState(false);
  const resetSelectedUsers = useResetRecoilState(selectedUsersAtom);
  const roomId = useRecoilValue(roomIdAtom);

  const disabled = selectedUsers.length === 0;

  return (
    <Pressable
      mr="2"
      opacity={disabled ? 0.5 : 1}
      disabled={disabled}
      onPress={async () => {
        if (isLoading) {
          return;
        }

        setisLoading(true);

        await addMemberChatRoom(
          roomId,
          selectedUsers.map(item => item.address),
        );

        setisLoading(false);

        Alert.alert('Invite success');
        resetSelectedUsers();
        navigation.goBack();
      }}>
      <FullScreenLoading isLoading={isLoading} />

      <Text color="blue.600" fontSize="md">
        Invite
      </Text>
    </Pressable>
  );
};

export default HeaderRightMemberInvite;
