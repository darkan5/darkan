var InfoPointDownloadModel = ImageModel.extend({

	defaults: function(){
        return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"infopoint-download",
         	action: 99,
         	width : 100,
	    	height : 100,
            sound: '',
            fileToDownload: '',
            imageFileName: '',
            library: 'buttons/download',
            rand: 0,
            opacity : 1,
            useNewDownloadFileName : false,
            newDownloadFileName : ''
         }
        )
    },

    getExtensionFilesArray : function(){
        
        return ['zip', 'rar', 'pdf', 'jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg', 'mp3',
            'doc', 'docx', 'xls' , 'xlsx', 'dot', 'ppt', 'pptx', 'assdb', 'mdb' , 'rtf' , 'odt', 'dot', 'mdt', 'accda', 'odt' , 'ods', 'odp'
        ];
    },

    getAcceptTypeFormat: function() {
        var _mainTypes = this.getExtensionFilesArray();
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
        this.set('fileToDownload', data.fileName);
    },

//    pasteDimension: function(dimensions){
//
//    },

    setComponentAsDownload: function(){

        var _that = this;

        this.getExtensionImagesArray = function(){
            return [];
        }

        this.getExtensionFilesArray = function(){
            return ['zip', 'rar', 'pdf', 'jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg', 'mp3',
                'doc', 'docx', 'xls' , 'xlsx', 'dot', 'ppt', 'pptx', 'assdb', 'mdb' , 'rtf' , 'odt', 'dot', 'mdt', 'accda', 'odt' , 'ods', 'odp'
            ];
        }

        this.setFileName =  function(data) {
            _that.set('fileToDownload', data.fileName);
        }
    },
});