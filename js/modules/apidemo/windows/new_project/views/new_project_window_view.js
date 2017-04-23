var NewProjectWindowView = WindowView.extend({

    className : 'window window-new-project-view',

    template: _.template($('#window-new-project-template').html()),


    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'submit .new-project-form': 'createNewProject',
            'click .new-project-cancel': 'close',
        });
    },

    afterInitialize : function(data) {


    },

    createNewProject : function(e) {

        var _that = this;

        e.preventDefault();

        var width = parseInt(this.$el.find('.new-project-width').val());
        var height = parseInt(this.$el.find('.new-project-height').val());

        var name = this.$el.find('.projectname-input').val();
        var dimensions = this.$el.find('.projectdimensions-input').val();
        var skin = this.$el.find('.projectskin-input').val();
        var autoscale = this.$el.find('.projectautoscale-input').val();


        var projectModel = new ProjectsListItemModel();

        projectModel.set('dimentions', dimensions);
        projectModel.set('name', name);
        projectModel.set('skin', skin);
        projectModel.set('autoScale', autoscale);

        _log('createNewProject', projectModel);

        DataAccess.addNewProject(
            projectModel.toJSON(),
            function(data){
                _log('addNewProject result', data);

                if (data && data.status && data.status.code == 219) {
                    _Notify(Lang.get('apidemo.overProjectsLimit'), 'warning');
                    return;
                }

                if(!data){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                if(!data.projectData){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                var newProjectModel = new ProjectsListItemModel(data.projectData);

                _that.trigger('create-new-project', newProjectModel);

                _that.close();
            },
            function(data){
                _log('addNewProject fault', data);
            }
        );
    },

    showLimitProjectsWindow: function() {

        var limitProjectsWindow = WindowFactory.createLimitProjectsWindow();
        limitProjectsWindow.setTitle('Limit project');
        $('body').append(limitProjectsWindow.render().$el);
    },

    afterRender: function() {
        var _that = this;
        setTimeout(function() {
            _that.$el.find('.projectname-input').focus();
            _that.$el.find('.projectname-input').select();
        }, 2);
    },

    disableButtons: function() {
         this.$el.find('.add-new-project-button').attr('disabled', 'disabled');
    },

    enableButtons: function() {
         this.$el.find('.add-new-project-button').removeAttr('disabled');
    }

});