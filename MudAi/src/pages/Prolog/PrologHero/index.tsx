import React, {useState, useEffect, useRef} from 'react';
import {
  Center,
  HStack,
  Box,
  VStack,
  Button,
  Image,
  View,
  Pressable,
  Text,
} from 'native-base';
import AspectBox from 'src/comp/AspectBox';
import {assets} from 'src/js/configView';
import Carousel from 'react-native-reanimated-carousel';
import {Dimensions, StyleSheet} from 'react-native';
import Typography from 'src/comp/Typography';
import ChevronLeft from 'src/comp/svg/ChevronLeft';
import {setPadding} from 'src/js/styles';
import VerticalText from 'src/comp/VerticalText';

type Props = {};

const {width: PAGE_WIDTH} = Dimensions.get('window');

const PrologHero = (props: Props) => {
  const carouselRef = useRef();
  const [verticalTextLayout, setVerticalTextLayout] = useState();
  const data = [
    assets.slider_1,
    assets.slider_2,
    assets.slider_3,
    assets.slider_4,
    assets.slider_5,
  ];
  return (
    <Box>
      <Carousel
        ref={carouselRef}
        enabled={false}
        loop
        autoPlay={true}
        autoPlayInterval={3000}
        width={PAGE_WIDTH}
        height={PAGE_WIDTH / (375 / 505)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 0.8,
        }}
        data={data}
        renderItem={({index}) => {
          return (
            <AspectBox ratio={505 / 375}>
              <Image
                w="100%"
                h="100%"
                source={data[index]}
                resizeMode="cover"
                alt="slider_1"
                borderBottomLeftRadius={10}
              />
            </AspectBox>
          );
        }}
      />

      <Box style={styles.info}>
        <Box mb="6">
          <VerticalText
            head={'MudAi chat'}
            description={'personalized ai chat'}
          />
        </Box>

        <Box style={styles.footer}>
          <Box style={styles.aiFigure}>
            <Image style={styles.aiImg} source={assets.ai_1} alt="" />
          </Box>
          <Box style={styles.btnContainer}>
            <Pressable
              id="button_prev"
              style={[styles.btn]}
              onPress={() => {
                carouselRef.current?.prev();
              }}>
              <Box style={styles.svg}>
                <ChevronLeft />
              </Box>
            </Pressable>
            <Pressable
              id="button_next"
              style={[styles.btn]}
              onPress={() => {
                carouselRef.current?.next();
              }}>
              <Box style={[styles.svg, styles.btnRight]}>
                <ChevronLeft />
              </Box>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const aiImgWidth = 86;
const width = 50;

const styles = StyleSheet.create({
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    ...setPadding([0, 14, 16]),
    zIndex: 10,
  },
  verticalText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    transform: [
      {translateY: -362 / 2 + 77 / 2},
      {translateX: -362 / 2 + 77 / 2},
      {rotate: '-90deg'},
    ],
    // 77,
    // 362
    marginBottom: 24,
    color: '#ffffff',
  },
  headContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  head: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 40,
    lineHeight: 49,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',

    gap: 54,
  },
  aiFigure: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: aiImgWidth,
    height: aiImgWidth,
    borderRadius: 999,
    overflow: 'hidden',
  },
  aiImg: {width: '100%', height: '100%', objectFit: 'cover'},
  btnContainer: {display: 'flex', flexDirection: 'row', gap: 40},
  btn: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: width,
    borderRadius: 999,
    backgroundColor: '#fff',
  },
  svg: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: 12,
    height: 12,
    transform: [{translateX: -6}, {translateY: -6}],
  },
  btnRight: {
    // left: 'calc(50% + 2px)',
    transform: [{translateX: -6}, {translateY: -6}, {rotate: '180deg'}],
  },
});

export default PrologHero;
