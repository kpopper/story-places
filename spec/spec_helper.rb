ENV['RACK_ENV'] = 'test'                    # force the environment to 'test'

require File.join(File.dirname(__FILE__), '..', 'app.rb')
require 'rubygems'
require 'sinatra'
require 'rspec'
require 'rack/test'
require "capybara"
require 'capybara/dsl'

Capybara.app = Sinatra::Application

set :environment, :test
set :run, false
set :raise_errors, true
set :logging, false

def app
  @app ||= Sinatra::Application
end

RSpec.configure do |config|
  #Capybara::SpecHelper.configure(config)
  config.include Rack::Test::Methods
  config.include Capybara::DSL

  config.mock_with :rspec

end