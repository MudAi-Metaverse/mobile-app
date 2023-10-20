import React, {useState, useEffect} from 'react';
import {Icon} from 'native-base';
import {Svg, G, Path, Defs, ClipPath} from 'react-native-svg';

const SvgPlus = props => {
  return (
    <Svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.00016 1.33337V10.6667M1.3335 6.00004H10.6668"
        stroke="#2F6DC9"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SvgPlus;
