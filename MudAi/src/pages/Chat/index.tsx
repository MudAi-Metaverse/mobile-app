import React, {useState, useEffect, useRef} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import ChatWrapper from 'src/comp/ChatWrapper/ChatWrapper';
import useChat from 'src/pages/Chat/useChat';
import PersonalizeModal from 'src/pages/Chat/PersonalizeModal';
import FixedPhrase from 'src/pages/Chat/FixedPhrase';

const Chat = () => {
  const {
    list,
    addChat,
    listRef,
    onEndReached,
    hasNoResult,
    sethasNoResult,
    isLoading,
    addFixedPhrase,
  } = useChat();

  return (
    <ChatWrapper
      list={list}
      addChat={addChat}
      isLoading={isLoading}
      listRef={listRef}
      onEndReached={onEndReached}
      textAreaTopChildren={<FixedPhrase addFixedPhrase={addFixedPhrase} />}>
      <PersonalizeModal
        showModal={hasNoResult}
        sethasNoResult={sethasNoResult}
      />
    </ChatWrapper>
  );
};

export default Chat;
