var BodyView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click .edit-project' : 'editProject',
        'click .delete-project' : 'deleteProject',

        'click .delete-publication' : 'deletePublication',
    },

    initialize: function( ) {
        
    },

    deletePublication: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-publication-window');

        windowBootstrap.find('input[name="id_banner"]').val(sender.attr('id_banner'));
        windowBootstrap.find('input[name="project_id"]').val(sender.attr('project_id'));
    },

    editProject: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#edit-project-window');

        windowBootstrap.find('input[name="project_id"]').val(sender.attr('project_id'));
        windowBootstrap.find('select[name="editor_id"]').val(sender.attr('editor_id'));
        windowBootstrap.find('input[name="name"]').val(sender.attr('name'));
    },

    deleteProject: function(e) {

        var sender = $(e.target);
        
        var windowBootstrap = $('#delete-project-window');

        windowBootstrap.find('input[name="project_id"]').val(sender.attr('project_id'));
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