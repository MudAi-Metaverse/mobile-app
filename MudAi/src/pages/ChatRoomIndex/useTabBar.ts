import {useEffect, useRef, useState} from 'react';

const useTabScroll = (_pageNum: number, initialPage: number = 0) => {
  const pageNum = _pageNum;
  const [scrollRatio, setscrollRatio] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [scrolling, setScrolling] = useState(false);

  const onScroll = e => {
    // pageNum.current =
    //   e.nativeEvent.contentSize.width / e.nativeEvent.layoutMeasurement.width;
    setScrolling(true);

    const ratio =
      e.nativeEvent.contentOffset.x /
      (e.nativeEvent.contentSize.width - e.nativeEvent.layoutMeasurement.width);

    setCurrentPage(Math.floor(ratio * (pageNum - 1)));
    setscrollRatio(ratio);
  };

  const onScrollEnd = () => {
    setScrolling(false);
  };

  return {scrollRatio, pageNum, currentPage, onScroll, onScrollEnd, scrolling};
};

export default useTabScroll;
