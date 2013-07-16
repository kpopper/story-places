navigator.geolocation.getCurrentPosition( function( position ) {
  console.log( 'position: ' + position.coords.latitude + ', ' + position.coords.longitude + ', ' + position.coords.accuracy );
  $.getJSON('/stories/' + position.coords.latitude + ',' + position.coords.longitude, function(data){
    for(var i = 0; i < data.length; i++) {
      console.log(data[i]);
      var coords = [data[i].centre.latitude, data[i].centre.longitude];
      $( "#stories" ).append( '<li id="welcome">' + data[i].title + ': ' + data[i].audio_html + '</li>' );
      $( '<a href="#">play</a>' ).click(function(){ document.getElementById( 'player' ).play(); }).appendTo('#welcome');
      var map = L.mapbox.map('map', 'examples.map-y7l23tes')
        .setView(coords, 16);
      L.marker(coords).addTo(map);
      L.circle(coords, data[i].radius).addTo(map);
    }
  });
}, function( err ) {
  if ( err.code == 1 )
  {
    // user said no!
  }
}, {
  enableHighAccuracy: true
});