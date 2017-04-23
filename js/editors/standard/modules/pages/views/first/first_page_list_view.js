var FirstPagesListView = PagesListView.extend({

    copiedPageTrigger: [],


    events: function(){
        return _.extend({},PagesListView.prototype.events,{
            'update-sort': 'updateSort',
            'copy-page-trigger': 'copyTrigger',
            'on-paste-page-trigger': 'onPasteTrigger'
        });
    },

    resetList: function(){
        this.copiedPageTrigger = [];
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

        DataAccess.updatePageSort(
            { pageId:pageId, position:position },
            function(data) { 
                _log('Update page successed: ' , data, _log.dataaccessOutResult); 

                _that.collection.remove( pageModel );
                _that.collection.add(pageModel, {at: position});

            },
            function(data) { 
                _log('Update page failed: ' , data, _log.dataaccessOutFault); 
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

        this.collection.remove( pageModel );
        this.collection.add(pageModel, {at: position});

        this.render();
    },

    getMap: function(){

        var pages = [];

        this.collection.each(function(pModel, index){
            pages.push( pModel.get('options').get('pageid') );
        });

        var map = new ProjectMap();
        map.set('pages', pages);

        return map;
    },

    getPagesMap: function(){

        var pages = [];

        this.collection.each(function(pModel, index){
            pages.push( pModel.get('options').get('pageid') );
        });

        return pages;
    },

    updatePageOptionsComing :function( pageOptions){

        var pageId = pageModel.get('options').get('pageid');

        this.collection.each(function(pModel, index){
            if(pModel.get('options').get('pageid') == pageId){

                pModel.set('options', pageOptions, {silent: true});

                pModel.view.renderSelectedBy();
            }
        }, this);
    },

    updatePageModelComing :function( pageModel){

        var _that = this;

        var pageId = pageModel.get('options').get('pageid');

        var actualPageModel;

        this.collection.each(function(pModel, index){
            if(pModel.get('options').get('pageid') == pageId){

                actualPageModel = pModel;

                //var findedPageModel = _that.collection.at( index );
                // Update page model nastepuje w modelu, nstępnie renderuje się tylko widok pojedyczego Page wiew
                //findedPageModel.updateComing( pageModel );

                // _that.collection.remove(_that.collection.at( index ));
                // _that.collection.add( pageModel, {at: index});

                var pageOptions1 = pageModel.get('options').toJSON();

                for(var item in pageOptions1){
                    pModel.get('options').set(item, pageOptions1[item], { silent:true });
                }


                //pModel.set('options', pageModel.get('options'), {silent: true});
                pModel.set('lines', pageModel.get('lines'), {silent: true});
                pModel.set('draw', pageModel.get('draw'), {silent: true});


                //pModel.view.render();

                //_that.trigger('onsetpage', pageModel  );

                //newPageModel.updateComing();



                //this.render();

                //_that.trigger('update-coming', pageModel);
            }
        }, this);

        return actualPageModel;

        //this.render();

    },

    addNewBlankPage: function( newPageModel, setPage, onResult, onFault, setingOldPageId ) {

        var _that = this;

        setPage = setPage == undefined ? true : setPage;

        var oldPageId = this.selectedPageModel == undefined ? undefined : this.selectedPageModel.get('options').get('pageid');

        if(setingOldPageId){
            oldPageId = setingOldPageId;
        }

        _log('oldPageId', oldPageId);

        var pages = _that.getPagesMap();

        DataAccess.createBlankPage(
            {oldPageId:oldPageId, page:newPageModel, map: { pages: pages }},
            function(data) {

                _log('Create page successed: ', data, _log.dataaccessOutResult);

                
                var pageModel = _that.onCreateBlankPage(data);

                if(setPage) {

                    _that.selectedPageModel = pageModel;

                    _that.trigger('on-page-are-created', pageModel );
                }

                if(onResult != undefined){
                    onResult( pageModel );
                }

            },
            function(data) {
                console.log('Create page failed: ' , data);

                if(onFault != undefined){
                    onFault( data );
                }
            }
        );

        //return newPageModel;
    },

    onCreateBlankPage :function( data ){

        var _that = this;

        var pageModel = ProjectModel.instance.createPageModel( data.page );

        var lastPageId = parseInt(data.lastPageId);
        ProjectModel.instance.get('options').set('last_page_id', lastPageId, {silent:true});

        var oldPageId = data.oldPageId;

        if(oldPageId != undefined){

            var oldPageIndex = data.oldPageIndex;

            _that.collection.add(pageModel, {at:oldPageIndex});

        }else{
            _that.collection.add(pageModel);
        }


        DarkanEditorAplicationAPI.getInstance().pageAdded({ pagesLength:_that.getPagesLength() });

        _log('_that.collection', _that.collection.toJSON());

        ProjectModel.instance.set('collection', _that.collection);

        _that.render();

        return pageModel;
    },

    addCopyPageComing :function( data ){

        var oldPageId = data.oldPageId;

        var oldPageModel = this.getPageModelByPageId(oldPageId);
        var oldPageIndex = this.getPageIndexByPageModel(oldPageModel) + 1;

        for (var i = data.pages.length - 1; i >= 0; i--) {
            var copyPageModel = this.model.createPageModel( data.pages[i] );

            this.collection.add(copyPageModel, {at:oldPageIndex});
        };

        //this.collection.add(pageModel);

        this.render();

        return this.collection;
    },

    getPagesLength: function() {
        return this.collection.length;
    },

    deletePage: function(pageCollection, selectedPageModel, onResult, onFault) {
        var _that = this;

        // var pagesID = [];

        // pageCollection.each(function(model) {
        //     pagesID.push(model.get('options').get('pageid'));
        //     _that.collection.remove(model);
        // });

        // DataAccess.deletePages(
        //     {
        //         pagesIds:pagesID 
        //     },
        //     function(data) { 

        //         onResult();

        //         DarkanEditorAplicationAPI.getInstance().pagesRemoved({ pagesLength:_that.getPagesLength() });

        //         console.log('Delete page successed: ' , data, _log.dataaccessOutResult);

                
        //     },
        //     function(data) {
        //         console.log('Delete page failed: ' , data, _log.dataaccessOutFault);
        //         onFault();
        //     }
        // );

        // _.each(pagesID, function(pageid) {
        //     DataAccess.deletePage(
        //         {pageId:pageid, map: { pages: _that.getPagesMap() }},
        //         function(data) { 

        //             onResult();

        //             DarkanEditorAplicationAPI.getInstance().pagesRemoved({ pagesLength:_that.getPagesLength() });

        //             console.log('Delete page successed: ' , data);

                    
        //         },
        //         function(data) {
        //             console.log('Delete page failed: ' , data);
        //             onFault();
        //         }
        //     );
        // });

        // this.render();

        // var firstPageModel = this.collection.first();

        // if(firstPageModel == undefined){
        //     selectedPageModel = firstPageModel;
        // }else{
        //     if(selectedPageModel == undefined){
        //         selectedPageModel = firstPageModel;
        //     }
        // }

        // this.selectedPageModel = selectedPageModel;

        // return selectedPageModel;
    },

    deletePageFromListComing : function( pageId ){

        var _that = this;

        var activePageModel =  this.getActivePage( User.getModel().get('activePageId') );


        var selectedPageModel;

        this.collection.each(function(pModel, index){

            if(pModel != undefined){

                if(pModel.get('options').get('pageid') == pageId){

                    //console.log("Find " + pageId);

                    _log('activePageModel', activePageModel.cid);
                    _log('pModel', pModel.cid);

                    if(pModel.cid == activePageModel.cid){
                        var index = _that.collection.indexOf(activePageModel);
                        selectedPageModel = _that.collection.at(index-1);
                    }else{
                        selectedPageModel = activePageModel;
                    }

                    _that.collection.remove(pModel);
                    _that.render();
                }
            }
        } );

        if(selectedPageModel == undefined){
            selectedPageModel = this.collection.first();
        }

        this.selectedPageModel = selectedPageModel;

        DarkanEditorAplicationAPI.getInstance().pagesRemoved({ pagesLength:this.getPagesLength(), comming:true });


        return selectedPageModel;

    }
});
