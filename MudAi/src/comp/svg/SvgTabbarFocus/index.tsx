import React, {useState, useEffect} from 'react';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';

const SvgTabbarFocus = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      fill="none"
      {...props}>
      <Circle cx={5} cy={5} r={5} fill="url(#a)" />
      <Defs>
        <LinearGradient
          id="a"
          x1={10.655}
          x2={-3.192}
          y1={0.627}
          y2={3.207}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#57E4FF" />
          <Stop offset={0.26} stopColor="#8B95F2" />
          <Stop offset={0.448} stopColor="#8B72EE" />
          <Stop offset={0.605} stopColor="#8556EA" />
          <Stop offset={1} stopColor="#4138E5" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SvgTabbarFocus;
