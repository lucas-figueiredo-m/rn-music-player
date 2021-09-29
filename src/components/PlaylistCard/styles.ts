import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from 'styles';

const { width } = Dimensions.get('screen')

export const styles = StyleSheet.create({
  root: {
    width: width * 0.9,
    height: 120,
    backgroundColor: Colors.MediumShade,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: '3%',
    alignItems: 'center',
    paddingHorizontal: '2%',
    flexDirection: 'row'
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 10
  },

  container: {
    paddingLeft: '3%'
  }
})