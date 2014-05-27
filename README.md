story-places
============

`bundle exec shotgun`


Database
--------

This app uses Postgres as a database.

Create the database locally:

`createdb story_places_development`

Maps
----

We use Mapbox for the maps. The id of the map used is stored in an environment variable.

The Mapbox is treated as the source of map information. A scheduled task (should) run(s) to pull down a list of all story places and parse them as stories in the app. This may prove to be a bad idea but initially at least seems better than duplicating the information.

Audio
-----

Audio stories will be added to Amazon S3. A standard naming convention will allow the app to match up story place data from Mapbox with the correct story on S3.

`/{bucket_name}/story/{story_id}/audio.mp3`
