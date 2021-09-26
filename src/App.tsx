import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { ApolloProvider } from "@apollo/client";
import { GraphqlClient } from 'services/GraphqlClient';
import Router from 'navigation';
import { Colors } from 'styles';
import AppContext from 'contexts/AppContext';
import { UserData } from 'store/interfaces/SpotifyInterfaces';
import { AuthorizeResult } from 'react-native-app-auth';


const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null)
  const [auth, setAuth] = useState<AuthorizeResult | null>(null)
  
  return (
    <ApolloProvider client={GraphqlClient}>
      <AppContext.Provider value={{ user, setUser, auth, setAuth }}>
        <StatusBar translucent backgroundColor={Colors.TRANSPARENT} barStyle='light-content' />
        <Router />
      </AppContext.Provider>
    </ApolloProvider>
  )
};

export default App;
