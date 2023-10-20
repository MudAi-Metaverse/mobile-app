import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import {InterfaceTextProps} from 'native-base/lib/typescript/components/primitives/Text/types';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

type Props = InterfaceTextProps & {
  colors?: string[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  angle?: number;
};

const GradientText = ({
  colors = ['#38dcfc', '#9f72ee', '#a956ea', '#9c4ee9', '#4138e5'],
  start = {x: -0.08, y: 0},
  end = {x: 1.14, y: 0},
  angle = 260,
  ...props
}: Props) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        useAngle
        angle={angle}
        colors={colors}
        start={start}
        end={end}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
