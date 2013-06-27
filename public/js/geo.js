
function distance(pointA, pointB) {
  var R = 6371; // earth's radius in km

  // http://www.movable-type.co.uk/scripts/latlong.html
  var d = Math.acos(Math.sin(pointA.latitude) * Math.sin(pointB.latitude) + 
                    Math.cos(pointA.latitude) * Math.cos(pointB.latitude) *
                    Math.cos(pointB.longitude - pointA.longitude)) * R;
  return d;
}

function personIsWithinRange( position, centre, radius ) {
  console.log( 'distance: ' + distance( position, centre ) );
  return ( distance( position, centre ) <= radius );
}

function setUpGeoLocation( location ) {
  console.log( 'location: ' + location.centre.latitude + ', ' + location.centre.longitude );

  navigator.geolocation.getCurrentPosition( function( position )
  {
    console.log( 'position: ' + position.coords.latitude + ', ' + position.coords.longitude + ', ' + position.coords.accuracy );
    if( personIsWithinRange( position.coords, location.centre, location.radius ) ){
      $( "#stories" ).append( '<li><a href="#">Current location</a></li>' );
    }
  }, function( err )
  {
    if ( err.code == 1 )
    {
        // user said no!
    }
  },
  { enableHighAccuracy: true });
}

setUpGeoLocation(appLocation);