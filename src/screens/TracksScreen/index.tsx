import { useQuery } from '@apollo/client'
import { Player } from '@react-native-community/audio-toolkit'
import { useRoute } from '@react-navigation/core'
import { MiniPlayer, TrackList } from 'components'
import { GET_TRACKS, TrackItem } from 'graphql/queries'
import { TrackScreenRouteProps } from 'navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Image, Platform, StatusBar, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from 'styles'
import { styles } from './styles'

const TracksScreen: React.FC = () => {
  const { params } = useRoute<TrackScreenRouteProps>();
  const MusicPlayer = useRef( new Player("https://cdn.uppbeat.io/audio-output/303/181/main-version/streaming-previews/STREAMING-wazzup-mountaineer-main-version-02-14-804.mp3")).current
  const [track, setTrack] = useState<TrackItem | null>(null);
  

  useEffect( () => {
    if (Platform.OS === 'android')
      StatusBar.setBackgroundColor(Colors.FullShadeTranslucent, true)

    return () => {
      if (Platform.OS === 'android')
        StatusBar.setBackgroundColor(Colors.TRANSPARENT, true)
    }
  }, [])

  // useEffect( () => {
  //   MusicPlayer.play()
  // }, [])

  const toggleMusic = useCallback( () => {
    if (MusicPlayer.isPlaying)
      MusicPlayer.pause()
    else
      MusicPlayer.play()
  }, [])

  
  const fetchTracks = () => {
    const { loading, error, data } = useQuery(GET_TRACKS, { variables: { playlistId: params.playlist.id }})
    
    if (loading) {
      console.log('Loading')
      return (
        <Text>Loading</Text>
      )
    }
    if (error) {
      console.log('Error')
      return (
        <Text>Error</Text>
      )
    }

    console.log('Data: ', data.tracks_aggregate.nodes)
    // setTracks(data.tracks_aggregate.nodes)

    return (
      <View>
        <Text>FOI!!!</Text>
      </View>
    )
    
  }


  
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
        onTrackPress={(trackItem: TrackItem) => setTrack(trackItem)}
      />

      <MiniPlayer track={track} visible={true} />

      {/* {fetchTracks()}
      <TouchableOpacity
        // onPress={() => navigate(MainRoutes.TRACKS_SCREEN)}
        onPress={toggleMusic}
        style={styles.button}
      >
        <Text>Press Me!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        // onPress={() => navigate(MainRoutes.TRACKS_SCREEN)}
        onPress={() => goBack()}
        style={styles.button}
      >
        <Text>GO BACK !!!</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default TracksScreen