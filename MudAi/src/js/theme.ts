import {extendTheme, theme} from 'native-base';

export const nbTheme = extendTheme({
  components: {
    Text: {
      defaultProps: {
        color: 'text.600',
        fontSize: {base: 'sm', md: 'md'},
      },
    },
    Button: {
      defaultProps: {
        _pressed: {
          opacity: 0.5,
          bg: 'transparent',
        },
      },
    },
    Input: {
      defaultProps: {
        borderWidth: '0',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(207, 219, 213, 0.15)',
        color: '#fff',
        fontSize: 'md',
        placeholderTextColor: '#8E8E95',
        placeholder: 'search user by wallet id',
        _input: {
          selectionColor: '#8E8E95',
          cursorColor: '#8E8E95',
        },
        _focus: {
          bg: 'transparent',
        },
      },
    },
  },
  colors: {
    text: {
      ...theme.colors.trueGray,
      900: '#121A26',
      600: '#ffffff',
      400: '#555555',
      300: '#777777',
      200: '#999999',
      100: '#fafafa',
    },
    project: {
      bg: '#244bac',
      bgBlack: '#121212',
      bgLight: '#ffffff',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
  },
  fontConfig: {
    Epilogue: {
      400: 'Epilogue-Regular',
      700: 'Epilogue-Bold',
    },
    NotoSans: {
      400: 'NotoSans-Regular',
    },
    Inter: {
      400: 'Iter-Regular',
      700: 'Iter-Bold',
    },
    InterItalic: {
      700: 'InterTight-SemiBoldItalic',
    },
    Poppins: {
      400: 'Poppins-Regular',
      500: 'Poppins-Medium',
      600: 'Poppins-Bold',
    },
    Roboto: {
      300: 'Roboto-light',
      400: 'Roboto-Regular',
      600: 'Roboto-Medium',
      700: 'Roboto-Bold',
    },
    ReadexPro: {
      400: 'ReadexPro-Regular',
    },
  },
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
  // breakpoints: {
  //   base: 0,
  //   sm: 480,
  //   md: 768,
  //   lg: 992,
  //   xl: 1280,
  // },
});

export const maxW = 1080;
