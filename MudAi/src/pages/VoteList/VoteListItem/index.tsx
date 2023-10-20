import React from 'react';
import {formatDate} from 'src/js/functions';
import SvgCalender from 'src/comp/svg/SvgCalender';
import {StyleSheet} from 'react-native';
import {Box, HStack, Image, Text} from 'native-base';
import AspectBox from 'src/comp/AspectBox';
import FastImage from 'react-native-fast-image';

type Props = {
  // img: string;
  // title: string;
  // startDate: number;
  // endDate: number;
  item: any;
};

const VoteListItem = (props: Props) => {
  const startAt = formatDate(true, props.item.startAt);
  const endAt = formatDate(true, props.item.endAt);

  return (
    <Box style={styles.comp}>
      <Box style={styles.inner}>
        <AspectBox ratio={437 / 327} style={styles.figure}>
          <FastImage
            style={styles.img}
            source={{uri: props.item.thumbnail}}
            alt=""
          />
        </AspectBox>
        <Box style={styles.infoWrapper}>
          <Box style={styles.info}>
            <Text style={styles.title}>{props.item.title}</Text>
            <HStack style={styles.dateContainer}>
              <Box style={styles.svg}>
                <SvgCalender />
              </Box>
              <Box style={styles.dateStack}>
                <Text
                  style={
                    styles.date
                  }>{`${startAt.d}/${startAt.m}/${startAt.y}`}</Text>
                <Text>~</Text>
                <Text
                  style={
                    styles.date
                  }>{`${endAt.d}/${endAt.m}/${endAt.y}`}</Text>
              </Box>
            </HStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const width = 16;
const styles = StyleSheet.create({
  comp: {position: 'relative'},
  inner: {},
  figure: {
    // "@include imgFitContainer(437 / 327 * 100%)": true,
    borderRadius: 16,
    overflow: 'hidden',
  },
  img: {
    height: '100%',
  },
  infoWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20,
    gap: 2,
    width: `${(287 / 327) * 100}%`,
    backgroundColor: 'rgba(136, 128, 128, 0.4)',
    // backdropFilter: 'blur(20px)',
    borderRadius: 16,
    color: '#ffffff',
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
  },
  dateContainer: {display: 'flex', alignItems: 'center', gap: 4},
  svg: {width: width, height: width, lineHeight: 0},
  dateStack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    // transform: 'translateY(1.5px)',
  },
  date: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Epilogue',
  },
});

export default VoteListItem;
