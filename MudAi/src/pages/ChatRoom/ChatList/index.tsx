import {useRoute} from '@react-navigation/native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';
import useAppState from 'src/js/useAppState';
import {setPadding} from 'src/js/styles';
import {allOffListenDb} from 'src/pages/ChatRoom/functionsChatRoom';
import useFlatList from 'src/pages/ChatRoom/ChatList/useFlatList';
import useTokens from 'src/pages/ChatRoom/ChatList/useTokens';
import useCreateChat from 'src/pages/ChatRoom/ChatList/useCreateChat';
import useTyping from 'src/pages/ChatRoom/ChatList/useTyping';
import {useRecoilCallback, useResetRecoilState} from 'recoil';
import {androidOpenPickerAtom} from 'src/recoil';

type Props = {
  tokensRef: string[];
};

export const fetchLimit = 20;

const ChatList = memo((props: Props) => {
  // const info = useRenderInfo('ChatRoomList');
  const route = useRoute();
  const updateBadgeRef = useRef(true);
  const [initialized, setinitialized] = useState(false);

  const {appStateVisible} = useAppState();
  const {otherUsersStoreInfo, otherUsers} = useTokens(props.tokensRef);
  const {chatRawdata, chat, getUserImg} = useCreateChat(
    otherUsersStoreInfo,
    otherUsers,
    updateBadgeRef,
    initialized,
  );
  const {
    viewabilityConfigCallbackPairs,
    onEndReached,
    renderItem,
    handleKeyExtractor,
    Separator,
  } = useFlatList(chatRawdata);
  const {typingArr} = useTyping(getUserImg, chat);
  const getAndroidOpenPicker = useRecoilCallback(({snapshot}) => async () => {
    const result = await snapshot.getPromise(androidOpenPickerAtom);
    return result;
  });
  const resetMyRecoilValue = useResetRecoilState(androidOpenPickerAtom);

  // アプリがバックグラウンドになった時にリッスンが続くので、リッスンを解除する
  useEffect(() => {
    const main = async () => {
      if (Platform.OS === 'android') {
        const isOpenPicker = await getAndroidOpenPicker();
        console.log('appStateVisible', appStateVisible, isOpenPicker);

        if (isOpenPicker) {
          resetMyRecoilValue();
          return;
        }
      }

      if (appStateVisible !== 'active') {
        setinitialized(false);
        allOffListenDb(route);
        updateBadgeRef.current = true;
      } else {
        setinitialized(true);
      }
    };

    main();
  }, [appStateVisible]);

  return (
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
  );
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

export default ChatList;
