import React from 'react';
// import css from './PlusMinusInput.module.scss';
import SvgMinus from 'src/comp/svg/SvgMinus';
import SvgPlus from 'src/comp/svg/SvgPlus';
import {StyleSheet, TextInput} from 'react-native';
import {Box, Pressable} from 'native-base';

type Props = {
  amount: number;
  setAmountFunc: (addAmount: number) => void;
};

const PlusMinusInput = (props: Props) => {
  return (
    <Box style={styles.comp}>
      <Pressable
        style={styles.btn}
        onPress={() => {
          props.setAmountFunc(-1);
        }}>
        <Box style={[styles.svg, styles.minus]}>
          <SvgMinus />
        </Box>
      </Pressable>
      <Box style={styles.inputWrap}>
        <TextInput
          mode="numeric"
          style={styles.amount}
          value={props.amount.toFixed(0)}
          selectTextOnFocus={true}
          onChange={e => {
            props.setAmountFunc(
              Number(e.nativeEvent.text.replace(/[^0-9]/g, '')),
              true,
            );
          }}
          // onClick={e => {
          //   e.currentTarget.select();
          // }}
          // onFocus={e => {
          //   e.currentTarget.select();
          // }}
        />
      </Box>

      <Pressable
        style={styles.btn}
        onPress={() => {
          props.setAmountFunc(1);
        }}>
        <Box style={styles.svg}>
          <SvgPlus />
        </Box>
      </Pressable>
    </Box>
  );
};

const width = 16;
const styles = StyleSheet.create({
  comp: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: 100,
    borderRadius: 60,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#141414',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  inputWrap: {flex: 1},
  amount: {
    width: '100%',
    fontFamily: 'Epilogue',
    fontWeight: '700',
    fontSize: 16,
    color: '#141414',
    textAlign: 'center',
    // border: 'none',
    // '&::-webkit-inner-spin-button,\n  &::-webkit-outer-spin-button': {
    //   WebkitAppearance: 'none !important',
    //   margin: '0 !important',
    //   MozAppearance: 'textfield !important',
    // },
  },
  btn: {width: width, height: width},
  svg: {
    display: 'flex',
    alignItems: 'center',
    // flexDirection: 'row',
    width: 16,
    lineHeight: 0,
    svg: {width: 16},
  },
});

export default PlusMinusInput;
