import React from 'react';
import {alphabets} from 'src/js/functions';
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {voteAtom, voteChoiceIndexAtom, voteShowModalAtom} from 'src/recoil';

import {TVoteChoice} from 'src/type';
import {StyleSheet} from 'react-native';
import {Box, Pressable, Text} from 'native-base';
import CustomButton from 'src/comp/CustomButton';
import {useRoute} from '@react-navigation/native';
import GradientText from 'src/comp/GradientText';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

type Props = {
  item: TVoteChoice;
  index: number;
};

const VoteItem = (props: Props) => {
  const setshowModal = useSetRecoilState(voteShowModalAtom);
  const setchoiceIndex = useSetRecoilState(voteChoiceIndexAtom);

  const openVoteModal = () => {
    setshowModal(true);
    setchoiceIndex(props.index);
  };

  return (
    <Presenter
      item={props.item}
      index={props.index}
      setshowModal={setshowModal}
      openVoteModal={openVoteModal}
      setchoiceIndex={setchoiceIndex}
    />
  );
};

type PresenterProps = {
  item: TVoteChoice; // voteObj
  index: number;
  setshowModal: React.Dispatch<React.SetStateAction<boolean>>;
  openVoteModal: () => void;
  setchoiceIndex: SetterOrUpdater<number>;
};

export const Presenter = (props: PresenterProps) => {
  const vote = useRecoilValue(voteAtom);
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#2a283a', 'rgba(22, 20, 31, 0.47)']}
      start={{x: -0.08, y: 0}}
      end={{x: 1.14, y: 0}}
      style={styles.comp}>
      <Box style={[styles.choice, styles.side]}>
        <GradientText
          style={styles.choiceText}
          colors={['#57e4ff', '#8b95f2', '#8b72ee', '#8556ea', '#4138e5']}>
          {alphabets[props.index]}
        </GradientText>
      </Box>
      <Box style={styles.info}>
        <Pressable
          style={styles.left}
          onPress={() => {
            props.setchoiceIndex(props.index);
            navigation.navigate('VoteDetail', {
              id: vote.id,
              index: props.index,
            });
          }}>
          <Text style={styles.title}>{props.item.title}</Text>
          <GradientText
            style={styles.seeMore}
            colors={['#57e4ff', '#8b95f2', '#8b72ee', '#8556ea', '#4138e5']}>
            See more
          </GradientText>
        </Pressable>
        <Box style={styles.side}>
          <Pressable style={styles.voteWrap} onPress={props.openVoteModal}>
            <GradientText style={styles.vote}>Vote</GradientText>
          </Pressable>
        </Box>
      </Box>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  comp: {
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingHorizontal: 12,
    color: '#f3f3f5',
    fontFamily: 'Inter',
  },
  side: {paddingVertical: 9},
  choice: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  choiceText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
    fontWeight: '800',
    width: 24,
    height: 24,
    // transform: [{translateX: 1}],
    fontSize: 24,
    lineHeight: 24 * 1.1,
    textAlign: 'center',
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    flex: 1,
    paddingVertical: 9,
  },
  title: {fontWeight: '700', fontSize: 12},
  seeMore: {
    // background:
    //   'linear-gradient(\n    259.45deg,\n    #57e4ff,\n    #8b95f2 26.03%,\n    #8b72ee 44.83%,\n    #8556ea 60.47%,\n    #4138e5\n  )',
    fontFamily: 'Inter',
    fontSize: 12,
  },
  voteWrap: {
    borderRadius: 4,
    backgroundColor: '#fff',
    // boxShadow: '5px 6px 24px rgba(126, 132, 161, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  vote: {
    fontSize: 12,
    position: 'relative',
    fontWeight: '600',
    // background:
    //   'linear-gradient(\n    264.93deg,\n    #38dcfc,\n    #9f72ee 34.2%,\n    #a956ea 50.36%,\n    #9c4ee9 65.26%,\n    #4138e5\n  )',
  },
});

export default VoteItem;
