var DownloadZbitWindowView = WindowView.extend({

    className : 'window window-download-zbit-view',

    template: _.template($('#window-download-zbit-template').html()),


    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .download-zbit-button' : 'downloadZbit'
        });
    },



    afterInitialize : function(data) {

        var _that = this;

        this.zbitLink = data.data.link;

    },

    downloadZbit: function(){

    	//this.close();
    },

    getRenderData: function() {

    	var object = this.windowModel.toJSON();
    	object.opts = {};
    	object.opts.zbitLink = this.zbitLink;

        return object;
    },

});