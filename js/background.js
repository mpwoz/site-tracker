var currentTabId;

// Initialize the currentTabId to the tab we're on


// This fires when the active tab changes
chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log("active tab", activeInfo);
  //currentTabId = activeInfo.tabId;
  /*chrome.tabs.get(tabId, function(tab) {
    console.log(tab);
  });*/
});


// This fires when a different page is visited
chrome.history.onVisited.addListener(function (details) {
  console.log("history", details);
});



// Utility function to extract the domain of a url
var getDomain = function(url) {
};
