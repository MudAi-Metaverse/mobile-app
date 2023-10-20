import React, {useState, useEffect, memo, useCallback} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Pressable,
  FlatList,
} from 'native-base';
import Spacer from 'src/comp/Spacer';
import {listHeightAtomFamily} from 'src/recoil';
import {useSetRecoilState} from 'recoil';

type Props = {
  data: any[];
  listName: string;
  renderItem: ({item}) => JSX.Element;
  handleKeyExtractor: () => string;
};

const ChatIndexList = (props: Props) => {
  const setListHeightAtomFamily = useSetRecoilState(
    listHeightAtomFamily(props.listName),
  );
  const Separator = useCallback(() => {
    return <Spacer s={8} />;
  }, []);

  return (
    <FlatList
      scrollEnabled={false}
      data={props.data}
      renderItem={props.renderItem}
      keyExtractor={props.handleKeyExtractor}
      initialNumToRender={10}
      ItemSeparatorComponent={Separator}
      onContentSizeChange={(width, height) => {
        setListHeightAtomFamily(height);
      }}
    />
  );
};

export default ChatIndexList;
