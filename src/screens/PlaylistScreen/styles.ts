import { StyleSheet } from 'react-native'
import { Colors } from 'styles'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.FullShade,
  },

  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  userImage: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    borderRadius: 35
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
  }
})