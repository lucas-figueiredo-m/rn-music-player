/* eslint-disable no-undef */
describe('Player E2E test suites', () => {
  beforeAll(async () => {
    await device.launchApp();
  });


  test('Should open up a playlist and go back', async () => {
    await waitFor( element(by.id('playlist-list')) ).toExist().withTimeout(5000)
    await waitFor( element(by.id('playlist-2')) ).toExist().withTimeout(6000)
    await element(by.id('playlist-2')).tap()
    await expect( element(by.id('track-screen')) ).toBeVisible();
  });

  test('Should go back to playlist screen', async () => {
    await waitFor( element(by.id('back-button')) ).toExist().withTimeout(4000)
    await element(by.id('back-button')).tap()
    await expect( element(by.id('playlist-screen')) ).toBeVisible();
  })

  test('Should open up a playlist, open a music, pay and pause it', async () => {
    await waitFor( element(by.id('playlist-2')) ).toExist().withTimeout(1000)
    await element(by.id('playlist-2')).tap()
    await waitFor( element( by.id('track-2')) ).toExist().withTimeout(5000)
    await element(by.id('track-2')).tap()

    await new Promise( (resolve) => setTimeout(resolve, 7000) );
    await element(by.id('play-button')).tap()
    
  })

  test('Should play music, skip to next, skip to prev', async () => {
    await new Promise( (resolve) => setTimeout(resolve, 3000) );
    await element(by.id('play-button')).tap()
    await new Promise( (resolve) => setTimeout(resolve, 3000) );
    await element(by.id('skip-back')).tap()
    await new Promise( (resolve) => setTimeout(resolve, 3000) );
    await element(by.id('skip-next')).tap()
  })

});
