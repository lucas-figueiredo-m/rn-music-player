import { StyleSheet } from 'react-native'
import { Colors } from 'styles';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.FullShade
  },

  loading: {
    position: 'absolute',
    bottom: 50
  }
})