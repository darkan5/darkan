var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-aplication-api' : 'editAplicationApi',
        'click .delete-aplication-api' : 'deleteAplicationApi',
        'click .add-user-to-aplication-api' : 'addUserToAplicationApi',
    },

    initialize: function( ) {

    },

    addUserToAplicationApi: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#add-user-to-aplication-api-window');

        windowBootstrap.find('input[name="aplication_api_id"]').val(sender.attr('aplication_api_id'));

    },

    editAplicationApi: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-aplication-api-window');

        windowBootstrap.find('input[name="aplication_api_id"]').val(sender.attr('aplication_api_id'));
        windowBootstrap.find('input[name="api_key"]').val(sender.attr('api_key'));

    },

    deleteAplicationApi: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-aplication-api-window');

        windowBootstrap.find('input[name="aplication_api_id"]').val(sender.attr('aplication_api_id'));
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