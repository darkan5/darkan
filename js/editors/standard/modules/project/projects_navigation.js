var ProjectsNavigation = Backbone.View.extend({

	tagName: 'ul',
	className: 'projects-navigation',

	template: _.template($('#projects-navigation-template').html()),

	events:{
		'update-sort': 'updateSort',
	},

	initialize: function(){
		this.collection = new ProjectsNavigationCollection();
	},

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);

        this.renderProjectsList();

        this.makeSortable();

		return this;
	},

	renderProjectsList: function(){

		// if(this.collection.length <= 1){
		// 	this.$el.parent().hide();
		// }

		if(__meta__.external == 0){

			this.collection.each(this.renderOneItem, this);

			if(this.collection.length > 0){
				this.addPlusButton();
			}

		}
	},

	renderOneItem: function(projectModel){

		switch(projectModel.type){
			case 'not-editable': 

				var projectNavigationItemView = new NotEditableProjectNavigationItemView({model:projectModel});
				projectModel.view2 = projectNavigationItemView;
				projectNavigationItemView.on('close-project', this.closeProject, this);
				projectNavigationItemView.on('select-project', this.selectProject, this);
				this.$el.append(projectNavigationItemView.render().$el);

				break;

			default:

				var projectNavigationItemView = new EditableProjectNavigationItemView({model:projectModel});
				projectModel.view2 = projectNavigationItemView;
				projectNavigationItemView.on('close-project', this.closeProject, this);
				projectNavigationItemView.on('select-project', this.selectProject, this);
				this.$el.append(projectNavigationItemView.render().$el);

				break;
		}

		

		_log('projectNavigationItemView', projectNavigationItemView);
		_log('projectModel', projectModel);
	},

	afterRender: function(){

		this.autoLoadFirstProject();
	},

	serializeData: function(){
		return {};
	},

	addPlusButton: function(){

		var plusButtonView = new ProjectViewPlusButton();
		plusButtonView.on('open-new-project', this.openNewProject, this);
		this.$el.append(plusButtonView.render().$el);
	},

	makeSortable: function(){

        this.$el.sortable({
            delay: 100,
            items: ".project-navigation-item-view",
            update: function(event, ui) {
                ui.item.trigger('drop-item', ui.item.index());
            }
        });
    },

	openNewProject: function(){

		var projectModel = new ProjectModel();
		projectModel.type = 'not-editable';
		this.addProject(projectModel);
	},


	addProject: function(projectModel){

		projectModel.on('select-project-view', this.selectProject, this);

		this.collection.add(projectModel);
		this.render();

		// this.displayProjectAsActive(projectModel);

		// this.trigger('on-project-added', projectModel);

		this.selectProject(projectModel);

	},

	displayProjectAsActive: function(projectModel){

		_log('displayProjectAsActive', projectModel);
		this.collection.each(function(model){

			if(model.view2){
				model.view2.$el.attr('active', false);
			}
			
		});

		if(projectModel.view2){
			projectModel.view2.$el.attr('active', true);
		} 
	},

	autoLoadFirstProject: function(){

		var _that = this;

		this.showLoader();

		var projectModel = new ProjectModel();
		projectModel.loadProject(
			function(pm){

				DarkanEditorAplicationAPI.getInstance().projectLoaded({ pagesLength:pm.get('collection').length });

				pm.set('name', __meta__.projectName)

				_that.addProject(pm);
				_that.selectProject(pm);

				_that.hideLoade();

			}, 
			function(){
				_that.hideLoade();
			}
		);
	},

	closeProject: function(projectModel){

		var index = this.collection.indexOf(projectModel);

		this.collection.remove(projectModel);
		this.render();

		var nextProjectModel = this.collection.at(index) || this.collection.at(index-1) || this.collection.first();

		this.displayProjectAsActive(nextProjectModel);

		this.trigger('on-project-closed', projectModel, nextProjectModel);
	},

	selectProject: function(projectModel){

		this.displayProjectAsActive(projectModel);

		this.trigger('on-project-selected', projectModel);
	},

	updateSort: function(event, projectModel, position) {

        this.collection.remove( projectModel );
        this.collection.add(projectModel, {at: position});
    },

    openExistingProject: function(){
    	this.$el.parent().show();

    	this.openNewProject();
    },

    showLoader: function(){

    	var _that = this;

    	this.loaderTimeout = setTimeout(function(){
    		_that.loadProjectLoader = PreloaderFactory.createLoadProjectLoader();
        	$('body').append(_that.loadProjectLoader.render().$el);
    	}, 200);
    },

    hideLoade: function(){

    	clearTimeout(this.loaderTimeout);

        if(this.loadProjectLoader){
            this.loadProjectLoader.remove();
        }
    }

});
