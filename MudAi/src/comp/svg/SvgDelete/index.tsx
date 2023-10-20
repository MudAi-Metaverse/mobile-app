import React, {useState, useEffect} from 'react';
import {Icon} from 'native-base';
import {Svg, G, Path, Defs, ClipPath} from 'react-native-svg';

const SvgDelete = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      fill={
        props.color && typeof props.color === 'string' ? props.color : '#000'
      }>
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </Svg>
  );
};

export default SvgDelete;
