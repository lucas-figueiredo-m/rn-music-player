import { GET_TRACKS, Track, TrackItem, TrackVars } from 'graphql/queries'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
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
import { Player } from '@react-native-community/audio-toolkit'
import { GraphqlClient } from 'services/GraphqlClient'
import { millis2clock } from 'helpers/timeHelpers'

const { width } = Dimensions.get('screen');

interface Props {
  track: TrackItem | null,
  expanded: boolean,
  playlistId: number,
  trackIndex: number | null,
  changeTrackCallback: (track: TrackItem, trackIndex) => void
  setExpanded: Dispatch<SetStateAction<boolean>>
}

const hitSlop = {
  left: Metrics.defaulHitSlop,
  right: Metrics.defaulHitSlop,
  top: Metrics.defaulHitSlop,
  bottom: Metrics.defaulHitSlop,
}


let interval: NodeJS.Timer
let MusicPlayer: Player

export const MiniPlayer: React.FC<Props> = ({ track, playlistId, trackIndex, changeTrackCallback, expanded, setExpanded }) => {
  const [seek, setSeek] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [trackList, setTrackList] = useState<TrackItem[]>( [] );
  const AnimSize = useRef( new Animated.Value(0) ).current

  useEffect( () => {
    Animated.timing(AnimSize, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false
    }).start()
  }, [expanded])

  const playForwardMusic = useCallback( () => {
    const len = trackList.length;
    if (len > 0 && (trackIndex || trackIndex === 0)) {
      if (trackIndex < len - 1)
        changeTrackCallback(trackList[trackIndex + 1], trackIndex + 1)
      else
        changeTrackCallback(trackList[0], 0)
    }
  }, [trackList, track, trackIndex])

  const playBackwardMusic = useCallback( () => {
    const len = trackList.length
    if (len > 0 && (trackIndex || trackIndex === 0)) {
      if (trackIndex === 0)
        changeTrackCallback(trackList[len - 1], len - 1)
      else
        changeTrackCallback(trackList[trackIndex - 1], trackIndex - 1)
    }
  }, [trackList, track, trackIndex])

  useEffect( () => {
    MusicPlayer = new Player(track?.href || '');
    MusicPlayer.prepare()
    setDuration( MusicPlayer.duration > 0 ? Math.round(MusicPlayer.duration) : 0)
    MusicPlayer.play();

    MusicPlayer?.on('ended', () => {
      setSeek(0)
      MusicPlayer.pause()
      playForwardMusic()
    })

    return () => {
      MusicPlayer.destroy()
    }
  }, [])

  useEffect( () => {
    setSeek(0)
    MusicPlayer = new Player(track?.href || '')
    MusicPlayer.prepare((err) => {
      if (!err) 
        setDuration( MusicPlayer.duration > 0 ? Math.round(MusicPlayer.duration) : 0)
        setPlaying(true)
        MusicPlayer.play()
    })

    MusicPlayer?.on('ended', () => {
      setSeek(0)
      playForwardMusic()
    })

    const trackList = GraphqlClient.readQuery<Track, TrackVars>({
      query: GET_TRACKS,
      variables: { playlistId }
    })
    setTrackList(trackList ? trackList.tracks_aggregate.nodes : []);

    return () => {
      MusicPlayer.destroy()
    }

  }, [track, trackIndex])
  
  const togglePlayer = useCallback( () => {
    if(MusicPlayer.isPlaying) {
      MusicPlayer.pause()
      setPlaying(false)
    } else {  
      MusicPlayer.play()
      setPlaying(true)
    }

    return () => {
      MusicPlayer.destroy()
    }
  }, [])
 
  useEffect( () => {
    if (isPlaying) {
      interval = setInterval( () => {
        setSeek(MusicPlayer.currentTime)
      }, 100)

    } else {
      
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isPlaying, track])

  const onFinishSeeking = useCallback( (value: number) => {
    MusicPlayer.seek(value, () => {
      setSeek(value)
      interval = setInterval( () => {
        setSeek((prevState) => prevState + 0.1*1000)
      }, 100)
    })
  }, [])

  const onStartSeeking = useCallback( () => {
    clearInterval(interval)
  }, [])

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