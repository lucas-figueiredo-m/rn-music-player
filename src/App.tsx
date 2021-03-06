import React from 'react'
import { StatusBar } from 'react-native'
import { ApolloProvider } from "@apollo/client";
import { GraphqlClient } from 'services/GraphqlClient';
import Router from 'navigation';
import { Colors } from 'styles';

const App: React.FC = () => {
  
  return (
    <ApolloProvider client={GraphqlClient}>
      <StatusBar backgroundColor={Colors.TRANSPARENT} barStyle='light-content' />
      <Router />
    </ApolloProvider>
  )
};

export default App;
