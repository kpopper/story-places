var Geo = function() {
  var _this = this;
  this.location = null;
  this.position = null;

  this.init = function( location ) {
    console.log( 'location: ' + location.centre.latitude + ', ' + location.centre.longitude );

    _this.location = location;
    navigator.geolocation.getCurrentPosition( _this.success, function( err ) {
        if ( err.code == 1 )
        {
            // user said no!
        }
      }, { enableHighAccuracy: true });
  };

  this.success = function( position ) {
    _this.position = position;
    console.log( 'position: ' + position.coords.latitude + ', ' + position.coords.longitude + ', ' + position.coords.accuracy );
    $.getJSON('/stories/' + position.coords.latitude + ',' + position.coords.longitude, function(data){
      for(var i = 0; i < data.length; i++) {
        $( "#stories" ).append( '<li id="welcome">' + data[i].title + ': ' + data[i].audio_html + '</li>' );
        $( '<a href="#">play</a>' ).click(function(){ document.getElementById( 'player' ).play(); }).appendTo('#welcome');
      }
    });
    // if( _this.personIsWithinRange( position.coords, _this.location.centre, _this.location.radius ) ){
    //   $( "#stories" ).append( '<li id="welcome">Welcome: ' + AudioPlayer.html + '</li>' );
    //   $( '<a href="#">play</a>' ).click(function(){ document.getElementById( 'player' ).play(); }).appendTo('#welcome');
    // }
  };

  this.personIsWithinRange = function( position, centre, radius ) {
    console.log( 'distance: ' + this.distance( position, centre ) );
    return ( this.distance( position, centre ) <= radius );
  };

  this.distance = function( pointA, pointB ) {
    var R = 6371; // earth's radius in km

    // http://www.movable-type.co.uk/scripts/latlong.html
    var d = Math.acos(Math.sin(pointA.latitude) * Math.sin(pointB.latitude) + 
                      Math.cos(pointA.latitude) * Math.cos(pointB.latitude) *
                      Math.cos(pointB.longitude - pointA.longitude)) * R;
    return d;
  };
};

var geo = new Geo();
geo.init(appLocation);