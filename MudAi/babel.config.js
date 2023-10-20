module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    ['@babel/plugin-transform-flow-strip-types', {loose: true}], //https://github.com/facebook/react-native/issues/29084#issuecomment-1030732709
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    // https://zenn.dev/hilli/articles/17d39de8e26263
    // [
    //   'module:react-native-dotenv',
    //   {
    //     envName: 'APP_ENV',
    //     moduleName: '@env',
    //     path: '.env',
    //     blocklist: null,
    //     allowlist: null,
    //     safe: false,
    //     allowUndefined: true,
    //     verbose: false,
    //   },
    // ],
    ['@babel/plugin-proposal-private-methods', {loose: true}],
    'react-native-reanimated/plugin',
  ],
};
