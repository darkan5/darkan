var NewPagePlusButton = Backbone.View.extend({

	tagName: 'li',
	className: 'new-page-plus-button',

	template: _.template($('#new-page-plus-button-template').html()),

	events: {
		'click' : 'addNewPage'
	},

	initialize: function( ) {
    	
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

	addNewPage: function(){
		this.trigger('add-new-page');
	}
});