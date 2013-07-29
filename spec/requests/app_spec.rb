require 'spec_helper'

describe "app" do
  before do
    visit '/'
  end

  it "has a title" do
    page.should have_content("StoryPlaces")
  end
end