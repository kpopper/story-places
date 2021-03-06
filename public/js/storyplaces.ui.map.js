(function(window, undefined){

  function showMap(mapId) {
    // Show the map and centre it on the current location
    map = L.mapbox.map('map', mapId, {maxZoom: 15});
    map.locate();
    return map;
  }

  function showUserOnMap(lng, lat) {
    // Add User's location to the map
    var featureLayer = window.data.map.featureLayer.getGeoJSON();
    featureLayer.features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [lng, lat]
      },
      properties: {
        'marker-color': '#000',
        'marker-symbol': 'star-stroked'
      }
    });
    window.data.map.featureLayer.setGeoJSON(featureLayer);
  }

  function addStoryToMap(story) {
    var polygon = L.polygon([]);
    console.log(story);
    $.each(story.coordinates, function(index, coord){
      polygon.addLatLng(L.latLng(coord.latitude, coord.longitude));
    });
    window.data.map.addLayer(polygon);
  }

  function showAllStories() {
    window.data.map.fitBounds(window.data.map.featureLayer.getBounds());
  }

	window.storyplaces.ui.map = {
		showMap : showMap,
		showUserOnMap : showUserOnMap,
    addStoryToMap : addStoryToMap,
    showAllStories : showAllStories
	}

})(window);