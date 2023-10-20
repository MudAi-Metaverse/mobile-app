import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

type Measurements = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const useAccordion = (init: 'close' | undefined) => {
  const [isExpand, setIsExpand] = useState(init === 'close' ? false : true);
  const contentWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [contetntLayout, setContetntLayout] = useState<Measurements>();
  const innerHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (contentWrapRef.current) {
      Animated.spring(innerHeight, {
        toValue: isExpand && contetntLayout ? contetntLayout.height : 0,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpand]);

  const toggleAccordion = useCallback(() => {
    setIsExpand(prev => !prev);
  }, []);

  return {
    toggleAccordion,
    isExpand,
    contentWrapRef,
    contentRef,
    innerHeight,
    setContetntLayout,
  };
};

export default useAccordion;
