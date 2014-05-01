// Get the current page
var visited = window.location.hostname;
console.log(visited);


chrome.storage.sync.set({'visitedPages':{pageUrl:visited}}, function () {
  console.log("Just visited",visited)
});
