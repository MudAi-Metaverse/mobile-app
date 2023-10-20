import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import React, {useEffect, useRef} from 'react';
import {Alert, Animated, Easing} from 'react-native';

import {useSetRecoilState, useResetRecoilState} from 'recoil';
import {
  navigationRefReadyAtom,
  chatGroupNameAtom,
  selectedGroupImageAtom,
  selectedUsersAtom,
} from 'src/recoil';
import Index from 'src/pages/Index';
import Prolog from 'src/pages/Prolog';
import Personalized from 'src/pages/Personalized';
import Personalizing from 'src/pages/Personalizing';
import Chat from 'src/pages/Chat';
import Setting from 'src/pages/Setting';
import VoteList from 'src/pages/VoteList';
import Vote from 'src/pages/Vote';
import VoteDetail from 'src/pages/VoteDetail';
import GetPoint from 'src/pages/GetPoint';
import ChatRoomIndex from 'src/pages/ChatRoomIndex';
import ChatRoom from 'src/pages/ChatRoom';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tabbar from 'src/comp/Tabbar';
import Profile from 'src/pages/Profile';
import {navigationRef} from 'src/js/variables';
import {useAccount} from 'wagmi';
import ChatRoomEdit from 'src/pages/ChatRoomEdit';
import ChatRoomHeaderRight from 'src/comp/ChatRoomHeaderRight';
import ChatRoomMemberSelect from 'src/pages/ChatRoomMemberSelect';
import HeaderRightMemberInvite from 'src/pages/ChatRoomEdit/HeaderRightMemberInvite';
import ChatRoomMembers from 'src/pages/ChatRoomMembers';
import CloseSheetBtn from 'src/pages/ChatRoomMemberSelect/CloseSheetBtn';
import ChatRoomCreate from 'src/pages/ChatRoomCreate';
import ChatRoomImageEdit from 'src/pages/ChatRoomImageEdit';
import SubmitCreateBtn from 'src/pages/ChatRoomCreate/SubmitCreateBtn';
import GoNextBtn from 'src/pages/ChatRoomMemberSelect/GoNextBtn';
import ChatRoomSetting from 'src/pages/ChatRoomSetting';
import useResetGroupState from 'src/tab/Chat/useResetGroupState';
import ChatRoomCreateMemberSelect from 'src/pages/ChatRoomCreateMemberSelect';
import ChatRoomEditMemberSelect from 'src/pages/ChatRoomEditMemberSelect';
import SheetUserProfile from 'src/comp/SheetUserProfile';
import {Box, Text} from 'native-base';
import ChatUserProfile from 'src/pages/ChatUserProfile';
import PrologTest from 'src/PrologTest';

const linking = {
  prefixes: [],
  config: {
    screens: {},
  },
};

const animConfig = {
  animation: 'timing',
  config: {
    // stiffness: 1000, // 剛性
    // damping: 50, // 減衰
    // mass: 3, // 質量
    // overshootClamping: true, // オーバーシュートをクランプするか
    // restDisplacementThreshold: 0.01, // 静止状態にする距離
    // restSpeedThreshold: 0.01, // 静止状態にする速度
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
};

// https://medium.com/async/custom-transitions-in-react-navigation-2f759408a053
// https://medium.com/@ComJasmo2/react-navigation-custom-animation-for-react-native-6ffeae6c66c9
const animOptions = {
  transitionSpec: {
    open: animConfig,
    close: animConfig,
  },
};

const options = () => {
  return {
    // header: ({navigation, route, options, back}) => {
    //   return <Header navigation={navigation} title={route.name} />;
    // },
    headerBackTitle: 'Back',
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTintColor: '#fff',
    ...animOptions,
  };
};

const RootTabs = createBottomTabNavigator();

const Root = () => {
  const setIsNavigationReady = useSetRecoilState(navigationRefReadyAtom);

  return (
    <NavigationContainer
      ref={navigationRef}
      // theme={colorScheme !== 'dark' ? theme : darkTheme}
      onReady={() => {
        setIsNavigationReady(true);
      }}
      linking={linking}>
      <RootTabs.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerShown: false,
          // title: '青空教室',
          ...options(),
        }}
        tabBar={props => <Tabbar {...props} />}>
        <RootTabs.Screen
          name="Home"
          component={HomeStacks}
          options={{
            title: 'Home',
          }}
        />
        <RootTabs.Screen
          name="Chat"
          component={ChatStacks}
          options={{
            title: 'Chat',
          }}
        />
        <RootTabs.Screen
          name="Profile"
          component={ProfileStacks}
          options={{
            title: 'Profile',
          }}
        />
        {/* <RootTabs.Screen
          name="Test"
          component={TestStacks}
          options={{
            title: 'Test',
          }}
        /> */}
      </RootTabs.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ChatCreateGroupStack = createStackNavigator();
const ChatProfileStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const TestStack = createStackNavigator();

const HomeStacks = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={'Index'}
      screenOptions={{
        headerShown: false,
        // title: '青空教室',
        ...options(),
      }}>
      <HomeStack.Screen name="Prolog" component={Prolog} />
      <HomeStack.Screen name="Index" component={Index} />
      <HomeStack.Screen
        name="ChatHome"
        component={Chat}
        options={{
          headerShown: true,
          headerTitle: 'Chat',
        }}
      />
      <HomeStack.Screen
        name="Personalized"
        component={Personalized}
        options={{
          headerShown: true,
        }}
      />
      <HomeStack.Screen
        name="Personalizing"
        component={Personalizing}
        options={{
          headerShown: true,
        }}
      />
      <HomeStack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: true,
        }}
      />

      {/* Vote */}
      <HomeStack.Screen
        name="VoteList"
        component={VoteList}
        options={{
          headerShown: true,
        }}
      />
      <HomeStack.Screen
        name="Vote"
        component={Vote}
        options={{
          headerShown: true,
        }}
      />
      <HomeStack.Screen
        name="VoteDetail"
        component={VoteDetail}
        options={{
          headerShown: true,
        }}
      />
      <HomeStack.Screen
        name="GetPoint"
        component={GetPoint}
        options={{
          headerShown: true,
        }}
      />
    </HomeStack.Navigator>
  );
};

const ChatStacks = () => {
  // const {checkLoginState} = useLoginState();
  const {resetCreateGroupState} = useResetGroupState();

  return (
    <ChatStack.Navigator
      initialRouteName={'ChatRoomIndex'}
      screenListeners={{
        focus: e => {
          // RecoilWrapperで判定しているため不要？
          // checkLoginState();
        },
      }}
      screenOptions={{
        headerShown: true,
        animationEnabled: true,
        // title: '青空教室',
        ...options(),
      }}>
      <ChatStack.Screen
        name="ChatUserProfile"
        component={ChatUserProfile}
        options={{
          presentation: 'transparentModal',
          animationEnabled: false,
          headerShown: false,
        }}
      />
      <ChatStack.Screen
        name="ChatRoomIndex"
        component={ChatRoomIndex}
        options={{
          headerShown: false,
        }}
      />
      <ChatStack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({route}) => ({
          headerRight: () => {
            return <ChatRoomHeaderRight />;
          },
          title: route.params.title,
        })}
      />
      <ChatStack.Screen
        name="ChatRoomEdit"
        component={ChatRoomEdit}
        options={{}}
      />
      <ChatStack.Screen
        name="ChatRoomSetting"
        component={ChatRoomSetting}
        options={{}}
      />

      {/* グループ作成 */}
      <ChatStack.Screen
        name="ChatRoomCreateModal"
        component={ChatCreateGroupStacks}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
        listeners={{
          beforeRemove: e => {
            // Prevent default action
            resetCreateGroupState();
          },
        }}
      />

      {/* チャット編集 */}
      <ChatStack.Group
        screenOptions={{presentation: 'modal', headerShown: true}}>
        <ChatStack.Screen
          name="ChatRoomMemberInvite"
          component={ChatRoomEditMemberSelect}
          options={{
            headerRight: HeaderRightMemberInvite,
          }}
        />
        <ChatStack.Screen
          name="ChatRoomMembers"
          component={ChatRoomMembers}
          options={
            {
              // headerRight: HeaderRightMemberInvite,
            }
          }
        />
        <ChatCreateGroupStack.Screen
          name="ChatRoomImageEdit"
          component={ChatRoomImageEdit}
          options={{
            presentation: 'modal',
          }}
        />
      </ChatStack.Group>
    </ChatStack.Navigator>
  );
};

const ChatCreateGroupStacks = () => {
  return (
    <ChatCreateGroupStack.Navigator
      initialRouteName={'ChatRoomMemberSelect'}
      screenOptions={{
        headerShown: true,
        ...options(),
      }}>
      <ChatCreateGroupStack.Screen
        name="ChatRoomMemberSelect"
        component={ChatRoomCreateMemberSelect}
        options={{
          headerRight: GoNextBtn,
          headerLeft: CloseSheetBtn,
        }}
      />
      <ChatCreateGroupStack.Screen
        name="ChatRoomCreate"
        component={ChatRoomCreate}
        options={{
          headerRight: SubmitCreateBtn,
        }}
      />
      <ChatCreateGroupStack.Screen
        name="ChatRoomImageEdit"
        component={ChatRoomImageEdit}
        options={{
          presentation: 'modal',
        }}
      />
    </ChatCreateGroupStack.Navigator>
  );
};

const ProfileStacks = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName={'ProfileIndex'}
      screenOptions={{
        headerShown: false,
        // title: '青空教室',
        ...options(),
      }}>
      <ProfileStack.Screen
        name="ProfileIndex"
        component={Profile}
        options={{title: 'Profile'}}
      />
    </ProfileStack.Navigator>
  );
};

const TestStacks = () => {
  return (
    <TestStack.Navigator
      initialRouteName={'PrologTest'}
      screenOptions={{
        headerShown: false,
        ...options(),
      }}>
      <ProfileStack.Screen name="PrologTest" component={PrologTest} />
    </TestStack.Navigator>
  );
};

const useLoginState = () => {
  // 通知から飛んできた時にログインしてない判定をするため
  // const {isConnected, provider, address} = useWalletConnectModal();
  // const notLogin = useRef();
  // useEffect(() => {
  //   if (provider && !address && !isConnected) {
  //     navigationRef.current?.navigate('Home', {screen: 'Prolog'});
  //     // Alert.alert('Please login');
  //     // console.log('not login', navigationRef.current?.getState());
  //     notLogin.current = true;
  //   }
  // }, [address, isConnected, provider]);
  // const checkLoginState = () => {
  //   if (notLogin.current) {
  //     navigationRef.current?.navigate('Home', {screen: 'Prolog'});
  //     Alert.alert('Please login');
  //   }
  // };
  // return {
  //   checkLoginState,
  // };
};

export default Root;
