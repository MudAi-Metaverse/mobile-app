import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgProfile = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    {...props}>
    <Path
      fill={
        props.color && typeof props.color === 'string' ? props.color : '#565656'
      }
      fillRule="evenodd"
      d="M14.166 7.917a4.167 4.167 0 1 1-8.333 0 4.167 4.167 0 0 1 8.333 0Zm-1.389 0a2.778 2.778 0 1 1-5.555 0 2.778 2.778 0 0 1 5.555 0Z"
      clipRule="evenodd"
    />
    <Path
      fill={
        props.color && typeof props.color === 'string' ? props.color : '#565656'
      }
      d="M6.511 14.404a20.365 20.365 0 0 1 6.978 0l.265.047c.39.077.714.307.909.616.06.096.118.197.174.298.164.291.329.585.599.783.332.245.814.02.814-.381V15.7c-.024-1.238-.944-2.296-2.215-2.546l-.297-.054a21.823 21.823 0 0 0-7.476 0l-.297.054c-1.271.25-2.19 1.308-2.215 2.546v.067c0 .4.482.626.814.381.27-.198.435-.492.599-.783.056-.1.113-.202.174-.298.195-.31.519-.539.91-.616l.264-.047Z"
    />
  </Svg>
);
export default SvgProfile;
