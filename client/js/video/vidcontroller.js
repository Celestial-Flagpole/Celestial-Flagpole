angular.module('video', [])
.controller('VideoController', function VideoController($scope, VideoService) {
  $scope.videoService = VideoService;
  $scope.file = VideoService.file;
  $scope.isFile = true;

  $scope.showFile = function () {
    if($scope.file.length === 0){
      return false;
    }else {
      return true;
    }

  };

  
});
