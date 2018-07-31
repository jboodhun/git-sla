var conf = require('../../nightwatch.conf.js');

var res = [];

module.exports = {
  'Home page Test': function (browser) {
    browser
      .url('https://')   // visit the url
      .waitForElementVisible('.MainActionContainer')
      //.pause(5000)
      .url('http://')
      .pause(500)
      .waitForElementVisible('#root')
      .end();
  }
}
