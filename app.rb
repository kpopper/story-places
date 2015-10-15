require 'compass'
require 'sinatra/base'
require 'sinatra/partial'
require 'json'
require 'haml'
require 'data_mapper'
require 'rabl'

require 'dotenv'
Dotenv.load


class App < Sinatra::Base
  register Sinatra::Partial

  # set sinatra's variables
  set :app_file, __FILE__
  set :root, File.dirname(__FILE__)
  enable :partial_underscores

  Rabl.register!

  require_relative 'lib/init_database'

  configure do
    set :haml, {format: :html5}
    set :scss, {style: :compact, debug_info: :false}
    Compass.add_project_configuration(File.join(settings.root, 'config', 'compass.rb'))
  end

  get '/' do
    @stories = Story.all
    haml :index
  end

  get '/about' do
    haml :about
  end

  get '/story/:id' do
    @story = Story.get(params[:id])
    haml :story
  end

  get '/story/:id/:lat,:lng' do
    story = Story.get(params[:id])
    @story = story if story.can_be_listened_at?(lat, lng)
    rabl :story, format: :json
  end

  get '/stories' do
    @stories = Story.all
    rabl :stories, format: :json
  end

  get '/stories/:lat,:lng' do
    @stories = Story.stories_near(params[:lat].to_f, params[:lng].to_f)
    rabl :stories, format: :json
  end
end
