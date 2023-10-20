import React, {useState, useEffect} from 'react';
import {Icon} from 'native-base';
import {Svg, G, Path, Defs, ClipPath} from 'react-native-svg';

const SvgPlay = props => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
      <Path
        d="M320-200v-560l440 280-440 280Z"
        fill={
          props.color && typeof props.color === 'string' ? props.color : '#000'
        }
      />
    </Svg>
  );
};

export default SvgPlay;
