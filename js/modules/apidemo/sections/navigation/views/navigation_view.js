var NavigationView = Backbone.View.extend({

	template: _.template($('#navigation-template').html()),

    initialize: function(){

    },

    render: function(){

    	var template = this.template(this.serializeData());
        this.$el.html(template);

        return this;
    },

    serializeData: function(){
    	return {};
    }
});