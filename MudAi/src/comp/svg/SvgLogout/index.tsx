import React, {useState, useEffect} from 'react';
import {Icon} from 'native-base';
import {Svg, G, Path, Defs, ClipPath} from 'react-native-svg';

const SvgLogout = props => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
      <Path
        d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
        fill={
          props.color && typeof props.color === 'string' ? props.color : '#000'
        }
      />
    </Svg>
  );
};

export default SvgLogout;
