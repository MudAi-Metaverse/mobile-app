import {useAccount} from 'wagmi';
import {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {
  getStore,
  listenDb,
  listenLimitDb,
  listenStore,
  offListenDb,
  queryListenDb,
  queryListenStore,
} from 'src/js/firebase';
import {genChatMetaPath} from 'src/pages/ChatRoom/functionsChatRoom';
import {
  authInfoAtom,
  followListAtom,
  followerListAtom,
  initialRoomDataAtomFamily,
  roomListAtom,
  roomMetaAtomFamily,
  userStoresAtomFamily,
} from 'src/recoil';

const useChatTab = () => {
  const {address} = useAccount();
  const [followList, setfollowList] = useRecoilState(followListAtom);
  const [followerList, setfollowerList] = useRecoilState(followerListAtom);
  const [roomList, setroomList] = useRecoilState(roomListAtom);
  const setuserStoresAtomFamily = useRecoilCallback(({set}) => (id, user) => {
    set(userStoresAtomFamily(id), user);
  });
  const setinitialRoomDataAtomFamily = useRecoilCallback(
    ({set}) =>
      (id, initialChatData) => {
        set(initialRoomDataAtomFamily(id), initialChatData);
      },
  );
  const setMetaAtomFamily = useRecoilCallback(
    ({snapshot, set}) =>
      (id, meta) => {
        set(roomMetaAtomFamily(id), meta);
      },
  );
  const getMetaAtomFamily = useRecoilCallback(({snapshot}) => async id => {
    const value = await snapshot.getPromise(roomMetaAtomFamily(id));
    return value;
  });
  const authInfo = useRecoilValue(authInfoAtom);

  useEffect(() => {
    if (!authInfo || !address) {
      return;
    }
    console.log(address);

    // followList
    const followPath = `user/${address}/follow`;

    // let followSubscribera: () => void;
    // followSubscriber = queryListenStore(
    //   'user/0x4358c14784BEE69E3939A289f9Cb5Bde2a899B42a/follow',
    //   v => {
    //     console.log('follow', v);
    //   },
    // );

    let followSubscriber: () => void;
    followSubscriber = queryListenStore(followPath, v => {
      console.log('follow', {v, followPath});

      if (v.profileUrl) {
        FastImage.preload({
          uri: v?.profileUrl,
        });
      }

      setfollowList(v.map(item => item.address));
    });

    // followerList
    const followerPath = `user/${address}/follower`;
    let followerSubscriber: () => void;
    followerSubscriber = queryListenStore(followerPath, v => {
      setfollowerList(v.map(item => item.address));
    });

    // roomList
    const roomPath = 'chatUsers';
    queryListenDb(roomPath, setRoomList, `${address}`, true);

    return () => {
      if (followSubscriber) {
        console.log('offListenDb useChatTab');
        followSubscriber();
        followerSubscriber();
        offListenDb(roomPath, setRoomList);
      }
    };
  }, [authInfo, address]);

  const setRoomList = v => {
    if (!v) {
      return;
    }

    // console.log('setRoomList', v);

    const rooms = Object.keys(v).map(roomId => {
      return {
        id: roomId,
        users: Object.keys(v[roomId]).map(userAddress => userAddress),
      };
    });
    setroomList(rooms);
  };

  // metaのリッスン
  useEffect(() => {
    if (!roomList) {
      return;
    }

    const setFunc = async v => {
      // console.log('meta listen', v);
      setMetaAtomFamily(v.id, v);
    };

    roomList.forEach(room => {
      const main = async () => {
        const prev = await getMetaAtomFamily(room.id);
        if (!prev) {
          listenDb(genChatMetaPath(room.id), setFunc);
        }
      };
      main();

      return () => {
        // console.log('offListenDb Meta', room.id);
        // offListenDb(genChatMetaPath(room.id), setFunc);
      };
    });
  }, [roomList]);

  // ルームのチャット初期値をセット
  useEffect(() => {
    if (!roomList) {
      return;
    }

    const setFunc = (chats, roomId) => {
      setinitialRoomDataAtomFamily(roomId, chats);
    };

    roomList.forEach(room => {
      const path = `chatRoom/${room.id}/chats`;
      listenLimitDb(
        path,
        v => {
          setFunc(v, room.id);
        },
        10,
      );
    });

    return () => {
      roomList.forEach(room => {
        const path = `chatRoom/${room.id}/chats`;
        offListenDb(path, setFunc);
      });
    };
  }, [roomList]);

  // userStoreをリッスンしてatomFamilyにセット
  useEffect(() => {
    if (followList && followerList) {
      const subscribers = [];
      const otherAddress = Array.from(
        new Set([...followList, ...followerList]),
      );

      otherAddress.forEach((address, index) => {
        const path = `user/${address}`;
        const setFunc = v => {
          setuserStoresAtomFamily(address, v);
        };

        subscribers[index] = listenStore(path, setFunc);
      });

      return () => {
        subscribers.forEach(subscriber => {
          subscriber();
        });
      };
    }
  }, [followList, followerList]);

  return {};
};

export default useChatTab;
