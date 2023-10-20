import React, {useState, useEffect, useCallback} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import GradientWrapper from 'src/comp/GradientWrapper';
import {useAccount} from 'wagmi';
import {Config} from 'src/js/Config';
import {fetcher} from 'src/js/functions';
import Answer, {AnswerProps} from 'src/pages/Setting/Answer';
import Typography from 'src/comp/Typography';
import CustomButton from 'src/comp/CustomButton';
import {assets} from 'src/js/configView';
import {StyleSheet, Alert} from 'react-native';
import Card from 'src/comp/Card';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDisconnect} from 'wagmi';
import FullScreenLoading from 'src/comp/FullScreenLoading';

const Setting = () => {
  const [answers, setanswers] = useState<AnswerProps[]>();
  const [level, setlevel] = useState<number>(0);
  const {isConnected, address} = useAccount();
  const {disconnect} = useDisconnect();
  const navigation = useNavigation();
  const [showAlert, setshowAlert] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  // const {
  //   showAlert,
  //   setshowAlert,
  //   autoFadeOut,
  //   handleMouseDown,
  //   handleMouseMove,
  //   handleMouseUp,
  //   moveY,
  // } = useAlert();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setisLoading(false);
      };
    }, []),
  );

  useEffect(() => {
    if (!isConnected) {
      navigation.navigate('Prolog');
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (address) {
      fetcher(Config.GET_LEVEL_ENDPOINT, {
        uid: address,
      })
        .then(res => res.json())
        .then(res => {
          setlevel(res.result);
        });
    }
  }, [address]);

  useEffect(() => {
    fetcher(Config.GET_ANSWER_ENDPOINT, {
      uid: address,
    })
      .then(res => res.json())
      .then(res => {
        setanswers(res);
      });
  }, [showAlert]);

  const deleteData = () => {
    const submit = () => {
      fetcher(Config.DELTE_DATA_ENDPOINT, {
        uid: address,
      })
        .then(res => res.json())
        .then(res => {
          setshowAlert(true);
          // window.scrollTo({
          //   top: 0,
          //   behavior: 'smooth',
          // });
        });
    };

    Alert.alert(
      'delete your personalized data and chat history',
      '',
      [
        {text: 'cancel', onPress: () => {}},
        {text: 'OK', onPress: submit},
      ],
      {cancelable: false},
    );
  };

  return (
    <GradientWrapper>
      <FullScreenLoading isLoading={isLoading} />
      <Box>
        {/* <Alert
          text={'delete yor data'}
          setshowAlert={setshowAlert}
          autoFadeOut={autoFadeOut}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          moveY={moveY}
        /> */}
        <Box style={styles.comp}>
          <Box style={styles.sec_center}>
            <Box style={styles.imgWrap}>
              <Card
                img={assets.mudai}
                level={level}
                title={'Your Ai chat’s name'}
              />
            </Box>
          </Box>
          <Box style={styles.sec_list}>
            {answers?.length &&
              answers.length > 0 &&
              answers.map((item, index) => (
                <Answer
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
          </Box>

          <Box style={styles.titleWrap}>
            <Box style={styles.title}>
              <Typography type="h_eng">Welcome To</Typography>
              <Typography type="h_eng" style={styles.bottomText}>
                Ai Chat
              </Typography>
            </Box>
            <Typography type="p_main_eng" style={styles.cap}>
              by MudAi
            </Typography>
          </Box>
          <Box style={[styles.sec_center, styles.btnContainer]}>
            <CustomButton
              style={styles.btn}
              mode={'secondary'}
              onPress={() => {
                try {
                  setisLoading(true);
                  disconnect();
                } catch (e) {
                  console.error(e);
                  setisLoading(false);
                }
              }}>
              <Typography color="text.900" type="p_main_eng_bold">
                disconnect wallet
              </Typography>
            </CustomButton>

            <CustomButton
              style={styles.btn}
              mode={'secondary'}
              onPress={deleteData}>
              <Typography color="text.900" type="p_main_eng_bold">
                delete your data
              </Typography>
            </CustomButton>
          </Box>
        </Box>
      </Box>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  comp: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 53,
    paddingBottom: 82,
    gap: 32,
  },

  sec_center: {
    display: 'flex',
    justifyContent: 'center',
  },

  sec_btn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },

  sec_list: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 24,
    gap: 16,
  },

  imgWrap: {
    maxWidth: 232,
    width: '100%',
    alignSelf: 'center',
  },

  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 32,
  },

  btn: {
    width: 319,
  },

  titleWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },

  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#fff',
  },

  bottomText: {
    lineHeight: 1.625,
  },

  cap: {
    color: '#565656',
    fontWeight: '400',
  },
});

export default Setting;
