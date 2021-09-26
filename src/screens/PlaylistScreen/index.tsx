import { useNavigation } from '@react-navigation/core'
import { Title } from 'components'
import AppContext from 'contexts/AppContext'
import { PlaylistScreenProps } from 'navigation'
import { MainRoutes } from 'navigation/config/router'
import React, { useContext } from 'react'
import { Image, SafeAreaView, TouchableOpacity, View, Text } from 'react-native'

import { styles } from './styles'


const PlaylistScreen: React.FC = () => {

  const { user } = useContext(AppContext);
  const { navigate } = useNavigation<PlaylistScreenProps>();

  console.log(user?.images[0])

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Title>Playlists</Title>
        <Image source={{ uri: user?.images[0].url }} style={styles.userImage} />
      </View>

      <TouchableOpacity
        onPress={() => navigate(MainRoutes.TRACKS_SCREEN)}
        style={styles.button}
      >
        <Text>Press Me!</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default PlaylistScreen