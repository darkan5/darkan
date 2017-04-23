var InfoPointSoundControlModel = ImageModel.extend({

	defaults: function(){
        return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"infopoint-sound-control",
         	action: 99,
         	width : 520,
	    	height : 90,
	    	sound: '',
            autoplaySound: false,
            rand: 0,
            opacity : 1,
            noskin : false
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