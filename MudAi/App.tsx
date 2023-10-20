// import 'fastestsmallesttextencoderdecoder';
import 'fast-text-encoding';
import '@walletconnect/react-native-compat';
import {WALLETCONNECT_ID} from '@env';
import {
  Web3Modal,
  createWeb3Modal,
  defaultWagmiConfig,
} from '@web3modal/wagmi-react-native';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';
import Root from 'src/Root';
import {nbTheme} from 'src/js/theme';
import RecoilWrapper from 'src/wrapper/RecoilWrapper';
import {WagmiConfig, useConnect} from 'wagmi';
import {arbitrum, avalanche, bsc, mainnet, polygon} from 'wagmi/chains';
// chromeデバッガーを有効にする
// https://github.com/jhen0409/react-native-debugger/discussions/774#discussioncomment-7131854
// import 'react-native-devsettings';
// OR if you are using AsyncStorage
// import 'react-native-devsettings/withAsyncStorage';

// if (process.env.NODE_ENV === 'development') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   });
// }

/*---------------------------------

  Wagmi

---------------------------------*/
// https://github.com/WalletConnect/react-native-examples

// 1. Get projectId
const projectId = WALLETCONNECT_ID;

// 2. Create config
const metadata = {
  name: 'MudAi',
  description: 'MudAi App',
  url: 'https://MudAi.ai',
  icons: ['https://mudai.ai/mudai.png'],
  // redirect: {
  //   native: 'w3mwagmisample://',
  // },
};
const chains = [arbitrum, bsc, mainnet, polygon];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

function App(): JSX.Element {
  LogBox.ignoreLogs([
    'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
  ]);
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  LogBox.ignoreLogs(['Could not find Fiber with id']);
  LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered',
  ]);
  LogBox.ignoreLogs(['Trying to load empty source.']);
  LogBox.ignoreLogs([
    '[DEPRECATED] Default export is deprecated. Instead use `import { shallow } from ',
  ]);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <NativeBaseProvider config={nbTheme} theme={nbTheme}>
          <RecoilRoot>
            <RecoilWrapper>
              <SafeAreaProvider>
                <SafeAreaView
                  edges={['right', 'left']}
                  style={{
                    flex: 1,
                  }}>
                  {/* <StatusBar
                  animated={true}
                  backgroundColor="#000"
                  barStyle={'dark-content'}
                /> */}

                  <Root />
                </SafeAreaView>
              </SafeAreaProvider>

              <Web3Modal />
            </RecoilWrapper>
          </RecoilRoot>
        </NativeBaseProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
