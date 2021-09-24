import { ApolloClient, InMemoryCache } from "@apollo/client";
import Config from 'react-native-config'

export const GraphqlClient = new ApolloClient({
  uri: Config.GRAPHQL_CLIENT_URI,
  cache: new InMemoryCache()
});