var SharedToUserProjectItemView = ProjectItemView.extend({

	className: 'projectlist-item shared-to-user-project-item',

    template: _.template($('#projectslist-shared-to-user-project-item-template').html()),

    events: function(){
        return _.extend({},ProjectListItemView.prototype.events,{
            'click .open-project-href': 'openProject',
        });
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