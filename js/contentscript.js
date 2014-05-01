// Get the current page
var visited = window.location.hostname;
console.log(visited);


chrome.storage.local.get("visitedPages", function(result) {
  pages = result["visitedPages"];
  console.log(pages);
  pages.push({pageUrl: visited}); // Add the new page
  chrome.storage.local.set({'visitedPages':pages}, function () {
    console.log("Just visited",visited)
  });
});


chrome.storage.local.get("visitedPages", function(items) {
  console.log("Got from storage:", items);
});

chrome.storage.local.clear(function() {
  console.log("Cleared");
});
