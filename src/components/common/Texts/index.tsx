import React from 'react'
import { Text, TextStyle, TextProps } from 'react-native'
import { styles } from './styles'

interface Props extends TextProps {
  textStyle?: TextStyle
}

export const Title: React.FC<Props> = ({ children, textStyle }) =>
  <Text testID='title' style={[styles.title, textStyle]}>{children}</Text>

export const TrackTitle: React.FC<Props> = ({ children, textStyle }) =>
  <Text testID='track-title' style={[styles.trackTitle, textStyle]}>{children}</Text>

export const TrackAuthor: React.FC<Props> = ({ children, textStyle }) =>
  <Text testID='track-author' style={[styles.trackAuthor, textStyle]}>{children}</Text>

export const PlaylistTitle: React.FC<Props> = ({ children, textStyle }) =>
  <Text testID='playlist-title' style={[styles.playlistTitle, textStyle]}>{children}</Text>

export const PlayerTitle: React.FC<Props> = ({ children, textStyle }) =>
  <Text testID='player-title' style={[styles.playerTitle, textStyle]}>{children}</Text>

export const PlayerArtist: React.FC<Props> = ({ children, textStyle }) =>
  <Text testID='player-artist' style={[styles.playerArtist, textStyle]}>{children}</Text>

export const DurationTime: React.FC<Props> = ({ children, textStyle }) =>
  <Text testID='duration-time' style={[styles.durationTime, textStyle]}>{children}</Text>

export const MiniplayerTitle: React.FC<Props> = ({ children, textStyle }) =>
  <Text testID='miniplayer-title' style={[styles.miniplayerTitle, textStyle]}>{children}</Text>

export const MiniplayerArtist: React.FC<Props> = ({ children, textStyle }) =>
  <Text testID='miniplayer-artist' style={[styles.miniplayerArtist, textStyle]}>{children}</Text>