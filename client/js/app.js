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
Handling user drag of URL event
****************************************************/
window.URL = window.URL || window.webkitURL;

var dropbox;

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  if (!files.length) {
    fileList.innerHTML = "<p>No files selected!</p>";
  } else {
    fileList.innerHTML = "";
    var list = document.createElement("ul");
    fileList.appendChild(list);
    for (var i = 0; i < files.length; i++) {
      var li = document.createElement("li");
      list.appendChild(li);
      
      var img = document.createElement("img");
      img.src = window.URL.createObjectURL(files[i]);
      img.height = 60;
      img.onload = function() {
        window.URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);
      var info = document.createElement("span");
      info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
      li.appendChild(info);
    }
  }
}


// var video = document.getElementById('video');
// var blob = new Blob(['https://youtu.be/Yl3LBGJl_Zw'], {type: "video/mp4"});
// var obj_url = window.URL.createObjectURL(blob);
// video.src = obj_url;
// video.play()
// window.URL.revokeObjectURL(obj_url);


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



/**************************************************
Youtube search
****************************************************/
function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("keyup", function(e) {
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
                order: "viewCount",
                publishedAfter: "2010-01-01T00:00:00Z"
           }); 
           // execute the request
           request.execute(function(response) {
              var results = response.result;
              $("#results").html("");
              $.each(results.items, function(index, item) {
                  $("#results").append('<span>' + 'title: ' + item.snippet.title, "videoid " +  item.id.videoId+ '</br></span>');
                });
              });
              resetVideoHeight();
        
        $(window).on("resize", resetVideoHeight);
       }
    });
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyB43aTG-cE39P6ZnaQ2v_pWWvgSVr1l73s");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}

