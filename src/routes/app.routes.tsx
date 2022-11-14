
import { Platform } from 'react-native';
import { useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
import { History } from '@screens/History';
import { Exercise } from '@screens/Exercise';

type AppRoutes = {
  Home: undefined;
  Exercise: undefined;
  Profile: undefined;
  History: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          // height: Platform.OS === "android" ? 'auto' : 96,
          height: 76,
          paddingBottom: sizes[6],
          paddingTop: sizes[6]
        }
      }}
    >
      <Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color, focused }) => (<HomeSvg fill={color} width={iconSize} height={iconSize} />)
        }}
      />

      <Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color, focused }) => (<HistorySvg fill={color} width={iconSize} height={iconSize} />)
        }}  
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (<ProfileSvg fill={color} width={iconSize} height={iconSize} />)
        }}
      />

      <Screen
        name="Exercise"
        component={Exercise}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )
}