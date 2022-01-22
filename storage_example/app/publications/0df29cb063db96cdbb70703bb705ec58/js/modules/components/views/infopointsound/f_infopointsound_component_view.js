var InfoPointSoundComponentView = ImageComponentView.extend({

	className : 'component infopointsound-component',

	template: _.template($('#infopointsound-component-template').html()),

	soundIsPlaying: false,

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
            'click': 'playComponentAudioOnClick'
        });
    },

    animatePlaying: function() {

        _log('animatePlaying', this);

	    this.$el.css({
	    	'background-position': '-60px 0px',
			'-webkit-transition': 'transform 300ms ease-out',
			'-moz-transition': 'transform 300ms ease-out',
			'-o-transition': 'transform 300ms ease-out',
			'transition': 'transform 300ms ease-out',
	    	'transform': 'rotate(90deg)',
	    	'-moz-transform': 'rotate(90deg)',
	    	'-webkit-transform': 'rotate(90deg)',
	    	'-o-transform': 'rotate(90deg)',
	    	'-ms-transform': 'rotate(90deg)'
	    });
    },

    animateStop: function() {

         _log('animateStop', this);

        this.$el.css({
        	'background-position': '-30px 0px',
			'-webkit-transition': 'transform 300ms ease-out',
			'-moz-transition': 'transform 300ms ease-out',
			'-o-transition': 'transform 300ms ease-out',
			'transition': 'transform 300ms ease-out',
        	'transform': 'rotate(0deg)',
        	'-moz-transform': 'rotate(0deg)',
        	'-webkit-transform': 'rotate(0deg)',
        	'-o-transform': 'rotate(0deg)',
        	'-ms-transform': 'rotate(0deg)'
        });
    },

    afterRender: function() {
    	var _that = this;
    	// this.$el.find('audio').on('ended', function() {
     //        _that.animateStop();
    	// });
    },

    playComponentAudioOnClick: function() {
    	if (this.soundIsPlaying) {
    		//this.$el.find('audio')[0].play();

            this.pauseComponentAudio();
    	} else {
	
            this.playComponentAudio();
    	}

        this.markAsCompleted();
    },

    setComponentAudioAsPause: function() {

        this.animateStop();
        this.soundIsPlaying = false;
    },

    onSoundEnded: function(){

        _log('onSoundEnded', this);

        this.setComponentAudioAsPause();
    },

    getComponentSoundFile: function() {
        var actionkey = this.model.get('actionkey');

        // get component sound file
        var componentSound = this.model.get('sound');
        if (componentSound.length) {
            var audioSrc = __meta__.directLocation + 'exported_view/'+ actionkey.split('-').pop() +'/sounds/'+ actionkey +'/'+ componentSound;
            return audioSrc;
        }
        return false;
    },

    renderAsCompleted: function() {
        this.$el.attr({
            active: true
        });
    },

    getComponentSoundFile: function() {
        var actionkey = this.model.get('actionkey');

        // get component sound file
        var componentSound = this.model.get('sound');
        if (componentSound.length) {
            var audioSrc = __meta__.directLocation + 'exported_view/'+ actionkey.split('-').pop() +'/audio/'+ actionkey +'/'+ componentSound;
            return audioSrc;
        }
        return false;
    },

    renderCss: function() {
        this.$el.css('cursor', 'pointer');
    },

    playComponentAudio: function() {
        var soundFile = this.getComponentSoundFile();

        if (soundFile) {
            this.$el.trigger('play-component-audio', [soundFile, this]);

            this.animatePlaying();
            this.soundIsPlaying = true;
        }
    },

    stopComponentAudio: function() {
        var soundFile = this.getComponentSoundFile();

        if (soundFile) {
            this.$el.trigger('stop-component-audio', [soundFile, this]);

            this.animateStop();
            this.soundIsPlaying = false;
        }
    },

    pauseComponentAudio: function() {
        var soundFile = this.getComponentSoundFile();

        if (soundFile) {
            this.$el.trigger('pause-component-audio', [soundFile, this]);

            this.animateStop();
            this.soundIsPlaying = false;
        }
    },

});