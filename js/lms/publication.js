var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .delete-user-scorm-data' : 'deleteUserScormData',

        'click .add-course-to-group' : 'addCourseToGroup',
        'click .delete-course-from-group' : 'deleteCourseFromGroup',

        'click .delete-user-from-group' : 'deleteUserFromGroup',

        'click .edit-publication' : 'editPublication',
        'click .delete-publication' : 'deletePublication',
    },

    initialize: function( ) {
        
    },

    editPublication: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-publication-window');

        windowBootstrap.find('input[name="id_banner"]').val(sender.attr('id_banner'));
        windowBootstrap.find('input[name="name"]').val(sender.attr('name'));
        windowBootstrap.find('textarea[name="summary"]').val(sender.attr('summary'));
    },

    deletePublication: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-publication-window');

        windowBootstrap.find('input[name="id_banner"]').val(sender.attr('id_banner'));
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


    deleteUserScormData: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-user-scorm-data-window');

        windowBootstrap.find('input[name="scorm_data_id"]').val(sender.attr('scorm_data_id'));
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