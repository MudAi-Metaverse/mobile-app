import React, {useState, useEffect, useRef} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Pressable,
} from 'native-base';
import {Animated, LayoutRectangle} from 'react-native';

type Props = {
  setFunc: (checked: boolean) => void;
};

const CustomSwitch = (props: Props) => {
  const [checked, setChecked] = useState(false);
  const [wrapLayout, setWrapLayout] = useState<LayoutRectangle>();
  const animatedLeft = useRef(new Animated.Value(0)).current;
  const thumbWidth = 16;

  const toggleAnimatedValues = () => {
    const options = {
      duration: 200,
      useNativeDriver: true,
    };
    Animated.timing(animatedLeft, {
      toValue: checked ? wrapLayout.width - thumbWidth : 0,
      ...options,
    }).start();
  };

  useEffect(() => {
    if (!wrapLayout) {
      return;
    }

    toggleAnimatedValues();
  }, [checked, wrapLayout]);

  return (
    <Pressable
      p="1"
      w="10"
      borderRadius={'full'}
      borderWidth="1"
      borderColor={'rgba(207, 219, 213, 0.15)'}
      bg={checked ? '#7A52F4' : 'transparent'}
      onPress={() => {
        setChecked(!checked);
        props.setFunc(checked);
      }}>
      <Box
        position="relative"
        onLayout={e => {
          setWrapLayout(e.nativeEvent.layout);
        }}>
        <Animated.View
          style={{
            transform: [{translateX: animatedLeft}],
            width: 16,
            height: 16,
            borderRadius: 999,
            backgroundColor: '#fff',
          }}
        />
      </Box>
    </Pressable>
  );
};

export default CustomSwitch;
