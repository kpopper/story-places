(function(window, $, _, undefined){

  function processData(data) {
    if( data.lenth == 0 ) {
      $( "#no-stories" ).show();
      $( "#stories" ).empty().hide();
    }

    window.data.currentStory = data[0].story
    storyplaces.ui.story.updateStory(window.data.currentStory);
  }

	function updateStory(story) {
    // TODO: Don't keep adding duplicate stories. There should only ever be 1.
    console.log(story);
    $( "#no-stories" ).hide();
    if( $( "#stories .story[data-story-id=" + story.id + "]").length == 0 ) {
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
	}

	function init() {
    $( "#stories" ).hide();
	}

	window.storyplaces.ui.story = {
		init : init,
		processData : processData,
		updateStory : updateStory
	}

})(window, jQuery, _);