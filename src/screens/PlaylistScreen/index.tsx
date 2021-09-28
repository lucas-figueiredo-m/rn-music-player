import { useQuery } from '@apollo/client'
import { SVG, Title } from 'components'
import { PlaylistCard } from 'components'
import { GET_PLAYLISTS, Playlist } from 'graphql/queries'
import React from 'react'
import { SafeAreaView, View, Text, ActivityIndicator, FlatList } from 'react-native'
import { Colors } from 'styles'
import logo from 'assets/img/logo.svg'

import { styles } from './styles'


const PlaylistScreen: React.FC = () => {

  const { loading, error, data } = useQuery<Playlist>(GET_PLAYLISTS);
  

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Title>Playlists</Title>
        <SVG xml={logo} />
      </View>
      {
        loading
        ?
        <ActivityIndicator size='large' color={Colors.Primary} />
        :
        error
        ?
        <Text>Error</Text>
        :
        <FlatList
          data={data?.playlists}
          keyExtractor={(item) => item.id.toString()}
          indicatorStyle='white'
          contentContainerStyle={styles.scrollContent}
          renderItem={({ item }) => <PlaylistCard playlist={item} /> }
        />
      }

    </SafeAreaView>
  )
}

export default PlaylistScreen