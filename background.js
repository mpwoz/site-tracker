// React when the browser action button is clicked
// TODO Doesn't work right now...
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.extension.getViews({type: "popup"});
  alert("You clicked me");
});
