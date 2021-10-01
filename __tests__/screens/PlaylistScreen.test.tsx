import 'react-native';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing'

// Note: test renderer must be required after react-native.
import { GET_PLAYLISTS } from 'graphql/queries';
import PlaylistScreen from 'screens/PlaylistScreen';
import { render } from '@testing-library/react-native';

const mocks = [
  {
    request: {
      query: GET_PLAYLISTS
    },
    result: {
      data: {
        playlists: [
          { id: 0, name: 'Sunset', picture: 'https://image.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg' },
          { id: 1, name: 'Sunset', picture: 'https://image.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg' },
          { id: 2, name: 'Sunset', picture: 'https://image.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg' },
          { id: 3, name: 'Sunset', picture: 'https://image.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg' }
        ]
      }
    }
  }
]

it('Renders playlist card', async () => {
  const screen = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <PlaylistScreen />
    </MockedProvider>
  )

  // await act( async () => {
  //   await new Promise( resolve => setTimeout(resolve, 0));

  // })

  const tree = screen.toJSON()

  expect(tree?.children).toBeTruthy()
})