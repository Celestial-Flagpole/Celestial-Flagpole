/*
Angular module for youtube search service. This service includes commmon methods that are used for floatie's youtube search functionality.
*/

angular.module('floatie.services.search', [])
.service('SearchService', function ($http, $q) {
  var service = this; 

  // Hit the youtube API
  // Return a promise function given the asynchronous nature of the API call
  service.searchYoutube = function (youtubeQuery) {
    var deferred = $q.defer();

    var request = gapi.client.youtube.search.list({
         part: "snippet",
         type: "video",
         q: encodeURIComponent(youtubeQuery),
         maxResults: 10,
         videoEmbeddable: true,
         order: "viewCount",
         publishedAfter: "2000-01-01T00:00:00Z"
    });

    request.execute(function (response) {
      var results = response.result.items;
      deferred.resolve(results);
    });

    return deferred.promise; 
  };

  service.loadFileBySearch = function (filesearchQuery) {
    return $http({
      method: 'GET',
      url: 'http://127.0.0.1:8686/api/float/' + filesearchQuery
    })
    .then(function successCallback (resp) {
      console.log('got here')
      console.log(resp)
      return resp;
    }, function errCallback (resp) {
      console.error('i errored');
    });
  };

});
