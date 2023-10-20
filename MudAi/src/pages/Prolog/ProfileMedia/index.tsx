import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';

type Props = {};

const ProfileMedia = (props: Props) => {
  return (
    <Box>
      <VStack space="4" mb={10} px="3" mb="10">
        <Text fontSize={42} fontFamily={'Roboto'} fontWeight={700}>
          {'Create your\nMudAi Profile'}
        </Text>
        <Text
          fontSize={'md'}
          fontFamily={'Roboto'}
          fontWeight={500}
          opacity={0.7}>
          Customize and get your own exclusive MudAi avatar, minted on the
          blockchain as an NFT.
        </Text>
      </VStack>
    </Box>
  );
};

export default ProfileMedia;
