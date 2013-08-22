function ready(callback) { 
  var wait = function() {
    setTimeout(function() {
      ready.call(null, callback); 
    }, 100); 
  };

  /* Epic ternary. */
  try {
      var player = document.getElementById('jsPlayerEmbed');
      (  isUndefined(player)         
      ) ? wait() : setTimeout(function() { callback(); }, 3e3);
  } catch (err) {
      console.log('WAITING');
      wait(); 
  }
}

function isUndefined(value) {
    return typeof value === 'undefined';
}

/* Load each GES module. */
ready(function() { 
  var queue = document.getElementById('jsPlayerEmbed').getCurrentQueue();
  chrome.extension.sendMessage({queue: queue});
});

