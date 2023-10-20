import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Image,
  Actionsheet,
} from 'native-base';
import GradientWrapper from 'src/comp/GradientWrapper';

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {voteAtom, voteChoiceIndexAtom, voteShowModalAtom} from 'src/recoil/';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import Typography from 'src/comp/Typography';
import {getStore} from 'src/js/firebase';
import {alphabets, fetcher} from 'src/js/functions';
import {useRoute} from '@react-navigation/native';
import useVote from 'src/pages/Vote/useVote';
import CustomButton from 'src/comp/CustomButton';
import {Keyboard, Pressable, StyleSheet} from 'react-native';
import AspectBox from 'src/comp/AspectBox';
import {langAtom} from 'src/recoil';
import InstantChat from 'src/comp/InstantChat';
import FastImage from 'react-native-fast-image';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

const VoteDetail = () => {
  const route = useRoute();
  const vote = useRecoilValue(voteAtom);
  const choiceIndex = useRecoilValue(voteChoiceIndexAtom);
  const setshowModal = useSetRecoilState(voteShowModalAtom);
  const [prompt, setprompt] = useState('');
  const _langAtom = useRecoilValue(langAtom);

  const [sheetOpen, setsheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  useVote();

  const askMyAi = () => {
    setsheetOpen(true);
  };

  useEffect(() => {
    getStore(`vote/${route.params.id}`).then(res => {
      const lang = _langAtom === 1 ? 'ja' : 'en';
      const texts =
        lang === 'ja'
          ? {
              first: '投票があります。',
              last: '私のデータから、どの選択肢に投票するのがお勧めですか？理由と合わせて教えてください。',
            }
          : {
              first: 'There is a vote.',
              last: ' Based on my data, which option do you recommend voting for? Please let me know, along with your reasons.',
            };
      let result = texts.first;
      res.choices.forEach((choice, index) => {
        if (lang === 'ja') {
          result += `選択肢${alphabets[index]}は${choice.title}という選択肢です。内容は${choice.description}です。`;
        } else {
          result += `Choice ${alphabets[index]} is the ${choice.title} option. The content is ${choice.description}.`;
        }
      });
      result += texts.last;

      setprompt(result);
      return () => {};
    });
  }, [route]);

  return (
    <Box flex="1">
      <GradientWrapper>
        <Box style={styles.comp}>
          {/* {userStore && <VoteForm />} */}
          <AspectBox ratio={1} style={styles.figure}>
            <Text style={styles.ovelayText}>
              {vote?.choices[choiceIndex].title}
            </Text>
            <FastImage
              style={{width: '100%', height: '100%'}}
              resizeMode={FastImage.resizeMode.cover}
              source={{uri: `${vote?.choices[choiceIndex]?.img}`}}
              alt=""
            />
          </AspectBox>
          {route && (
            <Box style={styles.stack}>
              <Box>
                <Text style={styles.head}>Description</Text>
                <Text style={styles.text}>
                  {vote?.choices[choiceIndex]?.description}
                </Text>
              </Box>

              <CustomButton
                mode="purple"
                wrapperProps={styles.askBtn}
                px="5"
                py="2"
                onPress={askMyAi}>
                <Typography type="p_main_eng_bold">Ask my Ai</Typography>
              </CustomButton>
            </Box>
          )}

          <CustomButton
            wrapperProps={{alignSelf: 'center', width: '100%'}}
            style={styles.btnStyle}
            onPress={() => {
              setshowModal(true);
            }}>
            <Typography type="p_main_eng_bold">Vote</Typography>
          </CustomButton>
        </Box>
      </GradientWrapper>

      <InstantChatSheet
        bottomSheetRef={bottomSheetRef}
        isShow={sheetOpen}
        setisShow={setsheetOpen}>
        {prompt !== '' && <InstantChat initialPrompt={prompt} />}
      </InstantChatSheet>
    </Box>
  );
};

const InstantChatSheet = ({bottomSheetRef, isShow, setisShow, children}) => {
  const snapPoints = useMemo(() => ['1%', '80%'], []);

  useEffect(() => {
    if (isShow) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isShow]);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) {
      setisShow(false);
    }
  }, []);

  const onClose = () => {
    bottomSheetRef.current?.snapToIndex(0);
    Keyboard.dismiss();
  };

  const BackDrop = useCallback(props => {
    return (
      <Pressable
        onPress={onClose}
        // bg="#fff"
        w="100%"
        h="100%"
        position="absolute"
        top="0%"
        left="0%"
      />
    );
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        style={{
          zIndex: 9999,
        }}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: '#fff',
        }}
        keyboardBehavior={'interactive'}
        keyboardBlurBehavior={'restore'}
        backdropComponent={BackDrop}>
        <BottomSheetScrollView>{children}</BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  comp: {
    display: 'flex',
    flexDirection: 'column',
    gap: 22,
    paddingBottom: 119,
  },
  askBtn: {
    width: 160,
    // paddingVertical: 9,
    // paddingHorizontal: 20,
    borderRadius: 12,
  },
  figure: {
    // '@include imgFitContainer(100%)': true,
    width: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  ovelayText: {
    position: 'absolute',
    top: 36,
    width: '100%',
    paddingLeft: 12.5,
    zIndex: 100,
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 48,
    lineHeight: 59,
    color: '#ffffff',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    paddingTop: 10,
    paddingHorizontal: 24,
    marginBottom: 72,
  },
  btnStyle: {
    width: '100%',
    maxWidth: 319,
    margin: 'auto',
    alignSelf: 'center',
  },
  head: {
    marginBottom: 8,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 14,
    color: '#929497',
  },
  text: {
    fontFamily: 'Roboto',
    fontWeight: '300',
    fontSize: 18,
    lineHeight: 18 * 1.22,
    color: '#ffffff',
  },
  cancel: {
    marginTop: 24,
    marginHorizontal: 'auto',
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 32,
    color: '#f3f3f5',
  },
});

export default VoteDetail;
