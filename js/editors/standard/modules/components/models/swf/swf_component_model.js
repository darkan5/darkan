var SwfModel = ComponentModel.extend({

	defaults: function(){
        return _.extend({}, ComponentModel.prototype.defaults(),
         {
         	type:"swf",
         	action: 99,
         	width : 100,
	    	height : 100,
            swfFileName: ''
         }
        )
    },

    setFileName: function(data) {
        this.set('swfFileName', data.fileName);
    },

    getExtensionSwfArray : function(){
        return ['swf'];
    },

    getAcceptTypeFormat: function() {
        var _mainTypes = this.getExtensionSwfArray();
        var _soundTypes = this.getExtensionSoundsArray();
        var acceptTypeString = '';

        _.each(_mainTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        _.each(_soundTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        return acceptTypeString;
    }
});