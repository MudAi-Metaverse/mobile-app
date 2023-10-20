import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgSearch = props => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M11.79 2.763a9.028 9.028 0 1 0 5.452 16.224l2.684 2.677.076.068a.938.938 0 0 0 1.248-1.396l-2.639-2.632a9.028 9.028 0 0 0-6.82-14.942Zm0 1.875a7.153 7.153 0 1 1 0 14.305 7.153 7.153 0 0 1 0-14.305Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgSearch;
