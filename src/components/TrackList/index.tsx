import { ApolloError } from '@apollo/client'
import { BackButton, Title, TrackCard } from 'components'
import { PlaylistItem, TrackPlayer } from 'graphql/queries'
import React, { useCallback } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native'
import { Colors } from 'styles'
import { styles } from './styles'

interface Props {
  playlist: PlaylistItem,
  loading: boolean,
  error?: ApolloError,
  trackList: TrackPlayer[],
  onTrackPress: (trackIndex: number) => void
}

export const TrackList: React.FC<Props> = ({ playlist, onTrackPress, loading, error, trackList }) => {
  
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
        contentContainerStyle={styles.flatlistContent}
        data={trackList}
        keyExtractor={(item, index) => index.toString() }
        renderItem={({ item, index }) => (
          <TrackCard
            track={item}
            onTrackPress={() => onTrackPress(index)}
          />
        )}
      />
    </SafeAreaView>
  )
}
