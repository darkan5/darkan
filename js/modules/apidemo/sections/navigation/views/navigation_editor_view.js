var NavigationEditorView = NavigationView.extend({

	template: _.template($('#navigation-editor-template').html()),

	events: {
        'click .go-to-next-page': 'goToNextPage',
        'click .go-to-prev-page': 'goToPrevPage',

    },

    goToNextPage: function(){
    	this.trigger('go-to-next-page');
    },

    goToPrevPage: function(){
    	this.trigger('go-to-prev-page');
    }


});