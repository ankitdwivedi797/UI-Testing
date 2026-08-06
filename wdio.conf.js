exports.config = {
  runner: 'local',
  maxInstances: 1,

  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  region: 'eu',

  specs: [
    './tests/generated/**/*.spec.js',
    './tests/manual/**/*.spec.js'
  ],

  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'latest',
      platformName: 'Windows 11',
      'sauce:options': {
        build: process.env.GITHUB_RUN_ID ? `GH-${process.env.GITHUB_RUN_ID}` : 'local-run',
        name: 'saucedemo UI suite - Chrome'
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
