import React, {useState, useEffect, createElement} from 'react';
import {HStack, Text, Box, VStack, Pressable, ScrollView} from 'native-base';
import {InterfaceBoxProps} from 'native-base/lib/typescript/components/primitives/Box';
import {TFireStoreUser} from 'src/type';
import AspectBox from 'src/comp/AspectBox';
import CustomButton from 'src/comp/CustomButton';
import SvgInstagram from 'src/comp/svg/SvgInstagram';
import SvgTwitter from 'src/comp/svg/SvgTwitter';
import {deleteStore, getDb, getStore, setStore} from 'src/js/firebase';
import {useAccount} from 'wagmi';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {
  initialRoomDataAtomFamily,
  roomListAtom,
  roomMetaSelectorFamily,
} from 'src/recoil';
import Typography from 'src/comp/Typography';
import {idMaker, openUrl} from 'src/js/functions';
import {Alert} from 'react-native';
import SvgChat from 'src/comp/svg/SvgChat';
import {useNavigation} from '@react-navigation/native';
import {
  checkPrivateRoomExist,
  genRoom,
  getOtherUserStoreArr,
  getRoomName,
} from 'src/pages/ChatRoom/functionsChatRoom';
import FastImage from 'react-native-fast-image';

type Props = InterfaceBoxProps & {
  user: TFireStoreUser;
};

const AccountInfo = (props: Props) => {
  const {address} = useAccount();
  const [currentFollowState, setcurrentFollowState] = useState(false);

  useEffect(() => {
    if (!address || !props.user) {
      return;
    }
    const path = `user/${address}/follow/${props.user.address}`;

    getStore(path).then(v => {
      if (v) {
        if (Object.keys(v).length === 0) {
          setcurrentFollowState(false);
        } else {
          setcurrentFollowState(true);
        }
      }
    });
  }, [address, props.user]);

  const toggleFollow = () => {
    if (!currentFollowState) {
      const promises = [];
      promises.push(
        setStore(`user/${address}/follow/${props.user.address}`, {
          address: props.user.address,
          updateAt: Date.now(),
        }),
      );

      promises.push(
        setStore(`user/${props.user.address}/follower/${address}`, {
          address: address,
          updateAt: Date.now(),
        }),
      );

      Promise.all(promises)
        .then(res => {
          setcurrentFollowState(true);
        })
        .catch(e => {
          Alert.alert('Error', 'Something went wrong');
        });
    } else {
      const promises = [];

      promises.push(
        deleteStore(
          `user/${address}/follow/${props.user.address}`,
          props.user.address,
        ),
      );

      promises.push(
        deleteStore(
          `user/${props.user.address}/follow/${address}`,
          props.user.address,
        ),
      );

      Promise.all(promises)
        .then(res => {
          setcurrentFollowState(false);
        })
        .catch(e => {
          Alert.alert('Error', 'Something went wrong');
        });
    }
  };

  if (!props.user) {
    return null;
  }

  return (
    <ScrollView
      bounces={false}
      _contentContainerStyle={{
        alignItems: 'center',
      }}>
      <Box bg="#21242D" p="2" borderRadius="full" mb="2px">
        <AspectBox ratio={1} w="80px">
          <FastImage
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 9999,
            }}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: props.user?.profileUrl || 'https://riverage.dev/sample.jpg',
            }}
            alt="user profile image"
          />
        </AspectBox>
      </Box>

      <VStack space="7" alignItems={'center'}>
        <VStack space="1" alignItems={'center'}>
          <Text fontSize="lg" fontWeight="800" fontFamily="Inter">
            {props.user.name}
          </Text>
          <Typography type="p_cap_eng" color="#565656">
            {props.user.address}
          </Typography>
        </VStack>

        <Box>
          <CustomButton onPress={toggleFollow} w="198px">
            <Typography type="p_main_eng_bold">
              {!currentFollowState ? 'Follow' : 'UnFollow'}
            </Typography>
          </CustomButton>
        </Box>

        <HStack space="4">
          {/* &&で条件付きにするとspaceが効いてしまうため？で条件付きレンダリング */}
          {props.user.instagramId ? (
            <SnsBtn
              svg={<SvgInstagram />}
              onPress={() => {
                openUrl(`https://instagram.com/${props.user.instagramId}`);
              }}
            />
          ) : null}

          {props.user.twitterId ? (
            <SnsBtn
              svg={<SvgTwitter />}
              onPress={() => {
                openUrl(`https://twitter.com/${props.user.twitterId}`);
              }}
            />
          ) : null}
        </HStack>
        <TalkBtn user={props.user} />
      </VStack>
    </ScrollView>
  );
};

const TalkBtn = props => {
  const navigation = useNavigation();
  const {address} = useAccount();
  const getInitialRoomData = useRecoilCallback(({snapshot}) => async id => {
    const initialData = await snapshot.getPromise(
      initialRoomDataAtomFamily(id),
    );
    console.log('initialData', initialData);

    return initialData;
  });
  const roomList = useRecoilValue(roomListAtom);
  const roomMetaArr = useRecoilValue(roomMetaSelectorFamily());

  const onPress = async () => {
    const roomId = checkPrivateRoomExist(
      roomList,
      roomMetaArr,
      props.user.address,
    );

    let tmpId = roomId || idMaker(20);
    let users = {};
    let initialRoomData = {};
    let otherUserStoreArr = [];

    if (!roomId) {
      await genRoom(tmpId, [props.user.address, address], {
        createAt: new Date().getTime(),
        type: 'private',
      });
      roomTitle = await getRoomName({}, address, {
        [props.user.address]: true,
        [address]: true,
      });
    } else {
      users = await getDb(`chatRoom/${roomId}/users`);
      otherUserStoreArr = await getOtherUserStoreArr(
        Object.keys(users),
        address,
      );
      const meta = roomMetaArr.filter(meta => meta.id === roomId)[0];
      roomTitle = await getRoomName(meta, address, users);
      initialRoomData = await getInitialRoomData(roomId);
    }

    navigation.navigate('ChatRoom', {
      id: tmpId,
      initialData: initialRoomData,
      users: users,
      otherUserStoreArr,
      title: roomTitle,
    });
  };

  return (
    <HStack space="4" justifyContent={'center'}>
      <ActionBtn icon={SvgChat} text="Talk" action={onPress} />
    </HStack>
  );
};

const ActionBtn = (props: {
  icon: React.FC;
  text: string;
  action: () => void;
}) => {
  return (
    <Pressable onPress={props.action}>
      <VStack space="1" alignItems={'center'}>
        <Box w="6" h="6">
          {createElement(props.icon, {
            color: '#fff',
          })}
        </Box>
        <Text fontWeight="500" fontSize="xs">
          {props.text}
        </Text>
      </VStack>
    </Pressable>
  );
};

const SnsBtn = ({svg, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      p="4"
      borderRadius="16"
      borderWidth="1"
      borderColor={'#21242D'}>
      <Box w="6" h="6">
        {svg}
      </Box>
    </Pressable>
  );
};

export default AccountInfo;
