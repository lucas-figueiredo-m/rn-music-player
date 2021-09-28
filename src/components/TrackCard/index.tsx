import { TrackAuthor, TrackTitle } from 'components'
import { TrackItem } from 'graphql/queries'
import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { styles } from './styles'

interface Props {
  track: TrackItem,
  onTrackPress: () => void
}

export const TrackCard: React.FC<Props> = ({ track, onTrackPress }) => {

  return (
    <TouchableOpacity
      style={styles.root}
      onPress={onTrackPress}
    >
      <Image source={{ uri: track.picture }} style={styles.image} />
      <View style={styles.container}>
        <TrackTitle>{track.title}</TrackTitle>
        <TrackAuthor>{track.artist}</TrackAuthor>

      </View>
    </TouchableOpacity>
  )
}
