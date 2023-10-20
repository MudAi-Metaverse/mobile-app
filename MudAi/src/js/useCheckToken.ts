// checkBuild("条件分岐変更");
import {useEffect, useState} from 'react';
import {useAccount, useConnect, useDisconnect} from 'wagmi';
import {useContractBalances} from './useContractBalances';
import {Alert} from 'react-native';
import {fetcher} from './functions';
import {useResetRecoilState, useSetRecoilState} from 'recoil';
import {hasTokenAtom} from 'src/recoil';
import {Config} from 'src/js/Config';

export const useCheckToken = () => {
  const {address, isConnected, status} = useAccount();
  const {disconnect} = useDisconnect();
  const [targetContracts, settargetContracts] = useState([]);
  const {contracts} = useContractBalances(targetContracts);
  const sethasToken = useSetRecoilState(hasTokenAtom);
  const resethasToken = useResetRecoilState(hasTokenAtom);

  useEffect(() => {
    fetcher(Config.GET_CONTRACT_ENDPOINT, {})
      .then(res => {
        return res.json();
      })
      .then(res => {
        settargetContracts(res);
      });
  }, []);

  useEffect(() => {
    // disconenctしたらhasTokenをリセット
    if (!isConnected) {
      resethasToken();
    }
  }, [isConnected]);

  useEffect(() => {
    const loadContracts = contracts?.some(item => item.status === 'success');
    console.log(address);

    if (status === 'disconnected') {
      sethasToken(false);
    } else if (status === 'connected' && loadContracts) {
      console.log('contracts', {status});

      // ログインしてる時だけ発火
      if (contracts?.some(item => item.result > 0)) {
        // トークンあり
        sethasToken(true);
      } else {
        // トークンなし

        // デバッグ用
        if (devWallet.includes(address)) {
          console.log('devWallet', address);
          sethasToken(true);
          return;
        }

        disconnect();
        Alert.alert("you don't have required tokens");
      }
    }
  }, [status, contracts]);
};

const devWallet = [
  '0x4358c14784BEE69E3939A289f9Cb5Bde2a899B42', // uni-swap
  '0x69125744332751A6490Fa72Ad331cB0e754B9213',
  '0xcF53F7eCf8D500Be06e992CDfFC258B81784485B', // rainbow
  '0xdEEfB20a093261eD2716cb8AE8208B138395Ae77', // uni-swap-8
  '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510', // metamask
  '0x40e752e493a6eC22cD5eD52BC8cC5527E3F8d111', // metamask-8
  '0x4bab806c7dB271F900B3454139cFB9B58445D38E', // android-trust
];
