DataMapper::Logger.new($stdout, :debug)
DataMapper.setup(:default, 'postgres://localhost/story_places_development')
DataMapper.repository(:default).adapter.execute("CREATE EXTENSION IF NOT EXISTS HSTORE")

require File.join(File.dirname(__FILE__), '..', 'models', 'story.rb')

DataMapper.finalize.auto_upgrade!

