import React, {useState, useEffect, useRef} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Input,
  Pressable,
} from 'native-base';
import {InterfaceBoxProps} from 'native-base/lib/typescript/components/primitives/Box';
import SvgClose from 'src/comp/svg/SvgClose';
import SvgSearch from 'src/comp/svg/SvgSearch';

type Props = InterfaceBoxProps & {
  onChangeText: (text: string) => void;
  searchText: string;
};

const SearchInput = (props: Props) => {
  const inputRef = useRef();

  return (
    <Box borderRadius={8} bg="#252525" px={3} py={'9px'}>
      <Input
        ref={inputRef}
        borderBottomWidth={0}
        InputLeftElement={
          <Box w="24px" h="24px">
            <SvgSearch />
          </Box>
        }
        InputRightElement={
          <>
            {props.searchText.length > 0 && (
              <Pressable
                onPress={() => {
                  props.onChangeText('');
                  inputRef.current.clear();
                }}
                w="24px"
                h="24px">
                <SvgClose color="#fff" />
              </Pressable>
            )}
          </>
        }
        onChangeText={text => {
          props.onChangeText(text);
        }}
      />
    </Box>
  );
};

export default SearchInput;
