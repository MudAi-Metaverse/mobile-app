import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import {convertDayStr, formatDate} from 'src/js/functions';

type Props = {
  unixtime: number;
};

const ChatDate = (props: Props) => {
  const date = formatDate(false, props.unixtime);
  const today = formatDate(false, new Date().getTime());
  let text = '';

  if (`${date.y}/${date.m}/${date.d}` === `${today.y}/${today.m}/${today.d}`) {
    text = '今日';
  } else {
    text = `${date.m}/${date.d}(${convertDayStr(date.w)})`;
  }

  return (
    <Box bg="black" py="1" p="2" borderRadius={10}>
      <Text>{text}</Text>
    </Box>
  );
};

export default ChatDate;
