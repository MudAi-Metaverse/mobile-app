import {useRoute} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet} from 'react-native';
import useAppState from 'src/js/useAppState';
import {setPadding} from 'src/js/styles';
import {allOffListenDb} from 'src/pages/ChatRoom/functionsChatRoom';
import useFlatList from 'src/pages/ChatRoom/ChatList/useFlatList';
import useTokens from 'src/pages/ChatRoom/ChatList/useTokens';
import useCreateChat from 'src/pages/ChatRoom/ChatList/useCreateChat';
import useTyping from 'src/pages/ChatRoom/ChatList/useTyping';
import {Container, Text} from 'native-base';
import {useSetRecoilState} from 'recoil';
import {viewableItemsAtom} from 'src/recoil';
import {getDbFromA} from 'src/js/firebase';
import ChatDate from 'src/comp/ChatDate';
import ChatItemImg from 'src/comp/ChatItemImg';
import ChatItemVideo from 'src/comp/ChatItemVideo';
import Spacer from 'src/comp/Spacer';
import ChatItem from 'src/comp/ChatItem';
import {useRenderInfo} from '@uidotdev/usehooks';

type Props = {
  tokensRef: string[];
};

export const fetchLimit = 20;

// デバッグ用
const ChatListA = memo((props: Props) => {
  const route = useRoute();
  const [chat, setchat] = useState(chatData);
  const [typingArr, setTypingArr] = useState([]);

  const onEndReachedRef = useRef(false);
  const setviewableItems = useSetRecoilState(viewableItemsAtom);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewableItemsChanged = ({viewableItems}) => {
    setviewableItems(viewableItems);
  };

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig: viewabilityConfig.current, onViewableItemsChanged},
  ]);

  const onEndReached = useCallback(() => {
    console.log('onEndReached');
  }, [chat]);

  const renderItem = useCallback(({item}) => {
    return <RenderItem item={item} />;
    // if (item.type === 'date') {
    //   return (
    //     <Container mx="auto">
    //       <ChatDate unixtime={item.unixtime} />
    //     </Container>
    //   );
    // } else if (item.mode === 'img') {
    //   return <ChatItemImg {...item} />;
    // } else if (item.mode === 'video') {
    //   return <ChatItemVideo {...item} />;
    // } else {
    //   return <ChatItem {...item} />;
    // }
  }, []);

  const handleKeyExtractor = item => {
    return item.typing
      ? item.address
      : item.unixtime
      ? item.unixtime + item.type
      : item.chat + item.index;
  };

  const Separator = memo(() => {
    return <Spacer s={12} />;
  });

  return (
    <>
      <Pressable
        onPress={() => {
          setchat(prev => {
            const length = prev.length;
            const unixtime = prev[length - 1].unixtime + 1;
            return [
              {
                address: '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510',
                chat: length,
                unixtime: new Date().getTime(),
                type: 'me',
                img: '',
                read: 1,
              },
              ...prev,
            ];
          });
        }}>
        <Text>add</Text>
      </Pressable>
      <FlatList
        style={[styles.comp]}
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={160}
        data={[...typingArr, ...chat]}
        renderItem={renderItem}
        keyExtractor={handleKeyExtractor}
        inverted={true}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={20}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        ItemSeparatorComponent={Separator}
      />
    </>
  );
});

const RenderItem = memo(({item}) => {
  // const info = useRenderInfo(`ChatRoomList-${item.chat}`);

  console.log('RenderItem', item.chat);

  return <Text>{item.chat}</Text>;
});

const styles = StyleSheet.create({
  comp: {
    position: 'relative',
    // flex: 1,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 24,
  },
  contentContainer: {
    ...setPadding([16]),
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

const chatData = [
  {
    address: '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510',
    chat: '1',
    unixtime: 1694573501708,
    type: 'me',
    img: '',
    read: 1,
  },
  {
    address: '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510',
    chat: '2',
    unixtime: 1694573459401,
    type: 'me',
    img: '',
    read: 1,
  },
  {
    address: '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510',
    chat: '3',
    unixtime: 1694573370338,
    type: 'me',
    img: '',
    read: 1,
  },
  {
    address: '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510',
    chat: '4',
    unixtime: 1694573223525,
    type: 'me',
    img: '',
    read: 1,
  },
  {
    address: '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510',
    chat: '5',
    unixtime: 1694572836235,
    type: 'me',
    img: '',
    read: 1,
  },
  {
    address: '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510',
    chat: '6',
    unixtime: 1694572823970,
    type: 'me',
    img: '',
    read: 1,
  },
  {
    address: '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510',
    chat: '7',
    unixtime: 1694572811411,
    type: 'me',
    img: '',
    read: 1,
  },
  {
    address: '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510',
    chat: '8',
    unixtime: 1694572684931,
    type: 'me',
    img: '',
    read: 1,
  },
  {
    address: '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510',
    chat: '9',
    unixtime: 1694572650886,
    type: 'me',
    img: 13,
    read: 1,
  },
  {
    unixtime: 1694572650886,
    type: 'date',
  },
];

export default ChatListA;
