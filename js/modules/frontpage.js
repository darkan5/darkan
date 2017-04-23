// speed up video
$('.movie video')[0].playbackRate = 3.0;
var videoStarted = false;
$(window).on("touchstart", function() {
	if (!videoStarted) {
		var video = $('.movie video')[0];
		video.play();
		video.playbackRate = 3.0;
		videoStarted = true;
	}
});


var TestDriveFormView = Backbone.View.extend({
	el: $('#testdriveform'),

	events: {
		'submit': 'checkForm' 
	},

	checkForm: function(e) {
		var _that = this;
		e.preventDefault();
		var email = this.$el.find('.test-drive-input').val();

		DataAccess.checkTestDriveForm(
			{email: email},
			function(data) {
				if (data.success) {
					window.location.assign(data.data.testdriveurl);
				} else {
					_Notify('Adres email jest nieprawidłowy');
				}
			},
			function(data) {
				_Notify('Adres email jest nieprawidłowy');
			}
		);
	}
});
var testDriveFormView = new TestDriveFormView();


$('.darkan-movie-modal').on('hidden.bs.modal', function (e) {
    stopVideo();
});
$('.darkan-movie-modal').on('shown.bs.modal', function (e) {
    onPlayerReady();
});

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('yt-promo-video', {
	  height: '487',
	  width: '890',
	  videoId: videoId,
	  events: {
	    // 'onStateChange': onPlayerStateChange
	  }
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady() {
	player.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
// function onPlayerStateChange(event) {
// 	if (event.data == YT.PlayerState.PLAYING && !done) {
// 	  setTimeout(stopVideo, 6000);
// 	  done = true;
// 	}
// }
function stopVideo() {
	player.stopVideo();
}