import React, {useState, useEffect} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Pressable,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import GradientWrapper from 'src/comp/GradientWrapper';
import {getStore, queryStore} from 'src/js/firebase';
import {StyleSheet} from 'react-native';
import VoteListItem from 'src/pages/VoteList/VoteListItem';
import CustomButton from 'src/comp/CustomButton';

const VoteList = () => {
  const [list, setList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    queryStore('vote').then(res => {
      setList(res);
    });
  }, []);

  return (
    <GradientWrapper>
      <Center mt="5">
        {/* <CustomButton
          wrapperProps={{width: '100%'}}
          onPress={() => {
            navigation.navigate('GetPoint');
          }}>
          <Text>Get Point</Text>
        </CustomButton> */}
      </Center>
      <Box style={styles.comp}>
        <Box style={styles.header}>
          <Text style={styles.head}>Discover</Text>
          <Text style={styles.subHead}>All vote list</Text>
        </Box>

        <VStack style={styles.grid}>
          {list.map(item => {
            return (
              <Pressable
                style={[styles.item, {color: '#fff'}]}
                onPress={() => {
                  navigation.navigate('Vote', {id: item.id});
                }}
                key={item.id}>
                <VoteListItem item={item} />
              </Pressable>
            );
          })}
        </VStack>
      </Box>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  comp: {paddingVertical: 40},
  header: {paddingHorizontal: 24},
  head: {
    marginBottom: 8,
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 40,
    textTransform: 'capitalize',
    color: '#ffffff',
  },
  subHead: {
    marginBottom: 12,
    fontFamily: 'Epilogue',
    fontWeight: '400',
    fontSize: 16,
    color: '#ffffff',
  },
  grid: {
    // display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fill, minmax(1fr, 327px))',
    gap: 12,
    paddingHorizontal: 32,
  },
  item: {width: '100%'},
});

export default VoteList;
