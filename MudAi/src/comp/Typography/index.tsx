import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import React, {ReactNode} from 'react';
import {InterfaceTextProps} from 'native-base/lib/typescript/components/primitives/Text/types';

export const types = [
  'h_1',
  'h_2',
  'h_eng',
  'p_main',
  'p_sub',
  'p_main_eng',
  'p_main_eng_bold',
  'p_cap_eng',
] as const;

export type TypographyTypes = (typeof types)[number];

export type TypographyProps = InterfaceTextProps & {
  type: TypographyTypes;
  children: ReactNode;
};

const Typography = ({type, children, ...others}: TypographyProps) => {
  return (
    <Text {...styles[type]} {...others}>
      {children}
    </Text>
  );
};

const styles = {
  h_1: {
    fontSize: 24,
    fontWeight: '700',
  },

  h_2: {
    fontSize: 18,
    fontWeight: '700',
  },

  h_eng: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: 'Poppins',
  },

  p_main: {
    fontSize: 16,
  },

  p_sub: {
    fontSize: 14,
  },

  p_main_eng: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },

  p_main_eng_bold: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '700',
  },

  p_cap_eng: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
};

export default Typography;
