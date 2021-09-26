import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { SVG } from 'components';
import logo from 'assets/img/logo.svg'
import { styles } from './styles'
import { MainRoutes } from 'navigation/config/router';
import { useNavigation } from '@react-navigation/native';
import { SplashScreenProps } from 'navigation';
import { getAuthorization, getUserData } from 'store/actions/SpotifyActions';
import { UserData } from 'store/interfaces/SpotifyInterfaces';
import AppContext from 'contexts/AppContext';
import { Colors } from 'styles';


const SplashScreen: React.FC = () => {
  const { reset } = useNavigation<SplashScreenProps>();
  const [loading, setLoading] = useState<boolean>(false);

  const { setUser, setAuth } = useContext(AppContext);

  useEffect( () => {

    const oAuthToken = async () => {
      try {
        const token = await getAuthorization()
        setAuth(token);
        setLoading(true);
        const user: UserData = await getUserData();
        setUser(user)
        reset({
          index: 0,
          routes: [{ name: MainRoutes.PLAYLIST_SCREEN }]
        })
      } catch (error) {
        console.log()
      }
    }

    setTimeout(() => {
      oAuthToken()
    }, 4000);

  }, [])

  return (
    <View style={styles.root}>
      <SVG xml={logo} width={100} height={100} />
      { loading && (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color={Colors.Primary} />
        </View>
      )}
    </View>
  )
}

export default SplashScreen