import React, {useEffect, useState} from 'react';
import {Box, HStack, Text} from 'native-base';
import Typography from 'src/comp/Typography';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import {assets} from 'src/js/configView';
import {setPadding} from 'src/js/styles';
import AspectBox from 'src/comp/AspectBox';
import VerticalText from 'src/comp/VerticalText';
import {InterfaceBoxProps} from 'native-base/lib/typescript/components/primitives/Box';
import FastImage from 'react-native-fast-image';

type Props = InterfaceBoxProps & {
  head: string;
  description: string;
  img?: ImageSourcePropType;
  ratio?: number;
};

const Hero = ({head, description, img, ratio, ...others}: Props) => {
  const [imgRatio, setimgRatio] = useState(ratio);

  useEffect(() => {
    if (!ratio) {
      const imageSize = Image.resolveAssetSource(assets.vote_hero);
      setimgRatio(imageSize.width / imageSize.height);
    }
  }, []);

  return (
    <Box style={styles.comp} {...others}>
      <AspectBox ratio={imgRatio} style={styles.heroFigure}>
        <FastImage
          style={styles.heroImg}
          source={img || assets.vote_hero}
          alt=""
        />
      </AspectBox>

      <Box style={styles.info}>
        <VerticalText head={head} description={description} />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  comp: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    borderBottomLeftRadius: 16,
  },
  heroFigure: {
    width: '100%',
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  heroImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 10,
    ...setPadding([39, 14, 22]),
    // marginBottom: 24,
  },
  verticalText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    // transform: [{rotate: '-90deg'}],
    color: '#ffffff',
  },
  headContainer: {display: 'flex', alignItems: 'flex-end', gap: 6},
  head: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 40,
    lineHeight: 49,
  },
});

export default Hero;
