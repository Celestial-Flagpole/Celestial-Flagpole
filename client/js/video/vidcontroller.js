angular.module('video', [])
.controller('VideoController', function VideoController($scope, VideoService) {
  var videoController = this;

  videoController.videoService = VideoService;
  videoController.file = VideoService.file;

  //decide if the player should display or the file text
  videoController.showFile = function () {
    if(videoController.file.length === 0) {
      return false;
    }else {
      return true;
    }
  };

});
