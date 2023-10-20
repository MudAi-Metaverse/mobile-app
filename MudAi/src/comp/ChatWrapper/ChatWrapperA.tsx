import {Box, Image} from 'native-base';
import React from 'react';
// import useAddClassBody from 'src/js/useAddClassBody';
// import useChatWrapper from 'src/template/Chat/ChatWrapper/useChatWrapper';
import {assets} from 'src/js/configView';
import CustomKeyBoardAvoidingView from 'src/comp/CustomKeyBoardAvoidingView';

export type ChatProps = {
  children: React.ReactNode;
};

const ChatWrapperA = (props: ChatProps) => {
  return <Presenter>{props.children}</Presenter>;
};

const Presenter = props => {
  return (
    <Box w="100%" h="100%" bg="#000">
      <Box position="absolute" top="0" right="0" left="0" bottom="0">
        <Image
          w="100%"
          minH="100%"
          source={assets.ai_2}
          alt="chat bg"
          resizeMode="cover"
        />
      </Box>

      <CustomKeyBoardAvoidingView>{props.children}</CustomKeyBoardAvoidingView>
    </Box>
  );
};

export default ChatWrapperA;
