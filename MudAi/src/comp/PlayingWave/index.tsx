import React, {useState, useEffect, useRef} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import {Animated} from 'react-native';

type Props = {};

const maxHeight = 15;

const PlayingWave = (props: Props) => {
  const baseDuration = 500;
  return (
    <HStack space="2px" alignItems={'flex-end'} h={`${maxHeight}px`}>
      <Bar delay={0} duration={baseDuration} />
      <Bar delay={300} duration={baseDuration} />
      <Bar delay={200} duration={baseDuration} />
      <Bar delay={50} duration={baseDuration} />
    </HStack>
  );
};

const Bar = ({delay, duration}) => {
  const height = useRef(new Animated.Value(maxHeight / 3)).current;
  const unmountRef = useRef(false);

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      unmountRef.current = false;
      anim();
    }, delay);

    return () => {
      unmountRef.current = true;
      clearTimeout(timeoutId);
    };
  }, []);

  const anim = () => {
    Animated.timing(height, {
      toValue: maxHeight,
      duration: duration,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (!unmountRef.current) {
        ReturnAnim();
      }
    });
  };

  const ReturnAnim = () => {
    Animated.timing(height, {
      toValue: maxHeight / 3,
      duration: duration,
      useNativeDriver: false,
    }).start(finished => {
      if (!unmountRef.current) {
        anim();
      }
    });
  };

  return (
    <Animated.View
      style={{
        borderRadius: 5,
        width: 3,
        height: height,
        backgroundColor: '#fff',
      }}
    />
  );
};

export default PlayingWave;
