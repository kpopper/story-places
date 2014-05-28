require 'compass'
require 'sinatra/base'
require 'json'
require 'haml'
require 'data_mapper'

require 'dotenv'
Dotenv.load


class App < Sinatra::Base
  # set sinatra's variables
  set :app_file, __FILE__
  set :root, File.dirname(__FILE__)

  require_relative 'lib/init_database'

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

  get '/stories/:lat,:lng' do
    content_type :json

    lat = params[:lat].to_f
    lng = params[:lng].to_f
    stories_near = Story.stories_near(lat, lng)
    stories_near.to_json
  end
end