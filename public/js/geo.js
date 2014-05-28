$( "#stories" ).hide();

// Show the map and locate the user on it
var map = L.mapbox.map('map', 'kpopper.hkk51f45', {maxZoom: 15});
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

  // Best solution is probably to GET /stories/lat,lng here passing in user's location
  // that should then return the markup for the found story.
  // This means that the logic to determine if someone can listen to a story happens on the server.

  // Fetch the polygons and markers for the stories
  $.getJSON('http://api.tiles.mapbox.com/v3/' + mapId + '/markers.geojson', function(data) {
    console.log('polygons retrieved: ' + JSON.stringify(data));

    // polygons will contain an array of polygons the current user is inside
    var geojson = L.geoJson(data);
    var polygons = leafletPip.pointInLayer([e.latlng.lng, e.latlng.lat], geojson);
    console.log(polygons);
  });

  $.getJSON('/stories/' + e.latlng.lat + ',' + e.latlng.lng, function(data){
    // Perhaps this should return an oEmbed format document?

    if( data.lenth == 0 ) {
      $( "#no-stories" ).show();
      $( "#stories" ).empty().hide();
    }
    for(var i = 0; i < data.length; i++) {
      var story = data[i].story

      // TODO: Don't keep adding duplicate stories. There should only ever be 1.
      console.log(story);
      $( "#no-stories" ).hide();
      if( $( "#stories .story[data-story-id=" + story.id + "]").length == 0 ) {
        var template = $('#story-template').html();
        var output = Mustache.render(template, story);
        $( "#stories" ).append(output).show();
        $( ".story[data-story-id=" + story.id + "] .controls a").click(function(){
          var player = document.getElementById('player');
          if (!player.paused) {
            player.pause();
          } else {
            player.play();
          }
        });
        // $( "#stories" ).append( story_template.replace('{{name}}', data[i].title).replace('{{id}}', data[i].id) );
        // $( ".story .controls").prepend( data[i].audio_html );
        // $( "#stories" ).show();
      }
      // var coords = [data[i].centre.latitude, data[i].centre.longitude];
      // map.setView(coords, 16);
      // L.marker(coords).addTo(map);
      // L.circle(coords, data[i].radius).addTo(map);
    }
  });

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
