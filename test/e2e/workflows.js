var conf = require('../../nightwatch.conf.js');

var res = [];

module.exports = {
  'ADFS Login Test': function (browser) {
    browser
      .url('http://localhost')   // visit the url
      .waitForElementVisible('.MainActionContainer')
      .url('http://localhost')   // visit the url
      .pause(500)
      .waitForElementVisible('#root')
      .end();
  }
}
