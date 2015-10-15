require File.expand_path(File.join('lib', 'pinp.rb'))

class Story
  include DataMapper::Resource

  property :id, Serial
  property :story_id, String
  property :title, String
  property :author, String
  property :date, DateTime
  property :audio_url, String

  has n, :coordinates, 'LatLng'

  def can_be_listened_at?(lat, lng)
    user_location = Pinp::Point.new(lng, lat)
    return boundary.contains_point? user_location
  end

  def self.stories_near(lat, lng)
    return Story.all.select do |story|
      puts story.inspect
      puts story.can_be_listened_at?(lat, lng)
      story.can_be_listened_at?(lat, lng)
    end
  end

  def self.stories
    [
      {
        id: "victoria_park",
        author: "Ian Kynnersley",
        title: "Welcome here",
        date: Date.civil(2014, 5, 19),
        audio_html: "<audio id=\"player\" src=\"/audio/welcome.ogg\" preload=\"auto\"></audio>",
        coordinates: [
          [-0.1852869987487793,51.60254579709256],
          [-0.18236875534057614,51.60363865027403],
          [-0.18000841140747068,51.60094645234294],
          [-0.1832270622253418,51.59922709391111],
          [-0.18687486648559568,51.60139960574107],
          [-0.1852869987487793,51.60254579709256]],
      },
      {
        id: "bunhill_fields",
        author: "Ian Kynnersley",
        date: Date.civil(2014, 3, 25),
        title: "Welcome to Story Places",
        audio_html: "<audio id=\"player\" src=\"/audio/welcome.ogg\" preload=\"auto\"></audio>",
        coordinates:[
          [-0.08752584457397461,51.52380458033574],
          [-0.08819103240966797,51.523831281801655],
          [-0.08829832077026366,51.524311905510764],
          [-0.08941411972045898,51.5242585031269],
          [-0.08941411972045898,51.52387133397118],
          [-0.09003639221191406,51.5238579832519],
          [-0.08977890014648438,51.5231103367263],
          [-0.08739709854125977,51.523230495031505],
          [-0.08752584457397461,51.52380458033574]
        ]
      }
    ]
  end

  private

  def boundary
    points = coordinates.map { |coord| Pinp::Point.new(coord.latitude, coord.longitude) }
    return Pinp::Polygon.new points
  end


end
