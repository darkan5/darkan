var VideoModel = ComponentModel.extend({

	defaults: function(){
        return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"video",
         	action: 99,
         	width : 420,
	    	height : 236,
            videoFileName : "",
            videoLoop: false,
            videoAutoplay: false,
            videoControls: true,
            videoType: 1, // 1: mp4, 2: youtube, 3: vimeo
            videoLink: ''
         }
        )
    },

    setFileName: function(data) {
        this.set('videoFileName', data.fileName);
    },

    getExtensionVideosArray : function(){
        return ['mp4'];
    },

    getAcceptTypeFormat: function() {
        var _mainTypes = this.getExtensionVideosArray();
        var _soundTypes = this.getExtensionSoundsArray();
        var acceptTypeString = '';

        _.each(_mainTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        _.each(_soundTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        return acceptTypeString;
    },

    getTriggerWhenDoIt :function(){


        var triggerWhenDoIt = new TriggerActionsCollection();

        var triggerActionModel = new TriggerActionsCollection();
        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_EVENT_TIMELINE'), options: [
            { name: _lang('TRIGGER_EVENT_ON_SHOW'), value: 'onShow' },
            { name: _lang('TRIGGER_EVENT_ON_HIDE'), value: 'onHide' }
        ] });

        triggerWhenDoIt.add( triggerActionModel );

        var videoType = this.get('videoType');

        switch(videoType){

            case 1: 

                var triggerActionModelQuestions = new TriggerActionModel({ group: _lang('TRIGGER_VIDEO'), options: [
                    { name:_lang('TRIGGER_EVENT_VIDEO_LOADED'), value:'onVideoLoaded' },
                    { name:_lang('TRIGGER_EVENT_VIDEO_ENDED'), value:'onVideoEnded' },
                    { name:_lang('TRIGGER_EVENT_VIDEO_TIME_UPADATE'), value:'onVideoTimeUpdate' },

                    { name:_lang('TRIGGER_EVENT_VIDEO_TIME_ON_PLAY'), value:'onVideoPlay' },
                    { name:_lang('TRIGGER_EVENT_VIDEO_TIME_ON_PAUSE'), value:'onVideoPause' },
                    { name:_lang('TRIGGER_EVENT_VIDEO_TIME_ON_STOP'), value:'onVideoStop' },
                    { name:_lang('TRIGGER_EVENT_VIDEO_TIME_GO_TO_POSITION'), value:'onVideoGoToPosition' }

                ] });

                triggerWhenDoIt.add( triggerActionModelQuestions );

                break;

            case 2: 

                var triggerActionModelQuestions = new TriggerActionModel({ group: _lang('TRIGGER_VIDEO'), options: [
                    { name:_lang('TRIGGER_EVENT_VIDEO_LOADED'), value:'onVideoLoaded' },
                    { name:_lang('TRIGGER_EVENT_VIDEO_ENDED'), value:'onVideoEnded' },

                    { name:_lang('TRIGGER_EVENT_VIDEO_TIME_ON_PLAY'), value:'onVideoPlay' },
                    { name:_lang('TRIGGER_EVENT_VIDEO_TIME_ON_PAUSE'), value:'onVideoPause' },
                    { name:_lang('TRIGGER_EVENT_VIDEO_TIME_ON_STOP'), value:'onVideoStop' },


                ] });

                triggerWhenDoIt.add( triggerActionModelQuestions );

                break;

            default: 

                break;
        }

    

        

        


        return triggerWhenDoIt.toJSON();
    }

    //this.componentModle.set('videoFileName', data.fileName);
});