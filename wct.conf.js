var path = require('path');

var ret = {
  'suites': ['app/elements/**/test/*'],
  'webserver': {
    'pathMappings': []
  },
  "verbose": true,
  "plugins": {
    "local": {
      "browsers": ["chrome"]
    },
    'junit-reporter': {
      'output': {
        'name': 'results.xml'
      }
    },
    "istanbul": {
      "dir": "./coverage",
      "reporters": ["text-summary", "lcov"],
      "include": ['/app/elements/**/*.html', '/app/elements/**/*.js'],
      "exclude": ['/**/test/*.html', '/**/test/*.js']
    }
  }
};

var mapping = {};
var rootPath = (__dirname).split(path.sep).slice(-1)[0];

mapping['/elements/' + rootPath  +
'/app/bower_components'] = 'app/bower_components';

ret.webserver.pathMappings.push(mapping);

module.exports = ret;
