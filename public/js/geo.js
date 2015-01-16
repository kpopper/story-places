// Don't show the map right away (temporary obviously)
return;

window.data.map = window.storyplaces.ui.map.showMap(window.data.mapId);

// Fetch all stories
window.storyplaces.data.getAllStories(window.storyplaces.ui.story.addStoriesToMap);

// Check for geolocational ability
window.data.map.on('locationfound', function(e) {

  // We have the user's location
  console.log( 'User\'s current location: lng: ' + e.latlng.lng + ', lat: ' + e.latlng.lat );

  // Show the user on the map
  window.storyplaces.ui.map.showUserOnMap(e.latlng.lng, e.latlng.lat);

  // Fetch info for any stories the user can listen to
  window.storyplaces.data.getStoriesForLatLng(e.latlng.lat, e.latlng.lng, window.storyplaces.ui.story.processData);
});
