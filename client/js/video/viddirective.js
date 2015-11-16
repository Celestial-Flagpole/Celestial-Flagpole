angular.module('youtubeApp', [])
  .directive('youtube', function ($window, VideoService) {
    $window.ondragenter = function(e) { e.preventDefault(); return false; };
    $window.ondrop = function(e) { e.preventDefault(); return false; };
    return {
      restrict: "E",
      template: '<div></div>',

      link: function($scope, element) {
        //Add the script tag to load the youtube player
        element[0].ondrop = function(e) { e.preventDefault(); return false; };
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;
        //When the api finishes loading, this function is called
        //this function adds the player to the youtube directive
        //https://developers.google.com/youtube/iframe_api_reference?hl=en
        $window.onYouTubeIframeAPIReady = function () {
          player = new YT.Player(element.children()[0], {
            height: $window.innerHeight - 50 + "px",
            width: $window.innerWidth - 2 + "px",
            events: {
              'onReady': onPlayerReady
            }
          });
          //Add event listeners for drag and drop
          //Using the VideoService service in case we need to add listeners in multiple html files
          //doing it here to make sure player is defined
          VideoService.addEventListeners(element, player);
        };

        function onPlayerReady (event) {
          event.target.playVideo();
        }

        function stopVideo() {
          player.stopVideo();
        }
      }
    };
  });
