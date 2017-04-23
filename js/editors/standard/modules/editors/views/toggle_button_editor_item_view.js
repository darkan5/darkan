var ToogelButtonnEditorItemView = Backbone.View.extend({

    tagName: 'div',
	className: 'toggle-button-editor-item-view',

	template: _.template($('#toggle-button-item-view-template').html()),

	events: {

		'click' : 'toggleEditors'
	},


	initialize: function( ) {
		
  	},

  	render: function(){

  		var template = this.template(this.serializeData());
        this.$el.html(template);

  		return this;
	},


	afterRender: function(){
  
	},

	serializeData: function(){
		return {};
	},

	toggleEditors: function(){
		this.trigger('toogle', this);
	}


});