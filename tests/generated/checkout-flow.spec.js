describe('saucedemo.com - Checkout flow', () => {

  it('completes a full checkout with two items in the cart', async () => {
    await browser.url('/');
    await $('#login-button').waitForDisplayed({ timeout: 10000 });
    await $('#user-name').setValue('standard_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').waitForClickable();
    await $('#login-button').click();

    await $('.inventory_list').waitForDisplayed({ timeout: 15000 });

    const backpackBtn = await $('#add-to-cart-sauce-labs-backpack');
    await backpackBtn.waitForClickable();
    await backpackBtn.click();

    const bikeLightBtn = await $('#add-to-cart-sauce-labs-bike-light');
    await bikeLightBtn.waitForClickable();
    await bikeLightBtn.click();

    const cartBadge = await $('.shopping_cart_badge');
    await cartBadge.waitForDisplayed({ timeout: 10000 });
    await expect(cartBadge).toHaveText('2');

    await $('.shopping_cart_link').click();
    await $('[data-test="checkout"]').waitForClickable();
    await $('[data-test="checkout"]').click();

    await $('#first-name').waitForDisplayed();
    await $('#first-name').setValue('Jane');
    await $('#last-name').setValue('Doe');
    await $('#postal-code').setValue('12345');
    await $('[data-test="continue"]').click();

    await $('[data-test="finish"]').waitForClickable();
    await $('[data-test="finish"]').click();

    const confirmation = await $('.complete-header');
    await confirmation.waitForDisplayed({ timeout: 10000 });
    await expect(confirmation).toHaveText('Thank you for your order!');
  });

});
