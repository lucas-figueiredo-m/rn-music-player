import { StyleSheet } from 'react-native'
import { Colors, FontFamilies } from 'styles'


export const styles = StyleSheet.create({
  title: {
    color: Colors.White,
    fontFamily: FontFamilies.ExtraBold,
    fontSize: 36
  },

  trackTitle: {
    color: Colors.LightestShade,
    fontFamily: FontFamilies.SemiBold,
    fontSize: 20
  },

  trackAuthor: {
    color: Colors.LightestShade,
    fontFamily: FontFamilies.Regular,
    fontSize: 16
  },

  playlistTitle: {
    color: Colors.LightestShade,
    fontFamily: FontFamilies.SemiBold,
    fontSize: 24
  },

  miniplayerTitle: {
    color: Colors.LightestShade,
    fontFamily: FontFamilies.SemiBold,
    fontSize: 24,
    marginBottom: 10
  },

  miniplayerArtist: {
    color: Colors.LightShade,
    fontFamily: FontFamilies.SemiBold,
    fontSize: 18,
    marginBottom: 10
  },

})