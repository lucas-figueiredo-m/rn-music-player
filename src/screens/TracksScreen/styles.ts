import { StyleSheet } from 'react-native'
import { Colors } from 'styles'


export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.FullShade
  },

  button: {
    width: 120,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.Primary,
    flexDirection: 'row',
    borderRadius: 30,
    alignSelf: 'center'
  },

  container: {
    width: '100%',
    height: '40%',
    position: 'absolute'
  },

  translucentConteiner: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },

  playlistImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
})