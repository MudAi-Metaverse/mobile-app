import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import {HStack, Text, Pressable, VStack, Box} from 'native-base';
import {createElement} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import Typography from 'src/comp/Typography';
import SvgCategory from 'src/comp/svg/SvgCategory';
import SvgHome from 'src/comp/svg/SvgHome';
import SvgProfile from 'src/comp/svg/SvgProfile';
import SvgSearchTab from 'src/comp/svg/SvgSearchTab';
import SvgTabbarFocus from 'src/comp/svg/SvgTabbarFocus';
import {chatTabbarHiddenAtom, tabbarHeightAtom} from 'src/recoil';

const tabbarIcons = {
  Home: SvgHome,
  Chat: SvgSearchTab,
  // Profile: SvgCategory,
  Profile: SvgProfile,
  Test: SvgProfile,
};

const Tabbar = ({state, descriptors, navigation}) => {
  const chatTabbarHidden = useRecoilValue(chatTabbarHiddenAtom);
  const setTabbarHeight = useSetRecoilState(tabbarHeightAtom);

  return (
    <HStack
      onLayout={e => {
        setTabbarHeight(e.nativeEvent.layout.height);
      }}
      space={5}
      justifyContent={'center'}
      bg="#16171D"
      py="1"
      px="6"
      display={chatTabbarHidden ? 'none' : undefined}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            key={route.key}
            flex={1}
            py={'6px'}
            onPress={onPress}
            onLongPress={onLongPress}>
            <VStack space="1" alignItems={'center'}>
              <Box position={'relative'}>
                <Box w="5" h="5">
                  {createElement(tabbarIcons[route.name], {
                    color: isFocused ? '#fff' : '#565656',
                  })}
                </Box>
                {isFocused && (
                  <Box
                    w="10px"
                    h="10px"
                    position="absolute"
                    bottom="0"
                    right="0"
                    zIndex={-1}>
                    <SvgTabbarFocus />
                  </Box>
                )}
              </Box>

              <Typography
                type="p_main_eng"
                style={{
                  fontSize: 10,
                  color: isFocused ? '#fff' : '#565656',
                  fontWeight: '600',
                }}>
                {label}
              </Typography>
            </VStack>
          </Pressable>
        );
      })}
    </HStack>
  );
};

export default Tabbar;
