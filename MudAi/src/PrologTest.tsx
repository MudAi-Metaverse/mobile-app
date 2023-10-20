import React, {useEffect, useMemo, useState} from 'react';
import {useAccount} from 'wagmi';
import {ethers} from 'ethers';
import {Box, Button, HStack, Text, VStack} from 'native-base';
import {fetcher} from './js/functions';
import {SafeAreaView} from 'react-native-safe-area-context';
import useConnectBtn from 'src/pages/Prolog/useConnectBtn';
import CustomButton from 'src/comp/CustomButton';
import Typography from 'src/comp/Typography';

const PrologTest = () => {
  const {label, onClick} = useConnectBtn();

  return (
    <SafeAreaView>
      {/* <VStack space="2">
        <Button onPress={onClick}>
          <Typography type="p_main_eng_bold">{label}</Typography>
        </Button>
        <Button onPress={getSinger}>signer</Button>
        <Button onPress={getProviderInfo}>provider info</Button>
        <Button onPress={getBalance}>balance</Button>

        {networkInfo && (
          <VStack space="2">
            <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
              networkInfo
            </Text>
            <Text style={{color: 'black'}}>chainId: {networkInfo.chainId}</Text>
            <Text style={{color: 'black'}}>name: {networkInfo.name}</Text>
            <Text style={{color: 'black'}}>
              ensAddress: {networkInfo.ensAddress}
            </Text>
          </VStack>
        )}

        <VStack space="4">
          {balances?.map((item, index) => {
            return (
              <Box key={`${item.name}-${item.index}`}>
                <Text style={{color: 'black'}}>name: {item.name}</Text>
                <Text style={{color: 'black'}}>
                  hex: {item.isZero ? '0' : item.ba._hex}
                </Text>
              </Box>
            );
          })}
        </VStack>
      </VStack> */}
    </SafeAreaView>
  );
};

export default PrologTest;
