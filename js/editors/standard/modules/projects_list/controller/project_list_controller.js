var ProjectListController = Backbone.View.extend({

    template: _.template($('#projectslist-controller-template').html()),

    initialize: function(){

       
    },

    render: function(){

        var template = this.template(this.serializeData());
        this.$el.html(template);

        return this;
    },

    afterRender: function(){

        var _that = this;
        
        //this.checkSharedProjects();

        this.showProjectsListLoader();

        DataAccess.getFoldersStructure(
            {},
            function(data){
                _log('getFoldersStructure result', data, _log.dataaccessOutResult);

                _that.hideProjectsListLoader();

                _that.createProjectList(data);

            },
            function(data){
                _log('getFoldersStructure fault', data, _log.dataaccessOutFault);

                _that.hideProjectsListLoader();
            }
        );

    },

    serializeData: function(){
        return {};
    },

	createProjectList: function(data){

		//Create model

        var foldersStructureFromDb = data.folderStructure;

        // var foldersStructureFromDb = {
        //     objs: [
        //         {
        //             date: "2015-12-16 12:52:19",
        //             date_modification: "0000-00-00 00:00:00",
        //             folder: 0,
        //             last_visit: "2015-12-16 18:07:05",
        //             name: "ef test",
        //             pType: "userProjects",
        //             project_id: 853,
        //             size: 7336511,
        //             version: "2.0.0"
        //         }
        //     ],
        //     folders: [
        //         {
        //             folder: -5,
        //             folderID: 0,
        //             name: "DARKAN_MAIN_PROJECTS_FOLDER_NAME",
        //             pType: "folder",
        //         }
        //     ]
        // };

        var userId = __meta__.userID;

        for (var i = 0; i < foldersStructureFromDb.objs.length; i++) {
            var obj = foldersStructureFromDb.objs[i];

            obj.project_id = parseInt(obj.project_id);

            if(obj.pType == 'userProjects'){
                obj.user_id = parseInt(userId);
            }

            if(obj.template){
                obj.template = parseInt(obj.template);
            }
        };

        var shareTemplateProjectData = data.shareTemplateProjectData;

        if(shareTemplateProjectData){
            var sharedTemplateFolder = {
                    folder: 0,
                    folderID: -5,
                    name: Lang.get('editor.FOLDER_ITEM_SHARED_TEMPLATES'),
                    pType: "stFolder",
                };

            foldersStructureFromDb.folders.push(sharedTemplateFolder);

            for (var i = 0; i < shareTemplateProjectData.length; i++) {
                var shareTemplateProjectItem = shareTemplateProjectData[i];
                shareTemplateProjectItem.folder = -5;
                foldersStructureFromDb.objs.push(shareTemplateProjectItem);
            };
        }


		var model = new ProjectListModel(foldersStructureFromDb);
		var foldersCollection = new FoldersCollection( foldersStructureFromDb.folders );
    	var projectsCollection = new ProjectsCollection( foldersStructureFromDb.objs );

        projectsCollection.sort();
        foldersCollection.sort();

    	model.set('folders', foldersCollection);
    	model.set('objs', projectsCollection);

        var lastVisitedFolderID = 0; 

    	var firstFolderModel = foldersCollection.findWhere({ 'folderID': lastVisitedFolderID });
    	//firstFolderModel.set('name', 'Projekty');

    	//Create views

        _log('lastVisitedFolderID', model.get('lastVisitedFolderID'));
        _log('firstFolderModel', firstFolderModel);
        _log('foldersCollection', foldersCollection);
        _log('projectsCollection', projectsCollection);


        this.searchView = new SearchView();
        this.searchView.on('on-search-projects-list', this.onSearchProjectsList, this);
        this.$el.find('.search-wrapper').html(this.searchView.render().$el);

    	this.treeView = new TreeView({ model:model });
        this.treeView.on('go-to-folder', this.openFolder, this);
    	this.treeView.on('on-folder-moved', this.openFolder, this);
    	this.$el.find('.folders-tree-view').html(this.treeView.render().$el);

    	
    	this.breadcrumbView = new BreadcrumbView({ model:model });
    	this.breadcrumbView.on('back-to-folder', this.backToFolder, this);

    	
		this.projectsListView = new ProjectListView({ model:model });
        this.projectsListView.on('open-folder', this.onOpenFolder, this);
        this.projectsListView.on('open-project', this.openProject, this);
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


		
		//add views to body
		this.$el.find('.projects-list-views').html(this.projectsListView.render().$el);
		this.$el.find('.breadcrumb-view').html(this.breadcrumbView.render().$el);

        this.openFolder(firstFolderModel);
		
	},

    openProject:function(projectModel){

        this.trigger('open-project', projectModel);
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
	},

	onOpenFolder: function(folderModel){

		this.breadcrumbView.refreshBreadcrumbs(folderModel);
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

    },

    onFolderAdded: function(activeFolderModel, folderModel){
        this.treeView.update(activeFolderModel, folderModel);

        activeFolderModel.trigger('is-showing', activeFolderModel);
        folderModel.trigger('new-folder', folderModel);
    },

    onProjectAdded: function(activeFolderModel, projectModel){
        projectModel.trigger('new-project', projectModel);
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
 
    },


    onProjectRemoved: function(activeFolderModel){
        this.treeView.update(activeFolderModel);
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
    },

    showProjectsListLoader: function(){

        this.projectsListLoader = PreloaderFactory.createProjectsListControllerLoader();
        this.$el.parent().append(this.projectsListLoader.render().$el);
    },

    hideProjectsListLoader: function(){
        if(this.projectsListLoader){
            this.projectsListLoader.remove();
        }
    }




});

// var ProjectsListControllerLoader = Backbone.View.extend({

//     className: 'projects-list-controller-loader',

//     template: _.template($('#projects-list-controller-loader').html()),

//     render: function(){
//         var template = this.template(this.serializeData());
//         this.$el.html(template);

//         return this;
//     },

//     serializeData: function(){
//         return {};
//     }

// });