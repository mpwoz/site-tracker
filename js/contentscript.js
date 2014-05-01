
/*

   Example of what the data in storage should look like

   { 
     visitedPages: [
        {
          url: "google.com",
          time: 123251
        },
        ...
     ]
   }



*/



// Get the current page
var visited = window.location.hostname;
console.log(visited);

chrome.storage.local.get("visitedPages", function(result) {
  pages = result["visitedPages"];

  // Make sure pages is defined
  if (!pages) { pages = []; }

  // Add the new page value
  pages.push({
    url: visited
  });

  // Update the value of 'visitedPages' to whatever we made it above
  console.log(pages);
  chrome.storage.local.set({'visitedPages':pages}, function () {
    console.log("Just visited",visited)

    // Uncomment this to clear your storage data
    // chrome.storage.local.clear(function() { console.log("Cleared local storage"); });
  });
});


