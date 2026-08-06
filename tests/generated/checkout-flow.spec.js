// Generated from prompts/checkout-flow.md via Sauce AI for Test Authoring.
// Reviewed and committed by a human before merge (human-in-the-middle step).

describe('saucedemo.com - Checkout flow', () => {

  it('completes a full checkout with two items in the cart', async () => {
    await browser.url('/');
    await $('#user-name').setValue('standard_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').click();

    await $('.inventory_list').waitForDisplayed({ timeout: 8000 });

    // Add items to cart
    await $('#add-to-cart-sauce-labs-backpack').click();
    await $('#add-to-cart-sauce-labs-bike-light').click();

    const cartBadge = await $('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');

    // Go to cart, then checkout
    await $('.shopping_cart_link').click();
    await $('[data-test="checkout"]').click();

    // Fill checkout info
    await $('#first-name').setValue('Jane');
    await $('#last-name').setValue('Doe');
    await $('#postal-code').setValue('12345');
    await $('[data-test="continue"]').click();

    // Finish order
    await $('[data-test="finish"]').click();

    const confirmation = await $('.complete-header');
    await expect(confirmation).toHaveText('Thank you for your order!');
  });

});
