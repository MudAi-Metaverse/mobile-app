import {Box, Pressable, Text} from 'native-base';
import {InterfacePressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';
import React from 'react';
import {StyleSheet} from 'react-native';
import Typography from 'src/comp/Typography';
import {setPadding} from 'src/js/styles';

type Props = InterfacePressableProps & {
  text: string;
  mode?: 'grade';
  className?: string;
};

const Choice = (props: Props) => {
  const {text, mode = '', className, ...others} = props;

  return (
    <Pressable style={[styles.comp, className]} {...grade[mode]} {...others}>
      <Typography type="p_main_eng" style={styles.text}>
        {text}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  comp: {
    flexDirection: 'row',
    alignItems: 'center',
    ...setPadding([12, 16]),
    backgroundColor: '#2a283a',
    // backdropFilter: 'blur(20px)',
    borderRadius: 100,
  },
  text: {color: '#eae5f8'},
});

const grade = {
  grade: {
    linearGradient: {
      colors: ['#57e4ff', '#8b95f2', '#8b72ee', '#8556ea', '#4138e5'],
      start: [1.16, 0],
      end: [-0.8, 0],
    },
  },
};

export default Choice;
