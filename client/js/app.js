var nw = require('nw.gui'); // require the nw module
var win = nw.Window.get(); // Window object
var util = require('util');
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

// function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

// $(function() {
//     $("#youtube").on("keyup", function (e) {
//        e.preventDefault();
//        // prepare the request
//        if ($('#search').val() === '') {
//         $('#results').html("");
//        } else {
//            var request = gapi.client.youtube.search.list({
//                 part: "snippet",
//                 type: "video",
//                 q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
//                 maxResults: 10,
//                 videoEmbeddable: true,
//                 order: "viewCount",
//                 publishedAfter: "2000-01-01T00:00:00Z"
//            }); 
//            // execute the request
//            request.execute(function (response) {
//               var results = response.result;
//               $("#results").html("");
//               $.each(results.items, function(index, item) {
//                   $("#results").append('<span onclick="searchVideo(\''+item.id.videoId+'\')">' + '<img src=' + item.snippet.thumbnails.default.url + '>' + ' Title: ' + item.snippet.title + '</br></span>');
//                 });
//               });
//               resetVideoHeight();
        
//         $(window).on("resize", resetVideoHeight);
//        }
//     });
// });

// function searchVideo (id) {
//   console.log(id);
//   global.playSearchVideo(id);
// }

// function resetVideoHeight () {
//     $(".video").css("height", $("#results").width() * 9/16);
// }

function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("#youtube").on("keyup", function (e) {
       e.preventDefault();
       // prepare the request
       if ($('#search').val() === '') {
        $('#results').html("");
       } else {
        console.log('key up')
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
                var videoId = item.snippet.videoId;
                  $("#results").append('<span onclick="searchPlayVideo(\''+item.id.videoId+'\')">' + '<img src=' + item.snippet.thumbnails.default.url + '>' + ' Title: ' + item.snippet.title + '</br></span>');
                });
              });
              resetVideoHeight();
        
        $(window).on("resize", resetVideoHeight);
       }

    });
});

function searchPlayVideo (videoId) {
  console.log('I ran!' + videoId);
  global.searchPlayVideo(videoId);
}

function resetVideoHeight () {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init () {
    gapi.client.setApiKey("AIzaSyB43aTG-cE39P6ZnaQ2v_pWWvgSVr1l73s");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}


/**************************************************
User file directory search
****************************************************/

// $(function() {
//     $("#filesystem").on("submit", function (e) {
//        e.preventDefault();
//        // prepare the request
//        if ($('#searchfs').val() === '') {
//         $('#resultsfs').html("");
//        } else {
//           var query = $('#searchfs').val(); 
//           console.log('query: ' + query)

//            $.ajax({
//             url: 'http://127.0.0.1:8686/api/float/',
//             type: 'GET',
//             data: query,
//             crossDomain: true,
//             contentType: 'application/json',
//             success: function (data) {
//                $("#resultsfs").html("");
//                if (data.length === undefined) {
//                 return; 
//                } else {
//                  $.each(data, function(index, item) {
//                      $("#resultsfs").append('<a><span>' + item.file + '</span></a></br>');
//                    });
//                }
//             },
//             error: function (data) {
//               console.error('failed');
//             }
//            });
//        }
//     });
// });

//create shortcut to minimize the window

$(function() {
    $("#filesystem").on("submit", function (e) {
       e.preventDefault();
       // prepare the request
       if ($('#searchfs').val() === '') {
        $('#resultsfs').html("");
       } else {
          var query = $('#searchfs').val(); 
          console.log('query: ' + query)

           $.ajax({
            url: 'http://127.0.0.1:8686/api/float/',
            type: 'GET',
            data: query,
            crossDomain: true,
            contentType: 'application/json',
            success: function (data) {
               $("#resultsfs").html("");
               if (data.length === undefined) {
                return; 
               } else {
                 $.each(data, function(index, item) {
                     $("#resultsfs").append('<a><span onclick="readFile(\''+item.file+'\')">' + item.file + '</span></a></br>');
                   });
               }
            },
            error: function (data) {
              console.error('failed');
            }
           });
       }
    });
});

function readFile (path) {
  global.readFile(path);
}


var minimize = {
  //ctrl is cmd in OSX
  key : "Ctrl+Shift+Down",
  active : function() {
    win.minimize();
  },
  failed : function(msg) {
    // :(, fail to register the |key| or couldn't parse the |key|.
    console.log(msg);
  }
};

//create shortcut to maximize the window
var maximize = {
  //ctrl is cmd in OSX
  key : "Ctrl+Shift+Up",
  active : function() {
    win.restore();
  },
  failed : function(msg) {
    // :(, fail to register the |key| or couldn't parse the |key|.
    console.log(msg);
  }
};

var close = {
  //ctrl is cmd in OSX
  key : "Ctrl+Shift+C",
  active : function() {
    win.close();
  },
  failed : function(msg) {
    // :(, fail to register the |key| or couldn't parse the |key|.
    console.log(msg);
  }
};

//register the shortcuts
nw.App.registerGlobalHotKey(new nw.Shortcut(minimize));
nw.App.registerGlobalHotKey(new nw.Shortcut(maximize));
nw.App.registerGlobalHotKey(new nw.Shortcut(close));



