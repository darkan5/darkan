var ProjectViewPlusButton = Backbone.View.extend({

	tagName: 'li',
	className: 'project-view-plus-button',

	template: _.template($('#project-view-plus-button-template').html()),

	events: {
		'click' : 'openNewProject'
	},

	initialize: function( ) {
    	
  	},

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);

        this.addTitleToButtons();
   
		return this;
	},

	serializeData: function(){
		return {};
	},


	openNewProject: function(){
		this.trigger('open-new-project');
	},

	afterRender: function(){
		
	},

	addTitleToButtons: function(){
        this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'bottom',
            width: 400,
            height: 100
        });
    },

});