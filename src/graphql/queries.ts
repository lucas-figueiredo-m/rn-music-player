import { gql } from '@apollo/client';
import { Player } from '@react-native-community/audio-toolkit';

export interface PlaylistItem {
  id: number,
  picture: string,
  name: string
}

export interface Playlist {
  playlists: PlaylistItem[]
}

export interface TrackItem {
  id: number,
  picture: string,
  artist: string,
  href: string,
  title: string
}

export interface TrackPlayer extends TrackItem {
  player: Player
}

export interface Track {
  tracks_aggregate: {
    nodes: TrackItem[]
  }
}

export interface TrackVars {
  playlistId: number
}

export const GET_PLAYLISTS = gql`
  query GetPlaylists {
    playlists {
      id
      name
      picture
    }
  }
`

export const GET_TRACKS = gql`
  query GetTracks($playlistId: Int!) {
    tracks_aggregate(where: {playlistId: {_eq: $playlistId}}) {
      nodes {
        id
        artist
        title
        href
        picture
      }
    }
  }
`