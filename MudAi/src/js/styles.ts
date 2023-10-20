import {Platform} from 'react-native';

export const appStyles = {
  color: {
    input_placeholderColor: '#565656',
    purpleMain: '#5E17EB',
  },
};

export const globalInputStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingVertical: 18,
  paddingHorizontal: 20,
  gap: 10,
  backgroundColor: '#21242D',
  borderRadius: 16,
  color: '#fff',
};

export const calcLineHight = (fontSize, lineHeightRatio) => {
  let _lineHeightRatio = lineHeightRatio;
  if (!_lineHeightRatio) {
    _lineHeightRatio = fontConfig.baseLineHeight;
  }
  return (fontSize * _lineHeightRatio - fontSize) / 2;
};

export const setPadding = arr => {
  switch (arr.length) {
    case 1:
      return {
        paddingTop: arr[0],
        paddingRight: arr[0],
        paddingBottom: arr[0],
        paddingLeft: arr[0],
      };
    case 2:
      return {
        paddingTop: arr[0],
        paddingRight: arr[1],
        paddingBottom: arr[0],
        paddingLeft: arr[1],
      };
    case 3:
      return {
        paddingTop: arr[0],
        paddingRight: arr[1],
        paddingBottom: arr[2],
        paddingLeft: arr[1],
      };
    case 4:
      return {
        paddingTop: arr[0],
        paddingRight: arr[1],
        paddingBottom: arr[2],
        paddingLeft: arr[3],
      };
  }
};

export const shadowStyle = ({
  rgb,
  opacity,
  radius,
  offsetWidth,
  offsetHeight,
  elevation,
}) => {
  return Platform.select({
    ios: {
      shadowColor: `rgb(${rgb})`,
      shadowOpacity: opacity,
      shadowRadius: radius,
      shadowOffset: {
        width: offsetWidth,
        height: offsetHeight,
      },
    },
    android: {
      elevation,
    },
    web: {
      boxShadow: `${offsetWidth}px ${offsetHeight}px ${radius}px rgba(${rgb}, ${opacity})`,
    },
  });
};

export const webviewResetCss = `
  html,
  body{
   width: 100%;
   height: 100%;
   margin: 0;
  }

  *{
    box-sizing: border-box;
  }

  body{
    font-family:  "Hiragino Kaku Gothic ProN",
    "Hiragino Sans", "BIZ UDPGothic", Meiryo, sans-serif;
  }

  input{ 
    padding: 0;
    border: none;
    border-radius: 0;
    outline: none;
    background: none;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    outline: none;
    background: transparent;
  }
`;

export const webviewSelectStyle = `
  .c-Select{
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px 16px;
    opacity: 0
  }

  .c-Select__select{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 0 16px;
    font-size: 16px;
    border: 1px solid #D1D5DB;
    border-radius: 5px;
    color: #676767;
  }

  .c-Select__select:focus{
    border: 1px solid #0285FF;
  }

  .c-Select__triangle{
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    z-index: -1;
  }`;

export const webviewThemeColors = `

.text--base{
  color: '#000000';
}

.bg--base{
  color: #ffffff;
}

.bg--content{
  backgroundColor: #fafafa;
}

@media (prefers-color-scheme: dark) {

}
`;

export const notLastChild = (arr, index, style) => {
  if (index !== arr.length - 1) {
    return style;
  }
};

export const setFontFamily = (
  appFont: string,
  webFont: string,
  webWeight: number,
) => {
  if (Platform.OS === 'web') {
    return {
      fontFamily: webFont,
      fontWeight: String(webWeight) || '400',
    };
  } else {
    return {
      fontFamily: appFont,
      fontWeight: String(webWeight) || '400',
    };
  }
};

export const circle = width => {
  return {
    width: width,
    height: width,
    borderRadius: width * 0.5,
  };
};

export const border = (width, color, dir) => {
  const key = `border${dir}Width`;
  const colorKey = `border${dir}Color`;

  return dir
    ? {[key]: width, [colorKey]: color}
    : {borderWidth: width, borderColor: color};
};

export const layoutSection = (maxWidth, width) => {
  return {
    maxWidth: maxWidth,
    width: `${width}%`,
    alignSelf: 'center',
  };
};

export const withRange = (target, arr) => {
  // arr = [min, max]
  if (arr[0] === null) {
    //maxだけ
    if (target < arr[1]) {
      return true;
    } else {
      return false;
    }
  } else if (arr[1] === null) {
    //minだけ
    if (target > arr[0]) {
      return true;
    } else {
      return false;
    }
  } else {
    if (target > arr[0] && target < arr[1]) {
      return true;
    } else {
      return false;
    }
  }
};

export const pcGap = (index, style, viewType) => {
  if (viewType === 'pc') {
    if (index !== 2 || index % 3 !== 2) {
      return style;
    }
  }
};
