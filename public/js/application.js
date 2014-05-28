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
    load: 'js/storyplaces.js'
  },
  {
    load: 'js/storyplaces.data.js'
  },
  {
    load: 'js/storyplaces.ui.story.js',
    complete: function() {
      $(window.storyplaces.ui.story.init);
    }
  },
  {
    load: 'js/storyplaces.ui.map.js'
  },
  {
    test: Modernizr.geolocation,
    yep : 'js/geo.js',
    nope: 'js/nogeo.js'
  }
]);