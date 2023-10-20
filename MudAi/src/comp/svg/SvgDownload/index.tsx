import React, {useState, useEffect} from 'react';
import {Icon} from 'native-base';
import {Svg, G, Path, Defs, ClipPath} from 'react-native-svg';

const SvgDownload = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
      fill={
        props.color && typeof props.color === 'string' ? props.color : '#000'
      }>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </Svg>
  );
};

export default SvgDownload;
