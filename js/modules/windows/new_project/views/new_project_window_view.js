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

        var _that = this;

        this.projectsListModel = data.data.projectsListModel;

    },

    createNewProject : function(e) {

        var _that = this;

        e.preventDefault();

        var width = parseInt(this.$el.find('.new-project-width').val());
        var height = parseInt(this.$el.find('.new-project-height').val());

        var name = this.$el.find('.projectname-input').val();

        if(name == ''){

            _Notify("Project name can't be empty");
            return;
        }

        var projectModel = new ProjectItemModel();
        

        projectModel.set('dimentions', width + 'x' + height);
        projectModel.set('name', name);

       

        var lastVisitedFolderID = this.projectsListModel.get('lastVisitedFolderID');
        projectModel.set('folder', lastVisitedFolderID);

        this.disableButtons(); 

        DataAccess.createNewProject(
            { project:projectModel.toJSON() },
            function(data){
                _log('createNewProject', data, _log.dataaccessOutResult);

                if(!data.success){

                    switch(data.data.error){
                        case 0:

                            _that.showLimitProjectsWindow();
                            _that.close();
                            return;

                            break;

                        default:
                            _Notify('Fault');
                            break;
                    }

                    _that.enableButtons();

                    
                    return;
                }

                _Notify('Success');

                var project = data.data.project;

                var newProjectModel = ProjectsFactory.createProjectModelByType(project.pType, project);

               

                _that.trigger('create-new-project', newProjectModel, _that);

                _that.close();
            },
            function(data){
                _log('createNewProject', data, _log.dataaccessOutFault);

                _that.enableButtons();
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