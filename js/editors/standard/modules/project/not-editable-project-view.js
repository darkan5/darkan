var NotEditableProjectView = Backbone.View.extend({

	tagName: 'li',
	className: 'project-view',

	template: _.template($('#not-editable-project-view-template').html()),

	events: {

	},

	initialize: function( ) {
    	
  	},

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);

        this.$el.find('.pages-list-wrapper').hide();
   
		this.createPrjectsListSection();


		return this;
	},

	createStageView: function(pageModel){

		var pageModel = pageModel || ProjectModel.instance.createNewPageModel();
	        
        this.stageView = new NotEditableStageView({ model:pageModel });
        this.$el.find('.stage-view-container').html(this.stageView.renderStage().$el);
        this.stageView.afterRender();

        this.stageView.setModel(pageModel);
	},

    createEmptyStageView: function(){

        this.stageView = new EmptyStageView();
        this.$el.find('.stage-view-container').html(this.stageView.renderStage().$el);
        this.stageView.afterRender();
    },

	createPrjectsListSection: function(){

		this.projectsListSection = new ProjectsListSection();
		this.projectsListSection.on('open-project', this.openProject, this);
		// this.projectsListSection.on('add-new-blank-page', this.addNewPage, this);
		// this.projectsListSection.on('add-new-psd-page', this.addNewPage, this);
		// this.projectsListSection.on('add-new-pdf-page', this.addNewPage, this);
		this.$el.find('.projects-list-container').html(this.projectsListSection.render().$el);
    	this.projectsListSection.afterRender();
	},

	createPageListView: function(){

		this.$el.find('.pages-list-wrapper').show();

		this.pagesList = new NotEditablePagesList({ model:this.model });
        this.pagesList.on('toggle-project-list', this.toggleProjectList, this);
        this.pagesList.on('set-page', this.setPage, this);
        this.$el.find('.pages-list-wrapper').html(this.pagesList.render().$el);
        this.pagesList.afterRender();
	},

	setPage: function(model){

		if(this.stageView){
			this.stageView.setModel(model);
		}
	},

	toggleProjectList: function(value){

		if(value){

			this.pagesList.hide();
            this.stageView.$el.css('width', '100%');

		}else{
			this.pagesList.show();
            this.stageView.$el.css('width', 'calc(100% - 262px)');
		}
	},

	serializeData: function(){
		return {};
	},

	afterRender: function(){
		
	},

	copyPage: function(){

	},

	addNewPage: function(){

		// var _that = this;

		// var newPageModel = ProjectModel.instance.createNewPageModel();
		// this.pagesList.addNewPage(
		// 	newPageModel, 
		// 	function(createdPageModel){
		// 		_that.newPageSection.destroy();
		// 		_that.newPageSection = undefined;

		// 		_that.pagesList.render();
  //       		_that.pagesList.afterRender();

		// 		_that.createStageView(createdPageModel);
		// 	},
		// 	function(data){

		// 	}
		// );
	},

	openProject: function(projectItemModel){
		_log('openProject', projectItemModel)

		this.getProjectById(projectItemModel);
	},

	getProjectById: function(projectItemModel){

        var _that = this;

        var  projectId = projectItemModel.get('project_id');
        var  userId = projectItemModel.get('owner') || projectItemModel.get('user_id');

        if(!userId || !projectId){
            this.showPupup({ content:_lang('OPEN_PROJECT_ERROR'), title: _lang('MODAL_INFO_ERROR') }, this);
            return;
        }

        userId = parseInt(userId);

        _log('getProjectById', projectItemModel.toJSON());

        this.showProjectViewLoader();

        this.model.loadProjectById(
            { projectId:projectId, userId:userId },
            function( projectModel ){

                _log('getProjectById projectModel', projectModel, _log.error);

            	projectModel.projectId = projectId;
            	projectModel.userId = userId;
            	projectModel.ownerId = userId;

                // projectModel.get('collection').each(function(pageModel){

                //     pageModel.projectId = projectId;
                //     pageModel.ownerId = userId;
                //     pageModel.userId = userId;
                // });

                _that.projectsListSection.destroy();

		 		_log('loadProjectById', _that);

		 		_that.createPageListView();

                if(projectModel.get('collection').length > 0){
                    _that.createStageView( projectModel.get('collection').first() );
                }else{
                    _that.createEmptyStageView();
                }

                projectModel.set('name', projectItemModel.get('name'));

                _that.trigger('on-project-open', projectModel);

                _that.hideProjectViewLoader();
                
            },
            function(){
                _log("Not load project by id");

                _that.hideProjectViewLoader();
            }
        );
    },

    onKeyDown: function(e){
		console.log('keydown ' + e.which);

		switch (e.which){

            case 65: // ctrl + a

                if(e.ctrlKey){

                    this.stageView.selectAllComponents();
                }
                break;

            case 67: // c
                // copy
                if(e.ctrlKey){

                    this.stageView.copyComponentsFromOtherProject();
                }

                break;
                

            case 81:

                e.stopPropagation();
                e.preventDefault();

                if(e.ctrlKey){

                    //this.stageView.duplicateComponents();
                }

                break;

        }
	},

	onLeftMenuClick: function(model){
		this.selectProjectView();
    	ProjectView.instance.onLeftMenuClick(model);
    },

    openImageWindow:function(){
    	this.selectProjectView();
    	ProjectView.instance.openImageWindow();
    },

    createNewPage:function(){
    	this.selectProjectView();
    	ProjectView.instance.createNewPage();
    },

    createNewPageTopMenu: function(){
    	this.selectProjectView();
    	ProjectView.instance.createNewPageTopMenu();
    },

    show: function(){
        this.$el.show();
    },

    hide: function(){
        this.$el.hide();
    },

    copyPages: function(){

        this.selectProjectView();

        this.pagesList.copyPages();
    },

    selectProjectView: function(projectModel){
        this.model.trigger('select-project-view', projectModel || ProjectView.instance.model);
    },

    showPupup :function(data, sender){

        var popup = PopupFactory.createErrorPopup( data, sender );
        $('body').append(popup.render(data).$el);
    },

    showProjectViewLoader: function(){
        var projectViewLoader = PreloaderFactory.createNotEditableProjectViewLoader();
        this.$el.append(projectViewLoader.render().$el);
    },

    hideProjectViewLoader: function(){
        this.$el.find('.loader').trigger('close');
    },

    // topMenuAction: function(action){
    //     ProjectView.instance.topMenuAction(action);
    //     this.selectProjectView();
    // },

    topMenuAction: function(action){

        switch(action){
            
            case 'copy-conponents-from-other-project':
                this.stageView.copyComponentsFromOtherProject();
                break;    
                
        }
    },


});

