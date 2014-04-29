// React when the browser action button is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.extension.getViews({type: "popup"});
  alert("You clicked me");
});
