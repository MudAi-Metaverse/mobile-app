import {fetcher} from 'src/js/functions';
import {useEffect, useMemo, useState} from 'react';
import {hasTokenAtom, langAtom} from 'src/recoil';
import {useRecoilValue} from 'recoil';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Config} from 'src/js/Config';
import {Alert} from 'react-native';
import {BigNumber, ethers} from 'ethers';
import {useWeb3Modal} from '@web3modal/wagmi-react-native';
import {useAccount, useDisconnect} from 'wagmi';

const useConnectBtn = () => {
  const [loading, setLoading] = useState(false);
  const {isConnected, address} = useAccount();
  const {disconnect} = useDisconnect();
  const {open} = useWeb3Modal();
  const lang = useRecoilValue(langAtom);
  const navigation = useNavigation();
  const label = isConnected ? 'Disconnect' : 'Login';
  const hasToken = useRecoilValue(hasTokenAtom);

  // ログイン後の遷移
  useEffect(() => {
    if (hasToken && isConnected) {
      navigation.navigate('Index');
      registerUserLang(lang);
      // resetHomeTab();
    }
  }, [isConnected, hasToken]);

  function onClick() {
    // if (process.env.NODE_ENV === 'development') {
    //   navigation.navigate('Index');
    //   registerUserLang(lang);
    //   return;
    // }

    if (isConnected) {
      return disconnect();
    } else {
      try {
        open();
      } catch (e) {
        Alert.alert('Error', e.message);
      }
    }
  }

  const registerUserLang = lang => {
    return fetcher(Config.CREATE_USER_ENDPOINT, {
      uid: address,
      language: lang,
    }).then(res => {});
  };

  return {
    label,
    onClick,
    loading,
    address,
    registerUserLang,
  };
};

export default useConnectBtn;
