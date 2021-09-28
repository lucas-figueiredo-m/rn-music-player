import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from 'styles';


const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  root: {
    width,
    height,
    position: 'absolute',
    backgroundColor: Colors.FullShade,
    zIndex: 10
  },

  dropDown: {
    margin: 20
  },

  imageContainer: {
    alignItems: 'center'
  },

  trackImage: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain'
  },

  container: {
    marginLeft: '3%'
  },

  player: {
    alignItems: 'center'
  },

  slider: {
    width: width * 0.9,
  },

  controllers: {
    marginTop: '10%',
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  skipButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White
  },

  playButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Primary
  }
})