import React, {useEffect, useState} from 'react';
import {Box, Image} from 'native-base';
import {StyleSheet} from 'react-native';
import GradientText from 'src/comp/GradientText';

export type CardProps = {
  img: string;
  level: number;
  title: string;
};

const Card = (props: CardProps) => {
  return (
    <Box style={styles.comp}>
      <Image style={styles.img} source={props.img} alt="" />
      <GradientText style={styles.level}>LEVEL {props.level}</GradientText>
      {/* <Typography type={"p_main_eng_bold"} style={`${css["title"]}`}>
        {props.title}
      </Typography> */}
    </Box>
  );
};

const styles = StyleSheet.create({
  comp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 48,
    // boxShadow: '5 6 24 rgba(126, 132, 161, 0.1)',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },

  img: {
    width: '100%',
    height: 156,
    borderRadius: 16,
    objectFit: 'contain',
    // objectPosition: 'top',
  },

  title: {
    // wordBreak: 'break-all',
  },
});

export default Card;
