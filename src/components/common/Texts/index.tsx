import React from 'react'
import { Text, TextStyle } from 'react-native'
import { styles } from './styles'

interface Props {
  textStyle?: TextStyle
}

export const Title: React.FC<Props> = ({ children, textStyle }) => <Text style={[styles.title, textStyle]}>{children}</Text>

export const TrackTitle: React.FC<Props> = ({ children, textStyle }) => <Text style={[styles.trackTitle, textStyle]}>{children}</Text>

export const TrackAuthor: React.FC<Props> = ({ children, textStyle }) => <Text style={[styles.trackAuthor, textStyle]}>{children}</Text>

export const PlaylistTitle: React.FC<Props> = ({ children, textStyle }) => <Text style={[styles.playlistTitle, textStyle]}>{children}</Text>

export const MiniplayerTitle: React.FC<Props> = ({ children, textStyle }) => <Text style={[styles.miniplayerTitle, textStyle]}>{children}</Text>

export const MiniplayerArtist: React.FC<Props> = ({ children, textStyle }) => <Text style={[styles.miniplayerArtist, textStyle]}>{children}</Text>