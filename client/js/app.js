var nw = require('nw.gui'); // require the nw module
var clipboard = nw.Clipboard.get();
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

function init () {
    gapi.client.setApiKey("AIzaSyB43aTG-cE39P6ZnaQ2v_pWWvgSVr1l73s");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}

/**************************************************
Context Menu
****************************************************/
// Tracking which element was clicked on
var whichNode;

// Context menu for paragraphs
var paraMenu = new nw.Menu();

if (whichNode.tagName.toLowerCase() == 'div') {
  paraMenu.append(new gui.MenuItem({
    label: "Cut",
    click: function () {
      clipboard.set(whichNode.value);
      whichNode.value = '';
    }
  }));

  paraMenu.append(new gui.MenuItem({
    label: "Copy",
    click: function () {
      clipboard.set(whichNode.value);
    }
  }));

  paraMenu.append(new gui.MenuItem({
    label: "Paste",
    click: function () {
      whichNode.value = clipboard.get();
    }
  }));
} else if (whichNode.tagName.toLowerCase() == 'a') {
  paraMenu.append(new gui.MenuItem({
    label: "Copy Link",
    click: function () {
      var url = whichNode.href;
      clipboard.set(url);
    }
  }));
} else {
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    paraMenu.append(new gui.MenuItem({
      label: "Copy",
      click: function () {
        clipboard.set(selection);
      }
    }));
  }
}

window.oncontextmenu = function (e) {
    e.preventDefault();
    whichNode = e.target || e.srcElement;
    paraMenu.popup(e.x, e.y);
};


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
//                      $("#resultsfs").append('<a><span onclick="readFile(\''+item.file+'\')">' + item.file + '</span></a></br>');
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



