import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import SplashScreen from 'screens/SplashScreen';
import PlaylistScreen from 'screens/PlaylistScreen';
import { MainRoutes } from './config/router';

export type RootStackParamList = {
  [MainRoutes.SPLASH_SCREEN]: undefined,
  [MainRoutes.PLAYLIST_SCREEN]: undefined
}

export type SplashScreenProps = StackNavigationProp<RootStackParamList, MainRoutes.SPLASH_SCREEN>



const Stack = createStackNavigator<RootStackParamList>()

const Router: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={MainRoutes.SPLASH_SCREEN} screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen  key={MainRoutes.SPLASH_SCREEN} name={MainRoutes.SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen key={MainRoutes.PLAYLIST_SCREEN} name={MainRoutes.PLAYLIST_SCREEN} component={PlaylistScreen} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default Router;