var EditablePagesList = PagesList.extend({


	template: _.template($('#pages-list-template').html()),
	templateEmpty: _.template($('#pages-empty-list-template').html()),


	events: {
		'click .new-page': 'createNewPage',
        'click .del-pages': 'showDeletePagesWindow',
        //'click .copy-page': 'copyPage',
        'click .copy-page': 'duplicatePages',
        'click .visible-pages': 'changeVisibleAllPages',
        'click .change-titles-pages': 'showChangeTitleWindow',
        'click .select-all-pages': 'selectedAllPages',
        'select-all-pages': 'selectedAllPages',
        'click .toggle-icon': 'toggleRightMenu',
        'unselect-all-pages': 'unselectAllPages',

        'update-sort': 'updateSort',
        'copy-page-trigger': 'copyTrigger',
        'on-paste-page-trigger': 'onPasteTrigger',
	},

	initialize: function( ) {
    	this.startListenOnSelectPageByUser();
  	},


    renderOnePage: function(model){
        var pageItem = new EditablePageItem({ model:model });
        model.view = pageItem;
        pageItem.on('on-page-set-as-active', this.onSetPageAsActive, this);
        pageItem.on('change-tab-editor', this.changeTabEditor, this);
        pageItem.on('data-picker-picked', this.dataPickerPicked, this);
        this.$el.find('.pages').append(pageItem.render().$el);
        pageItem.afterRender();
    },

    dataPickerPicked : function(model){
        this.trigger('data-picker-picked', model, this);
    },

    changeTabEditor: function(params){

        this.trigger('change-tab-editor', params);
    },

    addPlusButton: function(){
        var newPagePlusButton = new NewPagePlusButton();
        newPagePlusButton.on('add-new-page', this.createNewPageAtLast, this);
        this.$el.find('.pages').append(newPagePlusButton.render().$el);
        newPagePlusButton.afterRender();
    },

    setFirstPageAsActive: function(){
        
        var firstPageModel = this.model.get('collection').first();

        if(firstPageModel){
            firstPageModel.view.setPageAsActive();
        }
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

    

    createNewPageAtLast: function( ) {

        var _that = this;

        var newPageModel = ProjectModel.instance.createNewPageModel();

        var oldPageId;

        var lastPageModel = this.model.get('collection').last();

        if(lastPageModel){
            oldPageId = lastPageModel.get('options').get('pageid');
        }

        this.addNewPage(
            newPageModel, 
            function(){
                _that.render();
                _that.afterRender();
            }, 
            function(){

            },
            oldPageId
        );
    },

    createNewPage: function( ) {

        var _that = this;

        var newPageModel = ProjectModel.instance.createNewPageModel();

        this.addNewPage(
            newPageModel, 
            function(){
                _that.render();
                _that.afterRender();
            }, 
            function(){

            }
        );
    },

    addNewPage: function( newPageModel, onResult, onFault, oldPageId ) {

        var _that = this;

        this.disableButtons();

        var oldPageId = oldPageId == undefined ? this.getSelectedPageModelPageId() : oldPageId;

        DataAccess.createBlankPage(
            {oldPageId:oldPageId, page:newPageModel},
            function(data) {

                _log('Create page successed: ', data, _log.dataaccessOutResult);
                
                var pageModel = _that.onCreateBlankPage(data);

                _that.selectedPageModel = pageModel;

                onResult( pageModel );

                _that.setPageAsActive(pageModel);

                DarkanEditorAplicationAPI.getInstance().pageAdded({ page:pageModel.toJSON(), pagesLength:_that.getPagesLength() });
                DarkanEditorAplicationAPI.getInstance().pagesCollectionChanged({ pagesLength:_that.getPagesLength() });

                _that.enableButtons();

            },
            function(data) {
                console.log('Create page failed: ' , data, _log.dataaccessOutFault);
                onFault( data );

                _that.enableButtons();
            }
        );
    },

    addNewPdfPage: function( newPageModel, onResult, onFault, oldPageId ) {

        var _that = this;

        this.disableButtons();

        var oldPageId = oldPageId == undefined ? this.getSelectedPageModelPageId() : oldPageId;

        DataAccess.createBlankPage(
            {oldPageId:oldPageId, page:newPageModel},
            function(data) {

                _log('Create page successed: ', data, _log.dataaccessOutResult);
                
                var pageModel = _that.onCreateBlankPage(data);

                onResult( pageModel );

                DarkanEditorAplicationAPI.getInstance().pageAdded({ page:pageModel.toJSON(), pagesLength:_that.getPagesLength() });
                DarkanEditorAplicationAPI.getInstance().pagesCollectionChanged({ pagesLength:_that.getPagesLength() });

                _that.enableButtons();

            },
            function(data) {
                console.log('Create page failed: ' , data, _log.dataaccessOutFault);
                onFault( data );

                _that.enableButtons();
            }
        );
    },

    getSelectedPageModelPageId :function(){
        return this.selectedPageModel == undefined ? undefined : this.selectedPageModel.get('options').get('pageid');
    },

    onCreateBlankPage :function( data ){

        var _that = this;

        var pageModel = ProjectModel.instance.createPageModel( data.page );

        var lastPageId = parseInt(data.lastPageId);
        ProjectModel.instance.get('options').set('last_page_id', lastPageId, {silent:true});

        var oldPageId = data.oldPageId;

        if(oldPageId != undefined){

            var oldPageIndex = data.oldPageIndex;

            this.model.get('collection').add(pageModel, {at:oldPageIndex});

        }else{
            this.model.get('collection').add(pageModel);
        }

        _log('collection', this.model.get('collection').toJSON());

        this.trigger('on-page-added', _that);

        return pageModel;
    },

    onCreateBlankPageComing :function( data ){

        var _that = this;

        var pageModel = ProjectModel.instance.createPageModel( data.page );

        var lastPageId = parseInt(data.lastPageId);
        ProjectModel.instance.get('options').set('last_page_id', lastPageId, {silent:true});

        var oldPageId = data.oldPageId;

        if(oldPageId != undefined){

            var oldPageIndex = data.oldPageIndex;

            this.model.get('collection').add(pageModel, {at:oldPageIndex});

        }else{
            this.model.get('collection').add(pageModel);
        }

        _log('collection', this.model.get('collection').toJSON());


        if(this.model.get('collection').length == 1){
            this.selectedPageModel = pageModel;
            this.setPageAsActive(pageModel);   
        }

        DarkanEditorAplicationAPI.getInstance().pageAdded({ page:pageModel.toJSON(), pagesLength:_that.getPagesLength() });
        DarkanEditorAplicationAPI.getInstance().pagesCollectionChanged({ pagesLength:_that.getPagesLength() });

        this.trigger('on-page-added', _that);

        return pageModel;
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

                DarkanEditorAplicationAPI.getInstance().pagesRemoved({ pagesLength:_that.getPagesLength() });
                DarkanEditorAplicationAPI.getInstance().pagesCollectionChanged({ pagesLength:_that.getPagesLength() });
                
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
        this.setPageAsActive(firstPageModel);
    },

    duplicatePages: function(){

        var _that = this;

        var pageCollection = this.model.get('collection');

        var pageIdsListToCopy = this.getIdsFromSelectedPages( pageCollection );

        if(pageIdsListToCopy.length == 0){
            return;
        }

        var oldPageId = this.getSelectedPageModelPageId();

        this.disableButtons();

        _log('pageIdsListToCopy', pageIdsListToCopy);

        DataAccess.duplicatePages(
            { pagesIds:pageIdsListToCopy, oldPageId:oldPageId },
            function(data){
                _log('Duplicate pages result:', data, _log.dataaccessOutResult);

                _that.onPagesDuplicatedResult(data); 

                _that.enableButtons();
            },
            function(data){
                _log('Duplicate pages fault:', data, _log.dataaccessOutFault);

                _that.showPupup({ content:_lang('DUPLICATE_PAGES_FAULT'), title: _lang('MODAL_INFO_ERROR') }, _that);

                _that.enableButtons();
            }
        );
    },

    onPagesDuplicated : function(data){

        var newPagesCollction = data.pages;
        var oldPageIndex = parseInt(data.oldPageIndex);

        if(!_.isNumber(oldPageIndex)){
            return;
        }

        if(!_.isArray(newPagesCollction)){
            return;
        }

        var pageCollection = this.model.get('collection');

        var duplicatedPagesCollection = new PageCollection();

        for (var i = newPagesCollction.length - 1; i >= 0; i--) {
            var page = newPagesCollction[i];

            var pageModel = ProjectModel.instance.createPageModel(page);

            if(pageModel){
                pageCollection.add(pageModel, {at:oldPageIndex});
                duplicatedPagesCollection.add(pageModel);
            }
        };
        
        this.render();
        this.afterRender();

        return duplicatedPagesCollection.first() || pageCollection.first();
    },

    onPagesDuplicatedResult : function(data){
        var pageModel = this.onPagesDuplicated(data);
        this.setPageAsActive(pageModel);
    },

    onPagesDuplicatedResultComing : function(data){
        this.onPagesDuplicated(data);
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

    showChangeTitleWindow: function(e) {
        var _that = this;
        var windowPosition = {
            top: e.pageY,
            left: e.pageX
        };

        if(this.pageNameEditorView == undefined){
            this.pageNameEditorView = new PageNameWindowView({ pageCollection: this.model.get('collection') });
            this.pageNameEditorView.on('on-pages-title-changed', this.onPagesTitleChanged, this);
            this.pageNameEditorView.on('on-close', function(){
                _that.pageNameEditorView = undefined;
            });

            var dataToRender = { componentModel: this.model };

            $('body').append( this.pageNameEditorView.render(dataToRender).$el );
            this.pageNameEditorView.setWindowPosition(windowPosition);
        }
    },

    onPagesTitleChanged: function(selectedPagesOptions){

        var _that = this;

        _log('selectedPagesOptions', selectedPagesOptions);

        if(selectedPagesOptions.length == 0 ){
            return;
        }

        var shortedPagesOptions = _.map(selectedPagesOptions, function(o) {
            return _.pick(o, "pagename", "pageid");
        });

        this.disableButtons();

        DataAccess.updatePagesOptions(
            { pagesOptions:shortedPagesOptions },
            function(data){
                _log('Update pages options result:', data, _log.dataaccessOutResult);

                _that.render();
                _that.afterRender();

                _that.enableButtons();
            },
            function(data){
                _log('Update pages options fault:', data, _log.dataaccessOutFault);

                _that.enableButtons();
            }
        );

    },

    makeSortable: function(){

        this.$el.find('.pages').sortable({
            delay: 50,
            update: function(event, ui) {
                ui.item.trigger('drop-item', ui.item.index());
            }
        });
    },

    onPasteTrigger: function(event, model){

        if(this.selectedPageModel.cid == model.cid){
            this.trigger('onsetpage', model  );
        }
    },

    copyTrigger: function(event, model){

        this.copiedPageTrigger = JSON.stringify(model.toJSON().options.triggers);
    },

    updatePageSortComing: function( data ){

        var _that = this;

        this.onUpdatePageSortResult(data);

        this.render();

    },

    updateSort: function(event, pageModel, position) {

        var _that = this;

        //var pages = this.getPagesMap();

        //this.trigger('update-sort');

        var pageId = pageModel.get('options').get('pageid');

        var position = parseInt(position);

        if(_.isNaN(position)){
            return;
        }

        DataAccess.updatePageSort(
            { pageId:pageId, position:position },
            function(data) { 
                _log('Update page successed: ' , data, _log.dataaccessOutResult); 

                _that.model.get('collection').remove( pageModel );
                _that.model.get('collection').add(pageModel, {at: position});

                _that.render();
                _that.afterRender();

            },
            function(data) { 
                _log('Update page failed: ' , data, _log.dataaccessOutFault); 

                _that.render();
                _that.afterRender();
            }
        );
    },

    onUpdatePageSortResult: function(data){

        var pageId = parseInt(data.pageId);
        var position = parseInt(data.position);

        if(!_.isNumber(pageId)){
            return;
        }

        if(!_.isNumber(position)){
            return;
        }

        var pageModel = this.getPageModelByPageId(pageId);

        if(!pageModel){
            return;
        }

        this.model.get('collection').remove( pageModel );
        this.model.get('collection').add(pageModel, {at: position});

        this.render();
        this.afterRender();
    },

    copyPagesFromOtherProject: function( pageIds, userId, projectId ){

        var _that = this;

        if(pageIds.length == 0){
            return;
        }

        this.disableButtons();

        var oldPageId = this.getSelectedPageModelPageId();

        // DataAccess.copyPage(
        //     { pageListToCopy: pageIds, sourceUserId:userId, sourceProjectId:projectId, oldPageId:oldPageId },
        //     function(data) { 

        //         _log('Copy page result:', data, _log.dataaccessOutResult);

        //         _that.onCopyPagesFromOtherProject(data);

        //         _that.enableButtons();
        //     },
        //     function(data){
        //         _log('Copy page fault:', data, _log.dataaccessOutFault);
        //         _that.enableButtons();
        //     }
        // );

        DataAccess.duplicatePagesFromOtherProject(
            { pagesIds: pageIds, sourceUserId:userId, sourceProjectId:projectId, oldPageId:oldPageId },
            function(data) { 

                _log('Copy page result:', data, _log.dataaccessOutResult);

                _that.onCopyPagesFromOtherProjectResult(data);

                _that.enableButtons();
            },
            function(data){
                _log('Copy page fault:', data, _log.dataaccessOutFault);

                _that.showPupup({ content:_lang('DUPLICATE_PAGES_FAULT'), title: _lang('MODAL_INFO_ERROR') }, _that);

                _that.enableButtons();
            }
        );
    },

    onCopyPagesFromOtherProject: function(data) {

        var _that = this

        var pageCollection = this.model.get('collection');

        var oldPageId = data.oldPageId;
        var projectOptions = data.projectOptions;

        var options = data.projectOptions;
        var projectOptionsModel = ProjectModel.instance.get('options');

        for(var item in options){
            projectOptionsModel.set(item, options[item], { silent:true });
        }

        var oldPageIndex = pageCollection.length;

        if(oldPageId){

            var oldPageModel = this.getPageModelByPageId(oldPageId);
            oldPageIndex = this.getPageIndexByPageModel(oldPageModel) + 1;
        }

        var duplicatedPagesCollection = new PageCollection();

        for (var i = data.pages.length - 1; i >= 0; i--) {
            var copyPageModel = this.model.createPageModel( data.pages[i] );

            pageCollection.add(copyPageModel, {at:oldPageIndex});
            duplicatedPagesCollection.add(copyPageModel);

        };

        var lastPageId = parseInt(data.lastPageId);
        ProjectModel.instance.get('options').set('last_page_id', lastPageId, {silent:true});

        ProjectModel.instance.calculateAllScoreSuccessPoints();

        this.render();
        this.afterRender();

        return duplicatedPagesCollection.first() || pageCollection.first();
    },

    onCopyPagesFromOtherProjectResult: function(data) {
        var pageModel = this.onCopyPagesFromOtherProject(data);
        this.setPageAsActive(pageModel);
    },

    onCopyPagesFromOtherProjectResultComing: function(data) {
        var pageModel = this.onCopyPagesFromOtherProject(data);
    },

    createPsdPage: function(data){

        var _that = this;

        _log('createPsdPage', data);

        // var page = data.page;
        // var pageModel = _that.model.createPageModel( page );

        // if(pageModel){
        //     var lastPageId = parseInt(data.lastPageId);
        //     ProjectModel.instance.get('options').set('last_page_id', lastPageId, {silent:true});


        //     var collection = _that.pageListView.createBlankPageComing( pageModel );

        //     _log('createPsdPage collection', collection)

        //     if(collection.length > 0){

        //         _that.pageListView.setActivePageModel( pageModel );

        //         _that.trigger('set-page', pageModel, this);

        //         pageModel.view.updateDinamicPageThumb();
        //     }
        // }

        var _that = this;

        var oldPageIndex = data.oldPageIndex;

        var pageModel = ProjectModel.instance.createPageModel(data.page);
        this.model.get('collection').add(pageModel, { at:oldPageIndex });

        var lastPageId = parseInt(data.lastPageId);
        this.model.get('options').set('last_page_id', lastPageId, {silent:true});

        _that.render();
        _that.afterRender();

        pageModel.view.setPageAsActive();
        pageModel.view.updateDinamicPageThumb();
    },

    startListenOnSelectPageByUser: function() {

        var _that = this;

        DataAccess.onSelectPageByUser(
            { },
            function(data) { 
                _log('On select page by user result: ', data, _log.dataaccessOutResult); 

                _that.onSelectPageByUser(data);   
            },
            function(data) { 
                _log('On select page by user fault: ', data, _log.dataaccessOutFault);  
            }
        );
    },

    selectPageOnStart: function(){
        var selectedPages = this.model.get('selectedPages');

        _log('selectPageOnStart', selectedPages);
        _log('this.model', this.model);

        if(_.isUndefined(selectedPages)){
            return
        }

        this.onSelectPageByUser(selectedPages);

        this.model.unset('selectedPages');
    },

    onSelectPageByUser: function(data){

        var pages = data;

        this.resetSelectedByUser();

        if(!_.isObject(pages)){
            return;
        }

        for (var item in pages) {

            var pageId = parseInt(item);

            if(!_.isNumber(pageId)){
                continue;
            }

            var pageModel = this.getPageModelByPageId(pageId);

            if(_.isUndefined(pageModel)){
                continue;
            }

            var selectedBy = pages[item];

            pageModel.view.renderSelectedBy(selectedBy);
        }; 
    },

    resetSelectedByUser: function() {
        this.model.get('collection').each(function(pModel){
            pModel.view.renderSelectedBy([]);
        });
    },

    showPupup :function(data, sender){

        var popup = PopupFactory.createErrorPopup( data, sender );
        $('body').append(popup.render(data).$el);
    },
});