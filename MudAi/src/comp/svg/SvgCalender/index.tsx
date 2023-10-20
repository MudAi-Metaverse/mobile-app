import React, {useState, useEffect} from 'react';
import {Icon} from 'native-base';
import {Svg, G, Path, Defs, ClipPath} from 'react-native-svg';

const SvgCalender = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={'0 0 16 16'}
      fill="none"
      {...props}>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.667 1.333V4M5.333 1.333V4M2 6.667h12M3.333 2.5h9.334c.736 0 1.333.597 1.333 1.333v9.334c0 .736-.597 1.333-1.333 1.333H3.333A1.333 1.333 0 0 1 2 13.167V3.833C2 3.097 2.597 2.5 3.333 2.5Z"
      />
    </Svg>
  );
};

export default SvgCalender;
