/* eslint-disable no-undef */
describe('My first suite tests E2E', () => {
  beforeAll(async () => {
    await device.launchApp();
  });


  it('should have welcome screen', async () => {
    await expect( element(by.text('Hello')) ).toBeVisible();
  });
});
