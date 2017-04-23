var ImageModel = ComponentModel.extend({

	defaults: function(){
        return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"image",
         	action: 99,
         	width : 200,
	    	height : 163,
         	opacity : 1,
            //imageFileName: __meta__.APP_LINK + 'images/buttons/image.png',
            imageFileName: '',
            audioFileName: '',
            library: '',
            rand: 0
         }
        )
    },

    getExtensionImagesArray : function(){
        return ['jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg'];
    },

    getAcceptTypeFormat: function() {
        var _mainTypes = this.getExtensionImagesArray();
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

    setFileName: function(data) {

        var rand = new Date().getTime();

        this.set( { imageFileName: data.fileName, rand: rand }, {silent:true});
        this.trigger('change');
    },

    setComponentAsImage: function(){

        var _that = this;

        this.getExtensionImagesArray = function(){
            return ['jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg'];
        }

        this.getExtensionGalleryArray = function(){
            return [];
        }

        this.getExtensionFilesArray = function(){
            return [];
        }

        this.getExtensioAudioArray = function(){
            return [];
        }

        this.setFileName = function(data) {

            var rand = new Date().getTime();

            _that.set( { imageFileName: data.fileName, rand: rand }, {silent:true});
            _that.trigger('change');
        }
    },



});