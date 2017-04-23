var SoundManagerWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-sound-manger-view',

    template: _.template($('#window-sound-manager-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
        });
    },



    afterRender: function(){

        this.$el.find('.darkan-tabs').tabs();

        var projectSoundUploader = EditorsFactory.createProjectSoundEditor();
        projectSoundUploader.setModel(ProjectModel.instance.get('options'));
        this.$el.find('#project-sound-item').append(projectSoundUploader.render().$el);


    },

});
