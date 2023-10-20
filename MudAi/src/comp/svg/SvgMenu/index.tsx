import React, {useState, useEffect} from 'react';
import {Icon} from 'native-base';
import {Svg, G, Path, Defs, ClipPath} from 'react-native-svg';

const SvgMenu = props => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
      <Path
        d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
        fill={
          props.color && typeof props.color === 'string' ? props.color : '#000'
        }
      />
    </Svg>
  );
};

export default SvgMenu;
