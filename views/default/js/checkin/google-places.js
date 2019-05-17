/**
 * Google Places Search Box
 *
 * @package checkin
 */

define(function(require) {

	var elgg = require('elgg');
	require('google_places_library');
	  	
	function initAutocomplete() {
	  	
		// Create the search box and link it to the UI element.
		var input = document.getElementById('pac-input');
		var searchBox = new google.maps.places.SearchBox(input);
		
		// Listen for the event fired when the user selects a prediction and retrieve
		// more details for that place.
		searchBox.addListener('places_changed', function() {
			var places = searchBox.getPlaces();
			
			if (places.length == 0) {
				return;
			}
		});
	}
	google.maps.event.addDomListener(window, 'load', initAutocomplete);
});
