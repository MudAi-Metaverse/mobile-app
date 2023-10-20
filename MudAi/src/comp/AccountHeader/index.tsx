import React, {useState, useEffect} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Image,
  Stack,
} from 'native-base';
import AspectBox from 'src/comp/AspectBox';
import Typography from 'src/comp/Typography';
import {assets} from 'src/js/configView';

type Props = {
  img: string;
  name: string;
  info: string;
};

const AccountHeader = (props: Props) => {
  return (
    <VStack alignItems={'center'} space={'10px'}>
      <AspectBox ratio={1} w="80px">
        <Image
          w="100%"
          h="100%"
          borderRadius="full"
          source={props.img ? {uri: props.img} : assets.no_image}
          alt={props.img}
        />
      </AspectBox>
      <VStack space="1" alignItems={'center'} mb="7">
        <Text fontSize="lg" fontWeight="800" fontFamily="Inter">
          {props?.name}
        </Text>
        <Typography type="p_cap_eng" color="#565656">
          {props?.info}
        </Typography>
      </VStack>
    </VStack>
  );
};

export default AccountHeader;
