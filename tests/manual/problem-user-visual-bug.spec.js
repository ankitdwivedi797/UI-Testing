// Hand-written, not AI-generated. saucedemo.com's "problem_user" account
// deliberately serves broken product images - a good sanity check that our
// pipeline (and Sauce AI Insights) actually catches real regressions and
// isn't just rubber-stamping happy-path runs.

describe('saucedemo.com - problem_user known visual bug', () => {

  it('logs in but shows mismatched product images (expected known bug)', async () => {
    await browser.url('/');
    await $('#user-name').setValue('problem_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').click();

    await $('.inventory_list').waitForDisplayed({ timeout: 8000 });

    // All product images on this account point to the same broken asset -
    // this assertion is intentionally strict so it fails and demonstrates
    // the AI Insights root-cause step picking up a real, known defect.
    const images = await $$('.inventory_item_img img');
    const srcs = await Promise.all(images.map((img) => img.getAttribute('src')));
    const uniqueSrcs = new Set(srcs);

    await expect(uniqueSrcs.size).toBeGreaterThan(1);
  });

});
