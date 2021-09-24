import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  font: {
    fontFamily: 'Montserrat-Black'
  }
})

const App: React.FC = () => (
  <View style={styles.root}>
    <Text style={styles.font}>Hello World</Text>
  </View>
);

export default App;
