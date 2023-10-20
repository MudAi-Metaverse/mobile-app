import {useFocusEffect} from '@react-navigation/native';
import {Box, HStack, Text} from 'native-base';
import React, {useCallback} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import CustomButton from 'src/comp/CustomButton';
import GradientWrapper from 'src/comp/GradientWrapper';
import Typography from 'src/comp/Typography';
import ProfileMedia from 'src/pages/Prolog/ProfileMedia';
import PrologHero from 'src/pages/Prolog/PrologHero';
import SelectLang from 'src/pages/Prolog/SelectLang';
import useConnectBtn from 'src/pages/Prolog/useConnectBtn';
import {chatTabbarHiddenAtom, langAtom, modeAtom} from 'src/recoil';
import {useAccount} from 'wagmi';

const Prolog = ({navigation}) => {
  const [lang, setlang] = useRecoilState(langAtom);
  const {address} = useAccount();
  const setChatTabbarHidden = useSetRecoilState(chatTabbarHiddenAtom);

  useFocusEffect(
    useCallback(() => {
      if (!address) {
        setChatTabbarHidden(true);

        return () => {
          setChatTabbarHidden(false);
        };
      }
    }, [address]),
  );

  return (
    <GradientWrapper>
      <Box bg="#060520" pb="60">
        <Box mb="5">
          <PrologHero />
        </Box>
        <ProfileMedia />

        <Box mb="6">
          <LoginBtns />
        </Box>

        <SelectLang
          value={String(lang)}
          onChange={value => {
            setlang(value);
          }}
        />
      </Box>
    </GradientWrapper>
  );
};

const LoginBtns = () => {
  const [mode, setmode] = useRecoilState(modeAtom);
  const {label, onClick} = useConnectBtn();

  return (
    <HStack space="3" px="5">
      <Box>
        <CustomButton
          mode="purple"
          wrapperProps={{
            flex: 1,
          }}
          onPress={onClick}>
          <Typography type="p_main_eng_bold">{label}</Typography>
        </CustomButton>
      </Box>

      <CustomButton
        mode="border"
        wrapperProps={{
          flex: 1,
        }}
        onPress={() => {
          setmode(prev => (prev === 'A' ? 'B' : 'A'));
        }}>
        <Text fontFamily={'Poppins'} fontWeight={700} fontSize="md">
          Mode {mode}
        </Text>
      </CustomButton>
    </HStack>
  );
};

export default Prolog;
