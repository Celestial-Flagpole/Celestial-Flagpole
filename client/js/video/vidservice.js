var url = require('url');
var fs = require('fs');
var lazy = require("lazy");

angular.module('floatie.services.video', [])
.service('VideoService', function ($rootScope, $location, $q) {



  this.playVideo = function (player) {
    var evt = arguments[1];
    var videoUrl = evt.dataTransfer.getData("URL");
    console.log(videoUrl);
    //if videoUrl is not undefined, assuming the user dropped a video
    if (videoUrl !== '') {
      var videoId = url.parse(videoUrl).query.split('=')[1];
      console.log(videoId);
      player.loadVideoById({videoId: videoId});
    }else {
      this.loadFile(evt);
    }
  };

  this.addEventListeners = function (element, player) {
    //add event listener to play video or read file when dragging to drop zone
    element[0].parentElement.ondragenter = this.playVideo.bind(this, player);
    dropZone.ondragenter = this.playVideo.bind(this, player);
  };

  this.loadFile = function () {
    var text = [];
    var evt = arguments[0];
    var path = evt.dataTransfer.files[0].path;
    new lazy(fs.createReadStream(path))
         .lines
         .forEach(function(line){
            console.log(line.toString());
            text.push(line.toString());
          });
  };

});
