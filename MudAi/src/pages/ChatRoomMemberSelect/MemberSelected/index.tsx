import React, {useState, useEffect, useRef} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  ScrollView,
  Pressable,
} from 'native-base';
import {followListAtom, selectedUsersAtom} from 'src/recoil';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import FastImage from 'react-native-fast-image';
import CircleIcon from 'src/comp/CircleIcon';
import SvgClose from 'src/comp/svg/SvgClose';
import {Animated} from 'react-native';

type Props = {};

const iconHeight = 46;
const paddingY = 12;

const MemberSelected = (props: Props) => {
  const selectedUsers = useRecoilValue(selectedUsersAtom);
  const height = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(height, {
      toValue: selectedUsers.length > 0 ? iconHeight + paddingY * 2 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [selectedUsers]);

  return (
    <Animated.View
      style={{
        height: height,
      }}>
      <ScrollView
        horizontal
        _contentContainerStyle={{
          flexGrow: 1,
          py: 3,
          px: 2,
        }}>
        <HStack space="4">
          {selectedUsers.map(user => {
            return <ItemUser key={user.address} user={user} />;
          })}
        </HStack>
      </ScrollView>
    </Animated.View>
  );
};

const ItemUser = props => {
  const setselectedUsers = useSetRecoilState(selectedUsersAtom);

  const removeSelectedUser = () => {
    setselectedUsers(prev =>
      prev.filter(user => user.address !== props.user.address),
    );
  };

  return (
    <Box position="relative">
      <Pressable
        position="absolute"
        top="-5%"
        right="-10%"
        p="1"
        borderRadius="full"
        bg="#fff"
        overflow="hidden"
        zIndex="1"
        onPress={removeSelectedUser}>
        <Box w="4" h="4">
          <SvgClose />
        </Box>
      </Pressable>
      <CircleIcon image={props.user?.profileUrl} />
    </Box>
  );
};

export default MemberSelected;
