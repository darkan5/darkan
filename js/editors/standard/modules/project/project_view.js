var ProjectView = Backbone.View.extend({

	tagName: 'li',
	className: 'project-view',

	template: _.template($('#project-view-template').html()),

	events: {

	},

	initialize: function( ) {
    	
  	},

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);

		return this;
	},

    afterRender: function(){

        this.createHistoryView();
        this.createWatcherView();

        var pagesLength = this.model.get('collection').length || 0;

        this.createEditorsControllerView();
        this.createTriggerView();
        this.createStageView(this.model.get('collection').first());

        if(pagesLength == 0){
            this.showModalWindow();
        }

        this.createPageListView();

        ProjectModel.instance = this.model;
        

        
    },

	createStageView: function(pageModel){

        var _that = this;

		var pageModel = pageModel || ProjectModel.instance.createNewPageModel();
	        
        this.stageView = new EditableStageView({ model:pageModel });

        this.stageView.on(' show-image-window', function(sender) {
            _that.openImageWindow(0, sender);
        });

        

        this.stageView.on('on-stage-render', function(pModel) {
            _that.onStageRender(pModel);
        });

        this.stageView.on('on-stage-selected', function(pModel) {
            _that.onStageSelected(pModel);
        });

        this.stageView.on('on-component-selected', function(cModel) {
            _that.onComponentSelected(cModel);
        });

        this.stageView.on('on-components-selected', function(scc) {
            _that.onComponentsSelected(scc);
        });

        this.stageView.on('update-timeline', function() {
            _that.updateTimeline();
        });

        StageView.instance = this.stageView;
        this.$el.find('.stage-view-container').html(this.stageView.renderStage().$el);
        //this.stageView.on('.stage-selected', this.onStageSelected, this);
        this.stageView.afterRender();
	},

	createNewPageSection: function(){

		this.newPageSection = new NewPageSection();
		this.newPageSection.on('copy-page', this.copyPage, this);
		this.newPageSection.on('add-new-blank-page', this.addNewPageSection, this);
		this.newPageSection.on('add-new-psd-page', this.addNewPageSection, this);
		this.newPageSection.on('add-new-pdf-page', this.addNewPageSection, this);
		this.$el.find('.new-page-container').html(this.newPageSection.render().$el);
    	this.newPageSection.afterRender();
	},

	createPageListView: function(){

		this.pagesList = new EditablePagesList({ model:this.model });
        this.pagesList.on('toggle-project-list', this.toggleProjectList, this);
        this.pagesList.on('set-page', this.setPage, this);
        this.pagesList.on('change-tab-editor', this.changeTabEditor, this);
        this.pagesList.on('data-picker-picked', this.dataPickerPicked, this);
        this.pagesList.on('show-modal-window', this.showModalWindow, this);
        this.pagesList.on('on-page-added', this.onPageAdded, this);
        this.$el.find('.pages-list-wrapper').html(this.pagesList.render().$el);
        this.pagesList.afterRender();
	},

    dataPickerPicked: function(model){
        this.stageView.dataPickerPicked(model);
    },

    createTriggerView: function(){

        var _that = this;

        this.triggerView = new WindowFactory.createTriggerWindow();
        $('body').append( this.triggerView.render().$el );
        this.triggerView.$el.css({
            top: '100px',
            left: 'calc(100% - 450px)'
        });

        $(window).resize(function(){
            if ((_that.triggerView.$el.offset().left + 200) > $(this).width()) {
                _that.triggerView.$el.css({left: $(this).width() - 200 + "px"});
            }
        });

    },

	createEditorsControllerView: function(pageModel){

		var pageModel = pageModel || ProjectModel.instance.createNewPageModel();

        this.editorsController = new EditorsController({ model:pageModel });
        this.editorsController.on('on-resize', this.onEditrsResize, this);
        this.editorsController.on('data-picker-picked', this.dataPickerPicked, this);
        this.$el.find('.editors-view-container').html(this.editorsController.render().$el);
        this.editorsController.afterRender();
	},

    onEditrsResize: function(editorControllerView){
        // todo pio

        this.pagesMainList = this.$el.find('.pages-list-wrapper-main');
        
        var editorsMenuHeight = editorControllerView.$el.height();
        var pagesListProperHeight = editorsMenuHeight+82;
        this.pagesMainList.css('height', 'calc(100% - '+ pagesListProperHeight +'px)');
        this.stageView.$el.css('height', 'calc(100% - '+ editorsMenuHeight +'px)');
    },

    createHistoryView: function(){

        var _that = this;

        this.historyListView = new HistoryListView( );
        HistoryListView.instance = this.historyListView;

        this.historyListView.on('load-history-project', function(data){
            _that.loadHistoryProject(data);
        });

        this.historyListView.on('load-history-page', function(data){
            _that.loadHistoryPage(data);
        });

        $('#history-wrapper').append(this.historyListView.render().$el);

        _log('dsad', $('#history-wrapper'));

        this.historyListView.start();
    },

    createWatcherView: function(){

        var _that = this;

        var projectWatcher = new ProjectWatcherView();
        //this.$el.find('#project-watcher').append(projectWatcher.render().$el);
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

	copyPage: function(){

	},

    copyPagesFromOtherProject: function( pageIds, userId, projectId ){

        this.selectProjectView();

        this.pagesList.copyPagesFromOtherProject(pageIds, userId, projectId);
    },

    createNewPage: function(){
        this.pagesList.createNewPage();
    },

    showDeletePagesWindow: function(e){
        this.pagesList.showDeletePagesWindow(e);
    },

    duplicatePages: function(){
        this.pagesList.duplicatePages();
    },

    

	addNewPageSection: function(){

		var _that = this;

		var newPageModel = ProjectModel.instance.createNewPageModel();
		this.pagesList.addNewPage(
			newPageModel, 
			function(createdPageModel){
				_that.newPageSection.destroy();
				_that.newPageSection = undefined;

				_that.pagesList.render();
        		_that.pagesList.afterRender();

				_that.createStageView(createdPageModel);
			},
			function(data){

			}
		);
	},

	addNewPsdPage: function(){
		
	},

	addNewPdfPage: function(){
		
	},

	onKeyDown: function(e){
		console.log('keydown ' + e.which);

        var _that = this;

		switch (e.which){

            case 65: // ctrl + a

                if(e.ctrlKey){

                    this.stageView.selectAllComponents();
                }
                break;

            case 46: // delete

                this.stageView.deleteActiveComponent();
                break;

            case 27: // escape


                var windows = $('body').find('.window, .context-menu').not('.trigger-window');

                _log('windows', windows);

                var oneWindow = windows.last();

                _log('oneWindow', oneWindow);

                if(oneWindow.length > 0){
                    oneWindow.trigger('close');
                }else{
                    this.triggerView.escape();
                }

                
                break;

            case 67: // c
                // copy
                if(e.ctrlKey){

                    this.stageView.copyComponents();
                }

                break;

            case 86:
                // paste
                if(e.ctrlKey){

                    if(this.imageWindow){
                        return;
                    }

                    this.stageView.pasteComponents();
                }

                break;

            case 66:

                if(e.ctrlKey){

                    this.showPasteWindow();
                }

                break;
                

            case 88:
                // cut
                if(e.ctrlKey){

                    this.stageView.cutComponents();
                }

                break;

            case 81:

                e.stopPropagation();
                e.preventDefault();

                if(e.ctrlKey){

                    this.stageView.duplicateComponents();
                }

                break;

            case 90:
                // back
                if(e.ctrlKey){

                    this.historyBack();
                }

                break;

            case 89:
                // prew
                if(e.ctrlKey){

                    this.historyPrev();
                }

                break;

            case 37:
            case 38:
            case 39:
            case 40:
                this.stageView.moveActiveComponents(e);
                break;

            case 32:
                if(e.ctrlKey){

                    this.stageView.moveSelectedComponentsToNewLine();
                }
                break;

            case 190:
                if(e.ctrlKey){

                   var addMultiComponentsWindow =  WindowFactory.createAddMultiComponentsWindow();
                   addMultiComponentsWindow.on('add-multi-components', function(data){
              
                        _that.stageView.addMultiComponents({ type:'text', cData:data });
                   });

                   $('body').append(addMultiComponentsWindow.render().$el);

                   addMultiComponentsWindow.afterRender();


                    
                }
                break;

        }
	},




    showPasteWindow: function(){
        _log('Show paste window');

        var _that = this;

        this.imageWindow = WindowFactory.createPasteComponentsWindow();
        this.imageWindow.on('paste-components', function(hash){
            _that.stageView.pasteComponents(hash);
        });
        this.imageWindow.on('on-close', function(){
            _that.imageWindow = undefined;
        });
        $('body').append(this.imageWindow.render().$el);
    },

    onLeftMenuClick: function(model){

        var _that = this;

        var componentType = model.get('componentName');

        //do action basing on clicked left menu element
        switch(componentType) {

            case 'image':
                _that.openImageWindow(0);
                break;


            case 'video':
                _that.openVideoWindow(0);
                break;

            case 'library':
                _that.openLibraryWindow(0);
                break;

            case 'shapes':
                _that.openLibraryWindow(4);
                break;

            case 'remove':
                this.stageView.deleteActiveComponent();
                break;

            default: 
                _that.addComponent( componentType );
                break;
        }
    },

    addComponent : function( componentType, onComponentAdded ){

        var componentModel = ComponentFactory.createComponentModelByType(componentType);
        this.stageView.addComponent( componentModel, onComponentAdded );
    },

    openImageWindow: function(activeTab, sender) {
        var _that = this;
        var imageWindow = WindowFactory.createImageWindow(activeTab, sender);

        imageWindow.on('on-close', function(fileData) {
            _that.imageWindow = undefined;
        });

        imageWindow.on('imageupload-ondrop', function(fileData) {
            _that.addComponent( 'image', function(componentView){

                _log('fileData', fileData);

                componentView.uploadOnFileDrop2(fileData, true);
            }); 
        });

        imageWindow.on('imageupload-onclick', function(fileData, input) {
            _that.addComponent( 'image', function(componentView){
                componentView.uploadOnInputData(fileData, input, true);
            });
            
        });

        imageWindow.on('imageupload-link', function(imageUrl) {
            _that.addComponent( 'image', function(componentView){
                componentView.uploadOnLink(imageUrl, true);
            });   
        });

        imageWindow.on('imageupload-on-paste', function(event, blob) {
            _that.addComponent( 'image', function(componentView){
                componentView.uploadOnPaste(event, blob, true);
            });
        });
        
        $('body').append(imageWindow.render().$el);
        imageWindow.$el.find('.darkan-tabs').tabs("option", "active", activeTab);

        this.imageWindow = imageWindow;
    },

    openVideoWindow: function(activeTab) {
        var _that = this;

        var videoWindow = WindowFactory.createVideoWindow();
        videoWindow.on('imageupload-ondrop', function(fileData) {
            _that.addComponent( 'video', function(componentView){
                componentView.uploadOnFileDrop2(fileData, true);
            });
        });

        videoWindow.on('imageupload-onclick', function(fileData, input) {
            _that.addComponent( 'video', function(componentView){
                componentView.uploadOnInputData(fileData, input, false);
            });
        });

        videoWindow.on('putvideolink', function(data) {
            _that.addComponent( 'video', function(componentView){
                componentView.putVideoLink(data);
            });
            
        });
        
        $('body').append(videoWindow.render().$el);
        videoWindow.$el.find('.darkan-tabs').tabs("option", "active", activeTab);
    },

    openLibraryWindow: function(activeTab) {
        var _that = this;

        var libraryWindow = WindowFactory.createLibraryWindow();
        $('body').append(libraryWindow.render().$el);
        libraryWindow.on('imagelibrary-onclick', function(fileData, input) {


            _log('fileData', fileData);

            _that.addComponent( 'image', function(componentView){
                componentView.createImageLibrary(fileData, input, true);
            });  
        });
        libraryWindow.$el.find('.darkan-tabs').tabs("option", "active", activeTab);
    },

    createNewPageTopMenu : function(){
        var newPageWindow = WindowFactory.createNewpageWindow();
        this.createNewPageWindow(newPageWindow);
    },

    createNewStartingPageWindow : function(){
        var newPageWindow = WindowFactory.createStartingNewpageWindow();
        this.createNewPageWindow(newPageWindow);
    },

    createNewPageWindow : function(newPageWindow){

        var _that = this;


        newPageWindow.on('add-new-blank-page', function(){
            var newPageModel = _that.pagesList.createNewPage();
        });

        newPageWindow.on('add-new-psd-page', function(){

            var importWindow = WindowFactory.createImportWindow();
            importWindow.on('close-window', function(){
                newPageWindow.close();
                newPageWindow = undefined;
            });
            $('body').append(importWindow.render().$el);

            importWindow.importPsdOnClick();
        });

        newPageWindow.on('add-new-pdf-page', function(){

            var importWindow = WindowFactory.createImportWindow();
            importWindow.on('close-window', function(){
                newPageWindow.close();
                newPageWindow = undefined;
            });
            $('body').append(importWindow.render().$el);

            importWindow.importPdf();
        });

        _that.newPageWindow = newPageWindow;

        $('body').append( newPageWindow.render().$el );
    },


    loadHistoryPage: function(data){

        var _that = this;

        if(!_.isObject(data)){
            return;
        }

        _log('loadHistoryPage', data);

        var action = data.action || {};
        var nowAction = data.nowAction || {};
        var params = nowAction.params || {};
        var pageId = parseInt(params.pageId);

        var pageModel = this.getPageModelByPageId(pageId);

        if(pageModel){

            var page = data.page;

            _log('pageId', pageId, _log.error);
            _log('page.options.pageid', page.options.pageid, _log.error);

            if(page.options.pageid == pageId){
                var newPageModel = ProjectModel.instance.createPageModel(page);

                pageModel.set('options', newPageModel.get('options'), { silent:true });
                pageModel.set('lines', newPageModel.get('lines'), { silent:true });
                

                if(action.login == __meta__.login){
                    
                    pageModel.changesWereMade = false;
                    pageModel.view.setPageAsActive(pageModel);
                    pageModel.changesWereMade = true;

                    pageModel.updateDinamicPageThumb();
                }
            }

            //var nowPageModel = this.getPageModelByPageId(parseInt(nowAction.params.pageId));

            
        }
    },

    loadHistoryProject: function( data ) {

        var _that = this;

        if(!_.isObject(data)){
            return;
        }

        var action = data.action || {};
        var nowAction = data.nowAction || {};
        var params = nowAction.params || {};
        var pageId = parseInt(params.pageId);

        _log('loadHistoryProject', data);
   
        this.model = new ProjectModel({
            options : new ProjectOptions(),
            collection: new PageCollection()
        });

        //ProjectModel.instance = this.model;

        var collection = this.model.onGetProjectData(data);
        this.model.set('collection', collection);

        this.addEventsToCollection();

        this.pagesList.model = this.model;
        this.pagesList.render();
        this.pagesList.afterRender();
        

        var pageModel = this.getPageModelByPageId(pageId) || collection.first();

        if(pageModel){

            if(action.login == __meta__.login){
                
                pageModel.changesWereMade = false;
                pageModel.view.setPageAsActive(pageModel);
                pageModel.changesWereMade = true;

                pageModel.updateDinamicPageThumb();

                StageView.instance.createPageThumb(function(){
                    pageModel.view.render();
                    pageModel.view.afterRender();
                });
            }
        }

        


        // if(firstPageModel){
        //     _that.trigger('hide-modal-window', {pageModel:firstPageModel,collection:collection }, this);
        // }
    },

    pageIsTheSame :function( pageId ){

        return (pageId == StageView.instance.model.get('options').get('pageid'));
    },

    getPageModelByPageId :function(pageId){

        var pageModel;

        this.model.get('collection').each(function(model){
            if(model.get('options').get('pageid') == pageId){

                pageModel =  model;
            }
        });

        return pageModel;
    },

    addEventsToCollection: function() {

        var collection = this.model.get('collection');

        collection.off();
        collection.on('reset add remove', function(){
            DarkanEditorAplicationAPI.getInstance().pagesCollectionChanged({ pagesLength:collection.length });
        });
    },

    

    onStageRender: function(pModel){

        var _that = this;

        _that.triggerView.setModel( pModel.get('options') );
        _that.editorsController.setStageModel(pModel);

    },

    onStageSelected: function(pModel){

        var _that = this;

        setTimeout(function(){
            _that.triggerView.setModel( pModel.get('options') );
            _that.editorsController.setModelToOpenEditors(pModel);
            _that.disableTopMenuButtons(pModel);
        }, 100);
    },

    onComponentSelected: function(cModel){

        var _that = this;

        setTimeout(function(){
            _that.triggerView.setModel(cModel );
            _that.editorsController.setModelToOpenEditors(cModel);
            _that.disableTopMenuButtons(cModel);
        }, 100);
    },

    onComponentsSelected: function(scc){

        var _that = this;

        setTimeout(function(){
            _that.triggerView.setCollection( scc );
            _that.editorsController.setModelToOpenEditors( scc );
            _that.disableTopMenuButtons(scc);
        }, 100);
    },

    disableTopMenuButtons: function(model){
        this.trigger('disable-top-menu-buttons', model);
    },

    updateTimeline: function(){
        // not used
    },

    changeTabEditor: function(params){
        this.editorsController.changeTabEditor(params);
    },

    topMenuAction: function(action){
        switch(action){
            case 'open-existing-project':
                this.openExistingProject();
                break;
            case 'move-components-to-new-layer':
                this.stageView.moveSelectedComponentsToNewLine();
                break;
            case 'duplicate-components':
                this.stageView.duplicateComponents();
                break;
            case 'paste-special-components':
                this.showPasteWindow();
                break;
            case 'paste-components':
                this.stageView.pasteComponents();
                break;
            case 'copy-components':
                this.stageView.copyComponents();
                break;
            case 'cut-components':
                this.stageView.cutComponents();
                break;
            case 'history-prev':
                this.historyPrev();
                break;
            case 'history-back':
                this.historyBack();
                break;
            case 'copy-conponents-from-other-project':
                this.historyBack();
                break;    

                
        }
    },

    historyBack: function(){
        HistoryListView.instance.back();
    },

    historyPrev: function(){
        HistoryListView.instance.prev();
    },

    createPsdPage: function(data){

        this.pagesList.createPsdPage(data);

    },

    showModalWindow: function(){
        this.createNewStartingPageWindow();
    },

    onPageAdded: function(){

        if(this.newPageWindow){
            this.hideModalWindow();
        }
    },

    hideModalWindow: function(){
        this.newPageWindow.close();
    },

    openExistingProject: function(){
       this.trigger('open-existing-project');
    },

    show: function(){

        this.triggerView.show();
        this.$el.show();
    },

    hide: function(){
        this.triggerView.hide();
        this.$el.hide();
    },

    selectProjectView: function(projectModel){
        this.model.trigger('select-project-view', projectModel || ProjectView.instance.model);
    },


    //API
    goToNextPage:function(data, sender){
        
        var pageModel = this.pagesList.getSelectedPageModel();

        var pagesCollection = this.pagesList.getPagesCollection();
        var index = pagesCollection.indexOf(pageModel);
        var nextPageModel = pagesCollection.at(index+1);

        if(nextPageModel){
            this.pagesList.setPageAsActive(nextPageModel);
        }
    },

    goToPrewPage: function(data, sender){

        var pageModel = this.pagesList.getSelectedPageModel();

        var pagesCollection = this.pagesList.getPagesCollection();
        var index = pagesCollection.indexOf(pageModel);
        var nextPageModel = pagesCollection.at(index-1);

        if(nextPageModel){
            this.pagesList.setPageAsActive(nextPageModel);
        }
    },

    goToPage: function(data, sender){

        var pageIndex = parseInt(data.pageIndex);

        if(_.isNaN(pageIndex)){
            return;
        }

        var pagesCollection = this.pagesList.getPagesCollection();

        var nextPageModel = pagesCollection.at(pageIndex);

        if(nextPageModel){
            this.pagesList.setPageAsActive(nextPageModel);
        }
    },

    sortPages: function(data, sender){

        var pageIndex = parseInt(data.pageIndex);
        var position = parseInt(data.position);

        if(_.isNaN(pageIndex)){
            return;
        }

        if(_.isNaN(position)){
            return;
        }

        if(position < 0){
            return;
        }

        if(pageIndex == position){
            return;
        }

        var pagesCollection = this.pagesList.getPagesCollection();

        var pageModel = pagesCollection.at(pageIndex);

        if(!pageModel){
            return;
        }

        var newPageModel = pagesCollection.at(position);

        if(!newPageModel){
            return;
        }

        this.pagesList.updateSort('updateSort', pageModel, position);

    },

    



});