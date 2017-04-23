var VideoComponentView = LoadedComponentView.extend({

	className : 'component video-component',

    template: _.template($('#video-component-template').html()),

    putVideoLink: function(data) {

    	var videoLink = data.videoLink;
    	var videoType = data.videoType;

    	this.model.set({ 'videoLink': videoLink, 'videoType': videoType });

      this.render();
      this.unselectComponent();
      this.selectComponent();
    },

    uploadOnFileDrop2: function(e, resizeImage) {

        // if(Utils.isDarkanExtension(e)){

        //     _log('is darkan extension true');

        //     return;
        // };


         _log('is darkan extension false');

        if(!StageView.instance.canEdit) { return; }

        this.resizeImage = resizeImage;
        this.$el.find('.loaded-dropzone').fadeOut(500);
        var properties = e;

        var imageUrl = properties.imageUrl;

        _log('e', e);
        _log('properties', properties);

        if(imageUrl != undefined){
            this.uploadOnLink(imageUrl, resizeImage);
        }else{
            this.runUploadProcess( properties );
        }

    },

    addComponentListeners :function(){
        // this.listenTo(this.model, 'change:videoType', this.abc);
    },

    setYoutubeVideoLink :function(videoLink){
        this.putVideoLink({ 'videoLink': videoLink, 'videoType': 2});
    },

    

    // abc: function() {

    	// var videoType = this.model.get('videoType');
    	// var videoLink = this.model.get('videoLink');


    	// var _that = this;

    	// this.render();
    // },

    afterRender: function() {

   //  	var videoType = this.model.get('videoType');
   //  	var videoLink = this.model.get('videoLink');


   //  	switch(videoType) {

   //  		case 1:
   //  			// z dysku
   //  			this.showVideo();
   //  			break;

			// case 2:
			// 	// youtube
			// 	this.showYoutube();
			// 	break;

			// case 3:
			// 	// vimeo
			// 	this.showVimeo();
			// 	break;
   //  	}
    },

  //   showVideo: function() {

  //   	var videoFileName = this.model.get('videoFileName');

  //   	if (videoFileName !== '') {

	 //    	var actionkey = this.model.get('actionkey');
	 //    	var videoSrc = __meta__.APP_LINK + 'projects/' + __meta__.ownerID + '/' + __meta__.projectID + '/pre/exported_view/' + actionkey.split('-').pop() + '/videos/' + actionkey +'/' + videoFileName;
	 //    	var videoWrapper = this.$el.find('.video-wrapper');

	 //        videoWrapper.html('');
	 //        videoWrapper.append('<video id="'+ actionkey +'" class="video-js vjs-default-skin" controls preload="auto" width="100%" height="100%"></video>');
	 //        _V_(actionkey, { }, function() {
	 //            this.src(videoSrc);
	 //        });
	 //    }
  //   },

  //   showYoutube: function() {

  //   	var videoLink = this.model.get('videoLink');
  //   	var videoWrapper = this.$el.find('.video-wrapper');
  //   	var actionkey = this.model.get('actionkey');


		// try {
		// 	_V_(actionkey).dispose();
		// } catch (err) {
		// 	//_log('err', err);
		// }

  //       videoWrapper.html('');
  //       videoWrapper.append('<video id="'+ actionkey +'" class="video-js vjs-default-skin" controls preload="auto" width="100%" height="100%"></video>');


  //   	_V_(actionkey, {"techOrder": ["youtube"], "ytcontrols":false, "autoplay":false,"src": videoLink}, function() {
  //       });

  //   },

  //   showVimeo: function() {

  //   	var videoLink = this.model.get('videoLink');
  //   	var videoWrapper = this.$el.find('.video-wrapper');
  //   	var actionkey = this.model.get('actionkey');

		// try {
		// 	_V_(actionkey).dispose();
		// } catch (err) {
		// 	//_log('err', err);
		// }

  //       videoWrapper.html('');
  //       videoWrapper.html('');
  //       videoWrapper.append('<video id="'+ actionkey +'" class="video-js vjs-default-skin" controls preload="auto" width="100%" height="100%"></video>');

  //   	_V_(actionkey, {"techOrder": ["vimeo"], "ytcontrols":false, "autoplay":false,"src": videoLink}, function() {
  //       });
  //   }


});

var VideoComponentViewNotEditable = ComponentView.createNotEditableComponentClass(VideoComponentView);