import React, {useState, useEffect, memo, useCallback} from 'react';
import {Pressable, Center, HStack, Text, Box, SectionList} from 'native-base';
import {selectedUsersAtom} from 'src/recoil';
import {useRecoilState} from 'recoil';
import Spacer from 'src/comp/Spacer';
import FastImage from 'react-native-fast-image';
import {setImageSource} from 'src/pages/ChatRoom/functionsChatRoom';
import SvgCheck from 'src/comp/svg/SvgCheck';
import {useRoute} from '@react-navigation/native';

type Props = {};

const MemberSelectList = (props: Props) => {
  const route = useRoute();
  const [listData, setlistData] = useState<any[]>(route.params?.sections || []);

  const handleKeyExtractor = useCallback(item => {
    return item.address;
  }, []);

  const renderItem = ({item}) => {
    return <ItemMemberSelect user={item} />;
  };

  const Separator = memo(() => {
    return <Spacer s={12} />;
  });

  const SectionHeader = ({section: {title}}) => (
    <Text fontSize="md" mb="3" fontWeight="500">
      {title}
    </Text>
  );

  return (
    <SectionList
      flex={1}
      px="2"
      _contentContainerStyle={{
        flexGrow: 1,
      }}
      sections={listData}
      renderItem={renderItem}
      keyExtractor={handleKeyExtractor}
      initialNumToRender={10}
      ItemSeparatorComponent={Separator}
      renderSectionHeader={SectionHeader}
    />
  );
};

const ItemMemberSelect = props => {
  const [selectedUsers, setselectedUsers] = useRecoilState(selectedUsersAtom);
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelected = () => {
    setselectedUsers(prev => {
      if (prev.find(user => user.address === props.user.address)) {
        return prev.filter(user => user.address !== props.user.address);
      } else {
        return [...prev, props.user];
      }
    });
  };

  useEffect(() => {
    if (selectedUsers.find(user => user.address === props.user.address)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedUsers]);

  return (
    <Pressable onPress={toggleSelected}>
      <HStack space="4" alignItems="center">
        <Box
          w="46"
          h="46"
          borderRadius="full"
          position="relative"
          overflow="hidden">
          <FastImage
            style={{
              width: '100%',
              height: '100%',
            }}
            source={setImageSource(props.user?.profileUrl)}
            alt="mudai"
            resizeMode={FastImage.resizeMode.cover}
          />
        </Box>
        <Text flex="1" fontSize="md" fontWeight="700">
          {props.user?.name}
        </Text>
        <Center
          p="1"
          bg={isSelected ? 'rgb(126, 96,234)' : '#fff'}
          borderRadius="full"
          position="relative"
          overflow="hidden">
          <Box w="16px" h="16px">
            <SvgCheck color="#c0c0c0" />
          </Box>
        </Center>
      </HStack>
    </Pressable>
  );
};

export default MemberSelectList;
