var nw = require('nw.gui'); // require the nw module
var win = nw.Window.get(); // Window object
var util = require('util')
var exec = require('child_process').exec;
var os = require('os'); // Operating system info
var platform = os.platform(); // OS platform type
var osType = os.EOL; // returns linux, darwin, win32, freebsd, sunos
var fs = require('fs'); // File operations

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
