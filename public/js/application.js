Modernizr.load([
  {
    load: "//code.jquery.com/jquery.js"
  },
  {
    load: '//api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.js',
    complete: function() {
    }
  },
  {
    load: 'js/leaflet-pip.js'
  },
  {
    load: 'js/jquery.mustache.js'
  },
  {
    test: Modernizr.geolocation,
    yep : 'js/geo.js',
    nope: 'js/nogeo.js'
  }
]);