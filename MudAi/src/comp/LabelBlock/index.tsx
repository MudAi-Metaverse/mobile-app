import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';

type Props = {
  label: string;
  children: React.ReactNode;
};

const LabelBlock = ({label, children, ...others}: Props) => {
  const labelStyle = {
    fontSize: 'sm',
    fontFamily: 'Inter',
    color: 'rgba(255, 255, 255, 0.50)',
  };

  return (
    <Box {...others}>
      <Text {...labelStyle}>{label}</Text>
      {children}
    </Box>
  );
};

export default LabelBlock;
