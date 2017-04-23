var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-currency' : 'editCurrency',
        'click .delete-currency' : 'deleteCurrency',
    },

    initialize: function( ) {

    },

    editCurrency: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-currency-window');

        windowBootstrap.find('input[name="currency_id"]').val(sender.attr('currency_id'));
        windowBootstrap.find('input[name="name"]').val(sender.attr('name'));

    },

    deleteCurrency: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-currency-window');

        windowBootstrap.find('input[name="currency_id"]').val(sender.attr('currency_id'));
    },

    render: function(){

    },

    serializeData: function(){
        return {};
    },

    afterRender: function(){
        
    },

});

var bodyView = new BodyView();