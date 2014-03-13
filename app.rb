require 'sinatra/base'
require 'sinatra/assetpack'
require 'json'
require 'geokit'
require 'haml'

class Story
  def self.stories_near(lat, lng)
    found = []
    point = Geokit::LatLng.new(lat, lng)
    stories.each do |story|
      story_point = Geokit::LatLng.new(story[:centre][:latitude], story[:centre][:longitude])
      found << story if point.distance_to(story_point, {units: :kms}) < (story[:radius] / 1000.0)
    end
    return found
  end

  def self.stories
    [{
      title: "Welcome to Story Places",
      audio_html: "<audio id=\"player\" src=\"/audio/welcome.ogg\" preload=\"auto\"></audio>",
      centre: {
        longitude: -0.18352,
        latitude: 51.60126
      },
      radius: 100 ### allowed distance from centre in m
    }]
  end
end

class App < Sinatra::Base
  set :root, File.dirname(__FILE__) # Required for AssetPack apparently
  register Sinatra::AssetPack

  assets do
    js :application, [
      '/js/modernizr.custom.46377.js'
      # You can also do this: 'js/*.js'
    ]

    css :application, [
      '/css/application.scss'
     ]

    js_compression :jsmin
    css_compression :sass
  end

  get '/' do
    haml :index
  end

  get '/stories.json' do
    content_type :json
    Story.stories.to_json
  end

  get '/stories/:lat_lng' do
    content_type :json

    lat_lng = params[:lat_lng].split(',')
    lat = lat_lng.first
    lng = lat_lng.last
    stories_near = Story.stories_near(lat, lng)
    stories_near.to_json
  end
end