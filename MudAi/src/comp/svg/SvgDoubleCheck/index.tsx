import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgDoubleCheck = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 11 7"
    {...props}>
    <Path
      fill="#B7B9CE"
      d="M6.7.998a.487.487 0 0 0-.344.156l-4.375 4.36c-.129.129-.258.12-.36-.031L.919 4.436a.493.493 0 0 0-.687-.14.494.494 0 0 0-.14.687l.702 1.046c.451.677 1.332.763 1.907.188l4.36-4.36a.496.496 0 0 0 0-.703.523.523 0 0 0-.36-.156Zm2.812 0a.506.506 0 0 0-.36.14S3.98 6.299 3.919 6.343c.474.349 1.12.335 1.579-.125l4.375-4.36a.515.515 0 0 0 0-.718.506.506 0 0 0-.36-.14Z"
    />
  </Svg>
);
export default SvgDoubleCheck;
