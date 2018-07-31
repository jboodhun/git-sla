var conf = require('../../nightwatch.conf.js');

var res = [];

module.exports = {
  'ADFS Login Test': function (browser) {
    browser
      .url('https://sso.dev.mm.redbee.cloud/?f=1&wa=wsignin1.0&wctx=csapp&wtrealm=https%3A%2F%2Fuser-tasks.mmdev.platforms.ebms.cloud%2F')   // visit the url
      .waitForElementVisible('.MainActionContainer')
      .setValue('#ctl00_ContentPlaceHolder1_UsernameTextBox', 'jay.boodhun')
      .setValue('#ctl00_ContentPlaceHolder1_PasswordTextBox', 'Password1')
      .click('#ctl00_ContentPlaceHolder1_SubmitButton')
      /*
      https://sso.dev.mm.redbee.cloud/?f=1&wa=wsignin1.0&wctx=csapp&wtrealm=

      http%3A%2F%2Flocalhost%3A4000%2Ftasks
      .url(function (response) {
        var get = response.value.split('https://chip-react-assets.mmdev.platforms.ebms.cloud/#auth=');
        res[1] = get[1];
      })
      .execute(function() {
          console.log(window.localStorage);
          window.localStorage.setItem('cmpp-session', res[1]);
      })
      */
      //.pause(5000)
      .url('https://user-tasks.mmdev.platforms.ebms.cloud/')
      .pause(500)
      .waitForElementVisible('#root')
      .end();
  }
}