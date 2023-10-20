import React, {useState, useEffect, useRef} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Stack,
  Divider,
  Pressable,
} from 'native-base';
import LabelBlock from 'src/comp/LabelBlock';
import {Animated, LayoutRectangle} from 'react-native';
import CustomSwitch from 'src/comp/CustomSwitch';

type Props = {};

const data = [
  {
    label: 'Product updates',
    text: 'Receive messages from platform',
  },
  {
    label: 'Reminders',
    text: 'Receive booking reminders',
  },
  {
    label: 'Promotions and tips',
    text: 'Receive coupons, promotions',
  },
  {
    label: 'Policy and community',
    text: 'Receive updates on job regulations',
  },
  {
    label: 'Account support',
    text: 'Receive messages about',
  },
  {
    label: 'Reminders',
    text: 'Upcoming payments',
  },
  {
    label: 'Policy and community',
    text: 'Receive updates on regulations',
  },
];

const AccountSettingForm = (props: Props) => {
  const [form, setform] = useState({});

  return (
    <Stack
      // space="4"
      direction={'column'}
      divider={<Divider bg="rgba(207, 219, 213, 0.15)" mb="4" />}>
      {data.map((item, index) => {
        return (
          <LabelBlock key={item.text} label={'Product updates'}>
            <Row text={item.text} setform={setform} />
          </LabelBlock>
        );
      })}
    </Stack>
  );
};

type PropsRow = {
  text: string;
  setform: React.Dispatch<React.SetStateAction<any>>;
};

const Row = (props: PropsRow) => {
  return (
    <HStack space="2" justifyContent={'space-between'} pb="4">
      <Text fontSize={'md'} fontFamily={'Inter'} fontWeight={'700'}>
        {props.text}
      </Text>
      <CustomSwitch setFunc={checked => {}} />
    </HStack>
  );
};

export default AccountSettingForm;
