require 'compass'
require 'sinatra/base'
require 'json'
require 'haml'

require './models/story.rb'

class App < Sinatra::Base
  # set sinatra's variables
  set :app_file, __FILE__
  set :root, File.dirname(__FILE__)

  configure do
    set :haml, {format: :html5}
    set :scss, {style: :compact, debug_info: :false}
    Compass.add_project_configuration(File.join(settings.root, 'config', 'compass.rb'))
  end

  get '/' do
    haml :index
  end

  get '/about' do
    haml :about
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