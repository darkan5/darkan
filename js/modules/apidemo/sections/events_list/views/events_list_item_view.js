var EventsListItemView = Backbone.View.extend({

	template: _.template($('#events-list-item-template').html()),

    tagName: 'li',
    className: 'events-list-item',

    initialize: function(){

    },

    render: function(){

    	var template = this.template(this.serializeData());
        this.$el.html(template);

        return this;
    },

    serializeData: function(){
    	return this.model.toJSON();
    }
});