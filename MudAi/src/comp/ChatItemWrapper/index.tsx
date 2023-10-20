import React, {useRef} from 'react';
import {Platform, useWindowDimensions} from 'react-native';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import SvgDoubleCheck from 'src/comp/svg/SvgDoubleCheck';
import {CreateResponsiveStyle, countDigits, formatDate} from 'src/js/functions';
import {assets} from 'src/js/configView';
import {roomAddressesAtom, userProfileAtom} from 'src/recoil';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {getUserDetailArr} from 'src/pages/ChatRoom/functionsChatRoom';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useRenderInfo} from '@uidotdev/usehooks';

export type Props = {
  type: 'other' | 'me';
  chat: string;
  img?: string;
  typing?: boolean;
  read: boolean;
  unixtime?: number;
  children: React.ReactNode;
};

const ChatItemWrapper = (props: Props) => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const styles = responsiveStyle(layout);
  const multiply = countDigits(props.unixtime) === 13 ? 1 : 1000;
  const setUserProfile = useSetRecoilState(userProfileAtom);
  // const info = useRenderInfo('ChatItemWrapper');

  const date = useRef(
    formatDate(
      true,
      props.unixtime ? new Date(props.unixtime * multiply) : new Date(),
    ),
  );

  const gradientObj =
    props.type === 'me'
      ? {
          colors: ['#3c3559', '#3e3a506b'],
          locations: [0.24, 1],
          start: {x: -0.5, y: 0},
          end: {x: 1.14, y: 0},
        }
      : {
          colors: ['#2a283a', '#16141f99'],
          locations: [0.24, 1],
          start: {x: 1, y: 0},
          end: {x: -0.5, y: 1},
        };

  return (
    <HStack
      space="6px"
      style={[styles('comp'), props.type === 'me' && {alignSelf: 'flex-end'}]}>
      <Box style={styles('top')} alignSelf={'flex-start'}>
        {props.type === 'other' && (
          <Box style={[styles('imgWrap')]}>
            {props.img && (
              <Pressable
                onPress={async () => {
                  const user = await getUserDetailArr([props.address]);
                  setUserProfile(user[0]);
                  navigation.push('ChatUserProfile');
                }}>
                <FastImage
                  style={[styles('img')]}
                  source={props.img}
                  fallback={Platform.OS === 'android'}
                  alt="mudai"
                  resizeMode={FastImage.resizeMode.cover}
                />
              </Pressable>
            )}
          </Box>
        )}
      </Box>

      <Box overflow={'hidden'} borderRadius={16} style={styles(props.type)}>
        <LinearGradient
          {...gradientObj}
          style={[
            styles('chatWrap'),
            styles(props.type),
            {paddingTop: props.mode ? 16 : 8},
          ]}>
          {props.children}
          {!props.typing && (
            <HStack style={[styles('footer')]}>
              <Text style={[styles('time')]}>
                {date.current.hh}:{date.current.mm}
              </Text>
              {props.type === 'me' && props.read > 0 && (
                <ReadMark read={props.read} />
              )}
            </HStack>
          )}
        </LinearGradient>
      </Box>
    </HStack>
  );
};

const ReadMark = props => {
  const route = useRoute();
  const layout = useWindowDimensions();
  const styles = responsiveStyle(layout);
  const roomAddressArr = useRecoilValue(roomAddressesAtom);
  console.log(props);

  const usersNum =
    roomAddressArr?.length !== 0
      ? roomAddressArr.length
      : Object.keys(route.params?.users).length;

  return (
    <>
      {usersNum === 2 ? (
        <Box style={styles('read')}>
          <SvgDoubleCheck />
        </Box>
      ) : (
        <Text style={[styles('time')]}>Read {props.read}</Text>
      )}
    </>
  );
};

const imgWidth = 46;
const tbStyle = {};
const responsiveStyle = CreateResponsiveStyle(
  //sp
  {
    comp: {},
    l_Badge: {
      marginRight: 4,
    },
    top: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 4,
    },

    imgWrap: {
      width: imgWidth,
      height: imgWidth,
    },

    img: {
      width: imgWidth,
      height: imgWidth,
      borderRadius: 16,
      alignSelf: 'flex-end',
      marginBottom: 8,
    },

    chatWrap: {
      maxWidth: 275,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 16,
      elevation: 1,
    },

    me: {
      borderBottomRightRadius: 0,
    },

    other: {
      borderBottomLeftRadius: 0,
    },

    chat: {
      fontSize: 14,
      lineHeight: 21,
    },

    time: {
      alignSelf: 'flex-start',
      // fontFamily: 'ReadexPro',
      fontWeight: '400',
      fontSize: 8,
      lineHeight: 16,
      letterSpacing: -0.383333,
      color: '#f3f3f5',
    },

    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 1,
    },

    read: {
      width: 10,
      height: 5.5,
      lineHeight: 0,
    },
  },
  //tbe
  {...tbStyle},
  //pc
  {...tbStyle},
);

export default ChatItemWrapper;
