var os = require('os');
var fs = require('fs');
var Walker = require('walker');
var url = require('url');
var walk = require('walk');

//console.log(os.homedir());

//var direct = os.homedir() + '/Desktop/HackReactor';

options = {
  followLinks: false,
  filters: ["Temp", "_Temp", "node_modules"]
};

var walker = walk.walk('/Users/andresmm/Documents', options);

module.exports = {
  readDir: function(req, res, next) {

    function split(dir) {
      return dir.toString().split('/');
    }

    var query = url.parse(req.url).pathname;
    query = query.split('/')[1];
    console.log(query);
    var results = [];

    walker.on('file', function (root, fileStats, next) {
      if (fileStats.name === query) {
        results.push({'file': root + '/' + fileStats.name});
        console.log(' i worked');
      }
      next();
    });
   
    walker.on("errors", function (root, nodeStatsArray, next) {
      next();
    });
   
    walker.on("end", function () {
      console.log("all doneee: ", results);
      //res.status(200);
      //res.send(results);
      //res.status(200).send(results);
      res.status(200);
      res.json(results);
    });
  }
};


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



