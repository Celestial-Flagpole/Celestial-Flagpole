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
    var deferred = $q.defer();
    var url = 'http://localhost:8686/api/float/' + filesearchQuery;
    $http.get(url).then(function(data) {
      deferred.resolve(data);
    });

    return deferred.promise;
    // return $http({
    //   method: 'GET',
    //   url: 'http://localhost:8686/api/float/' + filesearchQuery
    // }).then(function (resp) {
    //   console.log("test");
    //   return resp;
    // }).catch(function(err){
    //   console.log(err);
    // });
  };

});
