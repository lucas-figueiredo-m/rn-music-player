import React from 'react'
import { SafeAreaView, View, Text, ActivityIndicator, FlatList } from 'react-native'
import { useQuery } from '@apollo/client'
import { SVG, Title } from 'components'
import { PlaylistCard } from 'components'
import { GET_PLAYLISTS, Playlist } from 'graphql/queries'
import { Colors } from 'styles'
import logo from 'assets/img/logo.svg'

import { styles } from './styles'


const PlaylistScreen: React.FC = () => {

  const { loading, error, data } = useQuery<Playlist>(GET_PLAYLISTS);

  return (
    <SafeAreaView testID='playlist-screen' style={styles.root}>
      <View style={styles.header}>
        <Title>Playlists</Title>
        <SVG xml={logo} />
      </View>
      {
        loading
        ?
        <ActivityIndicator testID='loader' size='large' color={Colors.Primary} />
        :
        error
        ?
        <Text>Error</Text>
        :
        <View style={styles.container}>
          <FlatList
            data={data?.playlists}
            testID='playlist-list'
            keyExtractor={(item) => item.id.toString()}
            indicatorStyle='white'
            contentContainerStyle={styles.scrollContent}
            renderItem={({ item }) => <PlaylistCard playlist={item} /> }
          />
        </View>
      }

    </SafeAreaView>
  )
}

export default PlaylistScreen