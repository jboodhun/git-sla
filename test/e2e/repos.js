var conf = require('../../nightwatch.conf.js');

var res = [];

module.exports = {
  'ADFS Login Test': function (browser) {
    browser
      .url('http://localhost:8000')   // visit the url
      .waitForElementVisible('.MainActionContainer')
      .url('http://localhost:9000')   // visit the url
      .pause(500)
      .waitForElementVisible('#root')
      .end();
  }
}
