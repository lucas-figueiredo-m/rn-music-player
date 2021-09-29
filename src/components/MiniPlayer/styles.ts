import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from 'styles';


const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: Colors.FullShade,
    zIndex: 10
  },

  gradientView: {
    flex: 1
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
  },

  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9
  },

  miniView: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.Black,
  },

  miniPlayer: {
    flexDirection: 'row',
    paddingHorizontal: '3%',
    alignItems: 'center',
    flex: 1,
  },

  barContainer: {
    alignItems: 'center',
    height: 5
  },

  miniTrackImage: {
    width: height * 0.08,
    height: height * 0.08,
    resizeMode: 'contain'
  },

  miniContainer: {
    flex: 1,
    marginLeft: '3%',
  },

  miniPlayContainer: {
    alignItems: 'flex-end',
    marginRight: '3%'
  }
})