var map = L.mapbox.map('map', 'examples.map-uci7ul8p', {maxZoom: 16});
$.getJSON('/stories.json', function(data) {
  markers = [];
  $.each(data, function(i, story){
    console.log(story);
    var marker = L.marker([story.centre.latitude, story.centre.longitude]).addTo(map);
    L.circle([story.centre.latitude, story.centre.longitude], story.radius).addTo(map);
    markers.push(marker);
  });
  
  var group = new L.featureGroup(markers);
  map.fitBounds(group.getBounds());
});


navigator.geolocation.watchPosition( function( position ) {
  console.log( 'position: ' + position.coords.latitude + ', ' + position.coords.longitude + ', ' + position.coords.accuracy );

  // Show user's position on the map
  var coords = [position.coords.latitude, position.coords.longitude];
  map.setView(coords, 16);
  L.marker(coords, {icon: L.icon({iconUrl: "/img/user.png"})}).addTo(map);
  // L.circle(coords, data[i].radius).addTo(map);


  $.getJSON('/stories/' + position.coords.latitude + ',' + position.coords.longitude, function(data){
    if( data.lenth == 0 ) {
      $( "#stories" ).empty();
    }
    for(var i = 0; i < data.length; i++) {
      console.log(data[i]);
      $( "#stories" ).append( '<li id="welcome">' + data[i].title + ': ' + data[i].audio_html + '</li>' );
      $( '<a href="#">play</a>' ).click(function(){ document.getElementById( 'player' ).play(); }).appendTo('#welcome');
      // var coords = [data[i].centre.latitude, data[i].centre.longitude];
      // map.setView(coords, 16);
      // L.marker(coords).addTo(map);
      // L.circle(coords, data[i].radius).addTo(map);
    }
  });
}, function( err ) {
  if ( err.code == 1 )
  {
    // user said no!
  }
}, {
  enableHighAccuracy: true,
  timeout:60000
});