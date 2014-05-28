require 'open-uri'
require 'json'
require 'dm-aggregates'
require './models/story.rb'

module Mapbox
	class Map

		def self.import_story_places
			# Fetch GeoJSON from mapbox
			url = "https://a.tiles.mapbox.com/v3/#{ENV['MAPBOX_MAP_ID']}/markers.geojson"
			markers = JSON.load(open(url))

			# Create a Story for each one (and store it somewhere)
			markers["features"].each do |story|
				#puts story["geometry"]
				story_id = story["properties"]["title"].downcase.gsub(' ', '_')

				if Story.count(story_id: story_id) > 0 then
					puts "Story #{story_id} already exists"
				else
					the_story = Story.new
					the_story.story_id = story_id
					the_story.title = story["properties"]["description"]
					the_story.author = "Ian Kynnersley"
					the_story.date = Date.today
					the_story.audio_url = "/audio/welcome.ogg"
					the_story.coordinates = story["geometry"]["coordinates"][0].map do |lng, lat|
            LatLng.new(latitude: lat, longitude: lng)
          end
					puts the_story.coordinates
					the_story.save
					# puts the_story.inspect
				end
			end
		end
	end
end