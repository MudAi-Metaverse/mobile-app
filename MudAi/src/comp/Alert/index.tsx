import React, {useState, useEffect} from 'react';
import {Center, HStack, Text, Box, VStack, Button, Image} from 'native-base';
import {LogBox, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Typography from 'src/comp/Typography';
import {assets} from 'src/js/configView';
import GradientText from 'src/comp/GradientText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  text: string;
};

const Alert = (props: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <Box style={[styles.comp, {marginTop: insets.top + 16}]}>
      <Box style={styles.imgWrap}>
        <Image style={styles.img} source={assets.mudai} alt="" />
        <Box style={styles.badge}>
          <Box style={styles.polygonWrap}>
            <SvgIcon />
          </Box>
        </Box>
      </Box>
      <Box style={styles.info}>
        <Typography type={'p_cap_eng'} style={styles.caption}>
          notification
        </Typography>
        <GradientText style={styles.text}>{props.text}</GradientText>
      </Box>
    </Box>
  );
};

const width = 18;
const styles = StyleSheet.create({
  comp: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 345,
    width: `${(345 / 393) * 100}%`,
    alignSelf: 'center',
    padding: 12,
    gap: 22,
    background: '#ffffff',
    // boxShadow: '0 15 45 rgba(108, 95, 188, 0.3)',
    borderRadius: 8,
  },

  imgWrap: {
    position: 'relative',
    width: 46,
    height: 46,
  },

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 16,
  },

  badge: {
    position: 'absolute',
    left: 37,
    top: 0,
  },

  polygonWrap: {
    position: 'relative',
    width: width,
    height: width,
  },

  caption: {
    marginBottom: 2,
    color: '#323142',
  },
});

const SvgIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 18" fill="none">
      <Path
        fill="#45B36B"
        d="M6.5.866a3 3 0 0 1 3 0l4.794 2.768a3 3 0 0 1 1.5 2.598v5.536a3 3 0 0 1-1.5 2.598L9.5 17.134a3 3 0 0 1-3 0l-4.794-2.768a3 3 0 0 1-1.5-2.598V6.232a3 3 0 0 1 1.5-2.598L6.5.866Z"
      />
      <Path stroke="#FCFCFD" d="m5 9 2 2 4-4" />
    </Svg>
  );
};

export default Alert;
