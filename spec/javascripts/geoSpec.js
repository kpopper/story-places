describe("Geo", function(){
  var geo;
  var location = {
    centre: {
      longitude: -0.1417,
      latitude: 51.50185
    },
    radius: 1.000 // allowed distance from centre in km
  };
  var position = {
    coords: {
      longitude: -0.1417,
      latitude: 51.50185
    }
  };

  describe("init", function(){
    beforeEach(function() {
      geo = new Geo();
      spyOn(navigator.geolocation, 'getCurrentPosition').andCallFake(function(){
        geo.position = position;
      });
    });

    it("should fetch the user's current location", function() {
      runs(function() {
        geo.init(location);
      });

      waitsFor(function() {
        return geo.position != null;
      }, "A valid position has not been returned.", 750);

      runs(function() {
        expect(geo.position).not.toBeNull();
      });
    });
  });

  describe("with current position", function(){
    beforeEach(function() {
      geo = new Geo();
    })
    
    it("should fetch available stories", function() {
      
    })
  });
});