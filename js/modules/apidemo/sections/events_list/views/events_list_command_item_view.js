var EventsListCommandItemView = EventsListItemView.extend({

	template: _.template($('#events-list-item-template').html()),

    className: 'events-list-item events-list-command-item',
});