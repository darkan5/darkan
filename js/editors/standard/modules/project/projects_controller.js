var ProjectsController = Backbone.View.extend({

	className: 'projects-controller',

	template: _.template($('#projects-controller-template').html()),

	initialize: function(){

	},

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);

		return this;
	},

	afterRender: function(){

		this.openProjectsList = new OpenProjectsList();
		this.openProjectsList.on('open-existing-project', this.openExistingProject, this);
		this.openProjectsList.on('on-project-open', this.onProjectOpen, this);
		//this.openProjectsList.on('disable-top-menu-buttons', this.disableTopMenuButtons, this);
		//this.openProjectsList.on('project-selected', this.onProjectSelected, this);
		this.$el.find('.open-projects-list-wrapper').append(this.openProjectsList.render().$el);

		// this.openProjectsList.afterRender();


		this.projectsNavigation = new ProjectsNavigation();
		this.projectsNavigation.on('open-new-project', this.openNewProject, this);
		this.projectsNavigation.on('on-project-selected', this.onProjectSelected, this);
		//this.projectsNavigation.on('on-project-added', this.onProjectAdded, this);
		this.projectsNavigation.on('on-project-closed', this.onProjectClosed, this);
		this.$el.find('.projects-navigation-wrapper').append(this.projectsNavigation.render().$el);

		this.projectsNavigation.afterRender();
	},

	// onProjectAdded: function(projectModel){

	// 	_log('onProjectAdded', projectModel);

	// 	this.openProjectsList.selectProject(projectModel);
	// },

	openNewProject: function(){
		this.openProjectsList.selectProject(projectModel);
	},

	serializeData: function(){
		return {};
	},

	onProjectSelected: function(projectModel){

		_log('onProjectSelected', projectModel);

		this.openProjectsList.selectProject(projectModel);

		this.disableTopMenuButtons(projectModel);

		this.hideOrShowOpenWindows(projectModel);
	},

	onProjectOpen: function(projectModel){
		this.disableTopMenuButtons(projectModel);
	},

	disableTopMenuButtons: function(projectModel){
		this.trigger('disable-top-menu-buttons', projectModel);
	},

	onProjectClosed: function(projectModel, nextProjectModel){

		_log('onProjectClosed', projectModel);

		this.openProjectsList.closeProject(projectModel);

		this.disableTopMenuButtons(nextProjectModel);
	},

	openExistingProject: function(){
       this.projectsNavigation.openExistingProject();
    },

    hideOrShowOpenWindows: function(projectModel){

    	var allWindows = $('.window, .editor-container-window-view');

    	_log('allWindows', allWindows);
       
    	if(projectModel.view instanceof NotEditableProjectView){
    		allWindows.hide();
    	}else{
    		allWindows.show();
    	}

    }

	
});
