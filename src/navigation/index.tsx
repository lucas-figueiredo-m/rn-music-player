import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import SplashScreen from 'screens/SplashScreen';
import PlaylistScreen from 'screens/PlaylistScreen';
import { MainRoutes } from './config/router';
import TracksScreen from 'screens/TracksScreen';

export type RootStackParamList = {
  [MainRoutes.SPLASH_SCREEN]: undefined,
  [MainRoutes.PLAYLIST_SCREEN]: undefined,
  [MainRoutes.TRACKS_SCREEN]: undefined,
}

export type SplashScreenProps = StackNavigationProp<RootStackParamList, MainRoutes.SPLASH_SCREEN>
export type PlaylistScreenProps = StackNavigationProp<RootStackParamList, MainRoutes.PLAYLIST_SCREEN>



const Stack = createStackNavigator<RootStackParamList>()

const Router: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name={MainRoutes.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={MainRoutes.PLAYLIST_SCREEN} component={PlaylistScreen} />
      <Stack.Screen name={MainRoutes.TRACKS_SCREEN} component={TracksScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default Router;