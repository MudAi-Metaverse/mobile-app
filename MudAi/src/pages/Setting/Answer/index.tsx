import {Box, Pressable, Text} from 'native-base';
import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Path, Rect, Svg, Defs, LinearGradient, Stop} from 'react-native-svg';
import Typography from 'src/comp/Typography';
import useAccordion from 'src/js/useAccordion';

export type AnswerProps = {
  question: string;
  answer: string;
};

const Answer = (props: AnswerProps) => {
  const {
    toggleAccordion,
    isExpand,
    contentWrapRef,
    contentRef,
    innerHeight,
    setContetntLayout,
  } = useAccordion('close');

  return (
    <Box style={styles.wrap}>
      <Box style={styles.comp}>
        <Pressable style={styles.headContainer} onPress={toggleAccordion}>
          <Typography type={'p_sub'} color="text.900" style={styles.head}>
            {props.question}
          </Typography>
          <Box style={styles.iconWrap}>
            <ButtonSvg isExpand={isExpand} />
          </Box>
        </Pressable>
        <Animated.View
          ref={contentWrapRef}
          style={[styles.contentWrap, {height: innerHeight}]}>
          <Box
            position="absolute"
            onLayout={e => {
              setContetntLayout(e.nativeEvent.layout);
            }}>
            <Text ref={contentRef} color="text.900" style={styles.content}>
              {props.answer}
            </Text>
          </Box>
        </Animated.View>
      </Box>
    </Box>
  );
};

const borderRadius = 16;
const borderWidth = 1;

const styles = StyleSheet.create({
  wrap: {
    // background: linear-gradient(
    //   259.45deg,
    //   #57e4ff -4.54%,
    //   #8b95f2 26.9%,
    //   #8b72ee 49.6%,
    //   #8556ea 68.49%,
    //   #4138e5 116.24%
    // );
    padding: borderWidth,
    borderRadius: borderRadius + borderWidth,
  },

  comp: {
    // width: calc(100% - 1px)
    // margin: auto
    borderRadius: borderRadius,
    backgroundColor: '#fff',
    paddingVertical: 11,
    paddingHorizontal: 12,
  },

  headContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    // cursor: 'pointer',
  },

  head: {
    flex: 1,
    fontWeight: '300',
  },

  iconWrap: {
    flexShrink: 0,
    width: 24,
    height: 24,
    // transition: 'transform 0.3s',
  },

  svg: {
    width: '100%',
    height: '100%',
  },

  path: {
    // transition: 'transform 0.3s',
  },

  rotate: {
    // transform: 'rotate(0)',
  },

  contentWrap: {
    height: 0,
    overflow: 'hidden',
    // transition: 'height 0.2s',
  },

  content: {
    paddingTop: 12,
    fontWeight: '300',
  },
});

export const ButtonSvg = props => {
  return (
    <Svg viewBox={'0 0 24 24'} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Rect
        x={24}
        width={24}
        height={24}
        rx={12}
        transform={'rotate(90 24 0)'}
        fill="url(#a)"
      />
      <Path
        d="m8 10 4 4 4-4"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={`rotate(${props.isExpand ? '0' : '-90'} 12 12)`}
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={49.573}
          y1={1.505}
          x2={16.338}
          y2={7.696}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#57E4FF" />
          <Stop offset={0.26} stopColor="#8B95F2" />
          <Stop offset={0.448} stopColor="#8B72EE" />
          <Stop offset={0.605} stopColor="#8556EA" />
          <Stop offset={1} stopColor="#4138E5" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default Answer;
