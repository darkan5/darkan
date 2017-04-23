/*globals $, jQuery, CSPhotoSelector */

window.fbAsyncInit = function() {
        FB.init({ appId: '163086357235990', cookie: true, status: true, xfbml: true, oauth: true });

        FB.getLoginStatus(function(response) {
                if (response.authResponse) {
                        $("#login-status").html("Logged in");
                } else {
                        $("#login-status").html("Not logged in");
                }
        });
};
(function(d){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
}(document));


$(document).ready(function () {
	var selector, logActivity, callbackAlbumSelected, callbackPhotoUnselected, callbackSubmit;
	var buttonOK = $('#CSPhotoSelector_buttonOK');
	var o = this;
	
	
	/* --------------------------------------------------------------------
	 * Photo selector functions
	 * ----------------------------------------------------------------- */
	
	fbphotoSelect = function(id, callback) {
		// if no user/friend id is sent, default to current user
		if (!id) id = 'me';
		
		callbackAlbumSelected = function(albumId) {
			var album, name;
			album = CSPhotoSelector.getAlbumById(albumId);
			// show album photos
			selector.showPhotoSelector(null, album.id);
		};

		callbackAlbumUnselected = function(albumId) {
			var album, name;
			album = CSPhotoSelector.getAlbumById(albumId);
		};

		callbackPhotoSelected = function(photoId) {
			var photo;
			photo = CSPhotoSelector.getPhotoById(photoId);
			buttonOK.show();
			logActivity('Selected ID: ' + photo.id);
		};

		callbackPhotoUnselected = function(photoId) {
			var photo;
			album = CSPhotoSelector.getPhotoById(photoId);
			buttonOK.hide();
		};

		callbackSubmit = function(photoId) {
			var photo;
			photo = CSPhotoSelector.getPhotoById(photoId);
			logActivity('<br><strong>Submitted</strong><br> Photo ID: ' + photo.id + '<br>Photo URL: ' + photo.source + '<br>');
	        var link = photo.source;
	        if (_.isFunction(callback)){
	        	callback(link);
	        }
		};


		// Initialise the Photo Selector with options that will apply to all instances
		CSPhotoSelector.init({debug: true});

		// Create Photo Selector instances
		selector = CSPhotoSelector.newInstance({
			callbackAlbumSelected	: callbackAlbumSelected,
			callbackAlbumUnselected	: callbackAlbumUnselected,
			callbackPhotoSelected	: callbackPhotoSelected,
			callbackPhotoUnselected	: callbackPhotoUnselected,
			callbackSubmit			: callbackSubmit,
			maxSelection			: 1,
			albumsPerPage			: 6,
			photosPerPage			: 200,
			autoDeselection			: true
		});

		// reset and show album selector
		selector.reset();
		selector.showAlbumSelector(id);
	}
	
	
	/* --------------------------------------------------------------------
	 * Click events
	 * ----------------------------------------------------------------- */
	

	
//	$("#ajax-status").click(function (e) {
//		e.preventDefault();
//		FB.logout();
//		$("#login-status").html("Not logged in");
//	});
	


	logActivity = function (message) {
		$("#results").append('<div>' + message + '</div>');
	};
});