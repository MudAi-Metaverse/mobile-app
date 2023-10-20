import React, {useCallback, useEffect, useRef, useState} from 'react';
// import PlusMinusInput from 'src/comp/PlusMinusInput';
// import Sheet from 'src/comp/Sheet';
import {setStore, updateStore} from 'src/js/firebase';
import {alphabets, idMaker} from 'src/js/functions';
import {
  userAddressAtom,
  userStoreAtom,
  voteAtom,
  voteChoiceIndexAtom,
  voteShowModalAtom,
  voteUserStoreAtom,
} from 'src/recoil';
import {useRecoilState, useRecoilValue} from 'recoil';
import Typography from 'src/comp/Typography';
import useUserVote from 'src/js/useUserVote';
import {Alert, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Actionsheet, Box, Pressable, Text, useDisclose} from 'native-base';
import CustomButton from 'src/comp/CustomButton';
import {BlurView} from '@react-native-community/blur';
import PlusMinusInput from 'src/comp/PlusMinusInput';
import {useAccount} from 'wagmi';

type Props = {};

const VoteForm = (props: Props) => {
  const route = useRoute();
  const choiceIndex = useRecoilValue(voteChoiceIndexAtom);
  // const userAddress = useRecoilValue(userAddressAtom);
  const {address: userAddress} = useAccount();
  const userVoteStore = useRecoilValue(voteUserStoreAtom);
  const userStore = useRecoilValue(userStoreAtom);
  const [showModal, setshowModal] = useRecoilState(voteShowModalAtom);
  const [amount, setamount] = useState(0);
  const {subtractPoint} = useUserVote();

  const getVotedAmount = () => {
    const total = userVoteStore.reduce((prev, current) => {
      return prev + current.amount;
    }, 0);

    const answerArr = userVoteStore.filter(item => item.choice === choiceIndex);
    const thisChoice = answerArr.reduce((prev, current) => {
      return prev + current.amount;
    }, 0);

    return {
      total,
      thisChoice,
    };
  };

  const totalVotedRef = useRef(getVotedAmount().total);
  const canVoteNum = userStore?.point;

  const setAmountFunc = (addAmount: number, keybordInput = false) => {
    if (keybordInput) {
      setamount(prev => {
        if (canVoteNum - addAmount < 0) {
          return canVoteNum;
        } else {
          return addAmount;
        }
      });
    } else if (addAmount < 0) {
      setamount(prev => {
        if (prev !== 0) {
          return prev + addAmount;
        } else {
          return prev;
        }
      });
    } else {
      setamount(prev => {
        if (canVoteNum - (prev + addAmount) < 0) {
          return canVoteNum;
        } else {
          return prev + addAmount;
        }
      });
    }
  };

  const handleSubmit = useCallback(
    async (amount: number) => {
      if (amount === 0) {
        Alert.alert('please input amount');
        return;
      }

      const id = idMaker(20);
      const data = {
        id,
        uid: userAddress,
        choice: choiceIndex,
        unix: Date.now(),
        amount,
      };

      await setStore(`vote/${route.params.id}/history/${id}`, data).catch(e => {
        Alert.alert(e);
      });

      // firestoreのpointを更新
      subtractPoint(amount);

      Alert.alert('accept your vote!');
      setshowModal(false);
      setamount(0);
    },
    [userAddress, choiceIndex, route.params.id, userStore],
  );

  return (
    <Presenter
      showModal={showModal}
      setshowModal={setshowModal}
      handleSubmit={handleSubmit}
      amount={amount}
      setAmountFunc={setAmountFunc}
      choiceIndex={choiceIndex}
    />
  );
};

type PresenterProps = {
  showModal: boolean;
  setshowModal: React.Dispatch<React.SetStateAction<boolean>>;
  amount: number;
  choiceIndex: number;
  setAmountFunc: (addAmount: number) => void;
  handleSubmit: (amount: number) => void;
};

export const Presenter = (props: PresenterProps) => {
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <Actionsheet
      isOpen={props.showModal}
      onClose={() => {
        props.setshowModal(false);
      }}>
      <Actionsheet.Content style={styles.content}>
        <Box style={styles.sheets}>
          <Text style={styles.head}>How many vote MudAi Pt?</Text>
          <Box style={styles.amountContainer}>
            <Text style={styles.choice}>{alphabets[props.choiceIndex]}</Text>
            <PlusMinusInput
              amount={props.amount}
              setAmountFunc={props.setAmountFunc}
            />
          </Box>

          <CustomButton
            wrapperProps={styles.submit}
            onPress={() => {
              props.handleSubmit(props.amount);
            }}>
            <Typography type="p_main_eng_bold">Vote</Typography>
          </CustomButton>
          <Pressable
            onPress={() => {
              props.setshowModal(false);
            }}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

const styles = StyleSheet.create({
  sheets: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 32,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Roboto',
    width: '100%',
  },
  innerStyle: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // backdropFilter: 'blur(44px)',
  },
  content: {
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
  },
  choice: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '500',
  },
  head: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'Epilogue',
    fontWeight: '700',
  },
  amountContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  submit: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  cancel: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 32,
    color: '#f3f3f5',
    alignItems: 'center',
  },
});

export default VoteForm;
