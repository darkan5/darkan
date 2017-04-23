var ProjectsListPlusButtonView = Backbone.View.extend({

    className: 'projects-list-plus-button',

	template: _.template($('#projects-list-plus-button-template').html()),

    events:{
        'click': 'createNewProjct' 
    },

    initialize: function(){

    },

    render: function(){

    	var template = this.template(this.serializeData());
        this.$el.html(template);

        return this;
    },

    serializeData: function(){
    	return {};
    },

    createNewProjct: function(){
        this.trigger('create-new-project');
    }
});