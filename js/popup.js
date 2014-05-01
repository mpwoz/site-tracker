var addIcon = function(url, size, time) {
	var image = $('<img>');

	// set src and size
	$(image).attr("src", url);
	$(image).css("width", size * 50+30);
	$(image).css("height", size * 50+30);
	$(image).attr("title", time);
	$(image).addClass("tooltip");
	// append to body
	$('#content').append($(image));
};

isSearchAvailable = true;

// addIcon("facebook.com", 1);
// addIcon("google.com", 0.6);
// addIcon("reddit.com", 1);
// addIcon("illinois.edu", .4);
// 

google.load("search", "1");

function searchComplete() {

	// Check that we got results
	if (imageSearch.results && imageSearch.results.length > 0) {

		// Grab our content div, clear it.
		// var contentDiv = $('#content');


		// Loop through our results, printing them to the page.
		var result = imageSearch.results[0];

		// var imgContainer = document.createElement('div');


		// var newImg = document.createElement('img');
		addIcon(result.url, search[index].scale, "22:30");
		index = index + 1;

		isSearchAvailable = true;

		// There is also a result.url property which has the escaped version
		// newImg.src = result.url;
		// imgContainer.appendChild(newImg);

		// // Put our title + image in the content
		// contentDiv.append(imgContainer);


	}
}


$(function() {
	// Create an Image Search instance.
	google.search.Search.getBranding('branding');
	imageSearch = new google.search.ImageSearch();

	// Set searchComplete as the callback function when a search is 
	// complete.  The imageSearch object will have results in it.
	imageSearch.setSearchCompleteCallback(this, searchComplete, null);

	// imageSearch.execute("facebook icon");
	// isSearchAvailable=false;

	index = 0;


	search = [{
		search: "facebook icon",
		scale: 1
	}, {
		search: "google icon",
		scale: 0.05
	}, {
		search: "reddit icon",
		scale: 0.7
	}, {
		search: "twitter icon",
		scale: 0.3
	}, {
		search: "illinois icon",
		scale: 0.9
	}];

	var fun = function(array) {
		// var index=0;
		return function() {
			if (isSearchAvailable) {
				if (index < array.length) {
					imageSearch.execute(array[index].search);

					isSearchAvailable = false;
				} else {
					//break out of intervarl
					clearInterval(intervalID);
					$('.tooltip').tooltipster();
				}

			}
		}
	}

	intervalID = setInterval(fun(search), 50);



});