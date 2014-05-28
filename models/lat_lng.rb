class LatLng
	include DataMapper::Resource

  property :id, Serial
  property :latitude, Float
  property :longitude, Float

  belongs_to :story
end