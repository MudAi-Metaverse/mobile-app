import React, {useState, useEffect} from 'react';
import {Icon} from 'native-base';
import {Svg, G, Path, Defs, ClipPath} from 'react-native-svg';

const SvgShare = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      fill={
        props.color && typeof props.color === 'string' ? props.color : '#000'
      }>
      <Path fill="none" d="M0 0h24v24H0V0z" />
      <Path d="m16 5-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3a2 2 0 0 1 2 2z" />
    </Svg>
  );
};

export default SvgShare;
