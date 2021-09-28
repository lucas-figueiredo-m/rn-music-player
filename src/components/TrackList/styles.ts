import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    zIndex: 5
  },

  flatlist: {
    flex: 1
  },

  title: {
    marginTop: '30%',
    marginBottom: '30%',
    marginLeft: '3%'
  }
})