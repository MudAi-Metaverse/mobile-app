import {
  Box,
  Container,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'native-base';
import React, {
  FormEvent,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
// import useAddClassBody from 'src/js/useAddClassBody';
import ChatItem, {ChatItemProps} from 'src/comp/ChatItem';
import ChatInput from 'src/comp/ChatInput';
// import useChatWrapper from 'src/template/Chat/ChatWrapper/useChatWrapper';
import {Platform, StyleSheet} from 'react-native';
import useChatWrapper from 'src/comp/ChatWrapper/useChatWrapper';
import {assets, bodyMaxWidth} from 'src/js/configView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {setPadding} from 'src/js/styles';
import Spacer from 'src/comp/Spacer';
import ChatDate from 'src/comp/ChatDate';
import CustomKeyBoardAvoidingView from 'src/comp/CustomKeyBoardAvoidingView';
import ChatGptInput from 'src/comp/ChatGptInput';
import ChatItemWrapperGpt from 'src/comp/ChatItemWrapperGpt';
import ChatItemGpt from 'src/comp/ChatItemGpt';

export type ChatProps = {
  list: ChatItemProps[];
  isLoading: boolean;
  addChat: (value: string) => void;
  onEndReached?: () => void;
  textAreaChildren?: React.ReactNode;
  textAreaTopChildren?: React.ReactNode;
  children?: React.ReactNode;
};

const ChatWrapper = (props: ChatProps) => {
  return (
    <Presenter
      addChat={props.addChat}
      list={props.list}
      onEndReached={props.onEndReached}
      isLoading={props.isLoading}
      textAreaChildren={props.textAreaChildren}
      textAreaTopChildren={props.textAreaTopChildren}>
      {props.children}
    </Presenter>
  );
};

const Presenter = props => {
  // useAddClassBody(['chatBody']);
  // const {inputHeight, textareaRef} = useChatWrapper();
  const insets = useSafeAreaInsets();

  const renderItem = ({item}) => {
    return (
      <>
        {item.type === 'date' ? (
          <Container mx="auto">
            <ChatDate unixtime={item.unixtime} />
          </Container>
        ) : (
          <ChatItemGpt key={item.unixtime} {...item} />
        )}
      </>
    );
  };

  const handleKeyExtractor = (item, index) => {
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
    <Box w="100%" h="100%" bg="#000">
      {props.children}
      <Box position="absolute" top="0" right="0" left="0" bottom="0">
        <Image
          w="100%"
          minH="100%"
          source={assets.ai_2}
          alt="chat bg"
          resizeMode="cover"
        />
      </Box>

      <CustomKeyBoardAvoidingView>
        <FlatList
          style={[styles.comp]}
          contentContainerStyle={styles.contentContainer}
          scrollEventThrottle={160}
          data={props.list}
          renderItem={renderItem}
          keyExtractor={handleKeyExtractor}
          inverted={true}
          onEndReached={props.onEndReached}
          onEndReachedThreshold={0.3}
          initialNumToRender={20}
          // onContentSizeChange={props.onContentSizeChange}
          // onMomentumScrollEnd={props.onMomentumScrollEnd}

          ItemSeparatorComponent={Separator}
        />

        <View
          style={[
            styles.chatInput,
            {bottom: insets.bottom ? insets.bottom / 3 : 16},
          ]}>
          {props.textAreaTopChildren || <></>}
          {props.textAreaChildren || (
            <ChatGptInput
              onSubmit={(value: string) => {
                props.addChat(value);
              }}
              isLoading={props.isLoading}
            />
          )}
        </View>
      </CustomKeyBoardAvoidingView>
    </Box>
  );
};

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
  },

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

  loadingChat: {
    // position: 'fixed',
    top: 8,
    left: 0,
    zIndex: 99999,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },

  bgImg: {
    // position: 'fixed',
    top: 0,
    minHeight: '100%',
    width: '100%',
    zIndex: 1,
    objectFit: 'cover',
    right: '50%',
    // transform: [{translateX: '50%'}],
    maxWidth: bodyMaxWidth,
  },

  stackContainer: {
    position: 'relative',
    height: '100%',
    flex: 1,
    paddingBottom: 52,
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingHorizontal: 12,
    // scrollbarWidth: 'none',
  },

  me: {
    alignSelf: 'flex-end',
  },

  chatInput: {
    // position: 'absolute',
    // bottom: 16,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 'auto',
    maxWidth: bodyMaxWidth,
    paddingHorizontal: 12,
    zIndex: 999,
  },

  chatInputWrap: {
    paddingHorizontal: 13,
  },

  choiceWrap: {
    paddingHorizontal: 13,
  },

  choice: {
    alignSelf: 'flex-start',
  },
});

export default ChatWrapper;
