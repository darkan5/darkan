var RightMenuView = Backbone.View.extend({

	el: $('#menu-right'),

    sceneWrapper: $('#scene-wrapper'),
    tiggleIcon: $('.toggle-icon'),

    canEdit : true,
    visible: true,

    events: {
        'click .new-page': 'createNewPage',
        'click .del-pages': 'showDeletePagesWindow',
        //'click .copy-page': 'copyPage',
        'click .copy-page': 'duplicatePages',
        'click .visible-pages': 'changeVisibleAllPages',
        'click .change-titles-pages': 'showChangeTitleWindow',
        'click .select-all-pages': 'selectedAllPages',
        'select-all-pages': 'selectedAllPages',
        'click .menu-right-toggle': 'toggleRightMenu',
        'unselect-all-pages': 'unselectAllPages'
    },

    unselectAllPages: function () {
        this.$el.find('.select-all-pages').removeClass('selected-all-pages');
    },

    toggleRightMenu: function() {
        var _that = this;

        if (this.visible) {
            this.$el.css('width', '5px');
            this.sceneWrapper.css({width: 'calc(100% - 125px)'});
            this.tiggleIcon.css({
                transform: 'rotate(180deg)',
                left: '-20px',
                height: '100px',
                'line-height': '100px'
            });
            this.$el.find('#menu-right-tabs').hide();
            this.visible = false;
        } else {
            this.$el.css('width', '');
            this.sceneWrapper.css({width: ''});
            this.tiggleIcon.css({
                transform: 'rotate(0deg)',
                left: '0px',
                height: '',
                'line-height': ''
            });
            this.$el.find('#menu-right-tabs').show();
            this.visible = true;
        }
    },

    initialize: function(data) {

        var _that = this;

        var projectWatcher = new ProjectWatcherView();
        this.$el.find('#project-watcher').append(projectWatcher.render().$el);

        this.historyListView = new HistoryListView( );
        this.historyListView.on('back', function(model){

        });

        HistoryListView.instance = this.historyListView;

        this.$el.find('#history-list').append(this.historyListView.render().$el);

        this.historyListView.start();

        this.pageListView = new FirstPagesListView( { model:this.model, collection: this.model.get('collection') } );
        this.pageListView.on('onsetpage', function(model){
            _that.canEdit = true;
            _that.trigger('set-page', model, this);

            DarkanEditorAplicationAPI.getInstance().pageSelected();
        });

        this.pageListView.on('on-page-are-created', function(model){

            //var map = _that.pageListView.getMap();
            //_that.model.set('map', map);

            //model.view.setPage();

            _that.pageListView.setActivePageModel( model );

            _that.canEdit = true;
            _that.trigger('set-page', model, this);



        });



        this.pageListView.on('update-sort', function(){
            _that.updateSort();
        });

        this.pageListView.on('update-coming', function(model){
            _that.trigger('update-coming', model, this);
        });

        this.pageListView.on('data-picker-picked', function(model){
            _that.dataPickerPicked( model  );
        });

        this.pageListView.on('on-copy-page', function(data){
            _that.onCopyPage(data);
        });


        this.watchProject();
        this.getAllProjects();

        this.addTitleToButtons();

        this.runMenuTabs();

    },

    runMenuTabs: function(){

        var _that = this;

        var menuRightTabs =  this.$el.find('#menu-right-tabs')

        menuRightTabs.tabs({
            event: "mousedown",
            active: 0,

            activate: function(event, ui) {
                _log('select ui', ui);
                _log('select ui.newTab', ui.newTab);

                if($(ui.newTab).attr('id') == 'rightmenu-tab-0'){

                    _layout.menu_bottom.css('display', 'block');

                    BottomMenuView.instance.showMenu();

                    _that.trigger('set-page', _that.pageListView.getSelectedPageModel(), this);
                }

//                if($(ui.newTab).attr('id') == 'rightmenu-tab-1'){
//                    _that.trigger('set-page', _that.secondPageListView.getSelectedPageModel(), this);
//                }
            },

            create: function(event, ui){

            }
        });
    },

    addTitleToButtons: function(){

        this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'bottom',
            width: 300,
            height: 200
        });
    },


    getAllProjects: function(){

        var _that = this;

        DataAccess.getAllProjectsList(
            {},
            function(data) {

                _that.secondPageListView = new SecondPagesListView( { data:data } );
                //_that.secondPageListView.off('get-project-by-id');
                _that.secondPageListView.on('get-project-by-id', function(data){
                    _that.getProjectById(data);
                });

//                _that.secondPageListView.on('copy-pages', function(data){
//                    _that.copyPages(data);
//                });

                _that.secondPageListView.on('onsetpage', function(model){
                    _that.canEdit = false;
                    _that.trigger('set-second-page', model, this);
                });

                _that.secondPageListView.on('on-copy-page', function(data){

                    _that.goToTab(0);

                    _that.onCopyPage(data);
                });

            },
            function(data) {
                _log('Get All Projects List fault: ', data, _log.dataaccessOutFault);
            }
        );
    },

    goToTab :function(index){
        this.$el.find( "#menu-right-tabs" ).tabs( "option", "active", index );
    },

    copyPages: function(data){

        var _that = this;

          var collection = data.collection;
          var userId = data.userId;
          var projectId = data.projectId;


        DataAccess.copyPage(
            {page: pageModel, component: componentModel, action:"update" },
            function(data) { 
                _log('Update component result: ', data, _log.dataaccessOutResult);
            },
            function(data) { 
                _log('Update component fault: ', data, _log.dataaccessOutFault);
            }
        );
    },

    getProjectById: function(data){

        var _that = this;

        this.model.loadProjectById(
            data,
            function( collection ){

                collection.each(function(pageModel){

                    pageModel.projectId = data.projectId;
                    pageModel.ownerId = data.userId;
                });


                _that.secondPageListView.showList( collection );

            },
            function(){
                _log("Not load project");
            }
        );
    },


    onCopyPage: function(data) {

        var _that = this

        this.enableButtons();

        var pageCollection = this.model.get('collection');

        var oldPageId = data.oldPageId;
        var projectOptions = data.projectOptions;

        var options = data.projectOptions;
        var projectOptionsModel = ProjectModel.instance.get('options');

        for(var item in options){
            projectOptionsModel.set(item, options[item], { silent:true });
        }

        projectOptionsModel.trigger('option-changes-coming', projectOptionsModel);




        var oldPageIndex = pageCollection.length;

        if(oldPageId){

            var oldPageModel = this.pageListView.getPageModelByPageId(oldPageId);
            oldPageIndex = this.pageListView.getPageIndexByPageModel(oldPageModel) + 1;
        }

        for (var i = data.pages.length - 1; i >= 0; i--) {
            var copyPageModel = this.model.createPageModel( data.pages[i] );

            lastPageModel = copyPageModel;

            pageCollection.add(copyPageModel, {at:oldPageIndex});
        };

//        for (var i in data.pages) {
//            var copyPageModel = this.model.createPageModel( data.pages[i] );
//
//            lastPageModel = copyPageModel;
//
//            pageCollection.add(copyPageModel);
//        }

        //var lastPageModel =  pageCollection.last();
        //var lastPageModel =  firstCopiedPageModel;
        this.pageListView.setActivePageModel( lastPageModel );
        this.pageListView.render();

        this.pageListView.selectPageModel( lastPageModel );

        var lastPageId = parseInt(data.lastPageId);
        ProjectModel.instance.get('options').set('last_page_id', lastPageId, {silent:true});

        ProjectModel.instance.calculateAllScoreSuccessPoints();

        this.trigger('set-page', lastPageModel, this);
    },

    clearList: function(){
        this.pageListView.clearList();
    },

    resetList: function(){

        this.clearList();
        this.pageListView.resetList();
    },

    dataPickerPicked: function( model){

        this.trigger('data-picker-picked', model, this);
    },

    render: function(){

		return this;
	},

    updateSort : function(){

        //var map = this.pageListView.getMap();
        //this.model.set('map', map);
    },

    showChangeTitleWindow: function(e) {
        var _that = this;
        var windowPosition = {
            top: e.pageY,
            left: e.pageX
        };

        if(this.pageNameEditorView == undefined){
            this.pageNameEditorView = new PageNameWindowView({ pageCollection: this.model.get('collection') });
            this.pageNameEditorView.on('on-close', function(){
                _that.pageNameEditorView = undefined;
            });

            var dataToRender = { componentModel: this.model };

            $('body').append( this.pageNameEditorView.render(dataToRender).$el );
            this.pageNameEditorView.setWindowPosition(windowPosition);
        }
    },

    selectedAllPages: function() {
        var pagesCollection = this.model.get('collection');
        var setActive = true;
        var _act = true;
        var _uni = true;

        pagesCollection.each(function(childModel, index) {

            if (index == 0) {
                _act = childModel.isSelected;
            }

            if (_uni && _act !== childModel.isSelected) {
                _uni = false;
            }

        });

        if (_uni) {

            if (_act == false)
                setActive = true;
            else
                setActive = false;
        }

        if (setActive) {
            this.$el.find('.select-all-pages').addClass('selected-all-pages');
        } else {
            this.$el.find('.select-all-pages').removeClass('selected-all-pages');
        }

        pagesCollection.each(function(childModel) {

            childModel.isSelected = setActive;

            childModel.setCheckboxSelected(setActive);

        });
    },

    changeVisibleAllPages: function() {

        var _that = this;

        var pagesCollection = this.model.get('collection');
        var setActive = 1;
        var _act = 0;
        var _uni = true;
        var first = true;

        pagesCollection.each(function(childModel, index) {
            if (childModel.isSelected) {

                var options = childModel.get('options');

                if (first) {
                    _act = options.get('active');
                }

                if (_uni && _act !== options.get('active')) {
                    _uni = false;
                }

                first = false;
            }

        });

        if (_uni) {

            if (_act == 0)
                setActive = 1;
            else
                setActive = 0;
        }

        var selectedPagesOptions = [];

        pagesCollection.each(function(childModel) {

            if (childModel.isSelected) {
                var options = childModel.get('options');

                options.onlyRefresh = true;
                options.set('active', setActive);
                options.onlyRefresh = false;

                selectedPagesOptions.push(options.toJSON());
            }
        });

        _log('selectedPagesOptions', selectedPagesOptions);

        if(selectedPagesOptions.length == 0 ){
            return;
        }

        var shortedPagesOptions = _.map(selectedPagesOptions, function(o) {
            return _.pick(o, "active", "pageid");
        });

        this.disableButtons();

        DataAccess.updatePagesOptions(
            { pagesOptions:shortedPagesOptions },
            function(data){
                _log('Update pages options result:', data, _log.dataaccessOutResult);

                _that.enableButtons();
            },
            function(data){
                _log('Update pages options fault:', data, _log.dataaccessOutFault);

                _that.enableButtons();
            }
        );
    },

    duplicatePages: function(){

        var _that = this;

        var pageCollection = this.model.get('collection');

        var pageIdsListToCopy = this.pageListView.getIdsFromSelectedPages( pageCollection );

        if(pageIdsListToCopy.length > 0){
            this.disableButtons();
        }

        _log('pageIdsListToCopy', pageIdsListToCopy);

        DataAccess.duplicatePages(
            { pagesIds:pageIdsListToCopy },
            function(data){
                _log('Duplicate pages result:', data, _log.dataaccessOutResult);

                _that.onPagesDuplicatedResult(data); 

                _that.enableButtons();
            },
            function(data){
                _log('Duplicate pages fault:', data, _log.dataaccessOutFault);

                _that.enableButtons();
            }
        );
    },

    onPagesDuplicatedResult : function(data){

        var newPagesCollction = data.newPagesCollction;
        var oldPageIndex = parseInt(data.oldPageIndex);

        if(!_.isNumber(oldPageIndex)){
            return;
        }

        if(!_.isArray(newPagesCollction)){
            return;
        }

        var pageCollection = this.model.get('collection');

        for (var i = newPagesCollction.length - 1; i >= 0; i--) {
            var page = newPagesCollction[i];

            var pageModel = ProjectModel.instance.createPageModel(page);

            if(pageModel){
                pageCollection.add(pageModel, {at:oldPageIndex});
            }
        };

        this.pageListView.render();
    },


    copyPage : function(){
        var _that = this;

        

        var pageCollection = this.model.get('collection');

        var pageIdsListToCopy = this.pageListView.getIdsFromSelectedPages( pageCollection );

        if(pageIdsListToCopy.length > 0){
            this.disableButtons();
        }

        _that.pageListView.addCopyPage( pageIdsListToCopy );
    },

    disableButtons: function(){

        this.capabilitiesParmasList = [
            { value:false, identifier:'.new-page'},
            { value:false, identifier:'.del-pages'},
            { value:false, identifier:'.copy-page'},
            { value:false, identifier:'.visible-pages'},
            { value:false, identifier:'.change-titles-pages'},
            { value:false, identifier:'.select-all-pages'},
            { value:false, identifier:'.unselect-all-pages'},
        ];

        var deletePageEventsVisitor = DeletePageEventsVisitor.getInstance();
        this.accept(deletePageEventsVisitor);
    },

    enableButtons: function(){

        this.capabilitiesParmasList = [
            { value:true, identifier:'.new-page', fun:'createNewPage'},
            { value:true, identifier:'.del-pages', fun:'showDeletePagesWindow'},
            { value:true, identifier:'.copy-page', fun:'duplicatePages'},
            { value:true, identifier:'.visible-pages', fun:'changeVisibleAllPages'},
            { value:true, identifier:'.change-titles-pages', fun:'showChangeTitleWindow'},
            { value:true, identifier:'.select-all-pages', fun:'selectedAllPages'},
            { value:true, identifier:'.unselect-all-pages', fun:'unselectAllPages'},
        ];

        var addEventsVisitor = AddEventsVisitor.getInstance();
        this.accept(addEventsVisitor);
    },


    accept: function(visitor) {
        visitor.visit(this);
    },


    showDeletePagesWindow: function(e) {
        var _that = this;
        var windowPosition = {
            top: e.pageY,
            left: e.pageX
        };

        var pagesToDel = 0;
        var pageCollection = this.model.get('collection');

        pageCollection.each(function(model) {
            if (model.isSelected) {
                pagesToDel++;
            }
        });

        if(this.pageNameEditorView == undefined){
            this.pageNameEditorView = new DeletePagesWindowView();
            this.pageNameEditorView.on('on-close', function(){
                _that.pageNameEditorView = undefined;
            });

            this.pageNameEditorView.on('delete-pages', function(pagesIds){
                _that.deletePages();
            });


            var dataToRender = { componentModel: this.model, pagesToDel: pagesToDel };

            $('body').append( this.pageNameEditorView.render(dataToRender).$el );
            this.pageNameEditorView.setWindowPosition(windowPosition);
        }
    },

    deletePages: function() {

        var _that = this;

        var pagesIds = [];

        var pageCollection = this.model.get('collection');
        pageCollection.each(function(model) {
            if (model.isSelected) {
                pagesIds.push(model.get('options').get('pageid'));
            }
        });

        if(pagesIds.length == 0){
             return;
        }

        this.disableButtons();

        DataAccess.deletePages(
            {
                pagesIds:pagesIds 
            },
            function(data) { 

                _log('Delete page successed: ' , data, _log.dataaccessOutResult);

                _that.enableButtons();

                _that.onPagesDeletedResult(data); 

                DarkanEditorAplicationAPI.getInstance().pagesRemoved({ pagesLength:_that.pageListView.getPagesLength() });
                
            },
            function(data) {

                _log('Delete page failed: ' , data, _log.dataaccessOutFault);

                _that.enableButtons(); 
            }
        );
    },

    onPagesDeletedResult: function(data) {

        var _that = this;

        var deletedPages = data.deletedPages;

        var pageCollection = this.model.get('collection');

        var newSelectedPageModel;

        for (var i = 0; i < deletedPages.length; i++) {
            var pageId = deletedPages[i];
            var pageModel = this.getPageModelByPageId(pageId);

            if(pageModel){

                var index = pageCollection.indexOf(pageModel);

                pageCollection.remove(pageModel);
                pageModel.view.destroy();

                newSelectedPageModel = pageCollection.at(index-1);
            }
        };

        if(pageCollection.length == 0){
            this.trigger('show-modal-window', undefined, this);
            return;
        }

        var firstPageModel = newSelectedPageModel || pageCollection.first();
        this.pageListView.setActivePageModel(firstPageModel);
        this.trigger('set-page', firstPageModel, this);
    },

    onPagesDeletedComingResult: function(data) {

        var _that = this;

        var deletedPages = data.deletedPages;

        var pageCollection = this.model.get('collection');

        

        for (var i = 0; i < deletedPages.length; i++) {
            var pageId = deletedPages[i];
            var pageModel = this.getPageModelByPageId(pageId);

            if(pageModel){

                pageCollection.remove(pageModel);
                pageModel.view.destroy();
            }
        };

        if(pageCollection.length == 0){
            this.trigger('show-modal-window', undefined, this);
            return;
        }

        var newSelectedPageModel = this.pageListView.getActivePage( User.getModel().get('activePageId') );
        this.pageListView.selectedPageModel = newSelectedPageModel;

        var firstPageModel = newSelectedPageModel || pageCollection.first();
        this.pageListView.setActivePageModel(firstPageModel);
        this.trigger('set-page', firstPageModel, this);
    },

    // deletePage: function( model, selectedPageModel ) {

    //     var _that = this;

    //     if(selectedPageModel){
    //          this.disableButtons();   
    //     }

    //     model.isDeleted = true;

    //     var firstPageModel = this.pageListView.deletePage( 
    //             model, 
    //             selectedPageModel, 
    //             function(){
    //                 _that.enableButtons();
    //             },
    //             function(){
    //                 _that.enableButtons();
    //             }
    //         );

    //     //var map = this.pageListView.getMap();
    //     //this.model.set('map', map);

    //     if(firstPageModel != undefined){

    //         this.pageListView.setActivePageModel(firstPageModel);
    //         this.trigger('set-page', firstPageModel, this);
    //     }else{
    //         this.trigger('show-modal-window', firstPageModel, this);
    //     }

    //     this.trigger('delete-page');
    // },

	createNewPage: function( ) {

        var _that = this;

        this.disableButtons();

        var newPageModel = ProjectModel.instance.createNewPageModel();

        this.pageListView.addNewBlankPage( newPageModel, undefined, function(){
            _that.enableButtons();
        });
    },

    addEventsToCollection: function() {

        var collection = this.model.get('collection');

        collection.off();
        collection.on('reset add remove', function(){
            DarkanEditorAplicationAPI.getInstance().pagesCollectionChanged({ pagesLength:collection.length });
        });
    },

    loadProject: function(  ) {

        var _that = this;

        this.model = new ProjectModel({
                options : new ProjectOptions(),
                collection: new PageCollection()
        });

        ProjectModel.instance = this.model;

        this.model.loadProject(
            function( collection ){

                var firstPageModel = collection.first();

                _that.model.set('collection', collection);

                _that.addEventsToCollection();

                _that.pageListView.loadProject( collection, firstPageModel );

                _log('collection', collection);

                if(firstPageModel == undefined){
                    _that.trigger('show-modal-window', firstPageModel, this);
                }else{
                    _that.trigger('set-page', firstPageModel, this);
                }


                DarkanEditorAplicationAPI.getInstance().projectLoaded({ pagesLength:collection.length });

                DarkanEditorAplicationAPI.getInstance().pagesCollectionChanged({ pagesLength:collection.length });

            },
            function(){
                console.log("Not load project");
            }
        );

    },

    loadHistoryPage: function(data){

        var _that = this;

        if(!_.isObject(data)){
            return;
        }

        _log('loadHistoryPage', data);

        var action = data.action || {};
        var params = action.params || {};
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

                if(this.pageIsTheSame(pageId)){
                    this.trigger('set-page', pageModel, this);
                }
            }
        }
    },

    loadHistoryProject: function( data ) {

        var _that = this;

        if(!_.isObject(data)){
            return;
        }

        var action = data.action || {};
        var params = action.params || {};
        var pageId = parseInt(params.pageId);

        _log('loadHistoryProject', action);

             
        this.model = new ProjectModel({
            options : new ProjectOptions(),
            collection: new PageCollection()
        });

        ProjectModel.instance = this.model;

        var collection = this.model.onGetProjectData(data);
        _that.model.set('collection', collection);

        var firstPageModel = collection.first();

        if(_.isNumber(pageId)){
            var pageModel = this.getPageModelByPageId(pageId);

            if(pageModel){
                firstPageModel = pageModel;
            }
        }


        _that.addEventsToCollection();

        _that.pageListView.loadProject( collection, firstPageModel );

        _log('firstPageModel', firstPageModel);

        _that.trigger('set-page', firstPageModel, this);

        if(firstPageModel){
            _that.trigger('hide-modal-window', {pageModel:firstPageModel,collection:collection }, this);
        }
    },

    pageIsTheSame :function( pageId ){

        return (pageId == StageView.instance.model.get('options').get('pageid') && StageView.instance.canEdit);
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

    updateProjectOptions: function( options ){

        var projectOptionsModel = ProjectModel.instance.get('options');

        for(var item in options){
            projectOptionsModel.set(item, options[item], { silent:true });
        }

        projectOptionsModel.trigger('option-changes-coming', projectOptionsModel);
    },


    watchProject: function(){

        var _that = this;

        return;

        DataAccess.watchProject(
            this.model,
            function(data) {

                var fileName =  data.name ;
                var event =  data.event ;


                switch (event){
                    case 'createBlankPage':



                        var page = data.page;
                        var pageModel = _that.model.createPageModel( page );

                        var lastPageId = parseInt(data.lastPageId);
                        ProjectModel.instance.get('options').set('last_page_id', lastPageId, {silent:true});


                        var collection = _that.pageListView.createBlankPageComing( pageModel, data );

                        if(collection.length > 0){
                            _that.trigger('hide-modal-window', {pageModel:pageModel,collection:collection }, this);
                        }

                        if(collection.length == 1){
                            _that.pageListView.setActivePageModel(pageModel);
                        }

                        break;

                    case 'updatePage':

                        var page = data.page;
                        var pageModel = _that.model.createPageModel( page );

                        _that.pageListView.updatePageModelComing( pageModel );

                        _that.trigger('update-coming', pageModel, this);


                        break;

                    // case 'deletePage':

                    //     var pageId = parseInt( data.pageId );

                    //     var selectedPageModel = _that.pageListView.deletePageFromListComing( pageId );


                    //     if(selectedPageModel == undefined){
                    //         _that.trigger('show-modal-window', {}, this);
                    //     }else{

                    //         selectedPageModel.view.setPage();

                    //         _that.pageListView.setActivePageModel( selectedPageModel );

                    //         _that.trigger('set-page', selectedPageModel, this);
                    //     }
                    //     break;

                     case 'deletePages':

                   

                        var selectedPageModel = _that.onPagesDeletedComingResult(data);

                        // var pageId = parseInt( data.pageId );

                        //var selectedPageModel = _that.pageListView.deletePageFromListComing( pageId );


                        // if(selectedPageModel == undefined){
                        //     _that.trigger('show-modal-window', {}, this);
                        // }else{

                        //     selectedPageModel.view.setPage();

                        //     _that.pageListView.setActivePageModel( selectedPageModel );

                        //     _that.trigger('set-page', selectedPageModel, this);
                        // }
                        break;   

                    case 'copyPage':

                        var pages = data.pages;

                        
                        _that.updateProjectOptions( data.projectOptions );


                        var lastPageId = parseInt(data.lastPageId);
                        ProjectModel.instance.get('options').set('last_page_id', lastPageId, {silent:true});


                        var collection = _that.pageListView.addCopyPageComing( data );

                        if(collection){
                            if(collection.length == 1){

                                _that.trigger('hide-modal-window', pageModel, this);
                                _that.pageListView.setActivePageModel(pageModel);
                            }
                        }


                        break;

                    case 'updatePageSort':

                        _that.pageListView.updatePageSortComing( data );

                        break;

                    case 'saveProjectOptions':

                        var options = data.options;

//                        var projectOptionsModel = _that.model.createProjectOptionsModel( options );
//                        _that.model.setProjectOptionsModel( projectOptionsModel );

                        // var projectOptionsModel = ProjectModel.instance.get('options');

                        // for(var item in options){
                        //     projectOptionsModel.set(item, options[item], { silent:true });
                        // }

                        // projectOptionsModel.trigger('option-changes-coming', projectOptionsModel);

                        _that.updateProjectOptions( data.options );

                        break;

                    case 'updatePageOptions':

                    _log('updatePageOptions', 'updatePageOptions');


                        var pageId = data.pageId;

                        if(_that.canEdit){

                            var page = data.page;
                            var imageChnged = false;
                            var bgcolorChnged = false;

                            if( page != undefined){

                                var pageOptions = data.page.options;

                                var pageModel = RightMenuView.instance.getPageModelByPageId(pageOptions.pageid);

                                if(pageModel != undefined){

                                    var pageOptionsModel = pageModel.get('options');

                                    if( pageOptionsModel.get('image') != pageOptions.image){
                                        imageChnged = true;
                                    }

                                    if( pageOptionsModel.get('bgcolor') != pageOptions.image){
                                        bgcolorChnged = true;
                                    }

                                    pageOptionsModel.onlyRefresh = true;

                                    for(var item in pageOptions){
                                        pageOptionsModel.set(item, pageOptions[item]);
                                    }

                                    pageOptionsModel.onlyRefresh = false;



                                    pageModel.view.renderSelectedBy();

                                    if(_that.canEdit && User.getModel().get('activePageId').toString() == pageId.toString()){

                                        if( imageChnged){

                                            StageView.instance.renderBackgroundImage();
                                            pageModel.updateDinamicPageThumb();
                                        }

                                        if( bgcolorChnged){

                                            StageView.instance.renderBackgroundColor();
                                            pageModel.updateDinamicPageThumb();
                                        }

                                    }

                                }

                            }else{
                                console.log("Critical error - coming page = " + page);
                            }

                            if(User.getModel().get('activePageId').toString() == pageId.toString()){


                                //_that.trigger('update-page-options-coming', data, this);
                            }

                        }

                        break;

                    case 'updateComponent':


                        var pageId = data.pageId;

                        _that.updateProjectOptions( data.projectOptions );

                        if(!_that.canEdit || User.getModel().get('activePageId').toString() != pageId.toString()){

                            var page = data.page;

                            if( page != undefined){
                                var newPageModel = _that.model.createPageModel( page );

                                var actualPageModel = _that.pageListView.updatePageModelComing( newPageModel );

                            }else{
                                console.log("Critical error - coming page = " + page);
                            }

                        }else{


                            _that.trigger('update-component-coming', data, this);

                        }


                        var options = data.projectOptions;

                        var projectOptionsModel = ProjectModel.instance.get('options');

                        for(var item in options){
                            projectOptionsModel.set(item, options[item], { silent:true });
                        }

                        projectOptionsModel.trigger('option-changes-coming', projectOptionsModel);

                        break;

                    case 'updateTimeline':

                        var pageId = data.pageId;

                        if(!_that.canEdit || User.getModel().get('activePageId').toString() != pageId.toString()){

                            var page = data.page;

                            if( page != undefined){
                                var newPageModel = _that.model.createPageModel( page );

                                _that.pageListView.updatePageModelComing( newPageModel );

                            }else{
                                console.log("Critical error - coming page = " + page);
                            }

                        }else{


                            _that.trigger('update-timeline-coming', data, this);
                        }

                        break;

                    case 'updateTimelineOptions':

                        var pageId = data.pageId;
                        var timelineOptions = data.timelineOptions;
                        var lineId = parseInt( timelineOptions.id );

                        var pageModel = _that.model.get('collection').getPageModelByPageId(pageId);


                        var rowModel = pageModel.get('lines').getLineById(lineId);
                        var lineOptions = rowModel.get('options');

                        for (var opt in timelineOptions) {
                            lineOptions.set(opt, timelineOptions[opt]);
                        }

                        //rowModel.set('options', timelineOptions);

                        rowModel.updateOptionComing(timelineOptions);


                        break;

                    case 'updateCopyComponents':

                        var pageId = data.pageId;

                        _that.updateProjectOptions( data.projectOptions );

                        if(!_that.canEdit || User.getModel().get('activePageId').toString() != pageId.toString()){

                            var page = data.page;

                            if( page != undefined){
                                var newPageModel = _that.model.createPageModel( page );

                                _that.pageListView.updatePageModelComing( newPageModel );


                            }else{
                                console.log("Critical error - coming page = " + page);
                            }

                        }else{


                            _that.trigger('update-add-components-coming', data, this);
                        }

                        break;

                    case 'clearProject':

                        StageView.instance.clearStage();
                        _that.clearList();

                        _that.trigger('show-modal-window', {}, this);

                        //ProjectModel.instance = new ProjectModel.({ options: new ProjectOptions(), collection: new ComponentCollection() });



                    case 'saveHistory':

                        var pageId = data.pageId;

                        var page = data.page;

                        if( page != undefined){

                            var newPageModel = _that.model.createPageModel( page );

                            _that.pageListView.updatePageModelComing( newPageModel );

                            if( User.getModel().get('activePageId').toString() == pageId.toString()){

                                _that.trigger('set-page', newPageModel, _that);

                            }

                        }else{
                            console.log("Critical error - coming page = " + page);
                        }

                        break;



                    case 'updatePageThumb':

                        if(_that.canEdit){

                            var pageId = data.pageId;

                            var pageModel = RightMenuView.instance.getPageModelByPageId(pageId);

                            if(User.getModel().get('activePageId').toString() != pageId.toString()){

                                if(pageModel != undefined){
                                    pageModel.updatePagethumb();
                                }
                            }
                        }

                        break;

                    case 'userDisconnected':

                        _log('userDisconnected');

                        var login = data.login;

                        _that.pageListView.unsetAllPagesComing(login);

                        _log('login', login);

                        break;

                }

            },
            function(data) {
                console.log('On project chenged fault: ' , data);

                var status = data.status;

                switch (status){
                    case 'no-files':

                        console.log("No files");

                        break;
                }
            }
        );
    },

    updateProjectOptions: function(options){

    },

    createPsdPage: function(data){

        var _that = this;

        var page = data.page;
        var pageModel = _that.model.createPageModel( page );

        if(pageModel){
            var lastPageId = parseInt(data.lastPageId);
            ProjectModel.instance.get('options').set('last_page_id', lastPageId, {silent:true});


            var collection = _that.pageListView.createBlankPageComing( pageModel );

            _log('createPsdPage collection', collection)

            if(collection.length > 0){

                _that.pageListView.setActivePageModel( pageModel );

                _that.trigger('set-page', pageModel, this);

                pageModel.view.updateDinamicPageThumb();
            }
        }

    },

    goToNextPage: function(data){

        var pageModel = this.pageListView.getSelectedPageModel();

        var index = this.pageListView.collection.indexOf(pageModel);
        var nextPageModel = this.pageListView.collection.at(index+1);

        if(nextPageModel){
            this.pageListView.setActivePageModel(nextPageModel);
            this.trigger('set-page', nextPageModel, this);
        }

    },

    goToPrewPage: function(data){

        var pageModel = this.pageListView.getSelectedPageModel();

        var index = this.pageListView.collection.indexOf(pageModel);
        var nextPageModel = this.pageListView.collection.at(index-1);

        if(nextPageModel){
            this.pageListView.setActivePageModel(nextPageModel);
            this.trigger('set-page', nextPageModel, this);
        }

    },

    goToPage: function(data){

        var pageIndex = parseInt(data.pageIndex);

        var nextPageModel = this.pageListView.collection.at(pageIndex);

        if(nextPageModel){
            this.pageListView.setActivePageModel(nextPageModel);
            this.trigger('set-page', nextPageModel, this);
        }

    }

});


RightMenuView.instance = {};
