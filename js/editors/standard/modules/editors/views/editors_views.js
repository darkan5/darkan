var EditorView = Backbone.View.extend({
		
	//el: '#botmenu-editors-container',
    tagName: 'div',

	template: _.template($('#editor-template').html()),

    events: {
        'force-refresh-editor-view': 'forceRefreshEditorView'
    },

    forceRefreshEditorView: function() {
        // to override
    },

	render: function(){

        this.beforeRender();
        CKEDITOR.instances = {};
	    var editorTemplate = this.template(this.getJsonModel());
	    this.$el.html(editorTemplate);

        this.renderPanels();
        
        //this.afterRender();
        this.disableIfNotActive();
	    this.stickit();
        this.delegateEvents();
		return this;
	},

    getJsonModel: function() {
         return this.model.toJSON();
    },

    beforeRender: function() {
        // to override
    },
  
    afterRender: function() {

        // var menuBottomTabs = $('#menu-bottom-tabs');

        // menuBottomTabs.tabs( "enable", 0 );
        // menuBottomTabs.tabs( "enable", 1 );
        // menuBottomTabs.tabs( "enable", 2 );
        // menuBottomTabs.tabs( "enable", 3 );
        // menuBottomTabs.tabs( "enable", 4 );
        // menuBottomTabs.tabs( "enable", 5 );
        // menuBottomTabs.tabs( "enable", 6 );
        // menuBottomTabs.tabs( "enable", 7 );
        // menuBottomTabs.tabs( "enable", 8 );
    },

    renderPanels: function(){

        // To override
    },

    newRender: function() {
        // to override
        return this;
    },
	bindings: {
		// To override
	},
	initialize: function() {
		this.model = new ComponentModel();
		this.addListeners();
        this.onBeforeInitialize();
    	// this.render();
  	},

    disableIfNotActive: function() {

    },

    onBeforeInitialize: function() {
        // TO OVERRIDE
    },
  	addListeners :function(){
  		// To override
  	},

    setModel: function( model ) {
    	this.unstickit();
    	this.model = model;
    	this.onSetModel();

  	},

  	onSetModel: function() {
  		// TO OVERRIDE
  	},

    setCollection: function( collection ) {

        this.unstickit();
        this.collection = collection;
        this.onSetCollection( collection );
    },

    onSetCollection: function( collection ) {
        // TO OVERRIDE
    },

  	destroy: function() {
        this.unbind();
        this.remove();

  	}
});

