// Generated from prompts/login-flow.md via Sauce AI for Test Authoring.
// Reviewed and committed by a human before merge (human-in-the-middle step).

describe('saucedemo.com - Login flow', () => {

  beforeEach(async () => {
    await browser.url('/');
  });

  it('logs in successfully with a standard user', async () => {
    await $('#user-name').setValue('standard_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').click();

    const inventoryList = await $('.inventory_list');
    await inventoryList.waitForDisplayed({ timeout: 8000 });

    const title = await $('.title');
    await expect(title).toHaveText('Products');
  });

  it('blocks login and shows an error for a locked-out user', async () => {
    await $('#user-name').setValue('locked_out_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').click();

    const errorMessage = await $('[data-test="error"]');
    await errorMessage.waitForDisplayed({ timeout: 8000 });
    await expect(errorMessage).toHaveTextContaining('locked out');

    const inventoryList = await $('.inventory_list');
    await expect(inventoryList).not.toBeDisplayed();
  });

});
