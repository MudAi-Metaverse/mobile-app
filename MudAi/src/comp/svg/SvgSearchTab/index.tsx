import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgSearchTab = props => (
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
      d="M13.76 13.998a6.667 6.667 0 1 1 .238-.238c.71.059 1.379.367 1.886.874l1.389 1.389a.776.776 0 0 1 .227.548v.135a.833.833 0 0 1-.794.793l-.09.001h-.045a.776.776 0 0 1-.548-.227l-1.39-1.39a3.018 3.018 0 0 1-.873-1.885Zm.407-4.831a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgSearchTab;
