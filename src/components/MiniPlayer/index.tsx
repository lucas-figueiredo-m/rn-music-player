import { TrackItem } from 'graphql/queries'
import React, { useCallback, useEffect, useState } from 'react'
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

interface Props {
  track: TrackItem | null,
  visible: boolean
}

const hitSlop = {
  left: Metrics.defaulHitSlop,
  right: Metrics.defaulHitSlop,
  top: Metrics.defaulHitSlop,
  bottom: Metrics.defaulHitSlop,
}

let interval: NodeJS.Timer

export const MiniPlayer: React.FC<Props> = ({ track, visible }) => {
  const [seek, setSeek] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [player, setPlayer] = useState<Player | null>(track ? new Player(track?.href) : null)
  const [isPlaying, setPlaying] = useState<boolean>(false);

  useEffect( () => {
    player?.prepare()
    setDuration( player ? Math.round(player.duration) : 0)
    console.log('duration: ', duration)
  }, [])
  
  useEffect( () => {
    if (player) 
      player.pause()
    
    setPlayer(track ? new Player(track?.href) : null)
  }, [track])


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
    if (isPlaying) {
      interval = setInterval( () => {
        setSeek(player ? player.currentTime : 0)
        console.log('Current: ', player?.currentTime)
      }, 1000)

    } else {
      
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isPlaying])

  useEffect( () => {
    setSeek(player ? player.currentTime : 0)
    console.log('Current: ', player?.currentTime)
  }, [duration, player, seek])

  const onSeek = useCallback( (value: number) => {
    setSeek(value)
    player?.seek(value)
  }, [])

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
          step={1}
          style={styles.slider}
          onValueChange={() => null}
          onSlidingComplete={onSeek}
          value={seek}
        />

        <View style={styles.controllers}>
          <TouchableOpacity activeOpacity={0.8} style={styles.skipButton} onPress={() => null}>
            <SVG xml={skipPrevious} color={Colors.Black} fill={Colors.Black} width={30} height={30} />
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={0.8} style={styles.playButton} onPress={togglePlayer}>
            <SVG xml={!isPlaying ? play : pause} color={Colors.White} fill={Colors.White}  width={40} height={40}  />
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={0.8} style={styles.skipButton} onPress={() => null}>
            <SVG xml={skipForward} color={Colors.Black} fill={Colors.Black} width={30} height={30} />
          </TouchableOpacity>
        </View>

      </View>
    </LinearGradient>
  )
}