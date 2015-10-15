(function(window, $, undefined){

  function addStoriesToMap(data) {
    if( data.length == 0 ) {
      console.log("No stories returned.");
      return;
    }

    $.each(data, function(index, storyData){
      console.log(storyData);
      window.storyplaces.ui.map.addStoryToMap(storyData.story);
    });

    window.storyplaces.ui.map.showAllStories();
  }

  function updateStoryList(data) {
    $( "#stories" ).empty('slow');
    $.each(data, function(index, storyData){
      console.log(storyData);
      renderStory(storyData);
    });
  }

  function renderStory(story) {
    var template = $('#story-template').html();
    var output = Mustache.render(template, story);
    $( "#stories" ).append(output).show();
    $( ".story[data-story-id=" + story.id + "] .controls a").click(function(){
      var player = document.getElementById('player');
      if (!player.paused) {
        player.pause();
      } else {
        player.play();
      }
    });

  }

  function processData(data) {
    if( data.length == 0 ) {
      console.log("No stories returned.");
      $( "#no-stories" ).show();
      $( "#stories" ).empty().hide();
      return;
    }

    window.data.currentStory = data[0].story;
    storyplaces.ui.story.updateStory(window.data.currentStory);
  }

	function updateStory(story) {
    // TODO: Don't keep adding duplicate stories. There should only ever be 1.
    console.log(story);
    $( "#no-stories" ).hide();
    if( $( "#stories .story[data-story-id=" + story.id + "]").length == 0 ) {
      renderStory(story);
    }
	}

	function init() {
    //$( "#stories" ).hide();
	}

	window.storyplaces.ui.story = {
		init : init,
    addStoriesToMap : addStoriesToMap,
		processData : processData,
		updateStory : updateStory,
    updateStoryList : updateStoryList
	}

})(window, jQuery);
