var EventsListView = Backbone.View.extend({

	template: _.template($('#events-list-template').html()),

    className: 'events-list',

    events: {
        'click .clear-events-list': 'clearEventsList',
    },

    initialize: function(){
        this.collection = new EventsItemsCollection();
    },

    render: function(){

    	var template = this.template(this.serializeData());
        this.$el.html(template);

        this.renderEventsList();

        return this;
    },

    serializeData: function(){
    	return {};
    },

    renderEventsList: function(){

        for (var i = this.collection.length - 1; i >= 0; i--) {
            var em = this.collection.at(i);

            this.renderOneItem(em);
        };
    },

    renderOneItem: function(eventItemModel){

        var type = eventItemModel.get('type');

        switch(type){
            case 'command':

                var eventsListItemView = new EventsListCommandItemView({model:eventItemModel});
                this.$el.find('.events-list-items').append(eventsListItemView.render().$el);

                break;

            default:

                var eventsListItemView = new EventsListResponceItemView({model:eventItemModel});
                this.$el.find('.events-list-items').append(eventsListItemView.render().$el);

                break;
        }

        
    },

    addEvent: function(eventItemModel){

        this.collection.add(eventItemModel);
    },

    appendEvent: function(data, type){

        var eventItemModel = new EventsListItemModel({ data:JSON.stringify(data), type:type });

        this.collection.add(eventItemModel);

        if(this.collection.length > 20){
            this.collection.remove(this.collection.first());
        }

        this.render();
    },

    clearEventsList: function(){
        this.collection.reset();
        this.render();
    }

    
});

EventsListView.COMMAND_TYPE = 'command';