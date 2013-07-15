navigator.geolocation.getCurrentPosition( function( position ) {
  console.log( 'position: ' + position.coords.latitude + ', ' + position.coords.longitude + ', ' + position.coords.accuracy );
  $.getJSON('/stories/' + position.coords.latitude + ',' + position.coords.longitude, function(data){
    for(var i = 0; i < data.length; i++) {
      $( "#stories" ).append( '<li id="welcome">' + data[i].title + ': ' + data[i].audio_html + '</li>' );
      $( '<a href="#">play</a>' ).click(function(){ document.getElementById( 'player' ).play(); }).appendTo('#welcome');
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