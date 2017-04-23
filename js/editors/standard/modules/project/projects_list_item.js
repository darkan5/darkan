var ProjectsListItem = Backbone.View.extend({

	tagName: 'li',
	className: 'project-item-block',

	template: _.template($('#projects-list-item-template').html()),

	events: {
		'click' : 'openProject'
	},

	initialize: function( ) {
    	
  	},

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);
   

		return this;
	},

	serializeData: function(){
		return this.model.toJSON();
	},

	afterRender: function(){
		
	},

	openProject: function(){
		this.trigger('open-project', this.model);
	}

});