var nw = require('nw.gui'); // require the nw module
var util = require('util')
var exec = require('child_process').exec;
var os = require('os');
var win = nw.Window.get();
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
