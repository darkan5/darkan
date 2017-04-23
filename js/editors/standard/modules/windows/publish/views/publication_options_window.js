var PublicationOptionsWindow = WindowView.extend({

    tagName: 'div',
    className : 'window window-view window-publication-options-template',

    template: _.template($('#window-publication-options-template').html()),


	initialize: function( data ) {
        this.model = data.projectModel;
        this.windowModel = new WindowModel();
		this.runListeners();

        this.listenTo(this.model, 'change:fullscreen', this.saveToServer );
        this.listenTo(this.model, 'change:reset_progress', this.saveToServer );
        this.listenTo(this.model, 'change:share', this.saveToServer );
        this.listenTo(this.model, 'change:zoom', this.saveToServer );
  	},

  	afterRender: function() {
  		this.stickit();
  	},

    events: function(){
        return _.extend({},WindowView.prototype.events,{

        });
    },

    bindings: {
    	'.edit-fullscreen-checkbox': {
            observe: 'fullscreen',
            onGet: function(checked) { return checked ? true : false;}
        },
    	'.edit-reset-checkbox': {
            observe: 'reset_progress',
            onGet: function(checked) { return checked ? true : false;}
        },
    	'.edit-share-checkbox': {
            observe: 'share',
            onGet: function(checked) { return checked ? true : false;}
        },
    	'.edit-zoom-checkbox': {
            observe: 'zoom',
            onGet: function(checked) { return checked ? true : false;}
        },
    },

    saveToServer: function() {
        DataAccess.setPublicationOptions(
            this.model.toJSON(),
            function(data) {
            },
            function(data) {
                _log('Publication data NOT updated!', data);
            }
        );
    },

    onClose : function(){
    	this.trigger('on-close');
    }
});