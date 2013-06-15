function setUpGeoLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
    if( personIsWithinRange( position ) ){
      $("#stories").append('<li><a href="#">Current location</a></li>');
    }
  });
}

setUpGeoLocation();