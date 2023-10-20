import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef} from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  chatTabbarHiddenAtom,
  roomAddressesAtom,
  roomIdAtom,
  roomMetaAtomFamily,
  chatRawDataAtom,
  viewableItemsAtom,
} from 'src/recoil';

import {getDb, listenDb, offListenDb} from 'src/js/firebase';

import {
  allOffListenDb,
  getUserDetailArr,
} from 'src/pages/ChatRoom/functionsChatRoom';
import {useAccount} from 'wagmi';
import {useRenderInfo} from '@uidotdev/usehooks';

type Props = {
  children: React.ReactNode;
};

export const fetchLimit = 20;

const ChatRoomPage = (props: Props) => {
  // const info = useRenderInfo('ChatRoomPage');
  const route = useRoute();
  const navigation = useNavigation();

  const roomMeta = useRecoilValue(roomMetaAtomFamily(route.params.id));
  const {address} = useAccount();
  const [roomAddressArr, setRoomAddressArr] = useRecoilState(roomAddressesAtom);

  const setroomId = useSetRecoilState(roomIdAtom);
  const setChatTabbarHidden = useSetRecoilState(chatTabbarHiddenAtom);

  const resetviewableItems = useResetRecoilState(viewableItemsAtom);
  const resetchatRawData = useResetRecoilState(chatRawDataAtom);
  const resetroomAddressArr = useResetRecoilState(roomAddressesAtom);

  // 画面から離れた時の処理
  useFocusEffect(
    useCallback(() => {
      resetroomAddressArr();

      return () => {
        resetchatRawData();
        resetviewableItems();
        allOffListenDb(route);
      };
    }, []),
  );

  // ルームidのatomとメンバーアドレスのatomを更新
  useFocusEffect(
    useCallback(() => {
      if (route.params.id) {
        console.log('chatRoomID', route.params.id);

        setroomId(route.params.id);

        const setFunc = v => {
          setRoomAddressArr(Object.keys(v));
        };

        const usersPath = `chatRoom/${route.params.id}/users`;
        listenDb(usersPath, setFunc);

        return () => {
          offListenDb(usersPath, setFunc);
        };
      }
    }, [route?.params?.id]),
  );

  // ヘッダータイトルを更新
  useFocusEffect(
    useCallback(() => {
      const main = async () => {
        if (roomMeta && address) {
          let title = '';
          if (roomMeta.type === 'group') {
            title = `${roomMeta.name}（${roomAddressArr.length}）`;
          } else {
            const otherUser = await getDb(`chatUsers/${route.params.id}`).then(
              res => {
                return Object.keys(res).filter(
                  userAddress => userAddress !== address,
                )[0];
              },
            );
            const otherUserStoreArr = await getUserDetailArr([otherUser]);
            title = otherUserStoreArr[0]?.name;
          }

          navigation.setOptions({
            headerTitle: title,
          });
        }
      };
      main();
    }, [roomMeta, roomAddressArr]),
  );

  useEffect(() => {
    setChatTabbarHidden(true);

    return () => {
      setChatTabbarHidden(false);
    };
  }, []);

  return <>{props.children}</>;
};

export default ChatRoomPage;
