(function(window, $, undefined) {

	function getStoriesForLatLng(lat, lng, callback) {
		$.ajax( {
			url : '/stories/' + lat + ',' + lng,
			contentType : 'application/json',
			dataType : "json",
			type : 'GET',
			success : callback,
			error: onError
		} );
	}

	function getAllStories(callback) {
		$.ajax( {
			url : '/stories',
			contentType : 'application/json',
			dataType : 'json',
			type : 'GET',
			success : callback,
			error : onError
		} );
	}

	function getStoryPolygons(mapId, callback) {
		$.ajax( {
			url : 'http://api.tiles.mapbox.com/v3/' + mapId + '/markers.geojson',
			contentType : 'application/json',
			dataType : "json",
			type : 'GET',
			success : callback,
			error: onError
		} );
	}

	function onError(res) {
		console.error(res.statusText);
	}

	window.storyplaces.data = {
		getStoriesForLatLng : getStoriesForLatLng,
		getAllStories : getAllStories,
		getStoryPolygons : getStoryPolygons
	};

})(window, jQuery);