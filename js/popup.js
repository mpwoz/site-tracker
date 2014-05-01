$(function(){
  console.log("opened popup");

  // TODO this is supposed to detect changes to storage, like
  // when a new page is visited and added
  chrome.storage.onChanged.addListener(function (changes,areaName) {
    console.log("New item in storage",changes.visitedPages.newValue);
  })
});
