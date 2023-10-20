import React, {useEffect, useRef, useState} from 'react';

// chatWrapperの高さ、スクロール位置を調整する
const useChatWrapper = () => {
  const textareaRef = useRef(null);
  const bottomThreshold = 16;
  const [inputHeight, setinputHeight] = useState(52 + bottomThreshold);
  const [screenHeight, setscreenHeight] = useState();

  useEffect(() => {
    if (textareaRef.current) {
      const resizeHandler = (entries: ResizeObserverEntry[]) => {
        for (let entry of entries) {
          setinputHeight(entry.contentRect.height + bottomThreshold);
        }
      };

      // devの時だけ2回走る
      const textareaObserver = new ResizeObserver(resizeHandler);
      textareaObserver.observe(textareaRef.current);
    }
  }, [textareaRef]);

  // 初回bottomにスクロール
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });

    setscreenHeight(window.outerHeight);
  }, []);

  // textareaに改行が入ったときにスクロール
  useEffect(() => {
    const ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0) {
      return;
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [inputHeight]);

  return {
    inputHeight,
    textareaRef,
    screenHeight,
  };
};

export default useChatWrapper;
