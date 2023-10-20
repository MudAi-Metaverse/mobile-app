import React, {useState, useEffect} from 'react';
import {
  Center,
  HStack,
  Box,
  VStack,
  Button,
  Image,
  View,
  Pressable,
  Text,
} from 'native-base';
import Typography from 'src/comp/Typography';
import {setPadding} from 'src/js/styles';
import {StyleSheet} from 'react-native';

type Props = {
  head: string;
  description: string;
};

const VerticalText = ({head, description}: Props) => {
  const [verticalTextLayout, setVerticalTextLayout] = useState();

  return (
    <Box
      style={[
        styles.verticalText,
        verticalTextLayout
          ? {
              transform: [
                {
                  translateY:
                    -verticalTextLayout.width / 2 +
                    verticalTextLayout.height / 2,
                },
                {
                  translateX:
                    -verticalTextLayout.width / 2 +
                    verticalTextLayout.height / 2,
                },
                {rotate: '-90deg'},
              ],
            }
          : {opacity: 0},
      ]}
      onLayout={e => {
        setVerticalTextLayout(e.nativeEvent.layout);
      }}>
      <Box style={styles.headContainer}>
        <Text style={styles.head}>{head}</Text>
        <Typography type={'p_main_eng'}>&copy; MudAi</Typography>
      </Box>
      <Typography type={'p_main_eng'}>{description}</Typography>
    </Box>
  );
};

const styles = StyleSheet.create({
  verticalText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    transform: [
      {translateY: -362 / 2 + 77 / 2},
      {translateX: -362 / 2 + 77 / 2},
      {rotate: '-90deg'},
    ],
    // 77,
    // 362
    color: '#ffffff',
  },
  headContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  head: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 32,
    lineHeight: 49,
  },
});

export default VerticalText;
