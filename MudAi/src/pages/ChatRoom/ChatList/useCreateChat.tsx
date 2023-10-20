import {useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {chatRawDataAtom, chatSoundAtom} from 'src/recoil';

import {useFocusEffect} from '@react-navigation/native';
import {useAccount} from 'wagmi';
import {assets} from 'src/js/configView';
import {
  ListenDbFromA,
  getDb,
  listenEventDb,
  listenLimitChatDb,
  updatesDb,
} from 'src/js/firebase';
import {formatDate, getChatUnreadCount, updateAppBadge} from 'src/js/functions';

import {
  fetchLimit,
  getUsersLastUnix,
} from 'src/pages/ChatRoom/functionsChatRoom';

const useCreateChat = (
  otherUsersStoreInfo,
  otherUsers,
  updateBadgeRef,
  initialized,
) => {
  const route = useRoute();
  const {address} = useAccount();
  const chatSound = useRecoilValue(chatSoundAtom);
  const [chatRawdata, setchatRawdata] = useRecoilState(chatRawDataAtom);
  const [chat, setchat] = useState([]);

  /*---------------------------------

    chatを生成

  ---------------------------------*/

  // 初期データをセット
  useFocusEffect(
    useCallback(() => {
      if (
        address &&
        route?.params?.initialData
        //  &&
        // Object.keys(route.params.initialData).length > 0
      ) {
        setchatRawdata(sortFetchResult(route.params.initialData));
      }
    }, [route?.params?.id, address]),
  );

  // 追加・削除時にrawdataを更新
  useFocusEffect(
    useCallback(() => {
      if (!initialized) {
        return;
      }

      const path = `chatRoom/${route.params.id}/chats`;

      const main = async () => {
        const initialData = await getDb(path, fetchLimit);

        setchatRawdata(sortFetchResult(initialData));

        const now = new Date().getTime();
        console.log('start listen', now);

        // チャットをリッスン
        listenLimitChatDb(path, addChatRowData, String(now), fetchLimit);

        // 削除イベントをリッスン
        listenEventDb(path, removeChatRowData, 'child_removed');
      };
      main();
    }, [initialized, route?.params?.id]),
  );

  // useEffect(() => {
  //   console.log('initialized change', initialized);
  // }, [initialized]);

  const addChatRowData = v => {
    chatSound.stop();
    console.log('addChatRowData', v);

    setchatRawdata(prev => {
      if (prev.every(item => item.unixtime !== v.unixtime)) {
        chatSound?.play();
        return [v, ...prev];
      } else if (v.mediaId && prev.some(item => item.mediaId === v.mediaId)) {
        return prev.map(item => {
          if (item.mediaId === v.mediaId) {
            chatSound?.play();

            return {
              ...item,
              ...v,
            };
          } else {
            return item;
          }
        });
      } else {
        return prev;
      }
    });
  };

  const removeChatRowData = v => {
    console.log('removeChatRowData', v);

    setchatRawdata(prev => {
      // 先頭が削除された場合だけ、metaを更新
      let removeIndex = 0;
      removeIndex = prev.findIndex(item => item.unixtime === v.unixtime);

      if (removeIndex === -1) {
        return prev;
      }

      if (removeIndex === 0) {
        updatesDb({
          [`chatRoom/${route.params.id}/meta/lastChat`]: chatRawdata[0].chat,
          [`chatRoom/${route.params.id}/meta/unixtime`]:
            chatRawdata[0].unixtime,
        });
      }

      return prev.filter(item => item.unixtime !== v.unixtime);
    });
  };

  useEffect(() => {
    if (!chatRawdata) {
      return;
    }

    setChatFunc(chatRawdata);
  }, [chatRawdata]);

  const setChatFunc = async chatRawdata => {
    if (Object.keys(chatRawdata).length === 0) {
      setchat([]);
    } else {
      const chatArr = createChatArr(sortFetchResult(chatRawdata));
      setchat(chatArr);

      // アプリバッジ更新
      if (updateBadgeRef.current) {
        updateBadgeRef.current = false;

        const lastChat = await getDb(
          `chatRoom/${route.params.id}/users/${address}`,
        ).then(res => res?.lastChat);
        const unreadCount = await getChatUnreadCount(
          route.params?.id,
          lastChat,
          address,
        );

        await updateAppBadge(-unreadCount);
      }

      updatesDb({
        [`chatRoom/${route.params.id}/users/${address}/lastChat`]:
          chatArr[0].unixtime,
      });
    }
  };

  const createChatArr = chatArr => {
    let tmp = [];
    let date = {
      date: '',
      unixtime: '',
    };
    const charArrLength = chatArr.length;

    chatArr.forEach((item, index) => {
      if (item.typing && item.address === address) {
      } else {
        const {y, m, d} = formatDate(false, item.unixtime);

        // 前のチャットの日付と違う場合は前のチャットの日付を追加
        if (date.date !== '' && date.date !== `${y}-${m}-${d}`) {
          tmp.push({
            unixtime: date.unixtime,
            type: 'date',
          });
        }
        date = {
          date: `${y}-${m}-${d}`,
          unixtime: item.unixtime,
        };

        tmp.push({
          ...item,
          chat: item.chat,
          address: item.address,
          unixtime: item.unixtime,
          type: item.address === address ? 'me' : 'other',
          img:
            item.address !== chatArr[index + 1]?.address
              ? getUserImg(item.address)
              : '',
          read: getUsersLastUnix(otherUsers).filter(
            unix => item.unixtime <= unix,
          ).length,
        });

        // 最後の要素の時は自身のunixtimeを追加
        if (index === charArrLength - 1) {
          tmp.push({
            unixtime: item.unixtime,
            type: 'date',
          });
        }
      }
    });

    console.log('tmp', tmp);

    return tmp;
  };

  const getUserImg = useCallback(
    userAddress => {
      const user = otherUsersStoreInfo?.find(
        user => user.address === userAddress,
      );
      return user?.profileUrl ? {uri: user.profileUrl} : assets.no_image;
    },
    [otherUsersStoreInfo],
  );

  const sortFetchResult = obj => {
    const tmp = Object.keys(obj).map(key => obj[key]);
    tmp.sort((a, b) => {
      return a.unixtime > b.unixtime ? -1 : 1;
    });
    return tmp;
  };

  /*---------------------------------

    既読の更新

  ---------------------------------*/

  useEffect(() => {
    setchat(prev => {
      return prev.map(item => {
        return {
          ...item,
          read: getUsersLastUnix(otherUsers).filter(
            unix => item.unixtime <= unix,
          ).length,
        };
      });
    });
  }, [otherUsers]);

  return {
    chatRawdata,
    chat,
    getUserImg,
  };
};

export default useCreateChat;
