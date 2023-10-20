import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button, Select} from 'native-base';
import {InterfaceSelectProps} from 'native-base/lib/typescript/components/primitives/Select/types';

type PropsSelectInput = InterfaceSelectProps & {
  options: Array<{
    label: string;
    value: string;
  }>;
};

const SelectWrapper = ({options, ...others}: PropsSelectInput) => {
  return (
    <Select {...others}>
      {options.map(option => {
        return (
          <Select.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        );
      })}
    </Select>
  );
};

export default SelectWrapper;
