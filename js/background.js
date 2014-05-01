var currentUrl = null, 
    startTime;


var updateCurrentTab = function() {
  // get the currently active tab in the currently focused window
  chrome.windows.getCurrent(function(win) {
    chrome.tabs.query({active:true, windowId: win.id}, function(tabs) {
      var url = getDomain(tabs[0].url);

      // Invalid url
      if (url == null) {
        return;
      }

      // We're still on the same page
      if (url === currentUrl) {
        return;
      }

      var time = new Date().getTime();
      if (currentUrl != null) {
        // TODO Store the old page and time spend on it in storage
        var oldUrl    = currentUrl,
            timeSpent = time - startTime;
        console.log("Spent", timeSpent, "ms on", oldUrl);
      }

      // Update the variables to their current values
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


// Utility function to extract the domain of a url
var getDomain = function(url) {
  var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  var domain = matches && matches[1];  // domain will be null if no match is found
  return domain;
};
