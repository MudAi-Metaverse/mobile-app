import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button, Slide} from 'native-base';
import usePersonalized from 'src/pages/Personalized/usePersonalized';
import ChatWrapper from 'src/comp/ChatWrapper/ChatWrapper';
import Alert from 'src/comp/Alert';
import CompleteModal from 'src/pages/Personalized/CompleteModal';
import {useNavigation} from '@react-navigation/native';
import Choice from 'src/comp/Choice';

const Personalized = () => {
  const navigation = useNavigation();
  const {
    list,
    addChat,
    onEndReached,
    showAlert,
    showCompleteModal,
    setshowCompleteModal,
    isLoading,
    answerNum,
  } = usePersonalized();

  return (
    <ChatWrapper
      list={list}
      addChat={addChat}
      onEndReached={onEndReached}
      isLoading={isLoading}
      listRef={undefined}
      textAreaTopChildren={
        <>
          {answerNum > 0 && (
            <Choice
              mode="grade"
              text="start personalizing"
              className={{alignSelf: 'flex-start'}}
              onPress={() => {
                navigation.navigate('Personalizing');
              }}
            />
          )}
        </>
      }>
      <>
        <Slide in={showAlert} placement="top">
          <Alert text={'Ai chat’s Level up!!!'} />
        </Slide>
        <CompleteModal
          showModal={showCompleteModal}
          setShowModal={setshowCompleteModal}
        />
      </>
    </ChatWrapper>
  );
};

export default Personalized;
