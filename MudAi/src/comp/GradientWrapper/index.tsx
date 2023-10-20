import React, {useState, useEffect} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  ScrollView,
  FlatList,
} from 'native-base';

type Props = {
  children: React.ReactNode;
};

const GradientWrapper = (props: Props) => {
  return (
    <Box
      bg={{
        linearGradient: {
          colors: ['#3d255a', '#191333', '#241a3d', '#201739'],
          start: [0, 0],
          end: [0, 1],
        },
      }}
      flex={1}>
      <VirtualizedList>{props.children}</VirtualizedList>
    </Box>
  );
};

// https://stackoverflow.com/questions/58243680/react-native-another-virtualizedlist-backed-container
const VirtualizedList = ({children}) => {
  return (
    <FlatList
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      bounces={false}
      data={[]}
      keyExtractor={() => 'key'}
      renderItem={null}
      ListHeaderComponent={<>{children}</>}
    />
  );
};
export default GradientWrapper;
