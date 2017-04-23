var InfoPointGalleryModel = ImageModel.extend({

	defaults: function(){
        return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"infopoint-gallery",
         	action: 99,
         	width : 100,
	    	height : 100,
            imageFileName: '',
            library: 'buttons/gallery',
            rand: 0,
            opacity : 1
         }
        )
    },

    afterInitialize: function(){

        var galleryFiles = this.get('galleryFiles');
        if (!galleryFiles) {
            this.set('galleryFiles', [], {silent:true});
        }
    },

    setGalleryFile: function() {
    	this.trigger('set-gallery-file');
    },

    setFileName: function(galleryFiles) {
        //this.set('galleryFileName', data.fileName);

        this.set('galleryFiles', galleryFiles);
    },

    setComponentAsGallery: function(){

        var _that = this;

        this.getExtensionImagesArray = function(){
            return [];
        }

        this.getExtensionGalleryArray = function(){
            return ['jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg'];
        }

        this.setFileName = function(galleryFiles) {
            _that.set('galleryFiles', galleryFiles);
        }
    },

    getExtensionGalleryArray : function(){
        return ['jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg'];
    }, 


    getAcceptTypeFormat: function() {
        var _mainTypes = this.getExtensionGalleryArray();
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

//    pasteDimension: function(dimensions){
//
//    }
});