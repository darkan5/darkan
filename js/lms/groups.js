var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-group' : 'editGroup',
        'click .delete-group' : 'deleteGroup',

        'click .add-course-to-group' : 'addCourseToGroup',
        'click .delete-course-from-group' : 'deleteCourseFromGroup',

        'click .add-user-to-group' : 'addUserToGroup',
        'click .delete-user-from-group' : 'deleteUserFromGroup',
    },

    initialize: function( ) {
        
    },

    editGroup: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-group-window');

        windowBootstrap.find('input[name="group_id"]').val(sender.attr('group_id'));
        windowBootstrap.find('input[name="name"]').val(sender.attr('name'));
    },

    deleteGroup: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-group-window');

        windowBootstrap.find('input[name="group_id"]').val(sender.attr('group_id'));
    },


    addUserToGroup: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#add-user-to-group-window');

        windowBootstrap.find('input[name="id_group"]').val(sender.attr('group_id'));
    },

    deleteUserFromGroup: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-user-from-group-window');

        windowBootstrap.find('input[name="id_user"]').val(sender.attr('user_id'));
        windowBootstrap.find('input[name="id_group"]').val(sender.attr('group_id'));
    },
    

    addCourseToGroup: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#add-course-to-group-window');

        windowBootstrap.find('input[name="group_id"]').val(sender.attr('group_id'));
    },

    deleteCourseFromGroup: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-course-from-group-window');

        windowBootstrap.find('input[name="content_id"]').val(sender.attr('content_id'));
        windowBootstrap.find('input[name="group_id"]').val(sender.attr('group_id'));
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