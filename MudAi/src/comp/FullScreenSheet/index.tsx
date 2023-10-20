import React, {useEffect, useRef, useCallback, useMemo} from 'react';
import {Pressable} from 'native-base';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {Keyboard} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

type Props = {
  isShow: boolean;
  setisShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const FullScreenSheet = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(
    () => props.snapPoints || ['1%', '100%'],
    [props.snapPoints],
  );

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index <= 0) {
      props.setisShow();
    }
  }, []);

  useEffect(() => {
    if (props.isShow) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [props.isShow]);

  const onClose = () => {
    bottomSheetRef.current?.snapToIndex(0);
    Keyboard.dismiss();
  };

  const BackDrop = useCallback(props => {
    return (
      <Pressable
        onPress={onClose}
        w="100%"
        h="100%"
        position="absolute"
        top="0%"
        left="0%"
      />
    );
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        style={{
          zIndex: 999999999,
        }}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: '#fff',
        }}
        handleComponent={null}
        keyboardBehavior={'interactive'}
        keyboardBlurBehavior={'restore'}
        backdropComponent={BackDrop}>
        {props.children}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default FullScreenSheet;
