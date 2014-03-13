# Rakefile
APP_FILE  = 'app.rb'
APP_CLASS = 'App'

require 'sinatra/assetpack/rake'

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
