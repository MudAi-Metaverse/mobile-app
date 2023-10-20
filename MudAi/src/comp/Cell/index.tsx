import ChevronRightRound from 'src/comp/svg/ChevronRightRound';
import React from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {Path, Svg} from 'react-native-svg';

export type CellProps = {
  href: string;
  text: string;
  disableFilter?: boolean;
};

const Cell = (props: CellProps) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(props.href);
      }}>
      <HStack
        alignItems="center"
        padding="4"
        pt="3"
        space="4"
        rounded="16"
        // style={`${css.comp} ${props.disableFilter && css.disableFilter}`}
      >
        <Box w="16px" h="16px">
          <SvgIcon />
        </Box>
        <Text flex="1" fontFamily="Poppins" fontSize="md" fontWeight="500">
          {props.text}
        </Text>
        <Box w="12px" h="12px">
          <ChevronRightRound />
        </Box>
      </HStack>
    </Pressable>
  );
};

const SvgIcon = () => {
  return (
    <Svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4.4152 0.741455C2.39019 0.741455 0.748535 2.38321 0.748535 4.40814V13.5749C0.748535 15.5998 2.39019 17.2416 4.4152 17.2416H13.5819C15.6068 17.2416 17.2485 15.5998 17.2485 13.5749V4.40814C17.2485 2.38321 15.6068 0.741455 13.5819 0.741455H4.4152ZM4.4152 2.5748H13.5819C14.5948 2.5748 15.4152 3.39522 15.4152 4.40814V13.5749C15.4152 14.5878 14.5948 15.4082 13.5819 15.4082H4.4152C3.40265 15.4082 2.58187 14.5878 2.58187 13.5749V4.40814C2.58187 3.39522 3.40265 2.5748 4.4152 2.5748ZM8.99853 4.40814C8.49253 4.40814 8.08187 4.81881 8.08187 5.32481C8.08187 5.83082 8.49253 6.24149 8.99853 6.24149C9.50453 6.24149 9.9152 5.83082 9.9152 5.32481C9.9152 4.81881 9.50453 4.40814 8.99853 4.40814ZM8.99853 7.15816C8.49253 7.15816 8.08187 7.56883 8.08187 8.07483V12.6582C8.08187 13.1642 8.49253 13.5749 8.99853 13.5749C9.50453 13.5749 9.9152 13.1642 9.9152 12.6582V8.07483C9.9152 7.56883 9.50453 7.15816 8.99853 7.15816Z"
        fill="#B7B9CE"
      />
    </Svg>
  );
};

export default Cell;
