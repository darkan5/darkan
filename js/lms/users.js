var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-user' : 'editUser',
        'click .delete-user' : 'deleteUser',
        'click .add-user-to-group' : 'addUserToGroup',
        'click .delete-user-from-group' : 'deleteUserFromGroup',
    },

    initialize: function( ) {
        
    },

    editUser: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-user-window');

        windowBootstrap.find('input[name="user_id"]').val(sender.attr('user_id'));
        windowBootstrap.find('input[name="name"]').val(sender.attr('name'));
        windowBootstrap.find('input[name="email"]').val(sender.attr('email'));
        windowBootstrap.find('input[name="fb_link"]').val(sender.attr('fb_link'));
    },

    deleteUser: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-user-window');

        windowBootstrap.find('input[name="user_id"]').val(sender.attr('user_id'));
    },

    addUserToGroup: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#add-user-to-group-window');

        windowBootstrap.find('input[name="id_user"]').val(sender.attr('user_id'));
    },

    deleteUserFromGroup: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-user-from-group-window');

        windowBootstrap.find('input[name="id_user"]').val(sender.attr('user_id'));
        windowBootstrap.find('input[name="id_group"]').val(sender.attr('group_id'));
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