DataMapper::Logger.new($stdout, :debug)
DataMapper.setup(:default, 'postgres://localhost/story_places_development')
DataMapper.repository(:default).adapter.execute("CREATE EXTENSION IF NOT EXISTS HSTORE")

require File.join(File.dirname(__FILE__), '..', 'models', 'story.rb')
require File.join(File.dirname(__FILE__), '..', 'models', 'lat_lng.rb')

# TODO: Switch to individual migrations using dm-migrations:
# https://github.com/datamapper/dm-migrations/blob/master/examples/sample_migration.rb
DataMapper.finalize.auto_upgrade!

