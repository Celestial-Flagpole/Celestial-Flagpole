var os = require('os');
var fs = require('fs');
var direct = os.homedir() + '/Desktop/hackreactor';
var Walker = require('walker');
var url = require('url');
var walk = require('walk');
var walker = walk.walk(direct);

module.exports = {
  readDir: function(req, res, next) {
    function split(dir) {
      return dir.toString().split('/');
    }
    console.log(url.parse(req.url));
    var query = url.parse(req.url).query;
    console.log(query, 'from server');
    var results = [];

    Walker(direct)
      .filterDir(function (dir, stat) {
        if (dir[0] === '.') {
          console.warn('Skipping');
        }
        return true;
      })
      .on('entry', function (entry, stat) {
      })
      .on('dir', function (dir, stat) {
        // console.log('Got directory: ' + dir);
        arr = split(dir);
        console.log(arr);
        if (arr.indexOf(query) > -1) {
          return results.push({'dir': dir});
        }
      })
      .on('file', function (file, stat) {
        // console.log('Got file: ' + file);
        arr = split(file);
        console.log(arr);
        if (arr.indexOf(query) > -1) {
          return results.push({'file': file});
        }
      })
      .on('end', function() {
        // console.log('all files traversed');
        console.log(results);
        res.status(200).send(results);
      });
}
}


  //   walker.on('greenfield.md', function (root, fileStats, next) {
  //     fs.readFile(fileStats.name, function () {
  //       console.log('reading file');
  //       next();
  //     });
  //   });
   
  //   walker.on("errors", function (root, nodeStatsArray, next) {
  //     next();
  //   });
   
  //   walker.on("end", function () {
  //     console.log("all done");
  //     results.push('asdf');
  //     res.status(200).send(results);
  //   });
  // }
