var url = require('url');
var fs = require('fs');
var lazy = require("lazy");

angular.module('floatie.services.video', [])
.service('VideoService', function ($rootScope) {

  this.file = [];
  this.player;

  this.playVideo = function (player) {
    var evt = arguments[1];
    var videoUrl = evt.dataTransfer.getData("URL");

    //if videoUrl is not undefined, assuming the user dropped a video
    if (videoUrl !== '') {
      this.player = player;
      //save a reference to this
      var self = this;
      //use apply to "force" angular to do the digest event
      $rootScope.$apply(function () {
        self.file.length = 0;
      });
      //get the url and play the video
      var videoId = url.parse(videoUrl).query.split('=')[1];
      console.log(videoId);
      player.loadVideoById({videoId: videoId});

      //read and load the file
    } else {
      this.file.length = 0;
      this.loadFile(evt);
    }
  };

  // add event listener to play video or read file when dragging to drop zone
  this.addEventListeners = function (element, player) {
    this.player = player;
    element[0].parentElement.ondragenter = this.playVideo.bind(this, player);
    dropZone.ondragenter = this.playVideo.bind(this, player);
  };

  // loads a clicked or dragged file onto the screen
  this.loadFile = function () {
    //stop video if there was a video playing.
    if (this.player !== undefined) this.player.stopVideo();
    //delete the previous content (old file)
    this.file.length = 0;
    var evt = arguments[0];
    //path to file dropped by the user
    var path = evt.dataTransfer.files[0].path;
    var self = this;
    //using lazy to read the file line by line 
    new lazy(fs.createReadStream(path))
         .lines
         .forEach(function(line){
          //force the digest event.
            $rootScope.$apply(function () {
              self.file.push(line.toString());
            });
          });
  };

  // method to play video that was clicked during a search event (vs. drag and drop event)
  this.playVideoBySearch = function (videoId) {
      this.player.loadVideoById({videoId: videoId});
  };
  
  // method to show file that was clicked during a search event (vs. drag and drop event)
  this.loadFileBySearch = function (path) {
    console.log("PATH: ", path);
     //stop video if there was a video playing.
      if (this.player !== undefined) this.player.stopVideo();
      //delete the previous content (old file)
      this.file.length = 0;
  
      var self = this;
      //using lazy to read the file line by line 
      new lazy(fs.createReadStream(path))
           .lines
           .forEach(function(line){
            //force the digest event.
              $rootScope.$apply(function () {
                self.file.push(line.toString());
              });
            });
    };

});
