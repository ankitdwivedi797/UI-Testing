# Intent: Checkout flow

As a user, log into saucedemo.com with username "standard_user" and
password "secret_sauce". Add the "Sauce Labs Backpack" and "Sauce Labs
Bike Light" to the cart. Verify the cart badge shows "2". Go to checkout,
fill in first name "Jane", last name "Doe", and zip code "12345",
continue through the order overview, finish the order, and verify the
confirmation message "Thank you for your order!" appears.

This is the source intent fed to Sauce AI for Test Authoring to generate
`tests/generated/checkout-flow.spec.js`.
