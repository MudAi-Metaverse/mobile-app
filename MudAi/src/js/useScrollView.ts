import {useRef, useCallback} from 'react';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';

function useScrollView({
  onScrollUp,
  onScrollDown,
  onScrollRight,
  onScrollLeft,
  onScrollToBottom,
}: {
  onScrollUp?: (offsetY: number) => void;
  onScrollDown?: (offsetY: number) => void;
  onScrollRight?: (offsetX: number) => void;
  onScrollLeft?: (offsetX: number) => void;
  onScrollToBottom?: () => void;
}) {
  const offset = useRef({x: 0, y: 0});

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {nativeEvent} = event;
      const diffY = nativeEvent.contentOffset.y - offset.current.y;
      const diffX = nativeEvent.contentOffset.x - offset.current.x;

      if (onScrollDown && diffY > 0) {
        onScrollDown(diffY);
      }

      if (onScrollUp && diffY < 0) {
        onScrollUp(diffY);
      }

      if (onScrollRight && diffX > 0) {
        onScrollRight(diffX);
      }

      if (onScrollLeft && diffX < 0) {
        onScrollLeft(diffX);
      }

      if (
        onScrollToBottom &&
        nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
          nativeEvent.contentSize.height
      ) {
        onScrollToBottom();
      }
    },
    [onScrollDown, onScrollLeft, onScrollRight, onScrollToBottom, onScrollUp],
  );

  const onScrollBeginDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {nativeEvent} = event;
      offset.current = nativeEvent.contentOffset;
    },
    [],
  );

  return {
    onScroll,
    onScrollBeginDrag,
  };
}

export default useScrollView;
