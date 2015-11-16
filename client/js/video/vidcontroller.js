angular.module('video', [])
.controller('VideoController', function VideoController($scope, VideoService) {
  var videoController = this;

  // $scope.videoService = VideoService;
  // $scope.file = VideoService.file;
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

// angular.module('video', ['floatie.services.video'])
// .controller('VideoController', function VideoController(VideoService) {
//   var video = this;
  
// });
