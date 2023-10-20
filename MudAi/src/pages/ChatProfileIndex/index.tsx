import React, {useState, useEffect, useCallback} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  ScrollView,
} from 'native-base';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import AccountInfo from 'src/comp/AccountInfo';
import {getStore} from 'src/js/firebase';

const ChatProfileIndex = () => {
  const route = useRoute();
  const [userObj, setuserObj] = useState();

  useFocusEffect(
    useCallback(() => {
      if (route.params?.userAddress) {
        getStore(`user/${route.params.userAddress}`).then(res => {
          setuserObj(res);
        });
      }
    }, [route]),
  );

  return (
    <Box bg="#000" py="8">
      {userObj && <AccountInfo user={userObj} />}
    </Box>
  );
};

export default ChatProfileIndex;
