var EditorItemView = Backbone.View.extend({

	tagName: 'li',
	className: 'editor-item-view',

	template: _.template($('#editor-item-view-template').html()),

	events: {

	},

	isSelected: false,

	initialize: function( ) {
		this.editorItemModel = {};
		this.editorItemModel.trigger = function(){};
		this.editorItemModel.get = function(){ return true; };

    	this.model = StageView.instance.model;
  	},

  	show: function(){
  		this.$el.show();
		this.isSelected = true;

		this.setModelToEditor( this.model );
	},

	hide: function(){

		if(this.editorItemModel.get('isBinding')){
			this.$el.hide();
			this.isSelected = false;
		}
		
	},

	render: function(){


		var template = this.template(this.serializeData());
        this.$el.html(template);

       
		return this;
	},

	serializeData: function(){
		return {};
	},

	afterRender: function(){
		
	},

	setModel: function(pageModel){

		// _log('pageModel', pageModel);

		// this.model = pageModel;

		// this.render();
	},

	setModelToEditor: function(model){

	},

	setStageModelToEditor: function(pModel){

	},

	goToTimelineTab: function(tabName){
        this.goToTab('timeline');
    },

    goToTab: function(tabName){
        this.trigger('go-to-tab', { tabName:tabName });
    },

    checkIfDisableEditor: function(model){
    	// To override
    },

    disableEditor: function(){
    	this.editorItemModel.trigger('disable-editor-item');
    },

    enableEditor: function(){
    	this.editorItemModel.trigger('enable-editor-item');
    },

    onWindowResize: function(e){

    }



});