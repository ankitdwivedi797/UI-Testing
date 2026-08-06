describe('saucedemo.com - Login flow', () => {

  beforeEach(async () => {
    await browser.url('/');
    await $('#login-button').waitForDisplayed({ timeout: 10000 });
  });

  it('logs in successfully with a standard user', async () => {
    await $('#user-name').waitForDisplayed();
    await $('#user-name').setValue('standard_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').waitForClickable();
    await $('#login-button').click();

    const inventoryList = await $('.inventory_list');
    await inventoryList.waitForDisplayed({ timeout: 15000 });

    const title = await $('.title');
    await expect(title).toHaveText('Products');
  });

  it('blocks login and shows an error for a locked-out user', async () => {
    await $('#user-name').waitForDisplayed();
    await $('#user-name').setValue('locked_out_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').waitForClickable();
    await $('#login-button').click();

    const errorMessage = await $('[data-test="error"]');
    await errorMessage.waitForDisplayed({ timeout: 15000 });
    await expect(errorMessage).toHaveTextContaining('locked out');
  });

});
