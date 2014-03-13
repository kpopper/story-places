Modernizr.load([
  {
    load: "http://code.jquery.com/jquery.js"
  },
  {
    load: '//api.tiles.mapbox.com/mapbox.js/v1.2.0/mapbox.js',
    complete: function() {
    }
  },
  {
    test: Modernizr.geolocation,
    yep : 'js/geo.js',
    nope: 'js/nogeo.js'
  }
]);