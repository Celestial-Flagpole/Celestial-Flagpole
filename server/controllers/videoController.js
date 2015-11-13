var os = require('os');
var fs = require('fs');
var dir = os.homedir();

module.exports = {
  readDir: function(req, res, next) {
    dir = dir + '/Desktop';
    fs.readdir(dir, function (err, results) {
      console.log(results);
    });
  }
}
