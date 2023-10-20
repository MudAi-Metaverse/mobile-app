import React, {useState, useEffect, useRef} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  FormControl,
  Pressable,
  Select,
  Stack,
  Divider,
} from 'native-base';

import Typography from 'src/comp/Typography';
import SelectWrapper from 'src/comp/SelectWrapper';
import LabelBlock from 'src/comp/LabelBlock';
import {userStoreAtom} from 'src/recoil';
import {useRecoilValue} from 'recoil';

type Props = {};

const AccountForm = (props: Props) => {
  const userStore = useRecoilValue(userStoreAtom);

  return (
    <Stack
      space="4"
      divider={<Divider bg="rgba(207, 219, 213, 0.15)" mb="4" />}>
      <LabelBlock label={'name'}>
        <Typography type="p_main_eng_bold">{userStore?.name}</Typography>
      </LabelBlock>
      <LabelBlock label={'twitter'}>
        <Typography type="p_main_eng_bold">{userStore?.twitterId}</Typography>
      </LabelBlock>
      <LabelBlock label={'instagram'}>
        <Typography type="p_main_eng_bold">{userStore?.instagramId}</Typography>
      </LabelBlock>
    </Stack>
  );
};

export default AccountForm;
