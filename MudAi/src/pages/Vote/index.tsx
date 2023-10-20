import React, {useState, useEffect} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Pressable,
  Image,
} from 'native-base';
import {StyleSheet} from 'react-native';
import GradientWrapper from 'src/comp/GradientWrapper';
import VoteList from 'src/pages/Vote/VoteList';
import {useRecoilState, useRecoilValue} from 'recoil';
import {userAddressAtom, voteAtom, voteUserStoreAtom} from 'src/recoil';
import useSettle from 'src/pages/Vote/useSettle';
import VoteForm from 'src/comp/VoteForm';
import useVote from 'src/pages/Vote/useVote';
import AspectBox from 'src/comp/AspectBox';
import FastImage from 'react-native-fast-image';

const Vote = () => {
  const vote = useRecoilValue(voteAtom);
  const userStore = useRecoilValue(voteUserStoreAtom);
  useVote();

  return (
    <GradientWrapper>
      <Box style={styles.comp}>
        {userStore && <VoteForm />}
        <AspectBox ratio={1} style={styles.figure}>
          <FastImage
            style={{
              height: '100%',
            }}
            source={{uri: vote?.thumbnail}}
            alt=""
          />
        </AspectBox>
        <VoteList />
      </Box>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  comp: {
    display: 'flex',
    flexDirection: 'column',
    gap: 22,
    paddingBottom: 22,
  },
  figure: {
    width: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
});

export default Vote;
