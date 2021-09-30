
import React, { useEffect, useState } from 'react'
import { Image, Platform, StatusBar, View } from 'react-native'
import { useRoute } from '@react-navigation/core'
import { MiniPlayer, TrackList } from 'components'
import { GET_TRACKS, Track, TrackPlayer, TrackVars } from 'graphql/queries'
import { TrackScreenRouteProps } from 'navigation'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from 'styles'
import { styles } from './styles'
import { useQuery } from '@apollo/client'
import { Player } from '@react-native-community/audio-toolkit'

const TracksScreen: React.FC = () => {
  const { params } = useRoute<TrackScreenRouteProps>();
  const [trackIndex, setTrackIndex] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<boolean>(false);
  const [trackList, setTrackList] = useState<TrackPlayer[]>([]);
  const { loading, error } = useQuery<Track, TrackVars>(GET_TRACKS, {
    variables: { playlistId: params.playlist.id },
    onCompleted: (data => {
      if (data)
        setTrackList(data.tracks_aggregate.nodes.map( (item) => ({ ...item, player: new Player(item.href)} )))
    })
  })

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
        loading={loading}
        error={error}
        trackList={trackList}
        onTrackPress={(trackI: number) => {
          setTrackIndex(trackI)
          setExpanded(true)
        }}
      />

      {/* TODO: adicionar uma instância de new Player pra cada href da lista e passar tudo junto para o MiniPlayer */}
      <MiniPlayer
        trackIndex={trackIndex}
        trackList={trackList}
        expanded={expanded}
        setExpanded={setExpanded}
        changeTrackCallback={(trackI: number) => {
          console.log('Change')
          setTrackIndex(trackI)
        }}
      />

    </View>
  )
}

export default TracksScreen