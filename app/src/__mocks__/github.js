var fs = require("fs");
var path = require('path');
var jsonfile = require('jsonfile');

// used for reducer tests
export function getRepos() {
  var jsonPath = path.join(__dirname, '../', '__mockData__', 'assets-moxios.json');
  return readFile(jsonPath);
}

function readFile (path) {
  return jsonfile.readFileSync(path);
}
