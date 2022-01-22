var InfoPointSoundControlComponentView = ComponentView.extend({

	className : 'component infopointsoundcontrol-component',

	template: _.template($('#infopointsoundcontrol-component-template').html()),

	soundIsPlaying: false,

    events: function(){
        return _.extend({},ComponentView.prototype.events,{
        });
    },

    getSound: function() {
        var actionkey = this.model.get('actionkey');

        // get component sound file
        var componentSound = this.model.get('sound');
        if (componentSound.length) {
            var audioSrc = __meta__.directLocation + 'exported_view/'+ actionkey.split('-').pop() +'/audio/'+ actionkey +'/'+ componentSound;
            return audioSrc;
        }
        return false;
    },

    getSwfLocation: function() {
        var swfLocation = __meta__.directLocation + 'js/libs/jplayer';
        return swfLocation;
    },

    afterRender: function() {
    	var _that = this;
    	// this.$el.find('audio').on('ended', function() {
     //        _that.animateStop();
    	// });

        var actionkey = this.model.get('actionkey');
        var playerId = actionkey.split('-')[1];

        this.$el.find('#audio-player-' + playerId).jPlayer({
            ready: function (event) {
                $(this).jPlayer("setMedia", {
                    mp3: _that.getSound(),
                });
            },
            supplied: "mp3",
            cssSelectorAncestor: '#jp-container-' + playerId,
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            remainingDuration: true,
            toggleDuration: true
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

    stopComponentAudio: function() {

        var soundFile = this.getSound();

        if (!soundFile) {
            return;
        }

        this.soundIsPlaying = false;

        var noskin = this.model.get('noskin');

        if(!noskin){
            var actionkey = this.model.get('actionkey');
            var playerId = actionkey.split('-')[1];

            this.$el.find('#audio-player-' + playerId).jPlayer('stop');
        }else{
            //this.$el.trigger('stop-component-audio', [soundFile, this]);

            var player = this.$el.find('audio');

            //if (player.hasClass('playing')) {

            $(player).removeClass('playing').trigger("pause").next().addClass('pause').removeClass('play');
            player[0].currentTime = 0;
            //}
        }

    },

    playComponentAudio: function() {

        var soundFile = this.getSound();

        if (!soundFile) {
            return;
        }

        

        var noskin = this.model.get('noskin');
        this.soundIsPlaying = true;

        if(!noskin){

            var actionkey = this.model.get('actionkey');
            var playerId = actionkey.split('-')[1];

            this.$el.find('#audio-player-' + playerId).jPlayer('play');
        }else{

            //this.$el.trigger('play-component-audio', [soundFile, this]);

            var player = this.$el.find('audio');

            //if (!player.hasClass('playing')) {
                $(player).addClass('playing').trigger("play").next().removeClass('pause').addClass('play');
            //}
        }
    },

    pauseComponentAudio: function() {

        var soundFile = this.getSound();

        if (!soundFile) {
            return;
        }

        
        this.soundIsPlaying = false;

        var noskin = this.model.get('noskin');

        if(!noskin){

            var actionkey = this.model.get('actionkey');
            var playerId = actionkey.split('-')[1];

            this.$el.find('#audio-player-' + playerId).jPlayer('pause');
        }else{
            //this.$el.trigger('pause-component-audio', [soundFile, this]);

            var player = this.$el.find('audio');

            //if (player.hasClass('playing')) {
                $(player).removeClass('playing').trigger("pause").next().addClass('pause').removeClass('play')
            //}
        }

    },

    

});