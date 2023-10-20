import React, {useState, useEffect, useRef} from 'react';
import {Box} from 'native-base';
import ChatInput from 'src/comp/ChatInput';
import {useRoute} from '@react-navigation/native';

import {deleteDb, functionCall, updatesDb, writeDb} from 'src/js/firebase';
import {useAccount} from 'wagmi';
import {roomMetaAtomFamily, userStoreAtom} from 'src/recoil';
import {useRecoilValue} from 'recoil';
import {Platform} from 'react-native';
import {createNotificationAdditionalInfo} from 'src/pages/ChatRoom/functionsChatRoom';

export const fetchLimit = 20;

type Props = {
  tokensRef: string[];
};
const ChatRoomInput = (props: Props) => {
  const typingTimeoutId = useRef(null);
  const [isTyping, setisTyping] = useState(false);
  const route = useRoute();
  const {address} = useAccount();
  const userStore = useRecoilValue(userStoreAtom);
  const roomMeta = useRecoilValue(roomMetaAtomFamily(route.params.id));

  // isTypingの切り替え時にtypingの追加、削除を行う
  useEffect(() => {
    const path = `chatRoom/${route.params.id}/typing/${address}`;
    if (isTyping) {
      writeDb(path, true);
    }

    return () => {
      deleteDb(path);
    };
  }, [isTyping]);

  const onTyping = value => {
    if (value.length === 0) {
      return;
    }
    if (typingTimeoutId.current) {
      clearTimeout(typingTimeoutId.current);
    }

    setisTyping(true);
    typingTimeoutId.current = setTimeout(() => {
      typingTimeoutId.current = null;
      setisTyping(false);
    }, 1000);
  };

  const addChat = (value: string) => {
    setisTyping(false);
    const now = Date.now();

    updatesDb({
      [`chatRoom/${route.params.id}/chats/${now}`]: {
        chat: value,
        address: address,
        unixtime: now,
      },
      [`chatRoom/${route.params.id}/meta/lastChat`]: value,
      [`chatRoom/${route.params.id}/meta/unixtime`]: now,
    }).then(res => {
      const {title, subtitle} = createNotificationAdditionalInfo(
        roomMeta,
        userStore,
      );

      functionCall('notification_add_chat_asia', {
        notification: {
          title: title,
          body: value,
        },
        tokens: props.tokensRef.current,
        data: {
          roomId: route.params.id,
          root: 'ChatRoom',
        },
        additionalInfo: {
          subtitle: subtitle,
        },
      }).then(res => {
        // console.log(res);
      });
    });
  };

  return (
    <Box style={{paddingHorizontal: 13}}>
      <ChatInput onSubmit={addChat} isLoading={false} onInput={onTyping} />
    </Box>
  );
};

export default ChatRoomInput;
