var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-user' : 'editUser',
        'click .delete-user' : 'deleteUser',
    },

    initialize: function( ) {
        
    },

    editUser: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-user-window');

        windowBootstrap.find('input[name="user_id"]').val(sender.attr('user_id'));
        windowBootstrap.find('select[name="role_id"]').val(sender.attr('role_id'));
        windowBootstrap.find('input[name="name"]').val(sender.attr('name'));
        windowBootstrap.find('input[name="email"]').val(sender.attr('email'));
    },

    deleteUser: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-user-window');

        windowBootstrap.find('input[name="user_id"]').val(sender.attr('user_id'));
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