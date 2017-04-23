var ProjectListView = Backbone.View.extend({


    template: _.template($('#projectslist-template').html()),

    itemsCollection : new Backbone.Collection(),

    searchValue: '',

    initialize: function(data){

        this.model = data.model;
    },

    events: {
        'click .addproject': 'showAddProjectWindow'
    },

    showAddProjectWindow: function() {
        this.trigger('add-project');
    },

    render: function(){

        var template = this.template();
        this.$el.html(template);

        return this;
    },

    renderFolderStructure: function(folderModel){

        this.activFolderModel = folderModel == undefined ? this.activFolderModel : folderModel;

        folderModel = this.activFolderModel;


        this.model.get('folders').each(function(fModel){
            fModel.trigger('is-not-showing', fModel);
        });
        
        folderModel.trigger('is-showing', folderModel);
        folderModel.trigger('select-childs', folderModel);

        
        var folderID = folderModel.get('folderID');

        this.model.set('lastVisitedFolderID', folderID);

        if(this.searchValue != ''){

            var folderStructure = this.getFolderStructureBySearchValue(this.searchValue);

            this.$el.find('.folders-container').html('');
            this.$el.find('.projects-container').html('');


            this.$el.find('.folders-container').html('');
            this.$el.find('.projects-container').html('');

            var foldersCollection = folderStructure.foldersCollection;
            _.each(foldersCollection, this.addItemFolderView, this);

            var projectsCollection = folderStructure.projectsCollection;
            _.each(projectsCollection, this.addItemProjectView, this);


        }else{

            var folderStructure = this.getFolderStructureById(folderID);

            this.$el.find('.folders-container').html('');
            this.$el.find('.projects-container').html('');

            var foldersCollection = folderStructure.foldersCollection;
            _.each(foldersCollection, this.addItemFolderView, this);

            var projectsCollection = folderStructure.projectsCollection;
            _.each(projectsCollection, this.addItemProjectView, this);



            var itemsCollection = this.itemsCollection; 

            itemsCollection.reset();

            _.each(foldersCollection, function(fModel){

                itemsCollection.add(fModel);
            });

            _.each(projectsCollection, function(pModel){

                 itemsCollection.add(pModel);
            });

            this.itemsCollection = itemsCollection;

            if (this.itemsCollection.length == 0) {
                this.$el.find('.projects-container').html('<div class="noprojects-info"><span class="addproject">'+ Lang.get('editor.noprojectsInfo') +'</span></div>')
            }

        }

        return this;
    },

    addItemFolderView: function( listItem ) {

        _log('addItemFolderView', listItem);

        var folderView = FoldersFactory.createFolderByType( listItem.get('pType'), listItem );
        listItem.view = folderView;
        folderView.on('open-folder', this.openFolder, this);
        folderView.on('select-item', this.selectItem, this);
        folderView.on('delete-folder', this.deleteFolder, this);
        folderView.on('update-folder', this.updateFolder, this);
        folderView.on('on-folder-move', this.onFolderMove, this);
        folderView.on('make-folders-droppable', this.makeFoldersDroppableTrigger, this);
        folderView.on('unmake-folders-droppable', this.unmakeFoldersDroppableTrigger, this);
        this.$el.find('.folders-container').append(folderView.render().$el);
    },

    addItemProjectView: function( listItem ) {

        _log('addItemProjectView', listItem);

        _log('listItem', listItem.get('pType'));

        var projectView = ProjectsFactory.createProjectByType( listItem.get('pType'), listItem );
        listItem.view = projectView;
        projectView.on('open-project', this.openProject, this);
        projectView.on('select-item', this.selectItem, this);
        projectView.on('delete-project', this.deleteProject, this);
        projectView.on('copy-project', this.copyProject, this);
        projectView.on('template-project', this.templateProject, this);
        projectView.on('update-project', this.updateProject, this);
        projectView.on('make-projects-droppable', this.makeProjectsDroppableTrigger, this);
        projectView.on('unmake-projects-droppable', this.unmakeProjectsDroppableTrigger, this);
        projectView.on('on-project-move', this.onProjectMove, this);
        projectView.on('disconect-from-shared-projects', this.disconectFromSharedProjects, this);
        projectView.on('download-project', this.downloadProject, this);
        this.$el.find('.projects-container').append(projectView.render().$el);
    },

    disconectFromSharedProjects: function(projectModel){

        var _that = this;

        DataAccess.disconectFromSharedProjects(
            { project:projectModel.toJSON() },
            function(data){
                _log('disconectFromSharedProjects', data, _log.dataaccessOutResult);

                if(!data.success){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                var projectsCollection = _that.model.get('objs');
                projectsCollection.remove(projectModel);
                
                projectModel.view.remove();

                _Notify(Lang.get('utils.operationSuccessful'), 'success');
            },
            function(data){
                _log('disconectFromSharedProjects', data, _log.dataaccessOutFault);
            }
        );

        this.trigger('disconect-from-shared-projects', this.model);
    },

    updateFolder: function(folderModel){

        var _that = this;

        DataAccess.updateFolder(
            { folder:folderModel.toJSON() },
            function(data){
                _log('updateFolder', data, _log.dataaccessOutResult);

                if(!data.success){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                var name = data.data.folder.name;
                folderModel.set('name', name);
                
            },
            function(data){
                _log('updateFolder', data, _log.dataaccessOutFault);
            }
        );
    },

    onFolderMove: function(sourceFolderModel, targetFolderModel){

        var _that = this;

        _log('onFolderMove sourceFolderModel', sourceFolderModel);
        _log('onFolderMove targetFolderModel', targetFolderModel);

        sourceFolderModel.set('folder', targetFolderModel.get('folderID'));

        this.renderFolderStructure();

        this.trigger('on-folder-moved', this.activFolderModel, this);

        DataAccess.moveFolder(
            { sourceFolder:sourceFolderModel.toJSON(), targetFolder:targetFolderModel.toJSON() },
            function(data){
                _log('moveFolder', data, _log.dataaccessOutResult);

                if(!data.success){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                _Notify(Lang.get('utils.operationSuccessful'), 'success');

                
            },
            function(data){
                _log('moveFolder', data, _log.dataaccessOutFault);
            }
        );
    },

    onProjectMove: function(sourceProjectModel, targetFolderModel){

        var _that = this;

        _log('onFolderMove sourceProjectModel', sourceProjectModel);
        _log('onFolderMove targetFolderModel', targetFolderModel);

        sourceProjectModel.set('folder', targetFolderModel.get('folderID'));

        this.renderFolderStructure();

        this.trigger('on-folder-moved', this.activFolderModel, this);

        DataAccess.moveProject(
            { sourceProject:sourceProjectModel.toJSON(), targetFolder:targetFolderModel.toJSON() },
            function(data){
                _log('moveFolder', data, _log.dataaccessOutResult);

                if(!data.success){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                _Notify(Lang.get('utils.operationSuccessful'), 'success');

                
            },
            function(data){
                _log('moveFolder', data, _log.dataaccessOutFault);
            }
        );
    },

    

    

    updateProject: function(projectModel){

        var _that = this;

        DataAccess.updateProject(
            { project:projectModel.toJSON() },
            function(data){
                _log('updateProject', data, _log.dataaccessOutResult);

                if(!data.success){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                var name = data.data.project.name;
                projectModel.set('name', name);
                
            },
            function(data){
                _log('updateProject', data, _log.dataaccessOutFault);
            }
        );
    },

    deleteFolder: function(foldersStructure){

        var _that = this;

        this.trigger('on-folder-removed', this.activFolderModel, foldersStructure, this);

    },

    deleteProject: function(projectModel){

        var _that = this;

        var projectsCollection = this.model.get('objs');
        projectsCollection.remove(projectModel);
        this.renderFolderStructure();
        this.trigger('on-project-removed', this.activFolderModel, projectModel, this);

        
    },

    copyProject: function(projectModel){

        var _that = this;

        DataAccess.copyProject(
            { project:projectModel.toJSON() },
            function(data){
                _log('copyProject', data, _log.dataaccessOutResult);

                if(!data.success){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                switch(data.data.error){
                    case 0:

                        _that.showLimitProjectsWindow();
 
                        return;

                        break;

                    default:
                        //_Notify(Lang.get('utils.operationFailed'), 'danger');
                        break;
                }

                _Notify(Lang.get('utils.operationSuccessful'), 'success');

                var project = data.data.project;

                var newProjectModel = ProjectsFactory.createProjectModelByType(project.pType, project);

                _that.addNewProject(newProjectModel);
            },
            function(data){
                _log('copyProject', data, _log.dataaccessOutFault);
            }
        );
    },

    showLimitProjectsWindow: function() {

        var limitProjectsWindow = WindowFactory.createLimitProjectsWindow();
        limitProjectsWindow.setTitle('Limit project');
        $('body').append(limitProjectsWindow.render().$el);
    },

    templateProject: function(projectModel){

        var _that = this;

        _log('projectModel', projectModel);

        DataAccess.templateProject(
            { project:projectModel.toJSON() },
            function(data){
                _log('templateProject', data, _log.dataaccessOutResult);

                if(!data.success){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                
                var project = data.data.project;

                _log('templateProject', project);

                var projectId = parseInt(project.project_id);
                var template = parseInt(project.template);

                var projectsCollection = _that.model.get('objs');

                var pModel = projectsCollection.findWhere({ 'project_id': projectId });

                _log('projectsCollection', projectsCollection);
                _log('projectId', projectId);
                

                if(pModel){

                    pModel.set('template', template);
                }

                _log('template', template);
                _log('pModel', pModel);

                _Notify(Lang.get('utils.operationSuccessful'), 'success');

                _that.renderFolderStructure();


            },
            function(data){
                _log('templateProject', data, _log.dataaccessOutFault);
            }
        );
    },

    downloadProject: function(projectModel){

        var _that = this;

        _log('projectModel', projectModel);

        DataAccess.downloadProject(
            { project:projectModel.toJSON() },
            function(data){
                _log('downloadProject', data, _log.dataaccessOutResult);

                if(!data.success){

                    _Notify(Lang.get('utils.operationFailed'), 'danger');
                    return;
                }

                var link = data.data.link;

                _that.showDownloadZbitWindow(link);


            },
            function(data){
                _log('templateProject', data, _log.dataaccessOutFault);
            }
        );
    },

    showDownloadZbitWindow: function(link){

        var downloadZbitWindow = WindowFactory.createDownloadZbitWindow({ link:link });
        //downloadZbitWindow.setTitle(Lang.get('projects.downloadProjectWindowTitle'));
        //downloadZbitWindow.on('create-new-folder', this.createNewFolder, this);
        $('body').append(downloadZbitWindow.render().$el);

    },
    
    getFolderStructureById: function( folderID ) {

        var foldersCollection = this.model.get('folders');
        var fCollection = foldersCollection.where({ 'folder': folderID });

        var projectsCollection = this.model.get('objs');
        var pCollection = projectsCollection.where({ 'folder': folderID });

        return { foldersCollection:fCollection, projectsCollection:pCollection};
    },

    getFolderStructureBySearchValue: function( value ) {

        var foldersCollection = this.model.get('folders');
        var fCollection = foldersCollection.searchStructore(value);

        var projectsCollection = this.model.get('objs');
        var pCollection = projectsCollection.searchStructore(value);

        _log('value 2', value);
        _log('foldersCollection', foldersCollection);
        _log('projectsCollection', projectsCollection);
        _log('fCollection', fCollection);
        _log('pCollection', pCollection);

        return { foldersCollection:fCollection, projectsCollection:pCollection};
    },


    openFolder: function(folderModel){
        _log('openFolder', folderModel);

        this.resetSearchProjectsList();
        this.renderFolderStructure(folderModel);

        this.trigger('open-folder', folderModel, this);
    },

    backToFolder: function(folderModel){
        _log('backToFolder', folderModel);

        this.resetSearchProjectsList();
        this.renderFolderStructure(folderModel);
    },

    openProject:function(projectModel){

        this.trigger('open-project', projectModel);
    },

    selectItem: function(e, model){

        _log('e', e);
        _log('model', model);


        

        var itemsCollection = this.itemsCollection;

        if (e.shiftKey) {

            var indexModel = itemsCollection.indexOf(model);

            var chFrom = 0;
            var chTo = 0;
            var check = false

            for (var i = indexModel; i >= 0; i--) {

                var model = itemsCollection.at(i);

                if (model.isSelected) {
                    chFrom = i;
                    chTo = indexModel;
                    check = true;
                    break;
                }
            }

            if (!check) {
                for (var i = indexModel; i < itemsCollection.length; i++) {

                    var model = itemsCollection.at(i);

                    if (model.isSelected) {
                        chFrom = indexModel;
                        chTo = i;
                        check = true;
                        break;
                    }
                }
            }

            if (check) {
                itemsCollection.each(function(model, iModel) {

                    if ((iModel < chFrom) || (iModel > chTo)) {
                        model.isSelected = false;
                        model.view.setSelected(false);
                    } else {
                        model.isSelected = true;
                        model.view.setSelected(true);
                    }

                });
            }

        } else if (e.ctrlKey) {

            if (model.isSelected) {
                model.isSelected = false;
                model.view.setSelected(false);
            } else {
                model.isSelected = true;
                model.view.setSelected(true);
            }

        } else {

            ///this.unselectAllPages();

            itemsCollection.each(function(pModel){

                pModel.view.setSelected(false);
            });

            model.isSelected = true;
            model.view.setSelected(true);

        }

    },

    addNewFolder: function(folderModel){

        var foldersCollection = this.model.get('folders');
        foldersCollection.add(folderModel);
        foldersCollection.sort();

        _log('addNewFolder', this.model.get('folders'));

        this.renderFolderStructure();

        this.trigger('on-folder-added', this.activFolderModel, folderModel, this);
    },

    addNewProject : function(projectModel){

        var projectsCollection = this.model.get('objs');
        projectsCollection.add(projectModel);
        projectsCollection.sort();

        this.renderFolderStructure();

        this.trigger('on-project-added', this.activFolderModel, projectModel, this);

    },






    makeFoldersDroppableTrigger: function(folderModel){

        this.trigger('make-folders-droppable', folderModel);
    },

    unmakeFoldersDroppableTrigger: function(folderModel){

        this.trigger('unmake-folders-droppable', folderModel);
    },

    makeFoldersDroppable: function(folderModel){

        var folderStructure = this.getFolderStructureById(this.activFolderModel.get('folderID'));

        //_log('makeFoldersDroppable', folderStructure);
        //_log('makeFoldersDroppable', folderStructure);

        var foldersCollection = folderStructure.foldersCollection;
        _.each(foldersCollection, function(fModel){

            //_log('makeFoldersDroppable model', fModel);

            fModel.view.makeFolderDroppable();

        }, this);
    },

    unmakeFoldersDroppable: function(folderModel){

        var folderStructure = this.getFolderStructureById(this.activFolderModel.get('folderID'));

        //_log('unmakeFoldersDroppable', folderStructure);

        var foldersCollection = folderStructure.foldersCollection;
        _.each(foldersCollection, function(fModel){

            //_log('unmakeFoldersDroppable model', fModel);

            fModel.view.unmakeDroppable();

        }, this);
    },




    makeProjectsDroppableTrigger: function(projectModel){

        this.trigger('make-projects-droppable', projectModel);
    },

    unmakeProjectsDroppableTrigger: function(projectModel){

        this.trigger('unmake-projects-droppable', projectModel);
    },

    makeProjectsDroppable: function(projectModel){

        var folderStructure = this.getFolderStructureById(this.activFolderModel.get('folderID'));

        var foldersCollection = folderStructure.foldersCollection;
        _.each(foldersCollection, function(fModel){

            fModel.view.makeProjectDroppable();

        }, this);
    },

    unmakeProjectsDroppable: function(projectModel){

        var folderStructure = this.getFolderStructureById(this.activFolderModel.get('folderID'));

        var foldersCollection = folderStructure.foldersCollection;
        _.each(foldersCollection, function(fModel){

            fModel.view.unmakeDroppable();

        }, this);
    },

    checkIfSharedProjectsChanged: function(data){

        var projectsToRemove = data.projects.projectsToRemove || [];
        var projectsToAdd = data.projects.projectsToAdd || [];
        var projectsNotShared = data.projects.projectsNotShared || [];

        _log('projectsToRemove', projectsToRemove);
        _log('projectsToAdd', projectsToAdd);

        var projectCollectionChanged = false;

        if(projectsToRemove.length > 0 || projectsToAdd.length > 0 || projectsNotShared.length > 0){
            projectCollectionChanged = true;
        }

        if(projectCollectionChanged){

            var projectsCollection = this.model.get('objs');

            var projectsToRemoveArray = [];

            for(var item in projectsToRemove){

                var projectId = projectsToRemove[item];

                var projectModel = projectsCollection.findWhere({'project_id': projectId });

                _log('projectsToRemove projectModel', projectModel);

                projectsCollection.remove(projectModel);
            }

            var newSharedToUserProjects = [];

            for(var item in projectsToAdd){

                var project = projectsToAdd[item];

                var projectModel = projectsCollection.findWhere({'project_id': project.projectId });

                if(!projectModel){

                    var newProjectModel = ProjectsFactory.createProjectModelByType(project.pType, project);

                    _log('projectsToAdd newProjectModel', newProjectModel);

                    if(newProjectModel){
                        projectsCollection.add(newProjectModel);

                        newSharedToUserProjects.push(newProjectModel);
                    }
                }else{
                    _log('project id exist', newProjectModel);
                }

                
            }

            if(projectsNotShared.length){

                
                for(var item in projectsNotShared){

                    var projectId = projectsNotShared[item];
                    var projectModel = projectsCollection.findWhere({'project_id': projectId });

                    if(projectModel){
                        projectModel.set('pType', 'userProjects');
                        projectModel.unset('fromuser');
                    }

                    _log('projectsNotShared projectModel', projectModel);
                }
            }

            this.renderFolderStructure();
  

            for (var i = 0; i < newSharedToUserProjects.length; i++) {
                var newProjectModel = newSharedToUserProjects[i];
                newProjectModel.trigger('new-shared-user-project');
            };

        }



        return projectCollectionChanged;
    },

    
    searchProjectsList: function(value){

        this.searchValue = value;

        this.renderFolderStructure();
    },

    resetSearchProjectsList: function(){

        this.searchValue = '';
        this.trigger('reset-search-projects-list');
    }


    





	
});