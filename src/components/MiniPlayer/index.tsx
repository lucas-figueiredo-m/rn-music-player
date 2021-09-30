import { TrackPlayer } from 'graphql/queries'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { View, SafeAreaView, Image, Animated, TouchableOpacity, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { DurationTime, MiniplayerArtist, MiniplayerTitle, PlayerArtist, PlayerTitle, SVG } from 'components'
import { Colors, Metrics } from 'styles'
import * as Progress from 'react-native-progress';

import chevronDown from 'assets/icons/chevron-down.svg';
import play from 'assets/icons/play.svg';
import pause from 'assets/icons/pause.svg';
import skipPrevious from 'assets/icons/skip-back.svg';
import skipForward from 'assets/icons/skip-forward.svg';
import { styles } from './styles'
import Slider from '@react-native-community/slider'
import { millis2clock } from 'helpers/timeHelpers'

const { width } = Dimensions.get('screen');

interface Props {
  trackList: TrackPlayer[],
  expanded: boolean,
  trackIndex: number | null,
  changeTrackCallback: (trackIndex) => void
  setExpanded: Dispatch<SetStateAction<boolean>>
}

const hitSlop = {
  left: Metrics.defaulHitSlop,
  right: Metrics.defaulHitSlop,
  top: Metrics.defaulHitSlop,
  bottom: Metrics.defaulHitSlop,
}


let interval: NodeJS.Timer
// let track.player: Player

export const MiniPlayer: React.FC<Props> = ({ trackIndex, trackList, changeTrackCallback, expanded, setExpanded }) => {
  const [seek, setSeek] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [track, setTrack] = useState<TrackPlayer | null>(null);
  const AnimSize = useRef( new Animated.Value(0) ).current

  useEffect( () => {
    Animated.timing(AnimSize, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false
    }).start()
  }, [expanded])

  const playForwardMusic = () => {
    const len = trackList.length;
    let index: number

    if (trackIndex !== null && track) {
      if (len > 0 && (trackIndex || trackIndex === 0)) {
        if (trackIndex < len - 1) 
          index = trackIndex + 1
        else 
          index = 0
    
        changeTrackCallback(index)
      }
    }
  }

  const playBackwardMusic = () => {
    const len = trackList.length
    let index: number

    if (trackIndex !== null && track) {
      if (len > 0 && (trackIndex || trackIndex === 0)) {
        if (trackIndex === 0)
          index = len - 1
        else
          index = trackIndex - 1
  
        changeTrackCallback(index)
      }
    }

  }


  useEffect( () => {
    console.log('TrackIndex: ', trackIndex)
    setSeek(0)
    if (track)
      track.player.pause()
    if (trackIndex !== null) {
      setTrack(() => {

        const newTrack = trackList[trackIndex]

        newTrack?.player.prepare((err) => {
          console.log('err: ', { err })
          if (!err) 
            setDuration( newTrack.player.duration > 0 ? Math.round(newTrack.player.duration) : 0)
            setPlaying(true)
            newTrack.player.play( (error) => {
              setDuration( newTrack.player.duration > 0 ? Math.round(newTrack.player.duration) : 0)
              console.log('Error: ', { error })
            })
        })

        newTrack?.player.on('ended', () => {
          setSeek(0)
          playForwardMusic()
        })

        return newTrack
      })
  
      
  
    }
    
    return () => {

      if (track)
        track.player.pause()
    }

  }, [trackIndex])
  
  const togglePlayer =  () => {
    if(track?.player.isPlaying) {
      track.player.pause()
      setPlaying(false)
    } else {  
      track?.player.play()
      setPlaying(true)
    }

    return () => {
      if (track)
        track.player.pause()
    }
  }
 
  useEffect( () => {
    if (isPlaying) {
      interval = setInterval( () => {
        setSeek(track?.player.currentTime || 0)
      }, 100)

    } else {
      
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isPlaying, track])

  const onFinishSeeking = (value: number) => {
    track?.player.seek(value, () => {
      setSeek(value)
      interval = setInterval( () => {
        setSeek((prevState) => prevState + 0.1*1000)
      }, 100)
    })
  }

  const onStartSeeking =  () => {
    clearInterval(interval)
  }

  const BottomInterp = AnimSize.interpolate({
    inputRange: [0, 1],
    outputRange: ['5%', '0%']
  })

  const WidthInterp = AnimSize.interpolate({
    inputRange: [0, 1],
    outputRange: ['90%', '100%']
  })

  const HeightInterp = AnimSize.interpolate({
    inputRange: [0, 1],
    outputRange: ['10%', '100%']
  })

  return (
    <Animated.View
      style={[styles.root, { bottom: BottomInterp, width: WidthInterp, height: HeightInterp }]}
    >
      {
        expanded
        ?
        (
          <LinearGradient
            style={[styles.gradientView, { borderRadius: expanded ? 0 : 15 }]}
            colors={[ Colors.Black, Colors.FullShade, Colors.Primary]}
            locations={[0.2, 0.7, 1]}
          > 
            <SafeAreaView>
              <TouchableOpacity
                onPress={() => setExpanded(false)}
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
              <PlayerTitle>{track?.title}</PlayerTitle>
              <PlayerArtist>{track?.artist}</PlayerArtist>
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

              <View style={styles.duration}>
                <DurationTime>{millis2clock(seek)}</DurationTime>
                <DurationTime>{millis2clock(duration)}</DurationTime>
              </View>

              <View style={styles.controllers}>
                <TouchableOpacity activeOpacity={0.8} style={styles.skipButton} onPress={playBackwardMusic}>
                  <SVG xml={skipPrevious} color={Colors.Black} fill={Colors.Black} width={30} height={30} />
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.8} style={styles.playButton} onPress={togglePlayer}>
                  <SVG xml={!isPlaying ? play : pause} color={Colors.White} fill={Colors.White}  width={40} height={40} />
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.8} style={styles.skipButton} onPress={playForwardMusic}>
                  <SVG xml={skipForward} color={Colors.Black} fill={Colors.Black} width={30} height={30} />
                </TouchableOpacity>
              </View>

            </View>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            style={styles.miniView}
            activeOpacity={0.8}
            onPress={() => setExpanded(true)}
          >
            <View style={styles.miniPlayer}>

              <View style={styles.imageContainer}>
                <Image source={{ uri: track?.picture }} style={styles.miniTrackImage} />
              </View>

              <View style={styles.miniContainer}>
                <MiniplayerTitle>{track?.title}</MiniplayerTitle>
                <MiniplayerArtist>{track?.artist}</MiniplayerArtist>
              </View>

              <TouchableOpacity
                hitSlop={hitSlop}
                activeOpacity={0.8}
                onPress={togglePlayer}
                style={styles.miniPlayContainer}
              >
                <SVG xml={!isPlaying ? play : pause} color={Colors.White} fill={Colors.White}  width={30} height={30} />
              </TouchableOpacity>
            </View>

            <View style={styles.barContainer}>
              <Progress.Bar
                color={Colors.White}
                borderColor={Colors.Black}
                progress={ duration > 0 && seek > 0 ? seek/duration : 0}
                height={5}
                width={width * 0.85}
              />
            </View>
          </TouchableOpacity>
        )
      }



    </Animated.View>
  )
}