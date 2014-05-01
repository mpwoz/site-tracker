// Global variables to keep track of state
var currentUrl = null,  // The domain of the page we're currently on
    startTime;          // The milliseconds time that we first visited the page

var updateCurrentTab = function() {
  // get the currently active tab in the currently focused window
  chrome.windows.getCurrent(function(win) {
    chrome.tabs.query({active:true, windowId: win.id}, function(tabs) {
      var url = getDomain(tabs[0].url);

      // Invalid url, don't update
      if (url == null) {
        return;
      }

      // We're still on the same page, nothing to update
      if (url === currentUrl) {
        return;
      }

      // The current time, in milliseconds since epoch
      var time = new Date().getTime();

      // Store the old page and time spend on it in storage
      if (currentUrl != null) {
        var timeSpent = time - startTime;
        console.log("Spent", timeSpent, "ms on", currentUrl);
        updateStorage(currentUrl, timeSpent);
      }

      // Update the variables to their new values, reflecting the page we're on
      currentUrl = url;
      startTime  = time;

    });
  });
}


// Fire the update function whenever the tab or window changes, 
// or the user loads a different page in the same tab
chrome.tabs.onActivated.addListener(updateCurrentTab);
chrome.history.onVisited.addListener(updateCurrentTab);
chrome.windows.onFocusChanged.addListener(updateCurrentTab);


// Add the time spent on a page to the persistent storage
var updateStorage = function(url, time) {
  chrome.storage.local.get(null, function(result) {


    var items      = result || { pages: {} };
    items.pages    = items.pages || {};

    //console.log(items.pages);

    //console.log("items", items);
    var oldTime = items.pages[url] || 0;
    var totalTime = oldTime + time;
    console.log("Adding", time, 
                "ms to", oldTime, 
                "for total of", totalTime, 
                "Site:", url);
    
    items.pages[url] = totalTime;

    chrome.storage.local.set(items, function() {
      var msg = chrome.runtime.lasterror || "Storage update success.";
      console.log(msg);
    });
  });
};

// Function to clear your storage, call it from the console
var clearStorage = function() {
    chrome.storage.local.clear(function() { 
      var msg = chrome.runtime.lasterror || "Cleared storage.";
      console.log(msg);
    });
};


// Utility function to extract the domain of a url
var getDomain = function(url) {
  var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  var domain = matches && matches[1];  // domain will be null if no match is found
  return domain;
};
