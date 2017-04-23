var MenuPanelView = Backbone.View.extend({
		
    tagName: 'div',

	template: _.template($('#menu-panel-template').html()),

    bindings: {
        // To override
    },

    events: {
        
    },

    initialize: function() {

        this.addListeners();
        this.onBeforeInitialize();
    },

    addListeners :function(){
        // To override
    },

    onBeforeInitialize: function() {
        // TO OVERRIDE
    },

    disableIfNotActive: function() {
        // TO OVERRIDE
    },

	render: function(){

        this.beforeRender();

	    var editorTemplate = this.template(this.serializeData());
	    this.$el.html(editorTemplate);

        this.disableIfNotActive();
	    this.stickit();
 
		return this;
	},

    serializeData: function() {
         return this.model == undefined ? {} : this.model.toJSON();
    },

    beforeRender: function() {
        // to override
    },
  
    afterRender: function() {

    },

    setModel: function( model ) {
    	this.unstickit();
    	this.model = model;
    	this.onSetModel();

  	},

  	onSetModel: function() {
  		// TO OVERRIDE
  	},


  	destroy: function() {
        this.unstickit();
        this.unbind();
        this.remove();

  	}
});

