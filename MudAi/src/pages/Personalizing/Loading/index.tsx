import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {Box, Text} from 'native-base';
import {webviewResetCss} from 'src/js/styles';
import WebView from 'react-native-webview';
import {loadingCss} from 'src/pages/Personalizing/Loading/variable';

type Props = {
  stopAnim?: boolean;
  setisAnimend: Dispatch<SetStateAction<boolean>>;
};

const Loading = (props: Props) => {
  const ref = useRef();

  useEffect(() => {
    if (props.stopAnim && ref.current) {
      ref.current.injectJavaScript(`
        window.ReactNativeWebView.postMessage(${true});
        document.getElementById('comp').classList.add('stopAnim');
      `);
    }
  }, [ref, props.stopAnim]);

  const onMessage = data => {
    try {
      const jsData = JSON.parse(data.nativeEvent.data);
      switch (jsData.type) {
        case 'animEnd':
          props.setisAnimend(true);
          break;
      }
    } catch (error) {}
  };

  return (
    <Box w="375" h="375" alignSelf="center">
      <WebView
        ref={ref}
        style={{backgroundColor: 'transparent'}}
        javaScriptEnabled={true}
        scrollEnabled={false}
        onMessage={onMessage}
        source={{html: html}}
      />
    </Box>
  );
};

const html = `
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 maximum-scale=1.0"
        />
      </head>
      <style>
        ${webviewResetCss}
        ${loadingCss}
      </style>
      <body>
        <div id="comp" class="comp">
         ${[...Array(16)]
           .map((item, index) => {
             return `
             <div class="circleWrap" onanimationend="animEnd()"><div class="circle" data-index={index}></div></div>`;
           })
           .join('')}
        </div>
        <script type="text/javascript">
    
        const animEnd = () => {          
          if ('ReactNativeWebView' in window) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: 'animEnd' }),
            )
          }
        }

      </script>
      </body>
    </html>`;

export default Loading;
