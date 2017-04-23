var OpenProjectsList = Backbone.View.extend({

	tagName: 'ul',
	className: 'open-projects-list',

	template: _.template($('#open-projects-list-template').html()),

	events: {

	},

	initialize: function( ) {
    	this.collection = new ProjectsNavigationCollection();
  	},

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);

		return this;
	},

	serializeData: function(){
		return {};
	},

	afterRender: function(){
		
	},

	selectProject: function(projectModel){

		var index = this.collection.indexOf(projectModel);

		if( index === -1 ){

			this.collection.add(projectModel);

			switch(projectModel.type){
				case 'not-editable':


					var projectView = new NotEditableProjectView({ model:projectModel });
					projectView.on('on-project-open', this.onProjectOpen, this);
					projectModel.view = projectView;
					this.$el.append(projectView.render().$el);
					projectView.afterRender();

					break;

				default:

					var projectView = new ProjectView({ model:projectModel });
					projectView.on('open-existing-project', this.openExistingProject, this);
					projectView.on('on-project-open', this.onProjectOpen, this);
					projectView.on('disable-top-menu-buttons', this.disableTopMenuButtons, this);
					projectModel.view = projectView;
					this.$el.append(projectView.render().$el);
					projectView.afterRender();

					ProjectView.instance = projectView;

					break;
			}

			
		}

		this.collection.each(function(pm){
			pm.view.hide();
		});

		projectModel.view.show();

		ProjectView.selected = projectModel.view;
	},

	disableTopMenuButtons: function(model){
		this.trigger('disable-top-menu-buttons', model);
	},

	closeProject: function(projectModel){

		var index = this.collection.indexOf(projectModel);

		this.collection.remove(projectModel);
		projectModel.view.remove();

		var nextProjectModel = this.collection.at(index) || this.collection.at(index-1) || this.collection.first();

		this.selectProject(nextProjectModel);
	},

	openExistingProject: function(){
       this.trigger('open-existing-project');
    },

    onProjectOpen: function(projectModel){
		this.trigger('on-project-open', projectModel);
	},
});