var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .delete-user-scorm-data' : 'deleteUserScormData',
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
    },

    deleteUser: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-user-window');

        windowBootstrap.find('input[name="user_id"]').val(sender.attr('user_id'));
    },

    deleteUserScormData: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-user-scorm-data-window');

        windowBootstrap.find('input[name="scorm_data_id"]').val(sender.attr('scorm_data_id'));
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