/**
 * Display map
 *
 * @package checkin
 */

define(function(require) {

	var elgg = require('elgg');	
	require('google_places_library');

	var geocoder;
	var checkinmap;
	var address = getaddress;	
	
	function initMap() {
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(57.053677, 9.923551);
		var mapOptions = {
			zoom: 14,
			center: latlng
		}
		checkinmap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);		
		codeAddress(geocoder, checkinmap);
	}
	google.maps.event.addDomListener(window, 'load', initMap);
	  
	function codeAddress(geocoder, checkinmap) {
		geocoder.geocode({'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				checkinmap.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: checkinmap,
					position: results[0].geometry.location
				});
			} else {
				alert(elgg.echo('checkin:js:error') + status);
			}
		});
	}
});
