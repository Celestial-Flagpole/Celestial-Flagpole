var nw = require('nw.gui');
var url = require('url-parse');

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
    //console.log('dragover');
    evt.stopPropagation();
    evt.preventDefault();
  });

  fileDropDiv.addEventListener('drop', function(evt) {
    console.log(evt.dataTransfer.files[0].path);
    console.log(evt);
    evt.stopPropagation();
    evt.preventDefault();
  });

  fileDropDiv.addEventListener('dragenter', function(evt) {
    console.log(evt.dataTransfer.getData("URL"));
    evt.stopPropagation();
    evt.preventDefault();
  });

  fileDropDiv.addEventListener('dragend', function(evt) {
    console.log('dragend');
    console.log(evt);
    evt.stopPropagation();
    evt.preventDefault();
  }, false);

};

