
import React, { useEffect, useState } from 'react'
import { Image, Platform, StatusBar, View } from 'react-native'
import { useRoute } from '@react-navigation/core'
import { MiniPlayer, TrackList } from 'components'
import { TrackItem } from 'graphql/queries'
import { TrackScreenRouteProps } from 'navigation'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from 'styles'
import { styles } from './styles'

const TracksScreen: React.FC = () => {
  const { params } = useRoute<TrackScreenRouteProps>();
  const [track, setTrack] = useState<TrackItem | null>(null);
  const [trackIndex, setTrackIndex] = useState<number | null>(null)
  

  useEffect( () => {
    if (Platform.OS === 'android')
      StatusBar.setBackgroundColor(Colors.FullShadeTranslucent, true)

    return () => {
      if (Platform.OS === 'android')
        StatusBar.setBackgroundColor(Colors.TRANSPARENT, true)
    }
  }, [])



  return (
    <View style={styles.root}>

      <View style={styles.container}>
        <Image source={{ uri: params.playlist.picture }} style={styles.playlistImage} />
        <LinearGradient
          colors={[ Colors.TRANSPARENT, Colors.FullShade]}
          style={styles.translucentConteiner}
          locations={[0.5, 1]}
        />
      </View>

      <TrackList
        playlist={params.playlist}
        onTrackPress={(trackItem: TrackItem, trackI: number) => {
          setTrackIndex(trackI)
          setTrack(trackItem)
        }}
      />

      <MiniPlayer
        track={track}
        trackIndex={trackIndex}
        visible={true}
        playlistId={params.playlist.id}
        changeTrackCallback={(trackItem: TrackItem, trackI: number) => {
          setTrackIndex(trackI)
          setTrack(trackItem)
        }}
      />

    </View>
  )
}

export default TracksScreen