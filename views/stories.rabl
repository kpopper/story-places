collection @stories
attributes :id, :title, :author, :audio_url, :date
child coordinates: :coordinates do
  collection :coordinates, object_root: false
  attributes :latitude, :longitude
end