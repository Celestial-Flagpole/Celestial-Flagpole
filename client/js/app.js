var nw = require('nw.gui'); // require the nw module
var win = nw.Window.get(); // Window object
var util = require('util')
var exec = require('child_process').exec;
var os = require('os'); // Operating system info
var platform = os.platform(); // OS platform type
var osType = os.EOL; // returns linux, darwin, win32, freebsd, sunos
var fs = require('fs'); // File operations
var url = require('url');

// https://nodejs.org/api/os.html

/**************************************************
Handling Minimize, Maximize and Close window events 
****************************************************/
win.isMaximized = false;

document.getElementById('windowControlMinimize').onclick = function () {
  win.minimize();
};

document.getElementById('windowControlClose').onclick = function () {
  win.close();
};

document.getElementById('windowControlMaximize').onclick = function () {
  if (win.isMaximized) {
    win.unmaximize();
  } else {
    win.maximize();
  }
};

win.on('maximize', function() {
  win.isMaximized = true;
});

win.on('unmaximize', function() {
  win.isMaximized = false;
});

/**************************************************
Context menu
****************************************************/

var paraMenu = new nw.Menu();
// Context sub-menu for paragraph styles
var paraStyleMenu = new nw.Menu();

// Track which element was clicked on
var whichNode;

// [entry] Remove a paragraph
paraMenu.append(new nw.MenuItem({
    label: 'Remove this paragraph',
    click: function(){
        whichNode.parentNode.removeChild(whichNode);
    }
}));

// Separator
paraMenu.append(new nw.MenuItem({
    type: 'separator'
}));

// [entry] sub-menu
paraMenu.append(new nw.MenuItem({
    label: 'Change Style',
    submenu: paraStyleMenu
}));

// Then can do stuff on the paraStyleMenu as well

document.body.addEventListener('contextmenu', function(e) {
  e.preventDefault();

  if (e.target.localName === 'p') {
    whichNode = e.srcElement;
    paraMenu.popup(e.x, e.y); // have an event reference to x & y values
  }
  // DO SOMETHING
});



// ========================= //
// declare window menu
var windowMenu = new nw.Menu({
  type: 'menubar'
});

nw.Window.get().menu = windowMenu;

// Help menu
var helpMenu = new nw.Menu();

// Add to window menu
windowMenu.append(new nw.MenuItem({
  label: 'help',
  submenu: helpMenu
}));

// About sub-entry
helpMenu.append(new nw.MenuItem({
  label: 'about',
  click: function () {
    alert('I made this!');
  }
}));

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
