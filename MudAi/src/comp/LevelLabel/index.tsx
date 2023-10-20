import {fetcher} from 'src/js/functions';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Box} from 'native-base';
import GradientText from 'src/comp/GradientText';
import {Config} from 'src/js/Config';
import {useAccount} from 'wagmi';

const LevelLabel = () => {
  const {address} = useAccount();
  const [level, setlevel] = useState<number>();

  useEffect(() => {
    if (address) {
      fetcher(Config.GET_LEVEL_ENDPOINT, {
        uid: address,
      })
        .then(res => res.json())
        .then(res => {
          // console.log(res.result);
          setlevel(res.result);
        });
    }
  }, [address]);

  return <Presenter level={level} />;
};

type Props = {
  level: number | undefined;
};

const Presenter = (props: Props) => {
  return (
    <Box style={styles.comp}>
      <GradientText style={styles.text}>LEVEL {props.level}</GradientText>
    </Box>
  );
};

const styles = StyleSheet.create({
  comp: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#ffffff',
    // boxShadow: '5 6 24 rgba(126, 132, 161, 0.1)',
    borderRadius: 8,
  },
  text: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: '#7E84A1',
  },
});

export default LevelLabel;
