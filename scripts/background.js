var lonesharkTab = null;

// check to see if the domain of a tab is grooveshark.com (Chrome does not filter
// out tabs that don't match permissions set in the chrome extension, so you have to 
// go through manually and check whether or not a tab is actually a tab you have
// permissions for)
function isGrooveshark(tab) {
  var gsDomain = new RegExp("^http://grooveshark*");
  return tab.url.match(gsDomain);
}
// cycle through tabs to find a tab to make our primary player
function findLoneshark(tabs) {
  if (lonesharkTab != null) {
    tabs.forEach(function(tab) {
      if (isGrooveshark(tab)) {
        lonesharkTab = tab;
        chrome.tabs.executeScript(tab.id, {file: "scripts/primaryPlayer.js"});
      }
    });
  }
}

// run when extension is first started. loop through all open tabs to find primary player
chrome.tabs.getAllInWindow(null, function(tabs) {
  findLoneshark(tabs);
});

// listener for when a new tab is opened
chrome.tabs.onUpdated.addListener(function(tabId, info) {
  if (info.status == "complete") {
    chrome.tabs.get(tabId, function(tab) {
      if (lonesharkTab == null) {
        findLoneshark(tabs);
        return;
      }
      if (isGrooveshark(tab) && tabId != lonesharkTab.id) 
        chrome.tabs.executeScript(tabId, {file: "scripts/secondaryPlayer.js"});
    });
  }
});

// listener for when a message (namely a new song to add to the queue) is received
chrome.extension.onMessage.addListener(function(message) {
  console.log("received message", message);
  if (lonesharkTab != null) {
    // send the song to the loneshark tab
    chrome.tabs.sendMessage(lonesharkTab.id, message);
    // remove all tabs that are grooveshark tabs but are not the loneshark
    chrome.tabs.getAllInWindow(null, function(tabs) {
      tabs.forEach(function(tab) {
        if (isGrooveshark(tab) && lonesharkTab.id != tab.id) {
          chrome.tabs.remove(tab.id);
        }
      });
    });
    // attempt to give focus to the loneshark tab (fails because of Grooveshark player
    // close confirm dialog)
    chrome.tabs.update(lonesharkTab.id, {selected: true});
  }
});

// if a tab is removed, check to see if it was the primary player. if it was,
// find a new primary player if there are any other open GS tabs.
chrome.tabs.onRemoved.addListener(function (tabId) {
  if (tabId == lonesharkTab.id) {
    lonesharkTab = null;
  }
  findLoneshark(chrome.tabs);
});
