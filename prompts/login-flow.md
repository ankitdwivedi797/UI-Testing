# Intent: Login flow (standard + locked-out user)

As a user, go to saucedemo.com. Log in with username "standard_user"
and password "secret_sauce". Verify the inventory page loads and shows
the product list.

Then, in a separate scenario, log in with username "locked_out_user"
and password "secret_sauce". Verify an error message is shown stating
the user has been locked out, and that the inventory page does NOT load.

This is the source intent fed to Sauce AI for Test Authoring to generate
`tests/generated/login-flow.spec.js`. If the generated script ever needs
regenerating (e.g. after a Sauce AI model update), start from this prompt.
