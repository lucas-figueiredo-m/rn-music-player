import React, { useEffect } from 'react'
import { View } from 'react-native'
import { SVG } from 'components';
import logo from 'assets/img/logo.svg'
import { styles } from './styles'
import { MainRoutes } from 'navigation/config/router';
import { useNavigation } from '@react-navigation/native';
import { SplashScreenProps } from 'navigation';


const SplashScreen: React.FC = () => {
  const { reset } = useNavigation<SplashScreenProps>();

  useEffect( () => {

    setTimeout(() => {
      reset({
        index: 0,
        routes: [{ name: MainRoutes.PLAYLIST_SCREEN }]
      })
    }, 4000);

  }, [])

  return (
    <View style={styles.root}>
      <SVG xml={logo} width={100} height={100} />
    </View>
  )
}

export default SplashScreen