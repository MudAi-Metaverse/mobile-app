import {Box, Image} from 'native-base';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import AspectBox from 'src/comp/AspectBox';
import CellList from 'src/comp/CellList';
import GradientWrapper from 'src/comp/GradientWrapper';
import LevelLabel from 'src/comp/LevelLabel';
import {assets} from 'src/js/configView';
import {useAccount} from 'wagmi';

const list = [
  {href: 'Personalized', text: 'personalized MudAi'},
  {href: 'ChatHome', text: 'Talk with MudAi'},
  {href: 'Setting', text: 'Your personalized data'},
  {href: 'Personalizing', text: 'Restart personalizing'},
  {href: 'VoteList', text: 'Vote'},
];

const Index = () => {
  return (
    <GradientWrapper>
      <Box pb="60">
        <Box mb="5">
          <AspectBox
            ratio={1}
            roundedBottomRight="16"
            roundedBottomLeft="16"
            overflow="hidden">
            <Image
              w="100%"
              h="100%"
              source={assets.ai_3}
              resizeMode="cover"
              alt="slider_1"
            />
          </AspectBox>
          <Box style={styles.levelLabel}>
            <LevelLabel />
          </Box>
        </Box>

        <Box px="6">
          <CellList list={list} />
        </Box>
      </Box>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  levelLabel: {position: 'absolute', left: 24, bottom: 12, width: 180},
});

export default Index;
