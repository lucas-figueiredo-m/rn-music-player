import 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// Note: test renderer must be required after react-native.

import { PlaylistCard } from 'components';
import { render } from '@testing-library/react-native';


const playlist = {
  id: 0,
  name: 'Sunset',
  picture: 'https://image.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg'
}

it('Renders playlist card', async () => {
  const component = render(
    <NavigationContainer>
      <PlaylistCard playlist={playlist} />
    </NavigationContainer>
  )

  // const playlistName = component.getByTestId('playlist-title').children
  // console.log(component.toJSON());

  // expect(playlistName).toMatch(playlist.name)

  component.debug()
})