var InfoPointSoundModel = ImageModel.extend({

	defaults: function(){
        return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"infopoint-sound",
         	action: 99,
         	width : 100,
	    	height : 100,
	    	sound: '',
            autoplaySound: false,
            imageFileName: '',
            library: 'buttons/sound',
            rand: 0,
            opacity : 1
         }
        )
    },

    setFileName: function(data) {
        this.set('soundFileName', data.fileName);
    },

    getExtensioAudioArray : function(){  // Punkt z dzwiekiem
        // sound, folder: audio
        return ['mp3'];
    },

    getAcceptTypeFormat: function() {
        var _soundTypes = this.getExtensionSoundsArray();
        var acceptTypeString = '';

        _.each(_soundTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        return acceptTypeString;
    },

//    pasteDimension: function(dimensions){
//
//    },

    setComponentAsSound: function(){

        var _that = this;

        this.getExtensionImagesArray = function(){
            return [];
        }

        this.getExtensioAudioArray = function(){
            return ['mp3'];
        }

        this.setFileName =  function(data) {
            _that.set('soundFileName', data.fileName);
        }
    },
});