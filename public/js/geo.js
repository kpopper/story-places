// Show the map and locate the user on it
var map = L.mapbox.map('map', window.data.mapId, {maxZoom: 15});
if (navigator.geolocation) {
  map.locate();
}

// Check for geolocational ability
map.on('locationfound', function(e) {

  // We have the user's location
  console.log( 'User\'s current location: ' + e.latlng.lat + ', ' + e.latlng.lng );

  // Add User's location to the map
  var featureLayer = map.featureLayer.getGeoJSON();
  featureLayer.features.push({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [e.latlng.lng, e.latlng.lat]
    },
    properties: {
      'marker-color': '#000',
      'marker-symbol': 'star-stroked'
    }
  });
  map.featureLayer.setGeoJSON(featureLayer);

  // Fetch info for any stories the user can listen to
  window.storyplaces.data.getStoriesForLatLng(e.latlng.lat, e.latlng.lng, window.storyplaces.ui.story.processData);
});
