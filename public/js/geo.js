$( "#stories" ).hide();

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

var story_template = '' + 
'<div class="story" data-story-id="{{id}}">' +
'  <h2 class="name">{{name}}</h2>' +
'  <div class="controls">' +
'    <a href="#"><i class="fa fa-play-circle play" /></a>' +
'  </div>' +
'  <h3 class="author">by <span class="author-name">William Sutcliffe</span></h3>' +
'  <p class="published">on <span class="published-date">23rd Feb 2014</span></p>' +
'</div>';

map.on('locationfound', function(e) {
  console.log( 'position: ' + e.latlng.lat + ', ' + e.latlng.lng );

  $.getJSON('http://api.tiles.mapbox.com/v3/kpopper.hkk51f45/markers.geojson', function(data) {
    console.log('polygons retrieved: ' + JSON.stringify(data));
    var geojson = L.geoJson(data);
    var polygons = leafletPip.pointInLayer([e.latlng.lng, e.latlng.lat], geojson);
    console.log(polygons);
  });

  $.getJSON('/stories/' + e.latlng.lat + ',' + e.latlng.lng, function(data){
    if( data.lenth == 0 ) {
      $( "#no-stories" ).show();
      $( "#stories" ).empty().hide();
    }
    for(var i = 0; i < data.length; i++) {
      // TODO: Don't keep adding duplicate stories. There should only ever be 1.
      console.log(data[i]);
      $( "#no-stories" ).hide();
      if( $( "#stories .story[data-story-id=" + data[i].id + "]").length == 0 ) {
        var template = $('#story-template').html();
        var output = Mustache.render(template, data[i]);
        $( "#stories" ).append(output).show();
        $( ".story[data-story-id=" + data[i].id + "] .controls a").click(function(){
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

  map.featureLayer.setGeoJSON({
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

});
