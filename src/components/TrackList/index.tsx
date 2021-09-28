import { useQuery } from '@apollo/client'
import { BackButton, Title, TrackCard } from 'components'
import { GET_TRACKS, PlaylistItem, Track, TrackItem, TrackVars } from 'graphql/queries'
import React, { useCallback } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import { Colors } from 'styles'
import { styles } from './styles'

interface Props {
  playlist: PlaylistItem,
  onTrackPress: (trackItem: TrackItem) => void
}

export const TrackList: React.FC<Props> = ({ playlist, onTrackPress }) => {

  const { loading, error, data } = useQuery<Track, TrackVars>(GET_TRACKS, { variables: { playlistId: playlist.id }})
  
  const ListHeader = useCallback( () => (
    <Title textStyle={styles.title}>{playlist.name}</Title>
  ), [])

  if (loading)
    return (
      <ActivityIndicator size='large' color={Colors.Primary} />
    )

  if (error)
    return (
      <Title>Error</Title>
    )

  
  return (
    <SafeAreaView style={styles.root}>
      <BackButton />
      <FlatList
        style={styles.flatlist}
        ListHeaderComponent={ListHeader}
        data={data?.tracks_aggregate.nodes}
        keyExtractor={(item, index) => index.toString() }
        renderItem={({ item }) => (
          <TrackCard track={item} onTrackPress={() => onTrackPress(item)} />
        )}
      />
    </SafeAreaView>
  )
}
