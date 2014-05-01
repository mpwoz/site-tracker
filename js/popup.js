var addIcon = function(picUrl, search) {
	var image = $('<img>');

	// set src and size
	$(image).attr("src", picUrl);
  var scale = search.scale * 90 + 20;
	$(image).css("width", scale);
	$(image).css("height", scale);
	$(image).attr("title", search.url + ": " + (search.time / 1000) + "s");
	$(image).addClass("tooltip");
	// append to body
	$('#content').append($(image));
};

isSearchAvailable = true;

google.load("search", "1");

function searchComplete() {

	// Check that we got results
	if (imageSearch.results && imageSearch.results.length > 0) {

		// Loop through our results, printing them to the page.
		var result = imageSearch.results[0];

		addIcon(result.url, search[index]);
		index = index + 1;

		isSearchAvailable = true;

	}
}


$(function() {
	// Create an Image Search instance.
	google.search.Search.getBranding('branding');
	imageSearch = new google.search.ImageSearch();

	// Set searchComplete as the callback function when a search is 
	// complete.  The imageSearch object will have results in it.
	imageSearch.setSearchCompleteCallback(this, searchComplete, null);

	index = 0;

	var getDataAndRender = function(val) {
    if (!val) {
			alert("no data retrived from local storage");
      return;
    }

    // Total time spent on all pages (to divide by for relative scaling)
    val=val.pages;
    total = 0;
    for (var k in val) {
      total = total + parseInt(val[k]);
    }

    search = [];

    // The queries to search for icons, and relative scales
    for (var k in val) {
      search.push({
        search: k+ " icon",
        time: val[k],
        scale: parseInt(val[k]) / total,
        url: k
      });
    }


    var compareTimes = function(a,b) {
      if (a.time < b.time)
         return -1;
      if (a.time > b.time)
        return 1;
      return 0;
    };
    search.sort(compareTimes);
    search.reverse(); // We want to see the biggest/most frequent first



    var intervalfun = function() {
      if (isSearchAvailable) {
        if (index < search.length) {
          imageSearch.execute(search[index].search);
          isSearchAvailable = false;
        } else {
          //break out of intervarl
          clearInterval(intervalID);
          $('.tooltip').tooltipster();
        }
      }
    }

    intervalID = setInterval(intervalfun, 50);
	};

	chrome.storage.local.get("pages", getDataAndRender);


});
