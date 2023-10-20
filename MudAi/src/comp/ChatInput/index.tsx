import {Box, HStack, ScrollView} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Text, View, Image, Pressable} from 'native-base';
import {useWindowDimensions, TextInput, Platform, Alert} from 'react-native';

import {assets} from 'src/js/configView';
import {CreateResponsiveStyle} from 'src/js/functions';
import {setPadding} from 'src/js/styles';
import ChatInputTools from 'src/comp/ChatInputTools';

type Props = {
  onSubmit: (value: string) => void;
  onInput?: (e) => void;
  isLoading: boolean;
};

const ChatInput = (props: Props) => {
  const layout = useWindowDimensions();
  const styles = responsiveStyle(layout);
  const [value, setvalue] = useState('');
  const [editable, seteditable] = useState(true);

  useEffect(() => {
    if (!props.isLoading) {
      seteditable(true);
    }
  }, [props.isLoading]);

  const onSubmit = _value => {
    if (_value.length === 0) {
      return;
    }
    // console.log('submit');
    setvalue('');

    if (props.isLoading) {
      setvalue('');
      seteditable(false);
      return;
    } else {
      setvalue('');
    }

    props.onSubmit(_value);
  };

  return (
    <HStack alignItems={'center'} space="2">
      <ChatInputTools />

      <View
        style={[styles('comp'), props.isLoading ? {opacity: 0.5} : {}]}
        // contentContainerStyle={styles('contentContainer')}
        // keyboardShouldPersistTaps={'handled'}
        // bounces={false}
        // // keyboardDismissMode={'interactive'}
        // horizontal
      >
        <TextInput
          multiline={true}
          placeholder="Type your comment"
          placeholderTextColor={'#72787d'}
          style={styles('input')}
          value={value}
          onChange={e => {
            if (props.isLoading) {
              setvalue('');
            } else {
              setvalue(e.nativeEvent.text);
            }
          }}
          onChangeText={value => {
            if (props.onInput) {
              props.onInput(value);
            }
          }}
          editable={editable}
        />

        <Pressable
          style={styles('svg')}
          onPress={() => {
            if (!props.isLoading) {
              onSubmit(value);
            }
          }}>
          <Image w="20px" h="20px" source={assets.send} alt="send" />
        </Pressable>
      </View>
    </HStack>
  );
};

const tbStyle = {};
const responsiveStyle = CreateResponsiveStyle(
  //sp
  {
    comp: {
      flexDirection: 'row',
      flex: 1,
      // width: '100%',
      // ...setPadding([10, 17, 12, 17]),
      // paddingHorizontal: 17,
      // paddingTop: Platform.OS === 'android' ? 2 : 10,
      // paddingBottom: Platform.OS === 'android' ? 2 : 12,

      backgroundColor: '#fff',
      borderRadius: Platform.OS === 'android' ? 50 : 20,
    },
    contentContainer: {
      width: '100%',
      alignItems: 'center',

      // backgroundColor: 'red',
    },
    input: {
      flex: 1,
      fontFamily: 'Poppins',
      color: '#72787d',
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 15,
      maxHeight: 15 * 10,
      paddingLeft: 17,
      paddingTop: Platform.OS === 'android' ? 12 : 15,
      paddingBottom: Platform.OS === 'android' ? 12 : 15,
      // backgroundColor: 'red',
    },
    svg: {
      // backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8.5,
      flexShrink: 0,
    },
  },
  //tb
  {...tbStyle},
  //pc
  {...tbStyle},
);
export default ChatInput;
