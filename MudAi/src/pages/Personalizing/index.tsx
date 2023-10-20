import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import WebView from 'react-native-webview';
import CustomButton from 'src/comp/CustomButton';
import Typography from 'src/comp/Typography';
import {useNavigation} from '@react-navigation/native';
import {fetcher} from 'src/js/functions';
import Loading from 'src/pages/Personalizing/Loading';
import {StyleSheet} from 'react-native';
import {Config} from 'src/js/Config';
import GradientWrapper from 'src/comp/GradientWrapper';
import {useAccount} from 'wagmi';
import {langAtom} from 'src/recoil';
import {useRecoilValue} from 'recoil';

const Personalizing = () => {
  const navigation = useNavigation();
  const {address} = useAccount();

  // const address = '0x440d894fbcd91c6993377b6d238e0e7597eca672';
  const [loading, setloading] = useState(true);
  const [isAnimend, setisAnimend] = useState(false);
  const lang = useRecoilValue(langAtom);

  useEffect(() => {
    if (address) {
      const body = {
        uid: address,
        language: lang,
      };

      fetcher(Config.PERSONALIZE_ENDPOINT, body).then(res => {
        console.log(res);
        setloading(false);
      });
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      setTimeout(() => {
        setloading(false);
      }, 1000);
    }
  }, [address]);

  const onClick = () => {
    if (isAnimend) {
      navigation.navigate('ChatHome');
    }
  };

  return (
    <Box style={styles.comp}>
      <Loading stopAnim={!loading} setisAnimend={setisAnimend} />

      <CustomButton style={styles.btn} mode={'primary'} onPress={onClick}>
        <Typography type="p_main_eng_bold">
          {!isAnimend ? 'personalizing ...' : 'talk with MudAi'}
        </Typography>
      </CustomButton>
    </Box>
  );
};

const styles = StyleSheet.create({
  comp: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 34,
    backgroundColor: '#060520',
    overflowX: 'hidden',
  },
  btn: {
    width: 319,
  },
});

export default Personalizing;
