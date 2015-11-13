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


/**************************************************
Window menu
****************************************************/
var windowMenu = new nw.Menu({
  type: 'menubar'
});

nw.Window.get().menu = windowMenu;

// Help menu
var helpMenu = new nw.Menu();

// Add to window menu
windowMenu.append(new nw.MenuItem({
  label: 'Help',
  submenu: helpMenu
}));

// About sub-entry
helpMenu.append(new nw.MenuItem({
  label: 'About',
  cssClass: 'about',
  click: function () {
    BootstrapDialog.show({
        message: function(dialog) {
            var $message = $('<div class="about"></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad': 'client/html/about.html'
        }
    });
  }
}));

nw.Window.get().menu = windowMenu;

// Go To menu

var goToMenu = new nw.Menu();

// Add to window menu
windowMenu.append(new nw.MenuItem({
  label: 'Go to',
  submenu: goToMenu
}));

// About sub-entry
goToMenu.append(new nw.MenuItem({
  label: 'URL',
  cssClass: 'goto',
  click: function () {
    BootstrapDialog.show({
        message: function(dialog) {
            var $message = $('<div class="about"></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad': 'client/html/temp.html'
        }
    });
  }
}));

nw.Window.get().menu = windowMenu;

// https://nakupanda.github.io/bootstrap3-dialog/
/**************************************************
Youtube search
****************************************************/

function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("keyup", function (e) {
       e.preventDefault();
       // prepare the request
       if ($('#search').val() === '') {
        $('#results').html("");
       } else {
           var request = gapi.client.youtube.search.list({
                part: "snippet",
                type: "video",
                q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
                maxResults: 10,
                videoEmbeddable: true,
                order: "viewCount",
                publishedAfter: "2000-01-01T00:00:00Z"
           }); 
           // execute the request
           request.execute(function (response) {
              var results = response.result;
              $("#results").html("");
              $.each(results.items, function(index, item) {
                  $("#results").append('<span>' + '<img src=' + item.snippet.thumbnails.default.url + '>' + ' Title: ' + item.snippet.title, " Videoid: " +  item.id.videoId + '</br></span>');
                });
              });
              resetVideoHeight();
        
        $(window).on("resize", resetVideoHeight);
       }
    });
});

function resetVideoHeight () {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init () {
    gapi.client.setApiKey("AIzaSyB43aTG-cE39P6ZnaQ2v_pWWvgSVr1l73s");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}

//shortcut to minimize
var minimize = {
  //ctrl is cmd in OSX
  key : "Ctrl+Shift+Down",
  active : function() {
    console.log("Global desktop keyboard shortcut: " + this.key + " active.");
    win.minimize();
  },
  failed : function(msg) {
    // :(, fail to register the |key| or couldn't parse the |key|.
    console.log(msg);
  }
};

var maximize = {
  //ctrl is cmd in OSX
  key : "Ctrl+Shift+Up",
  active : function() {
    console.log("Global desktop keyboard shortcut: " + this.key + " active.");
    win.restore();
  },
  failed : function(msg) {
    // :(, fail to register the |key| or couldn't parse the |key|.
    console.log(msg);
  }
};

//register the shortcuts
var minShortcut = new nw.Shortcut(minimize);
nw.App.registerGlobalHotKey(minShortcut);
var maxShortcut = new nw.Shortcut(maximize);
nw.App.registerGlobalHotKey(maxShortcut);

// var body = document.body;
// var fileDropDiv = document.createElement('div');
// //add an id to the div
// fileDropDiv.id = "fileDrop";
// //set the width and height to the window size
// fileDropDiv.style.width = window.innerWidth;
// fileDropDiv.style.height = window.innerHeight;
// //append the div to the body
// body.appendChild(fileDropDiv);

// var player;
// var iFrameDiv = document.createElement('div');
// iFrameDiv.id = "player";
// iFrameDiv.style.width = fileDropDiv.offsetWidth;
// iFrameDiv.style.height = fileDropDiv.offsetHeight;
// fileDropDiv.appendChild(iFrameDiv);
// var tag = document.createElement('script');
// tag.src = "http://www.youtube.com/iframe_api";
// document.body.appendChild(tag);

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     height: fileDropDiv.offsetHeight,
//     width: fileDropDiv.offsetWidth,
//     //videoId: 'M7lc1UVf-VE',
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
//     console.log('playvideo');
//     eventMethods(evt);
//     var videoUrl = evt.dataTransfer.getData("URL");
//     var videoId = url.parse(videoUrl).query.split('=')[1];
    
//     if(url !== undefined){
//       //clear content of div
//       console.log('url');
//       player.loadVideoById({videoId: videoId});

//     }
//   };


//   fileDropDiv.addEventListener('dragover', function(evt) {
//     eventMethods(evt);
//   });

//   //this event listener is only for files. Does NOT work for videos.
//   fileDropDiv.addEventListener('drop', function(evt) {
//     eventMethods(evt);
//     //get the path to the file dropped 
//     var path = evt.dataTransfer.files[0].path;
//     //fs to read the file
//     fs.readFile(path, 'utf8', function(err, data){
//       if(err){
//         throw err;
//       }else{
//         fileDropDiv.innerHTML = data;
//       }
//     });

//   });

//   //this event listener handles videos.
//   fileDropDiv.addEventListener('dragenter', playVideo);

// };

