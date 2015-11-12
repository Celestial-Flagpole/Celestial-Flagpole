var nw = require('nw.gui');
var url = require('url-parse');
var fs = require('fs');

var win = nw.Window.get();

console.log('testing');

window.onload = function (){
  console.log("window loaded");
  
  var dropSection = document.getElementById('fileDrop');

  var body = document.body;
  var fileDropDiv = document.createElement('div');
  fileDropDiv.id = "fileDrop";
  fileDropDiv.style.width = window.innerWidth;
  fileDropDiv.style.height = window.innerHeight;
  body.appendChild(fileDropDiv);

  fileDropDiv.addEventListener('dragover', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });

  fileDropDiv.addEventListener('drop', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
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

  fileDropDiv.addEventListener('dragenter', playVideo);

  var playVide = function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var url = evt.dataTransfer.getData("URL");
    if(url !== undefined){
      fileDropDiv.innerHTML = "";
      var video = document.createElement('video');
      video.style.width = window.innerWidth;
      video.style.height = window.innerHeight;
      video.src = url;
      video.autoPlay = true;
      fileDropDiv.appendChild(video);
    }

  }


};

