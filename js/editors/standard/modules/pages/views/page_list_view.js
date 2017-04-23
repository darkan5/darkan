var PagesListView = Backbone.View.extend({

    el: ".pages",
    selectedPageModel: null,


    initialize: function( data ) {

        this.collection = data.collection;
        $('#pages-list-wrapper').perfectScrollbar({
            useKeyboard: false,
            suppressScrollX: true
        });
    },

    events: {

    },

    clearList: function(){
        this.collection.reset();
        this.render();
    },

    render: function(){

        this.$el.html("");

        if(this.collection != undefined){

            this.collection.each(this.addPageItem, this);

            this.$el.sortable({
                delay: 50,
                update: function(event, ui) {
                    ui.item.trigger('drop-item', ui.item.index());
                }
            });

            var activePageModel =  this.getActivePage( User.getModel().get('activePageId') );

            this.setActivePageModel( activePageModel );
        }

        return this;
    },


    getActivePage :function( pageId ){

        var activePageModel;

        this.collection.each(function(pModel, index){
            if(pModel.get('options').get('pageid') == pageId){
                activePageModel = pModel;
            }
        });

        return activePageModel;
    },

    loadProject :function( collection, firstPageModel ){

        this.collection = collection;
        this.render();

        if(firstPageModel != undefined){
            firstPageModel.view.setPage();
            this.setActivePageModel( firstPageModel );

            firstPageModel.view.setSectionBy();
        }
    },


    getSelectedPageModel : function(){
        return this.selectedPageModel;
    },

    


    addCopyPage : function( pageListToCopy, userId, projectId ){

        var _that = this;

        var oldPageId = this.selectedPageModel == undefined ? undefined : this.selectedPageModel.get('options').get('pageid');

        StageView.instance.createPageThumb(function(){

            DataAccess.copyPage(
                { pageListToCopy: pageListToCopy, sourceUserId:userId, sourceProjectId:projectId, oldPageId:oldPageId },
                function(data) { _that.onPageCopiedResult(data) },
                _that.onPageCopiedFault
            );

        });
    },

    onPageCopiedResult: function(data) {


        //var lastPageId = parseInt(data.lastPageId);

        //ProjectModel.instance.get('options').set('last_page_id', lastPageId);

        this.trigger('on-copy-page', data, this);
    },

    onPageCopiedFault: function(data) {
        _log('Copy page failed:', data)
    },



    addPageItem: function( pageModel ) {

        var _that = this;
        var pageItemView = new LoadedItemPageView({ model: pageModel });
        this.$el.append(pageItemView.render().el);

        pageItemView.on('setpage', function(model, sender){

            if(_that.collection.length > 1){



                var activePageModel =  _that.getActivePage( User.getModel().get('activePageId') );


                _log('activePageModel', activePageModel, _log.timeline)

                if(activePageModel != undefined && activePageModel.cid != model.cid){

                    if(activePageModel.view != undefined){
                        activePageModel.view.unsetPage();
                    }

                    _that.setActivePageModel( model );

                    _that.selectedPageModel = model;

                    model.view.setSectionBy();

                    _that.trigger('onsetpage', model  );
                }
            }
        });

        pageItemView.on('data-picker-picked', function(model){
            _that.trigger('data-picker-picked', model  );
        });

        this.selectedPageModel = pageModel;
    },

    selectPageModel: function( lastPageModel ){

        this.collection.each(function(model) {

            if(model.cid != lastPageModel.cid){
                model.isSelected = false;
            }else{
                model.isSelected = true;
            }
        });

        this.render();

    },

    setActivePageModel :function( model ){

        this.collection.each(function(pageModel){
            pageModel.setActive( false );
        });


        if( model != undefined ){
            User.getModel().set('activePage', model);
            User.getModel().set('activePageId', model.get('options').get('pageid'));

            model.setActive( true );

            this.selectedPageModel = model;
        }
    },

    getPageModelByPageId: function(pageId){

        var pageModel;

        this.collection.each(function(model){
            if(model.get('options').get('pageid') == pageId){

                pageModel =  model;
            }
        });

        return pageModel;
    },

    getPageIndexByPageModel: function(pageModel){

        var index = this.collection.indexOf(pageModel);

        return index;
    },

    getIdsFromSelectedPages: function( pageCollection ){

        var pageIdsListToCopy = [];

        pageCollection.each(function(model) {

            if (model.isSelected) {
                console.log('kopiuje strone');
                pageIdsListToCopy.push(model.get('options').get('pageid'));
            }
        });

        return pageIdsListToCopy;
    },

    unsetAllPagesComing : function(login){

        this.collection.each(function(model){
            model.view.unsetPageComing(login);
        });
    },

    unsetSelectionBy: function(){

//        this.collection.each(function(model){
//            model.view.unsetPage();
//        });
    }

});
