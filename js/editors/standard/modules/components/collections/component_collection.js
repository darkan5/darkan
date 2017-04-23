var ComponentCollection = Backbone.Collection.extend({
	model: ComponentModel,
	events: {
        'update-sort': 'updateSort'
    },
    updateSort: function(event, model, position) {  
    	console.log( "updateSort" );
    }
});