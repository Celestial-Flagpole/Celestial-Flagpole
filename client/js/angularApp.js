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
    .state('floatie', {
      url: '',
      abstract: true
    })
    .state('video', {
      url: '/',
      views: {
        // 'search@': {
        //   templateUrl: 'client/js/search/searchview.html',
        //   controller: 'SearchController',
        //   controllerAs: 'searchController'
        // },
        'video@': {
          templateUrl: 'client/js/video/vidview.html',
          controller: 'VideoController',
          controllerAs: 'videoController'
        }
      }
    });
    // .state('video', {
    //   url: '/',
    //   templateUrl: 'client/js/video/vidview.html',
    //   controller: 'VideoController'
    // });

    $urlRouterProvider.otherwise('/');
});
