import Spotify from 'services/SpotifyAPI';
import Config from 'react-native-config';
import { AxiosResponse } from 'axios';
import { authorize, AuthConfiguration, AuthorizeResult } from 'react-native-app-auth';
import { UserData } from 'store/interfaces/SpotifyInterfaces';

const config: AuthConfiguration = {
  clientId: Config.SPOTIFY_CLIENT_ID, // available on the app page
  clientSecret: Config.SPOTIFY_CLIENT_SECRET, // click "show client secret" to see this
  redirectUrl: Config.SPOTIFY_REDIRECT_URL_IOS, // the redirect you defined after creating the app
  scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'], // the scopes you need to access
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

export const getAuthorization = async () => {
  try {
    
    const token: AuthorizeResult = await authorize(config);
    Spotify.defaults.headers.Authorization = `Bearer ${token.accessToken}`

    return token;

  } catch (error) {
    console.log({error})
    throw error;
  }
}


export const getUserData = async () : Promise<UserData>  => {

  try {
    const res: AxiosResponse<UserData> = await Spotify.get('/me')

    return res.data

  } catch (error: any ) { // TODO: Type correctly axios error
    console.log({ error })
    throw error
  }
}