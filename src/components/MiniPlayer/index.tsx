import { GET_TRACKS, Track, TrackItem, TrackVars } from 'graphql/queries'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, SafeAreaView, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { MiniplayerArtist, MiniplayerTitle, SVG } from 'components'
import { Colors, Metrics } from 'styles'

import chevronDown from 'assets/icons/chevron-down.svg';
import play from 'assets/icons/play.svg';
import pause from 'assets/icons/pause.svg';
import skipPrevious from 'assets/icons/skip-back.svg';
import skipForward from 'assets/icons/skip-forward.svg';
import { styles } from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Slider from '@react-native-community/slider'
import { Player } from '@react-native-community/audio-toolkit'
import { GraphqlClient } from 'services/GraphqlClient'

interface Props {
  track: TrackItem | null,
  visible: boolean,
  playlistId: number,
  trackIndex: number | null,
  changeTrackCallback: (track: TrackItem, trackIndex) => void
}

const hitSlop = {
  left: Metrics.defaulHitSlop,
  right: Metrics.defaulHitSlop,
  top: Metrics.defaulHitSlop,
  bottom: Metrics.defaulHitSlop,
}

let interval: NodeJS.Timer

export const MiniPlayer: React.FC<Props> = ({ track, playlistId, trackIndex, changeTrackCallback }) => {
  const [seek, setSeek] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [player, setPlayer] = useState<Player | null>(track ? new Player(track?.href) : null)
  // const PlayerRef = useRef(track ? new Player(track?.href) : null).current
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [trackList, setTrackList] = useState<TrackItem[]>( [] );

  useEffect( () => {
    player?.prepare()
    setDuration( player ? Math.round(player.duration) : 0)  

    player?.on('ended', () => {
      setSeek(0)
      setPlaying(false)
      player.prepare()
    })
  }, [])
  
  const togglePlayer = useCallback( () => {
    if(player?.isPlaying) {
      player.pause()
      setDuration( player ? Math.round(player.duration) : 0)
      setPlaying(false)
    } else {  
      player?.play()
      setDuration( player ? Math.round(player.duration) : 0)
      setPlaying(true)
    }

    return () => {
      player?.destroy()
    }
  }, [])
  
  useEffect( () => {
    player?.stop()
    
    console.log('Heppened: ', track?.title)
    setPlayer(null)
    setPlayer(track ? new Player(track?.href) : null)


    console.log('Player: ', player)
    const trackList = GraphqlClient.readQuery<Track, TrackVars>({
      query: GET_TRACKS,
      variables: { playlistId }
    })

    player?.prepare()

    togglePlayer();
    
    setTrackList(trackList ? trackList.tracks_aggregate.nodes : []);

  }, [track, trackIndex])


 
  useEffect( () => {
    if (isPlaying) {
      interval = setInterval( () => {
        setSeek((prevState) => prevState + 0.1*1000)
      }, 100)

    } else {
      
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isPlaying])

  const onFinishSeeking = useCallback( (value: number) => {
    player?.seek(value, () => {
      setSeek(value)
      interval = setInterval( () => {
        setSeek((prevState) => prevState + 0.1*1000)
      }, 100)
    })
  }, [])

  const onStartSeeking = useCallback( () => {
    clearInterval(interval)
  }, [])

  const onForwardPress = useCallback( () => {
    const len = trackList.length
    if (len > 0 && trackIndex) {
      if (trackIndex === len - 1)
        changeTrackCallback(trackList[0], 0)
      else
        changeTrackCallback(trackList[trackIndex + 1], trackIndex + 1)

      setSeek(0)
    }
  }, [trackList, track, trackIndex])

  const onBackwardPress = useCallback( () => {
    const len = trackList.length
    if (len > 0 && trackIndex) {
      if (trackIndex === 0)
        changeTrackCallback(trackList[len - 1], len - 1)
      else
        changeTrackCallback(trackList[trackIndex - 1], trackIndex - 1)

      setSeek(0)
    }
  }, [trackList, track, trackIndex])

  return (
    <LinearGradient
      style={styles.root}
      colors={[ Colors.Black, Colors.FullShade, Colors.Primary]}
      locations={[0.2, 0.7, 1]}
    > 
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => null}
          hitSlop={hitSlop}
          style={styles.dropDown}
        >
          <SVG xml={chevronDown} color={Colors.LightestShade} width={40} height={40} />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.imageContainer}>
        <Image source={{ uri: track?.picture }} style={styles.trackImage} />
      </View>

      <View style={styles.container}>
        <MiniplayerTitle>{track?.title}</MiniplayerTitle>
        <MiniplayerArtist>{track?.artist}</MiniplayerArtist>
      </View>

      <View style={styles.player}>
        <Slider
          minimumTrackTintColor={Colors.Primary}
          maximumTrackTintColor={Colors.LightShade}
          minimumValue={0}
          maximumValue={duration}
          step={0.1}
          style={styles.slider}
          onValueChange={() => null}
          onSlidingComplete={onFinishSeeking}
          onSlidingStart={onStartSeeking}
          value={seek}
        />

        <View style={styles.controllers}>
          <TouchableOpacity activeOpacity={0.8} style={styles.skipButton} onPress={onBackwardPress}>
            <SVG xml={skipPrevious} color={Colors.Black} fill={Colors.Black} width={30} height={30} />
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={0.8} style={styles.playButton} onPress={togglePlayer}>
            <SVG xml={!isPlaying ? play : pause} color={Colors.White} fill={Colors.White}  width={40} height={40}  />
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={0.8} style={styles.skipButton} onPress={onForwardPress}>
            <SVG xml={skipForward} color={Colors.Black} fill={Colors.Black} width={30} height={30} />
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  )
}