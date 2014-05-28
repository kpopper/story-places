// Show the map and locate the user on it
var map = L.mapbox.map('map', window.data.mapId, {maxZoom: 15});
if (navigator.geolocation) {
  map.locate();
}

// Show stories directly from within Mapbox
// $.getJSON('/stories.json', function(data) {
//   markers = [];
//   $.each(data, function(i, story){
//     console.log(story);
//     var marker = L.marker([story.centre.latitude, story.centre.longitude]).addTo(map);
//     L.circle([story.centre.latitude, story.centre.longitude], story.radius).addTo(map);
//     markers.push(marker);
//   });

//   var group = new L.featureGroup(markers);
//   map.fitBounds(group.getBounds());
// });

// Check for geolocational ability
map.on('locationfound', function(e) {

  // We have the user's location
  console.log( 'User\'s current location: ' + e.latlng.lat + ', ' + e.latlng.lng );

  // Fetch the polygons and markers to display stories on the map
  // window.story.data.getStoryPolygons(mapId, function(data) {
  //   console.log('polygons retrieved: ' + JSON.stringify(data));

  //   // polygons will contain an array of polygons the current user is inside
  //   var geojson = L.geoJson(data);
  //   var polygons = leafletPip.pointInLayer([e.latlng.lng, e.latlng.lat], geojson);
  //   console.log(polygons);
  // });

  // Fetch info for any stories the user can listen to
  window.storyplaces.data.getStoriesForLatLng(e.latlng.lat, e.latlng.lng, window.storyplaces.ui.story.processData);

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
});
