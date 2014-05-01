var currentTabId, 
    currentUrl;

var updateCurrentTab = function() {
  chrome.windows.getCurrent(function(win) {
    chrome.tabs.query({active:true, windowId: win.id}, function(results) {
      console.log("active tabs", results);
    });
  });
  //chrome.tabs.getCurrent(function (tab) {
  //  console.log(tab);
  //  currentTabId = tab.id;
  //  currentUrl   = getDomain(tab.url);
  //  console.log("Updated", currentTabId, currentUrl);
  //});
}


// This fires when the active tab changes
chrome.tabs.onActivated.addListener(function(activeInfo) {
  updateCurrentTab();
  //console.log("active tab", activeInfo);
  //currentTabId = activeInfo.tabId;
  /*chrome.tabs.get(tabId, function(tab) {
    console.log(tab);
  });*/
});


// This fires when a different page is visited
chrome.history.onVisited.addListener(function (details) {
  updateCurrentTab();
  //console.log("history", details);
  //var domain = getDomain(details.url);
  //console.log(domain);
});



// Utility function to extract the domain of a url
var getDomain = function(url) {
  var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  var domain = matches && matches[1];  // domain will be null if no match is found
  return domain;
};
