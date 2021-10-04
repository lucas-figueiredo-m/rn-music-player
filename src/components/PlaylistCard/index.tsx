import { useNavigation } from '@react-navigation/core'
import { PlaylistTitle } from 'components'
import { PlaylistItem } from 'graphql/queries'
import { PlaylistScreenProps } from 'navigation'
import { MainRoutes } from 'navigation/config/router'
import React from 'react'
import { TouchableOpacity, Image, View } from 'react-native'
import { styles } from './styles'

interface Props {
  playlist: PlaylistItem
}

export const PlaylistCard: React.FC<Props> = ({ playlist }) => {
 const { navigate } = useNavigation<PlaylistScreenProps>();
  return (
    <TouchableOpacity testID={`playlist-${playlist.id}`} onPress={() => navigate(MainRoutes.TRACKS_SCREEN, { playlist })} style={styles.root}>
      <Image source={{ uri: playlist.picture }} style={styles.image} />
      <View style={styles.container}>
        <PlaylistTitle>{playlist.name}</PlaylistTitle>
      </View>
    </TouchableOpacity>
  )
}
