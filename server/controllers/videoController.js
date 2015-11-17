var os = require('os');
var fs = require('fs');
var Walker = require('walker');
var url = require('url');
var walk = require('walk');

//var direct = os.homedir() + '/Desktop/HackReactor';

options = {
  followLinks: false,
  filters: ["Temp", "_Temp", "node_modules"]
};

var walker = walk.walk('/Users/peekay/Desktop/hackreactor', options);

module.exports = {
  // function to read all the files in user's local directory
  readDir: function(req, res, next) {

    function split(dir) {
      return dir.toString().split('/');
    }

    var query = url.parse(req.url).pathname;

    query = query.split('/')[1];

    var results = [];

    // On every file, we check if the file matches the query the user submitted
    // if yes, we add it to our results array
    walker.on('file', function (root, fileStats, next) {
      if (fileStats.name === query) {
        results.push({'file': root + '/' + fileStats.name});
        console.log(' i worked');
      }
      next();
    });
    
    // Error handler
    walker.on("errors", function (root, nodeStatsArray, next) {
      next();
    });
    
    // Once all the files have been walked, we return the results
    walker.on("end", function () {
      console.log("all doneee: ", results);
      res.status(200);
      res.json(results);
    });
  }
};

// Another npm module which does the same thing as above. We decided to use the one above, but leaving this here just in case.

    // Walker('/Users/peekay/Desktop/hackreactor/')
    //   .filterDir(function (dir, stat) {
    //     if (dir[0] === '.') {
    //       console.warn('Skipping');
    //     }
    //     return true;
    //   })
    //   .on('entry', function (entry, stat) {
    //   })
    //   .on('dir', function (dir, stat) {
    //     // console.log('Got directory: ' + dir);
    //     arr = split(dir);
    //     if (arr.indexOf(query) > -1) {
    //       return results.push({'dir': dir});
    //     }
    //   })
    //   .on('file', function (file, stat) {
    //     // console.log('Got file: ' + file);
    //     arr = split(file);
    //     console.log(arr);
    //     if (arr.indexOf(query) > -1) {
    //       return results.push({'file': file});
    //     }
    //   })
    //   .on('end', function() {
    //     // console.log('all files traversed');
    //     // console.log(results);
    //     res.status(200).send(results);
    //   });



