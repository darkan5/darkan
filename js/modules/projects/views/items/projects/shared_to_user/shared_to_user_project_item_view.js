var SharedToUserProjectItemView = ProjectItemView.extend({

	className: 'projectlist-item shared-to-user-project-item',

    template: _.template($('#projectslist-shared-to-user-project-item-template').html()),

    events: function(){
        return _.extend({},ProjectListItemView.prototype.events,{
            'click .disconnect-project-button': 'disconectFromSharedProjects',
            'click .copy-project-button': 'copyProject',
            'drop-project-item': 'dropProjectItem',
        });
    },

    disconectFromSharedProjects: function(){

        this.trigger('disconect-from-shared-projects', this.model);
    },

    afterRender: function(){
        this.renderPType();
        this.renderFromUser();
    },

    renderFromUser:function(){

        var fromUser = this.model.get('fromuser');

        if(fromUser && fromUser != ""){
            this.$el.attr('fromuser', true);
        }
        
    },

});