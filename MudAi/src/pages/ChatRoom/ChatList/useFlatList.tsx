import {useRoute} from '@react-navigation/native';
import {Container} from 'native-base';
import React, {memo, useCallback, useRef} from 'react';
import {useSetRecoilState} from 'recoil';
import {viewableItemsAtom} from 'src/recoil';
import {getDbFromA} from 'src/js/firebase';
import ChatDate from 'src/comp/ChatDate';
import ChatItemImg from 'src/comp/ChatItemImg';
import ChatItemVideo from 'src/comp/ChatItemVideo';
import Spacer from 'src/comp/Spacer';
import ChatItem from 'src/comp/ChatItem';
import {fetchLimit} from 'src/pages/ChatRoom/functionsChatRoom';

const useFlatList = chatRawdata => {
  const route = useRoute();
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
    if (onEndReachedRef.current || chatRawdata.length < fetchLimit) {
      return;
    }
    onEndReachedRef.current = true;

    if (chatRawdata.length === 0 || chatRawdata.length < fetchLimit) {
      return;
    }
    const path = `chatRoom/${route.params.id}/chats`;
    getDbFromA(
      path,
      String(chatRawdata[chatRawdata.length - 1]?.unixtime - 1),
      'before',
      fetchLimit,
    ).then(res => {
      if (Object.keys(res).length > 0) {
        setchatRawdata(prev => [...prev, ...sortFetchResult(res)]);
      }
      onEndReachedRef.current = false;
    });
  }, [chatRawdata]);

  const renderItem = useCallback(({item}) => {
    if (item.type === 'date') {
      return (
        <Container mx="auto">
          <ChatDate unixtime={item.unixtime} />
        </Container>
      );
    } else if (item.mode === 'img') {
      return <ChatItemImg {...item} />;
    } else if (item.mode === 'video') {
      return <ChatItemVideo {...item} />;
    } else {
      return <ChatItem {...item} />;
    }
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

  return {
    viewabilityConfigCallbackPairs,
    onEndReached,
    renderItem,
    handleKeyExtractor,
    Separator,
  };
};

export default useFlatList;
