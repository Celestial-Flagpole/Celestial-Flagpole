angular.module('video', [])
.controller('VideoController', function VideoController($scope, VideoService) {
  $scope.videoService = VideoService;
  $scope.file = VideoService.file;

  //decide if the player should display or the file text
  $scope.showFile = function () {
    if($scope.file.length === 0){
      return false;
    }else {
      return true;
    }
  };

});
