var VideoComponentView = ComponentView.extend({

	className : 'component video-component',

    template: _.template($('#video-component-template').html()),

    // afterRender: function() {
    //     this.pauseVideo();
    // },



    afterShow: function() {
        var _that = this;
        if(this.model.get('videoAutoplay')) {
            this.tryPlayInterval = setInterval(function() {
                _that.playVideo();
            }, 400);
        }
    },

    playVideo: function() {
        if (this.video) {
            this.video.play();
            clearInterval(this.tryPlayInterval);
        }
    },

    pauseVideo: function() {
        if (this.video) {
            this.video.pause();
        }
    },

    stopVideo: function(opts) {

        if (this.video) {

            this.reserExecutedOpts();
            
            this.video.currentTime(0);
            this.video.pause();
            
            this.trigger('onVideoStop', this.video);
        }
    },


    goToPositionVideo: function(opts) {

        var vid = opts.video == undefined ? {} : opts.video;

        var position = vid.position == undefined ? 0 : parseInt(vid.position);
        var play = vid.play == undefined ? false : vid.play;
        
        if (this.video) {
            
            this.video.currentTime(position);

            if(play){
                this.video.play();
            }else{
                this.video.pause();
            }

            this.trigger('onVideoGoToPosition', this.video);
        }
    },

    // getPrivateAssets: function() {
    //     var componentAssets = [ ];

    //     var actionkey = this.model.get('actionkey');

    //     // get component image file
    //     var videoFile = this.model.get('videoFileName');
    //     if (videoFile.length) {
    //         var videoFileSrc = __meta__.directLocation + 'exported_view/'+ actionkey.split('-').pop() +'/videos/'+ actionkey +'/'+ videoFile;
    //         componentAssets.push(videoFileSrc);
    //     }
    //     return componentAssets;
    // },

    reserExecutedOpts: function() {


        var triggers = this.model.get('triggers');

        for (var i = 0; i < triggers.length; i++) {
            var trigger = triggers[i];

            var elseactions = trigger.elseactions;
            var subtriggers = trigger.subtriggers;

            for (var j = 0; j < subtriggers.length; j++) {
                var action = subtriggers[j];

                var opts = action.opts;

                _log('reserExecutedOpts opts', opts);

                if(opts && opts.video && opts.video.isExecuted){

                    opts.video.isExecuted = false;
                }
            }

            for (var j = 0; j < elseactions.length; j++) {
                var action = elseactions[j];

                var opts = action.opts;

                if(opts && opts.video && opts.video.isExecuted){
                    opts.video.isExecuted = false;
                }
            }

        };

        this.model.set('triggers', triggers);

    },

    afterRender: function() {

        this.reserExecutedOpts();

        var videoType = this.model.get('videoType');
        var videoLink = this.model.get('videoLink');



        switch(videoType) {

        case 1:
             // z dysku
             this.showVideo();
             break;

            case 2:
             // youtube
             this.showYoutube();
             break;

            case 3:
             // vimeo
             this.showVimeo();
             break;
        }
    },

    getOptions: function() {
        return {
            autoplay: this.model.get('videoAutoplay'),
            controls: this.model.get('videoControls'),
            loop: this.model.get('videoLoop'),
            id: this.model.get('actionkey')
        }
    },

    getVideoHtml: function(options) {
        var videoHtml = '<video id="' + options.id + '"';
        if (options.controls) { videoHtml += ' controls' };
        if (options.loop) { videoHtml += ' loop' };

        videoHtml += ' class="video-js vjs-default-skin" preload="auto" width="100%" height="100%" ></video>';
        return videoHtml;
    },

    

    showVideo: function() {
        this.getOptions();
        var _that = this;

        var videoFileName = this.model.get('videoFileName');

        if (videoFileName !== '') {

            var actionkey = this.model.get('actionkey');
            var videoSrc = __meta__.directLocation + 'exported_view/' + actionkey.split('-').pop() + '/videos/' + actionkey +'/' + videoFileName;
            var videoWrapper = this.$el.find('.video-wrapper');

            try {
                videojs(actionkey).dispose();
            } catch (err) {
                //_log('err', err);
            }
             

            videoWrapper.html('');
            videoWrapper.append(this.getVideoHtml(this.getOptions()));
            videojs(actionkey, { }, function() {
                this.src(videoSrc);

                _that.addVideoEvents(this);

                _that.video = this;

            });
        }
    },

    showYoutube: function() {
        var _that = this;

        var videoLink = this.model.get('videoLink');
        var videoWrapper = this.$el.find('.video-wrapper');
        var actionkey = this.model.get('actionkey');

        try {
            videojs(actionkey).dispose();
        } catch (err) {
            //_log('err', err);
        }

        videoWrapper.html('');
        videoWrapper.append(this.getVideoHtml(this.getOptions()));


        videojs(actionkey, {"techOrder": ["youtube"], "ytcontrols":false, "autoplay":false,"src": videoLink}, function() {

            _that.addYouTubeVideoEvents(this);

            _that.video = this;
        });

    },

    showVimeo: function() {
        var _that = this;

        var videoLink = this.model.get('videoLink');
        var videoWrapper = this.$el.find('.video-wrapper');
        var actionkey = this.model.get('actionkey');

        try {
            videojs(actionkey).dispose();
        } catch (err) {
            //_log('err', err);
        }

        videoWrapper.html('');
        videoWrapper.append(this.getVideoHtml(this.getOptions()));

        videojs(actionkey, {"techOrder": ["vimeo"], "ytcontrols":false, "autoplay":false,"src": videoLink}, function() {

            _that.addVimeoVideoEvents(this);

            _that.video = this;
        });
    },

    addVideoEvents: function(video) {

        var _that = this;

        video.on('play', function(e){

            _log('play', e);

             _that.trigger('onVideoPlay', e);
        });

        video.on('pause', function(e){

            _log('pause', e);

             _that.trigger('onVideoPause', e);
        });


        video.on('canplaythrough', function(e){

            _log('canplaythrough', e);

            _that.trigger('onVideoLoaded', e);
        });


        video.on('ended', function(e){

            _log('onVideoEnded', e);

            _that.trigger('onVideoEnded', e);
        });

        video.on("timeupdate", function(e) { //chrome fix

            _that.trigger('onVideoTimeUpdate', e);

            _log('onVideoTimeUpdate', e.currentTarget.currentTime);

            if (e.currentTarget.currentTime == e.currentTarget.duration) {
                _log('video ended');
            }
        });

    },

    addYouTubeVideoEvents: function(video) {

        var _that = this;

        video.on('play', function(e){

            _log('play', e);

             _that.trigger('onVideoPlay', e);
        });

        video.on('pause', function(e){

            _log('pause', e);

             _that.trigger('onVideoPause', e);
        });

        video.on('ended', function(e){

            _log('onVideoEnded', e);

            _that.trigger('onVideoEnded', e);
        });

        // video.on("timeupdate", function(e) { //chrome fix

        //     _that.trigger('onVideoTimeUpdate', e);

        //     _log('onVideoTimeUpdate', e.currentTarget.currentTime);

        //     if (e.currentTarget.currentTime == e.currentTarget.duration) {
        //         _log('video ended');
        //     }
        // });


        
        _that.trigger('onVideoLoaded', video);
        

    },

    addVimeoVideoEvents: function(video) {

        var _that = this;

        video.on('play', function(e){

            _log('play', e);

             _that.trigger('onVideoPlay', e);
        });

        video.on('pause', function(e){

            _log('pause', e);

             _that.trigger('onVideoPause', e);
        });

        video.on('canplaythrough', function(e){

            _log('canplaythrough', e);

            _that.trigger('onVideoLoaded', e);
        });

        video.on('ended', function(e){

            _log('onVideoEnded', e);

            _that.trigger('onVideoEnded', e);
        });

        video.on("timeupdate", function(e) { //chrome fix

            _that.trigger('onVideoTimeUpdate', e);

            _log('onVideoTimeUpdate', e.currentTarget.currentTime);

            if (e.currentTarget.currentTime == e.currentTarget.duration) {
                _log('video ended');
            }
        });

        //video.trigger('load');
    },



});