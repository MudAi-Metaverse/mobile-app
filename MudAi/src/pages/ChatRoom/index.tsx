import {View} from 'native-base';
import React, {useRef} from 'react';
import ChatWrapperA from 'src/comp/ChatWrapper/ChatWrapperA';
import {bodyMaxWidth} from 'src/js/configView';
import ChatList from 'src/pages/ChatRoom/ChatList';
import ChatRoomInput from 'src/pages/ChatRoom/ChatRoomInput';
import MediaModal from 'src/pages/ChatRoom/MediaModal';
import ChatRoomPage from 'src/pages/ChatRoom/page';
import {useRenderInfo} from '@uidotdev/usehooks';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ChatListA from 'src/pages/ChatRoom/ChatList/test';

const ChatRoom = () => {
  // const info = useRenderInfo('ChatRoom');
  const insets = useSafeAreaInsets();
  const tokensRef = useRef<string[]>([]);

  return (
    <ChatRoomPage>
      <MediaModal />
      <ChatWrapperA>
        {/* <ChatListA tokensRef={tokensRef} /> */}
        <ChatList tokensRef={tokensRef} />
        <View
          style={[
            {
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              marginTop: 'auto',
              maxWidth: bodyMaxWidth,
              zIndex: 999,
            },
            {bottom: insets.bottom ? insets.bottom / 3 : 16},
          ]}>
          <ChatRoomInput tokensRef={tokensRef} />
        </View>
      </ChatWrapperA>
    </ChatRoomPage>
  );
};

export default ChatRoom;
