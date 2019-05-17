/**
 * Display all checkins map
 *
 * @package checkin
 */

define(function(require) {

	var elgg = require('elgg');	
	require('google_places_library');

	var geocoder;
	var map;
	var locations = getallcheckins;
	var bounds = new google.maps.LatLngBounds();

	function initialize() {
		console.log(locations);
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(57.053677, 9.923551);
		var mapOptions = {
			zoom: 14,
			center: latlng
		}
		map = new google.maps.Map(document.getElementById('site-map-canvas'), mapOptions);		
		
		for (i = 0; i < locations.length; i++) {
			geocodeAddress(locations, i);			
		}
	}
	google.maps.event.addDomListener(window, "load", initialize);

	function geocodeAddress(locations, i) {
		var address = locations[i][0];
		geocoder.geocode({'address': locations[i][0]}, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					animation: google.maps.Animation.DROP,
					address: address,
				})
				infoWindows(marker, map, address);
				bounds.extend(marker.getPosition());
				map.fitBounds(bounds);
			} else {
				alert(elgg.echo('checkin:js:error') + status);
			}
		});
	}
		
	function infoWindows(marker, map, address) {
					
		var contentString = '<div id="infowindow-content">' + address + '</div>';		
		var iw = new google.maps.InfoWindow({
			content: contentString, maxWidth: 300
		});
		
		google.maps.event.addListener(marker, 'click', function () {
			iw.open(map, marker);			
		});
		google.maps.event.addListener(map, 'click', function(){
			iw.close(map, marker);
		});
	}
});