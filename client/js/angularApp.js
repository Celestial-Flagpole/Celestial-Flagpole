angular.module('floatie', [
  'ui.router',
  'video',
  'youtubeApp',
  // 'search',
  'floatie.services.video',
  // 'floatie.services.search',
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    // .state('file', {
    //   url: '/',
    //   templateUrl: 'client/js/video/fileview.html',
    //   controller: 'VideoController',
    // })
    .state('video', {
      url: '/',
      templateUrl: 'client/js/video/vidview.html',
      controller: 'VideoController'
    });

    $urlRouterProvider.otherwise('/');
});
