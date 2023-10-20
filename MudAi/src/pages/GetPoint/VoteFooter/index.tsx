import React, {useEffect, useRef, useState} from 'react';
import CustomButton from 'src/comp/CustomButton';
import {useRecoilValue} from 'recoil';
import {userStoreAtom} from 'src/recoil';
import useUserVote from 'src/js/useUserVote';
import {Box, Text} from 'native-base';
import {Animated, StyleSheet} from 'react-native';

type Props = {
  point: number;
  userPoint: number | undefined;
};

const VoteFooter = (props: Props) => {
  const [floatPoint, setfloatPoint] = useState(0);
  const [point, setpoint] = useState(props.userPoint);
  const [isShowFloat, setIsShowFloat] = useState(false);
  const [animating, setanimating] = useState(false);

  const reqIdRef = useRef();
  const countRef = useRef(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const userStore = useRecoilValue(userStoreAtom);
  const {addPoint} = useUserVote();

  const animatedStyle = {
    transform: [{translateY: animatedValue}],
    opacity: animatedOpacity,
  };

  const toggleAnimatedValues = () => {
    const options = {
      duration: 200,
      useNativeDriver: true,
    };
    Animated.timing(animatedValue, {
      toValue: isShowFloat ? -25 : 0,
      ...options,
    }).start();

    Animated.timing(animatedOpacity, {
      toValue: isShowFloat ? 1 : 0,
      ...options,
    }).start();
  };

  const pointAnim = () => {
    if (countRef.current < props.point) {
      countRef.current = countRef.current + 1;
      setfloatPoint(countRef.current);
      setpoint(props.userPoint + countRef.current);
      reqIdRef.current = requestAnimationFrame(pointAnim);
    } else {
      // アニメーション終了時
      setTimeout(() => {
        setIsShowFloat(false);
      }, 1500);
    }
  };

  useEffect(() => {
    toggleAnimatedValues();

    if (isShowFloat) {
      // アニメーション開始時
      setTimeout(() => {
        setanimating(true);
        addPoint(props.point);
        pointAnim();
      }, 200);
    } else {
      setanimating(false);
      countRef.current = 0;
      setfloatPoint(0);
    }

    return () => cancelAnimationFrame(reqIdRef.current);
  }, [isShowFloat]);

  return (
    <Box style={styles.comp}>
      <Box style={styles.left}>
        <Text style={styles.head}>MudAi pt</Text>
        <Box style={styles.pointWrap}>
          <Text style={styles.pt}>
            {animating ? point : props.userPoint} pt
          </Text>
          <Animated.View style={[styles.animContainer, {...animatedStyle}]}>
            <Text style={[styles.flotPoint]}>+{floatPoint}pt</Text>
          </Animated.View>
        </Box>
      </Box>

      <CustomButton
        mode="blue-round"
        disabled={userStore.point >= 10 && true}
        wrapperProps={userStore.point >= 10 && true && {opacity: 0.5}}
        py={3}
        onPress={() => {
          setIsShowFloat(true);
        }}>
        <Text fontSize={'16'}>get point</Text>
      </CustomButton>
    </Box>
  );
};

const styles = StyleSheet.create({
  comp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 13,
    paddingHorizontal: 20,
    backgroundColor: '#121212',
    // borderTop: '1px solid #4f4f4f',
  },
  left: {},
  pointWrap: {position: 'relative'},
  animContainer: {
    position: 'absolute',
    top: 10,
    width: '100%',
    alignItems: 'center',
  },
  flotPoint: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  head: {
    fontFamily: 'Hiragino Sans',
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 21,
    color: '#8e8e95',
  },
  pt: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 48,
    textTransform: 'capitalize',
    color: '#ffffff',
  },
});

export default VoteFooter;
