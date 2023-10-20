import React, {useState, useRef, useEffect} from 'react';
import {Text, Box, Pressable, ScrollView, HStack, View} from 'native-base';
import {Animated, StyleSheet, useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Hero from 'src/pages/Hero';
import {assets} from 'src/js/configView';
import SearchInput from 'src/comp/SearchInput';
import AccountInfo from 'src/comp/AccountInfo';
import useChatSearch from 'src/pages/ChatRoomIndex/useChatSearch';
import RoomList from 'src/pages/ChatRoomIndex/RoomList';
import FollowList from 'src/pages/ChatRoomIndex/FollowList';
import useTabScroll from 'src/pages/ChatRoomIndex/useTabBar';
import FollowerList from 'src/pages/ChatRoomIndex/FollowerList';
import SvgGroupAdd from 'src/comp/svg/SvgGroupAdd';
import {useRecoilValue} from 'recoil';
import {followListAtom, listHeightSelectorFamily} from 'src/recoil';
import {genMemberSelectList} from 'src/pages/ChatRoom/functionsChatRoom';

type tabType = 'friends' | 'rooms';
type listType = 'follow' | 'follower' | 'rooms';

const ChatRoomIndex = () => {
  const navigation = useNavigation();
  const {userObj, onChangeSearchText, searchText} = useChatSearch();
  const [tab, settab] = useState<tabType>('friends');
  const [innerTab, setinnerTab] = useState('follow');
  const [innerTabHeight, setinnerTabHeight] = useState(0);
  const [scrollViewHeight, setscrollViewHeight] = useState('auto');
  const scrollViewRef = useRef(null);
  const layout = useWindowDimensions();
  const {onScroll, onScrollEnd, scrollRatio, pageNum, currentPage, scrolling} =
    useTabScroll(2);
  const followList = useRecoilValue(followListAtom);

  const listHeightSelector = useRecoilValue(listHeightSelectorFamily());

  const calcListHeight = () => {
    let currentList;
    if (tab === 'rooms') {
      currentList = 'rooms';
    } else {
      currentList = innerTab;
    }

    const current = listHeightSelector.filter(obj => obj.tab === currentList);

    if (current.length === 0 || !current[0].height || scrolling) {
      return '100%';
    }

    if (currentList === 'rooms') {
      return current[0].height;
    } else {
      return current[0].height + innerTabHeight + 16;
    }
  };

  useEffect(() => {
    setscrollViewHeight(calcListHeight());
  }, [tab, innerTab, listHeightSelector, scrolling]);

  const changeTab = index => {
    scrollViewRef.current.scrollTo({x: index * layout.width});
  };

  return (
    <>
      <ScrollView
        bg="#000"
        _contentContainerStyle={{
          pb: 4,
        }}>
        <Box mb="3" position="relative">
          <Hero
            h="306"
            img={assets.hero_chat}
            ratio={306 / 375}
            head={'MudAi Chat'}
            description={'personalized ai chat'}
          />
          <Box
            px="5"
            style={{
              transform: [{translateY: -15}],
            }}>
            <SearchInput
              onChangeText={onChangeSearchText}
              searchText={searchText}
            />
          </Box>
        </Box>

        <HStack justifyContent={'flex-end'} px="6" mb="2">
          <Pressable
            w="6"
            h="6"
            onPress={async () => {
              const sections = await genMemberSelectList(followList);
              navigation.navigate('ChatRoomCreateModal', {
                screen: 'ChatRoomMemberSelect',
                params: {
                  sections,
                },
              });
            }}>
            <SvgGroupAdd color="#fff" />
          </Pressable>
        </HStack>

        {userObj ? (
          <AccountInfo user={userObj} />
        ) : (
          <>
            <Box style={styles.l_Tab}>
              <Tab
                settab={settab}
                tab={tab}
                changeTab={changeTab}
                scrollRatio={scrollRatio}
                pageNum={pageNum}
                currentPage={currentPage}
                setinnerTabHeight={setinnerTabHeight}
              />
            </Box>

            <View
              style={{
                height: scrollViewHeight,
                // height: calcListHeight(),
              }}>
              <ScrollView
                ref={scrollViewRef}
                _contentContainerStyle={{
                  flexGrow: 1,
                }}
                horizontal
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
                onMomentumScrollEnd={onScrollEnd}>
                <Box w={layout.width} flexGrow={1}>
                  <InnerTab setinnerTab={setinnerTab}>
                    <Box w={layout.width}>
                      <FollowList />
                    </Box>

                    <Box w={layout.width}>
                      <FollowerList />
                    </Box>
                  </InnerTab>
                </Box>

                <Box w={layout.width}>
                  <RoomList />
                </Box>
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

const Tab = props => {
  const tabs = ['friends', 'rooms'];
  const animLeft = useRef(new Animated.Value(0)).current;
  const layout = useWindowDimensions();

  useEffect(() => {
    const left = isNaN(props.scrollRatio) ? 0 : props.scrollRatio;

    Animated.timing(animLeft, {
      toValue: left * (1 / props.pageNum) * layout.width,
      duration: 1,
      useNativeDriver: true,
    }).start();
  }, [props.scrollRatio]);

  useEffect(() => {
    props.settab(tabs[props.currentPage]);
  }, [props.currentPage]);

  return (
    <Box
      position={'relative'}
      onLayout={e => {
        props.setinnerTabHeight(e.nativeEvent.layout.height);
      }}>
      <Box style={styles.tab}>
        {tabs.map((item, index) => {
          return (
            <Pressable
              key={item}
              flex={1}
              // borderBottomWidth={1}
              // borderBottomColor={props.tab === item ? '#fff' : 'transparent'}
              p="3"
              onPress={() => {
                props.settab(item);
                props.changeTab(index);
              }}>
              <Text
                fontSize="md"
                textAlign="center"
                color={tabs[props.currentPage] === item ? '#fff' : 'gray.400'}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </Box>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: '0%',
          width: `${100 / props.pageNum}%`,
          height: 1,
          backgroundColor: '#fff',
          transform: [{translateX: animLeft}],
        }}
      />
    </Box>
  );
};

const InnerTab = props => {
  const tabs = ['follow', 'follower'];
  const [tabIndex, settabIndex] = useState(0);

  return (
    <Box position={'relative'} w={'100%'} onLayout={props.handleOnLayout}>
      <Box style={styles.tab} mb="4">
        {tabs.map((item, index) => {
          const isActive = tabIndex === index;
          return (
            <Pressable
              key={item}
              // flex={1}
              p="3"
              px="5"
              borderBottomWidth={1}
              borderBottomColor={isActive ? '#fff' : 'transparent'}
              onPress={() => {
                settabIndex(index);
                props.setinnerTab(item);
              }}>
              <Text
                fontSize="md"
                textAlign="center"
                color={isActive ? '#fff' : 'gray.400'}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </Box>

      <Box display={tabIndex === 0 ? 'block' : 'none'}>{props.children[0]}</Box>

      <Box display={tabIndex === 1 ? 'block' : 'none'}>{props.children[1]}</Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  l_Tab: {marginBottom: 16},
  tab: {display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 16},
  body: {paddingHorizontal: 16, color: '#fff'},
  list: {display: 'flex', flexDirection: 'column', gap: 8},
  userItem: {
    // background:
    //   'linear-gradient(\n    217.32deg,\n    #2a283a -0.01%,\n    rgba(22, 20, 31, 0.6) 100%\n  )',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  chatList: {display: 'flex', flexDirection: 'column', gap: 8},
  roomItem: {},
  itemInner: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#7b61ff',
    borderRadius: 8,
  },
});

export default ChatRoomIndex;
