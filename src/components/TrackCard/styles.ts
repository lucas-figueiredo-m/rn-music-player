import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from 'styles';

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  root: {
    width,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '3%',
    backgroundColor: Colors.FullShade
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    resizeMode: 'contain'
  },

  container: {
    marginLeft: '3%'
  }
})