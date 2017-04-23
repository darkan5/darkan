var ProjectsNavigationView = Backbone.View.extend({


    template: _.template($('#projects-navigation-template').html()),

    events:{
        'click .addfolder' : 'addFolder',
        'click .addproject' : 'addProject',
        'click .uploadzbit' : 'uploadZbit',
    },

    initialize: function(){

    	
    },

    addFolder: function(){
        this.trigger('add-folder');
    },

    addProject: function(){
        this.trigger('add-project');
    },

    uploadZbit: function(){
        this.trigger('upload-zbit');
    },

    render: function(){

        var template = this.template();
        this.$el.html(template);

        return this;
    },

	
});