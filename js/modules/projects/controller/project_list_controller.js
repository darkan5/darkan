var ProjectListController = Backbone.Controller.extend({


    initialize: function(){

        this.createProjectList();

        this.checkSharedProjects();
    },


	createProjectList: function(){

		//Create model

        for (var i = 0; i < foldersStructureFromDb.objs.length; i++) {
            var obj = foldersStructureFromDb.objs[i];

            obj.project_id = parseInt(obj.project_id);

            if(obj.template){
                obj.template = parseInt(obj.template);
            }
        };

		var model = new ProjectListModel(foldersStructureFromDb);
		var foldersCollection = new FoldersCollection( foldersStructureFromDb.folders );
    	var projectsCollection = new ProjectsCollection( foldersStructureFromDb.objs );

        projectsCollection.sort();
        foldersCollection.sort();

    	model.set('folders', foldersCollection);
    	model.set('objs', projectsCollection);

        var lastVisitedFolderID = model.get('lastVisitedFolderID') || 0; 

        if(lastVisitedFolderID == -1 ){
            lastVisitedFolderID = 0;
        }

    	var firstFolderModel = foldersCollection.findWhere({ 'folderID': lastVisitedFolderID });
    	//firstFolderModel.set('name', 'Projekty');

    	//Create views

        _log('lastVisitedFolderID', model.get('lastVisitedFolderID'));
        _log('firstFolderModel', firstFolderModel);
        _log('foldersCollection', foldersCollection);
        _log('projectsCollection', projectsCollection);

    	

    	this.projectsNavigationView = new ProjectsNavigationView();
    	this.projectsNavigationView.on('add-folder', this.addFolder, this);
    	this.projectsNavigationView.on('add-project', this.addProject, this);
        this.projectsNavigationView.on('upload-zbit', this.uploadZbit, this);
    	$('.projects-navigation-view').html(this.projectsNavigationView.render().$el);

        this.searchView = new SearchView();
        this.searchView.on('on-search-projects-list', this.onSearchProjectsList, this);
        $('.search-wrapper').html(this.searchView.render().$el);

    	this.treeView = new TreeView({ model:model });
        this.treeView.on('go-to-folder', this.openFolder, this);
    	this.treeView.on('on-folder-moved', this.openFolder, this);
    	$('.folders-tree-view').html(this.treeView.render().$el);

    	
    	this.breadcrumbView = new BreadcrumbView({ model:model });
    	this.breadcrumbView.on('back-to-folder', this.backToFolder, this);

    	
		this.projectsListView = new ProjectListView({ model:model });
        this.projectsListView.on('open-folder', this.onOpenFolder, this);
        this.projectsListView.on('on-folder-added', this.onFolderAdded, this);
        this.projectsListView.on('on-project-added', this.onProjectAdded, this);
        this.projectsListView.on('on-folder-removed', this.onFolderRemoved, this);
        this.projectsListView.on('on-project-removed', this.onProjectRemoved, this);
        this.projectsListView.on('add-project', this.addProject, this);
        this.projectsListView.on('on-folder-moved', this.onFolderMoved, this);
        this.projectsListView.on('make-folders-droppable', this.makeFoldersDroppable, this);
        this.projectsListView.on('unmake-folders-droppable', this.unmakeFoldersDroppable, this);
        this.projectsListView.on('make-projects-droppable', this.makeProjectsDroppable, this);
        this.projectsListView.on('unmake-projects-droppable', this.unmakeProjectsDroppable, this);
        this.projectsListView.on('reset-search-projects-list', this.resetSearchProjectsList, this);

        this.summaryView = new SummaryView({ projectsListModel:model });
        //this.summaryView.on('go-to-folder', this.openFolder, this);
        //this.summaryView.on('on-folder-moved', this.openFolder, this);
        $('.user-projects-info').html(this.summaryView.render().$el);

		
		//add views to body
		$('.projects').html(this.projectsListView.render().$el);
		$('.breadcrumb-view').html(this.breadcrumbView.render().$el);

        this.openFolder(firstFolderModel);
		
	},

	addFolder: function(){

        var newFolderWindow = WindowFactory.createNewFolderWindow({ projectsListModel:this.projectsListView.model });
        newFolderWindow.setTitle(Lang.get('projects.foldernamevalue'));
        newFolderWindow.on('create-new-folder', this.createNewFolder, this);
        $('body').append(newFolderWindow.render().$el);
    },

    addProject: function(){

        var newProjectWindow = WindowFactory.createNewProjectWindow({ projectsListModel:this.projectsListView.model });
        newProjectWindow.setTitle(Lang.get('projects.newProject'));
        newProjectWindow.on('create-new-project', this.createNewProject, this);
        $('body').append(newProjectWindow.render().$el);
    },

    uploadZbit: function(){
       
        var uploadZbitWindow = WindowFactory.createUploadZbitWindow({ projectsListModel:this.projectsListView.model });
        uploadZbitWindow.setTitle(Lang.get('projects.uploadProject'));
        uploadZbitWindow.on('on-upload-zbit', this.onUploadZbit, this);
        $('body').append(uploadZbitWindow.render().$el);

        
    },

    onSearchProjectsList: function(value){
       
    
        if(value == ''){

            this.breadcrumbView.refreshBreadcrumbs();

        }else{

            this.breadcrumbView.setAsSearch(value);
        }

        this.projectsListView.searchProjectsList(value);
    },

    

	backToFolder: function(folderModel){
		this.projectsListView.backToFolder(folderModel);

        DataAccess.setLastVisitedFolderId(
            { folder:folderModel.toJSON() },
            function(data){
                _log('setLastVisitedFolderId', data, _log.dataaccessOutResult);
            },
            function(data){
                _log('setLastVisitedFolderId', data, _log.dataaccessOutFault);
            }
        );
	},

	onOpenFolder: function(folderModel){

		this.breadcrumbView.refreshBreadcrumbs(folderModel);

        DataAccess.setLastVisitedFolderId(
            { folder:folderModel.toJSON() },
            function(data){
                _log('setLastVisitedFolderId', data, _log.dataaccessOutResult);
            },
            function(data){
                _log('setLastVisitedFolderId', data, _log.dataaccessOutFault);
            }
        );
	},

	openFolder: function(folderModel){

		this.projectsListView.openFolder(folderModel);
	},

    createNewProject: function(newProjectModel){

        var _that = this;

        _log('newProjectModel', newProjectModel);

        _that.projectsListView.addNewProject(newProjectModel);
    },

    createNewFolder: function(newFolderModel){

        var _that = this;

        this.projectsListView.addNewFolder(newFolderModel);
    },

    onUploadZbit: function(newProjectModel){

        var _that = this;

        _log('newProjectModel', newProjectModel);

        _that.projectsListView.addNewProject(newProjectModel);

        this.summaryView.update();
    },

    onFolderAdded: function(activeFolderModel, folderModel){
        this.treeView.update(activeFolderModel, folderModel);

        activeFolderModel.trigger('is-showing', activeFolderModel);
        folderModel.trigger('new-folder', folderModel);
    },

    onProjectAdded: function(activeFolderModel, projectModel){
        projectModel.trigger('new-project', projectModel);

        this.summaryView.update();
    },

    onFolderRemoved: function(activeFolderModel, foldersStructure){
        //this.treeView.update(activeFolderModel);

        foldersStructureFromDb = foldersStructure;

        _log('foldersStructure', foldersStructure);
        _log('foldersStructureFromDb', foldersStructureFromDb);

        this.createProjectList();

        var model = new ProjectListModel(foldersStructureFromDb);
        var foldersCollection = new FoldersCollection( foldersStructureFromDb.folders );
        var projectsCollection = new ProjectsCollection( foldersStructureFromDb.objs );

        projectsCollection.sort();
        foldersCollection.sort();

        model.set('folders', foldersCollection);
        model.set('objs', projectsCollection);

        this.treeView.model = model;
        this.breadcrumbView.model = model;
        this.projectsListView.model = model;

        this.treeView.update();
        
        var activeFolderModel = foldersCollection.findWhere({ 'folderID': activeFolderModel.get('folderID') });
        activeFolderModel.trigger('is-showing', activeFolderModel);
       
        this.openFolder(activeFolderModel);

        this.summaryView.update();
 
    },


    onProjectRemoved: function(activeFolderModel){
        this.treeView.update(activeFolderModel);

        this.summaryView.update();
    },

    onFolderMoved: function(activeFolderModel){
         this.treeView.update(activeFolderModel);
    },

    onFolderMovedTree: function(sourceFolderModel, targetFolderModel){
         this.treeView.onFolderMove(sourceFolderModel, targetFolderModel);
    },


    makeFoldersDroppable: function(folderModel){

        this.projectsListView.makeFoldersDroppable(folderModel);
        this.treeView.makeFoldersDroppable(folderModel);
    },

    unmakeFoldersDroppable: function(folderModel){

        this.projectsListView.unmakeFoldersDroppable(folderModel);
        this.treeView.unmakeFoldersDroppable(folderModel);
    },

    makeProjectsDroppable: function(projectModel){

        this.projectsListView.makeProjectsDroppable(projectModel);
        this.treeView.makeProjectsDroppable(projectModel);
    },

    unmakeProjectsDroppable: function(projectModel){

        this.projectsListView.unmakeProjectsDroppable(projectModel);
        this.treeView.unmakeProjectsDroppable(projectModel);
    },

    checkSharedProjects: function(){

        var _that = this;

        setInterval(function(){

            DataAccess.checkSharedProjects(
                {  },
                function(data){
                    _log('checkSharedProjects', data, _log.dataaccessOutResult);

                    if(!data.success){

                        return;
                    }

                    var sharedIsChanged = _that.projectsListView.checkIfSharedProjectsChanged(data.data);

                    _log('sharedIsChanged', sharedIsChanged);

                    
                },
                function(data){
                    _log('checkSharedProjects', data, _log.dataaccessOutFault);
                }
            );

        }, 8000);

        
    },

    resetSearchProjectsList: function(){
        this.searchView.resetSearchProjectsList();
    }




});