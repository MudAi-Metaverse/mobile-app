import React, {useState} from 'react';
import VoteItem from 'src/comp/VoteItem';
import {voteAtom} from 'src/recoil';
import {useRecoilState, useRecoilValue} from 'recoil';
import {formatDate} from 'src/js/functions';
import {StyleSheet} from 'react-native';
import {Box, Text} from 'native-base';

const VoteList = () => {
  const vote = useRecoilValue(voteAtom);
  const startAt = formatDate(true, vote?.startAt);
  const endAt = formatDate(true, vote?.endAt);

  return (
    <Box style={styles.comp}>
      <Box>
        <Text style={styles.title}>{vote?.title}</Text>
        <Text style={styles.date}>
          Start {`${startAt.y}/${startAt.m}/${startAt.d}`} ~{' '}
          {`${endAt.y}/${endAt.m}/${endAt.d}`}
        </Text>
      </Box>

      <Box style={styles.list}>
        {vote?.choices?.map((item, index) => {
          return (
            <Box key={item.title}>
              <VoteItem item={item} index={index} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  comp: {
    display: 'flex',
    flexDirection: 'column',
    gap: 22,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 28 * 1.2,
    color: '#ffffff',
  },
  date: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 16 * 2,
    color: '#ffffff',
    opacity: 0.7,
  },
  list: {display: 'flex', flexDirection: 'column', gap: 16},
});

export default VoteList;
