var nw = require('nw.gui');
var url = require('url');
var fs = require('fs');

var win = nw.Window.get();

var body = document.body;
var fileDropDiv = document.createElement('div');
//add an id to the div
fileDropDiv.id = "fileDrop";
//set the width and height to the window size
fileDropDiv.style.width = window.innerWidth;
fileDropDiv.style.height = window.innerHeight;
//append the div to the body
body.appendChild(fileDropDiv);

var player;
var iFrameDiv = document.createElement('div');
iFrameDiv.id = "player";
iFrameDiv.style.width = fileDropDiv.offsetWidth;
iFrameDiv.style.height = fileDropDiv.offsetHeight;
fileDropDiv.appendChild(iFrameDiv);
var tag = document.createElement('script');
tag.src = "http://www.youtube.com/iframe_api";
document.body.appendChild(tag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: fileDropDiv.offsetHeight,
    width: fileDropDiv.offsetWidth,
    //videoId: 'M7lc1UVf-VE',
    events: {
      'onReady': onPlayerReady,
    }
  });
};

function onPlayerReady(event) {
  console.log('onPlayerReady');
  event.target.playVideo();
}

function stopVideo() {
  player.stopVideo();
}

window.onload = function (){
  //default event methods executed every time
  var eventMethods = function(evt){
    evt.stopPropagation();
    evt.preventDefault();
  };

  //method to play a video
  var playVideo = function(evt) {
    console.log('playvideo');
    eventMethods(evt);
    var videoUrl = evt.dataTransfer.getData("URL");
    var videoId = url.parse(videoUrl).query.split('=')[1];
    
    if(url !== undefined){
      //clear content of div
      console.log('url');
      player.loadVideoById({videoId: videoId});

    }
  };


  fileDropDiv.addEventListener('dragover', function(evt) {
    eventMethods(evt);
  });

  //this event listener is only for files. Does NOT work for videos.
  fileDropDiv.addEventListener('drop', function(evt) {
    eventMethods(evt);
    //get the path to the file dropped 
    var path = evt.dataTransfer.files[0].path;
    //fs to read the file
    fs.readFile(path, 'utf8', function(err, data){
      if(err){
        throw err;
      }else{
        fileDropDiv.innerHTML = data;
      }
    });

  });

  //this event listener handles videos.
  fileDropDiv.addEventListener('dragenter', playVideo);

};

