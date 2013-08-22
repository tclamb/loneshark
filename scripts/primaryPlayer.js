chrome.runtime.onMessage.addListener(function(message) {
  var queue = message.queue;
  
  var script = document.createElement('script');
  script.textContent = '(function() { var songs = [';
  for (var i = 0, j = queue.songs.length; i < j; i++) {
    script.textContent += queue.songs[i].SongID;
    if (i != j-1)
      script.textContent += ",";
  }
  script.textContent += ']; GS.Services.SWF.addSongs(songs); }());';
  document.body.appendChild(script);
});
