import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
const SvgImagePlaceHolder = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 24"
    fill="none"
    {...props}>
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M10.5 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-2a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
      clipRule="evenodd"
    />
    <Path
      fill="url(#b)"
      fillRule="evenodd"
      d="M3.5 15c0 2.828 0 4.243.879 5.121C5.257 21 6.672 21 9.5 21h6c2.828 0 4.243 0 5.121-.879.879-.878.879-2.293.879-5.121V9c0-2.828 0-4.243-.879-5.121C19.743 3 18.328 3 15.5 3h-6c-2.828 0-4.243 0-5.121.879-.769.768-.865 1.946-.877 4.121H3.5v7Zm12-10h-6c-1.47 0-2.373.004-3.025.092-.574.077-.67.187-.681.2h-.001l-.001.002c-.013.011-.123.107-.2.68C5.504 6.628 5.5 7.53 5.5 9v.663c0 1.231.49 2.412 1.36 3.282l.333.334a4.08 4.08 0 0 0 5.225.457 3.54 3.54 0 0 1 4.155.069l1.327.995a1 1 0 0 0 1.6-.8V9c0-1.47-.004-2.373-.092-3.025-.077-.574-.187-.67-.2-.681v-.001l-.002-.001c-.011-.013-.107-.123-.68-.2C17.872 5.004 16.97 5 15.5 5Zm3.987 11.834A2.955 2.955 0 0 1 16.7 16.4l-1.327-.995a1.54 1.54 0 0 0-1.808-.03 6.08 6.08 0 0 1-7.786-.682l-.279-.279V15c0 1.47.004 2.373.092 3.025.077.574.187.67.2.681v.001l.002.001c.011.013.107.123.68.2.653.088 1.555.092 3.026.092h6c1.47 0 2.373-.004 3.025-.092.574-.077.67-.187.681-.2h.001l.001-.002c.013-.011.123-.107.2-.68.043-.324.066-.708.079-1.192Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={22.68}
        x2={-2.246}
        y1={4.128}
        y2={8.772}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#57E4FF" />
        <Stop offset={0.26} stopColor="#8B95F2" />
        <Stop offset={0.448} stopColor="#8B72EE" />
        <Stop offset={0.605} stopColor="#8556EA" />
        <Stop offset={1} stopColor="#4138E5" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={22.68}
        x2={-2.246}
        y1={4.128}
        y2={8.772}
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
export default SvgImagePlaceHolder;
