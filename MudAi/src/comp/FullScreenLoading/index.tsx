import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import {ActivityIndicator, Modal, View} from 'react-native';

type Props = {
  isLoading: boolean;
};

const FullScreenLoading = (props: Props) => {
  return (
    <Modal visible={props.isLoading} transparent={true}>
      <Center
        style={{
          backgroundColor: 'rgba(0,0,0, 0.3)',
          width: '100%',
          height: '100%',
        }}>
        <ActivityIndicator size="large" color="#fff" />
      </Center>
    </Modal>
  );
};

export default FullScreenLoading;
