import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.

import {
  Title,
  TrackTitle,
  TrackAuthor,
  PlaylistTitle,
  PlayerTitle,
  PlayerArtist,
  DurationTime,
  MiniplayerTitle,
  MiniplayerArtist
} from 'components';
import { render } from '@testing-library/react-native';

describe('Texts: Tests every text component', () => {
  const defaultText = 'Playlist title'
  
  it('Title::render -> Should show text passed as children', () => {
    const { getByTestId } = render(<Title>{defaultText}</Title>)
    expect(getByTestId('title').children[0]).toMatch(defaultText)
  })

  it('TrackTitle::render -> Should show text passed as children', () => {
    const { getByTestId } = render(<TrackTitle>{defaultText}</TrackTitle>)
    expect(getByTestId('track-title').children[0]).toMatch(defaultText)
  })

  it('TrackAuthor::render -> Should show text passed as children', () => {
    const { getByTestId } = render(<TrackAuthor>{defaultText}</TrackAuthor>)
    expect(getByTestId('track-author').children[0]).toMatch(defaultText)
  })

  it('PlaylistTitle::render -> Should show text passed as children', () => {
    const { getByTestId } = render(<PlaylistTitle>{defaultText}</PlaylistTitle>)
    expect(getByTestId('playlist-title').children[0]).toMatch(defaultText)
  })

  it('PlayerTitle::render -> Should show text passed as children', () => {
    const { getByTestId } = render(<PlayerTitle>{defaultText}</PlayerTitle>)
    expect(getByTestId('player-title').children[0]).toMatch(defaultText)
  })

  it('PlayerArtist::render -> Should show text passed as children', () => {
    const { getByTestId } = render(<PlayerArtist>{defaultText}</PlayerArtist>)
    expect(getByTestId('player-artist').children[0]).toMatch(defaultText)
  })

  it('DurationTime::render -> Should show text passed as children', () => {
    const { getByTestId } = render(<DurationTime>{defaultText}</DurationTime>)
    expect(getByTestId('duration-time').children[0]).toMatch(defaultText)
  })

  it('MiniplayerTitle::render -> Should show text passed as children', () => {
    const { getByTestId } = render(<MiniplayerTitle>{defaultText}</MiniplayerTitle>)
    expect(getByTestId('miniplayer-title').children[0]).toMatch(defaultText)
  })

  it('MiniplayerArtist::render -> Should show text passed as children', () => {
    const { getByTestId } = render(<MiniplayerArtist>{defaultText}</MiniplayerArtist>)
    expect(getByTestId('miniplayer-artist').children[0]).toMatch(defaultText)
  })
})
