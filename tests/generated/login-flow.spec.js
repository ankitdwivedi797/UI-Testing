describe('saucedemo.com - Login flow', () => {

  it('logs in successfully with a standard user', async () => {
    await browser.url('/');
    await $('#login-button').waitForDisplayed({ timeout: 10000 });
    await $('#user-name').setValue('standard_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').waitForClickable();
    await $('#login-button').click();

    const inventoryList = await $('.inventory_list');
    await inventoryList.waitForDisplayed({ timeout: 15000 });

    const title = await $('.title');
    await expect(title).toHaveText('Products');
  });

});
