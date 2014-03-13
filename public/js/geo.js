var map = L.mapbox.map('map', 'examples.map-uci7ul8p', {maxZoom: 16});
$( "#stories" ).hide();
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

var story_template = '' + 
'<div class="story" data-story-id="{{id}}">' +
'  <h2 class="name">{{name}}</h2>' +
'  <div class="controls">' +
'    <a href="#"><i class="fa fa-play-circle play" /></a>' +
'  </div>' +
'  <h3 class="author">by <span class="author-name">William Sutcliffe</span></h3>' +
'  <p class="published">on <span class="published-date">23rd Feb 2014</span></p>' +
'</div>';

navigator.geolocation.watchPosition( function( position ) {
  console.log( 'position: ' + position.coords.latitude + ', ' + position.coords.longitude + ', ' + position.coords.accuracy );

  // Show user's position on the map
  var coords = [position.coords.latitude, position.coords.longitude];
  map.setView(coords, 16);
  L.marker(coords, {icon: L.icon({iconUrl: "/img/user.png"})}).addTo(map);
  // L.circle(coords, data[i].radius).addTo(map);


  $.getJSON('/stories/' + position.coords.latitude + ',' + position.coords.longitude, function(data){
    if( data.lenth == 0 ) {
      $( "#no-stories" ).show();
      $( "#stories" ).empty().hide();
    }
    for(var i = 0; i < data.length; i++) {
      // TODO: Don't keep adding duplicate stories. There should only ever be 1.
      console.log(data[i]);
      $( "#no-stories" ).hide();
      if( $( "#stories .story[data-story-id=" + data[i].id + "]").length == 0 ) {
        $( "#stories" ).append( story_template.replace('{{name}}', data[i].title).replace('{{id}}', data[i].id) );
        $( ".story .controls").prepend( data[i].audio_html );
        $( ".story .controls a").click(function(){ document.getElementById( 'player' ).play(); });
        $( "#stories" ).show();
      }
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