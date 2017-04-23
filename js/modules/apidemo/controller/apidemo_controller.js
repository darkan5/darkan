var ApiDemoController = Backbone.View.extend({

	template: _.template($('#apidemo-controller-template').html()),

    initialize: function(data){

    },

    render: function(){

    	var template = this.template();
        this.$el.html(template);

        this.createSections();

        return this;
    },

    afterRender: function(){

    },

    createSections: function(){

    	var projectsListView = SectionsFactory.createProjectsListSection();
        // projectsListView.addProject( new ProjectsListItemModel() );
        // projectsListView.addProject( new ProjectsListItemModel() );
        projectsListView.on('open-project-to-edit', this.openProjectToEdit, this);
        projectsListView.on('open-project-to-course', this.openProjectToCourse, this);
        projectsListView.on('publish-project', this.publishProject, this);
        projectsListView.on('create-new-project', this.addProject, this);
        this.$el.find('.projects-list-wrapper').html(projectsListView.render().$el);

        this.projectsListView = projectsListView;

        
        //var apiCourseView = SectionsFactory.createApiCourseSection();
        //this.$el.find('.api-course-wrapper').html(apiCourseView.render().$el);

        //projectsListView.selectFirstItem();

    },

    openProjectToEdit: function(projectItemModel){

        if(this.apiCourseView){
            this.apiCourseView.close();
        }

        this.apiEditorView = SectionsFactory.createApiEditorSection();
        this.$el.find('.api-editor-wrapper').append(this.apiEditorView.render().$el);
        this.apiEditorView.openProject(projectItemModel);
    },

    openProjectToCourse: function(projectItemModel){

        if(this.apiCourseView){
            this.apiCourseView.close();
        }

        this.apiCourseView = SectionsFactory.createApiCourseSection();
        this.$el.find('.api-course-wrapper').append(this.apiCourseView.render().$el);
        this.apiCourseView.openProject(projectItemModel);
    },

    publishProject: function(projectItemModel){

        _log('projectItemModel', projectItemModel.toJSON());

        DataAccess.publishProject(
            projectItemModel.toJSON(),
            function(data){
                _log('publishProject result', data);

                if(!data){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                if(status =! "success"){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                var link = data.link;

                if(!link){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                

                projectItemModel.view.setPublishLink(link);


            },
            function(data){
                _log('publishProject fault', data);
            }
        );
    },

    createNewProject: function(projectItemModel){
        this.projectsListView.addProject(projectItemModel);
    },  

    addProject: function(){

        var newProjectWindow = WindowFactory.createNewProjectWindow();
        newProjectWindow.setTitle(Lang.get('projects.newProject'));
        newProjectWindow.on('create-new-project', this.createNewProject, this);
        $('body').append(newProjectWindow.render().$el);
    },
});

