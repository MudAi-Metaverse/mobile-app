import {useRenderInfo} from '@uidotdev/usehooks';
import React, {memo} from 'react';
import {useWindowDimensions} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import ChatItemWrapper from 'src/comp/ChatItemWrapper';
import Typography from 'src/comp/Typography';
import {CreateResponsiveStyle} from 'src/js/functions';

export type ChatItemProps = {
  type: 'other' | 'me';
  chat: string;
  img?: string;
  typing?: boolean;
  read: boolean;
  unixtime?: number;
};

const ChatItem = memo((props: ChatItemProps) => {
  const layout = useWindowDimensions();
  const styles = responsiveStyle(layout);
  // const info = useRenderInfo(`ChatItem-${props.chat}`);

  return (
    <ChatItemWrapper {...props}>
      {props.typing ? (
        <DotIndicator color={'#A0AEC0'} size={5} count={3} />
      ) : (
        <Typography type="p_sub" style={styles('chat')}>
          {props.chat}
        </Typography>
      )}
    </ChatItemWrapper>
  );
});

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

    img: {
      width: imgWidth,
      height: imgWidth,
      objectFit: 'cover',
      borderRadius: 16,
      alignSelf: 'flex-end',
    },

    chatWrap: {
      maxWidth: 275,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 16,
      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 2,
      //   height: 2,
      // },
      // shadowOpacity: 0.05,
      // shadowRadius: 4,
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
export default ChatItem;
