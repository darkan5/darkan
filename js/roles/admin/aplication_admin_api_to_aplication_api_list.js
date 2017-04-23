var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-user-api-to-admin-api' : 'edituserApiToAdminApi',
        'click .delete-user-api-to-admin-api' : 'deleteuserApiToAdminApi',
    },

    initialize: function( ) {

    },

    edituserApiToAdminApi: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-user-api-to-admin-api-window');

        windowBootstrap.find('input[name="aplication_admin_api_to_aplication_api_id"]').val(sender.attr('aplication_admin_api_to_aplication_api_id'));
        windowBootstrap.find('select[name="admin_api_key_id"]').val(sender.attr('admin_api_key_id'));
        windowBootstrap.find('select[name="api_key_id"]').val(sender.attr('api_key_id'));

    },

    deleteuserApiToAdminApi: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-user-api-to-admin-api-window');

        windowBootstrap.find('input[name="aplication_admin_api_to_aplication_api_id"]').val(sender.attr('aplication_admin_api_to_aplication_api_id'));
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