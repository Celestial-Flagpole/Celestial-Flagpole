var nw = require('nw.gui');
var url = require('url');
var fs = require('fs');
var lazy = require("lazy");

var win = nw.Window.get();

// var body = document.body;
// var fileDropDiv = document.createElement('div');
// fileDropDiv.appendChild(document.createElement('br'));
// fileDropDiv.appendChild(document.createElement('br'));
// //add an id to the div
// fileDropDiv.id = "fileDrop";
// //set the width and height to the window size
// fileDropDiv.style.width = window.innerWidth-50 + "px";
// fileDropDiv.style.height = window.innerHeight-100 + "px";
// //append the div to the body
// body.appendChild(fileDropDiv);

// var player;
// var iFrameDiv = document.createElement('div');
// iFrameDiv.id = "player";
// iFrameDiv.style.width = 0;
// iFrameDiv.style.height = 0;
// fileDropDiv.appendChild(iFrameDiv);
// var tag = document.createElement('script');
// tag.src = "http://www.youtube.com/iframe_api";
// document.body.appendChild(tag);

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     height: fileDropDiv.offsetHeight,
//     width: fileDropDiv.offsetWidth,
//     events: {
//       'onReady': onPlayerReady,
//     }
//   });
// };

// function onPlayerReady(event) {
//   console.log('onPlayerReady');
//   event.target.playVideo();
// }

// function stopVideo() {
//   player.stopVideo();
// }

// window.onload = function (){
//   //default event methods executed every time
//   var eventMethods = function(evt){
//     evt.stopPropagation();
//     evt.preventDefault();
//   };

//   //method to play a video
//   var playVideo = function(evt) {
//     eventMethods(evt);
//     var videoUrl = evt.dataTransfer.getData("URL");
//     console.log(videoUrl);
    
//     if(videoUrl !== ""){
//       removePTags();
//       document.getElementById("player").style.width="600px";
//       document.getElementById("player").style.height="300px";
//       var videoId = url.parse(videoUrl).query.split('=')[1];
//       //clear content of div
//       console.log('url');
//       player.loadVideoById({videoId: videoId});

//     }
//   };

//   var playSearchVideo = function(videoId){
//     console.log("playSearchVideo1");
//     removePTags();
//     document.getElementById("player").style.width="600px";
//     document.getElementById("player").style.height="300px";
//     player.loadVideoById({videoId: videoId});
//   };



//   fileDropDiv.addEventListener('dragover', function(evt) {
//     eventMethods(evt);
//   });

//   //this event listener is only for files. Does NOT work for videos.
//   fileDropDiv.addEventListener('drop', function(evt) {
//     document.getElementById("player").style.width="0px";
//     document.getElementById("player").style.height="0px";
//     eventMethods(evt);
//     //get the path to the file dropped 
//     var path = evt.dataTransfer.files[0].path;
//     new lazy(fs.createReadStream(path))
//          .lines
//          .forEach(function(line){
            
//             console.log(line.toString());
//             var p = document.createElement("p");
//             var text = document.createTextNode(line.toString());
//             p.appendChild(text);
//             fileDropDiv.appendChild(p);
//          }
//     );

//   });

//   //this event listener handles videos.
//   fileDropDiv.addEventListener('dragenter', playVideo);

//   var removePTags = function() {
//     var div = document.getElementById('fileDrop');
//     var pTags = div.getElementsByTagName("p");
//     if(pTags.length > 0){
//       for (var i = pTags.length - 1; i >= 0; i--) {
//           pTags[i].parentNode.removeChild(pTags[i]);
//       }
//     }

//   };

//   global.playSearchVideo = playSearchVideo;

// };


