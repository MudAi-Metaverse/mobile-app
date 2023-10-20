import React, {useState, useEffect} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Container,
  ScrollView,
} from 'native-base';
import VoteFooter from 'src/pages/GetPoint/VoteFooter';
import Hero from 'src/pages/Hero';
import {useRecoilValue} from 'recoil';
import {userStoreAtom} from 'src/recoil';
import {StyleSheet} from 'react-native';
import Typography from 'src/comp/Typography';

const GetPoint = () => {
  const userStore = useRecoilValue(userStoreAtom);
  const [textWidth, setTextWidth] = useState(85);

  return (
    <Box style={styles.comp} bg="#121212">
      <ScrollView>
        <Box style={styles.l_Hero}>
          <Hero head={'MudAi Vote'} description={'vote and earn MudAi pt'} />
        </Box>
        <Box style={styles.l_borderHead}>
          <Container style={styles.borderHead}>
            <Text
              style={styles.borderHeadText}
              onTextLayout={e => {
                setTextWidth(e.nativeEvent.lines[0].width);
              }}>
              infomation
            </Text>
            <Box style={styles.borderBottom} width={textWidth} />
          </Container>
        </Box>

        <Box style={styles.info}>
          <Typography type="h_eng" style={[styles.head]}>
            Get MudAi Pt
          </Typography>
          <Text style={styles.descHead}>DESCRIPTION</Text>
          <Text style={styles.desc}>
            MudAi points are important as we move forward with future
            operations. Users express their intentions with these points, and
            users who vote for adopted ideas will earn points.
          </Text>
        </Box>
      </ScrollView>

      <Box style={styles.l_VoteFooter}>
        {userStore && <VoteFooter userPoint={userStore.point} point={10} />}
      </Box>
    </Box>
  );
};

const contentpadding = 20;
const styles = StyleSheet.create({
  comp: {paddingBottom: 100},
  l_Hero: {marginBottom: 28},
  l_borderHead: {
    marginBottom: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: '#4f4f4f',
    paddingLeft: contentpadding,
  },
  borderHead: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  borderHeadText: {
    fontFamily: 'NotoSans',
    fontSize: 18,
    lineHeight: 28,
    color: '#fff',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  borderBottom: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    height: 2,
    backgroundColor: '#fff',
  },
  info: {paddingHorizontal: contentpadding, color: '#ffffff'},
  head: {marginBottom: 10, textTransform: 'capitalize'},
  descHead: {
    fontFamily: 'Hiragino Sans',
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 7,
  },
  desc: {
    fontFamily: 'NotoSans',
    fontSize: 16,
    lineHeight: 22,
    color: '#8e8e95',
  },
  l_VoteFooter: {position: 'absolute', bottom: 0, left: 0, width: '100%'},
});

export default GetPoint;
