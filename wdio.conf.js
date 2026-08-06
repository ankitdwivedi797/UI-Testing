// wdio.conf.js
// Central config: points test execution at the Sauce Labs cloud grid.
// Credentials are read from environment variables (never hardcoded).
// Locally: set them in a .env file (see .env.example) and `source` it,
// or export them in your shell before running `npm run test:sauce`.
// In CI: they come from GitHub Actions repo secrets (see .github/workflows/sauce-tests.yml).

exports.config = {
  runner: 'local',

  // --- Sauce Labs connection ---
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  region: 'us', // change to 'eu' if your Sauce account is EU-hosted

  // --- Which tests to run ---
  specs: [
    './tests/generated/**/*.spec.js',
    './tests/manual/**/*.spec.js'
  ],

  // --- Browser/platform matrix run on Sauce Labs' cloud grid ---
  // This is the "where it deploys" answer for execution: every one of these
  // combinations spins up on Sauce's infrastructure, not on the CI runner.
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'latest',
      platformName: 'Windows 11',
      'sauce:options': {
        build: process.env.GITHUB_RUN_ID ? `GH-${process.env.GITHUB_RUN_ID}` : 'local-run',
        name: 'saucedemo UI suite - Chrome'
      }
    },
    {
      browserName: 'firefox',
      browserVersion: 'latest',
      platformName: 'Windows 11',
      'sauce:options': {
        build: process.env.GITHUB_RUN_ID ? `GH-${process.env.GITHUB_RUN_ID}` : 'local-run',
        name: 'saucedemo UI suite - Firefox'
      }
    }
  ],

  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://www.saucedemo.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: ['sauce'],

  framework: 'mocha',
  reporters: ['spec'],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
};
