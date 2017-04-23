var AddNewPageProgressView = WindowView.extend({

    tagName: 'div',
    className : 'window add-new-page-progress-window animated pulse',

    template: _.template($('#window-add-new-page-progress-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events, {
            'click .add-new-page-progress-cancel': 'addNewPageCancel'
        });
    },

    initialize: function( data ) {

        var _that = this;

        this.windowModel = data.windowModel;
        this.addNewPageData = data.addNewPageData;
        this.runListeners();

        var fileName = data.addNewPageData.fileName;
        var ids = data.addNewPageData.ids;

        this.ids = ids;

        // this.oldPageId;

        // var pagesList = ProjectView.instance.pagesList;

        // if(pagesList){
        //     var selectedPageModel = pagesList;

        //     if(selectedPageModel){
        //         this.oldPageId = selectedPageModel.get('options').get('pageid');
        //     }
        // }

        //var pdfPageIdsList = data.addNewPageData.pdfPageIdsList;

        DataAccess.createPdfImageList(
            { fileName:fileName, createThumbs: false },
            function(responce){

                if(_that.ids == undefined){

                    _that.ids = [];

                    for (var i = 0; i < responce.max; i++) {
                        _that.ids[i] = i;
                    };
                }

                _that.max = _that.ids.length;

                var index = 0;
                percent =  Math.round(( (index + 1) / _that.max ) * 100);

                _that.showProcessContent(index);

                _that.showProgressPercent({ percent:percent});

                _that.convertPdfPageToImage(fileName, _that.ids.shift());

            },
            function(){},
            function(){},
            function(){}
        );

    },

    convertPdfPageToImage: function(fileName, pdfPageId){

        var _that = this;

        // var rightMenuView = RightMenuView.instance;
        // var stageView = StageView.instance;

        // var newPageModel = ProjectModel.instance.createNewPageModel();

        // rightMenuView.pageListView.addNewBlankPage(
        //     newPageModel,
        //     false,
        //     function(pageModel){
        //         _that.onAddPageResult(pageModel, fileName, pdfPageId);

        //         _that.oldPageId = pageModel.get('options').get('pageid');

        //         var allPages = ProjectModel.instance.getAllPages();

        //         if(allPages.length == 1){

        //             rightMenuView.pageListView.setActivePageModel( pageModel );
        //             stageView.setModel(pageModel);
        //         }

        //     },
        //     function(data){
        //         this.onAddPageFault(data);
        //     },
        //     _that.oldPageId);

        var pagesList = ProjectView.instance.pagesList;

        var newPageModel = ProjectModel.instance.createNewPageModel();
        pagesList.addNewPdfPage(
            newPageModel, 
            function(createdPageModel){

                pagesList.render();
                pagesList.afterRender();

                _that.onAddPageResult(createdPageModel, fileName, pdfPageId);
            },
            function(data){
                _that.onAddPageFault(data);
            }
        );


    },

    onAddPageResult: function( pageModel, fileName, pdfPageId ) {

        var _that = this;

        _log('onAddPageResult pageModel', pageModel);

        var pageId = pageModel.get('options').get('pageid');
        var pageWidth = StageView.instance.model.get('options').get('width');
        var pageHeight = StageView.instance.model.get('options').get('height');

        _log('parems', { pageId:pageId, fileName:fileName, pdfPageId:pdfPageId, pageWidth: pageWidth, pageHeight:pageHeight });

        DataAccess.convertPdfPageToImage(
            { pageId:pageId, fileName:fileName, pdfPageId:pdfPageId, pageWidth: pageWidth, pageHeight:pageHeight },
            function(responce){

                var pageHeight = responce.height;

                pageModel.get('options').set('image', responce.fileName, { silent:true });
                pageModel.view.render();
                pageModel.view.afterRender();
                pageModel.get('options').set('height', pageHeight, { silent:true });
                pageModel.get('options').set('width', pageWidth, { silent:true });

                pageModel.get('options').trigger('change');


                var max = parseInt( _that.max );
                var index = _that.max - _that.ids.length;
                percent =  Math.round(((index + 1) / max  ) * 100);


                if(_that.ids.length > 0){

                    _that.showProcessContent(index + 1);

                    _that.showProgressPercent({ percent:percent});
                    _that.convertPdfPageToImage(fileName, _that.ids.shift() );
                }else{
                    _that.hideProgressPercent();

                    _that.showFinishContent();

                   setTimeout(function(){
                       _that.close();
                   }, 2000);

                }


            },
            function(responce){
                _log('convertPdfPageToImage', responce, _log.dataaccessOutFault);
            }
        );
    },

    showProcessContent: function( index ) {
        this.$el.find('.add-new-page-progress-text').html(_lang('PDF_PROGRESS_TITLE'));
    },

    showFinishContent: function( ) {
        this.$el.find('.add-new-page-progress-text').html(_lang('PDF_PROGRESS_FINISHED'));
        this.$el.removeClass('animated pulse');
    },

    onAddPageFault: function(responce) {

    },

    addNewPageCancel: function() {
        this.ids = [];
        this.close();
    },

    startUploading: function(){



    },

    onClose: function(){

        this.ids = [];

        this.trigger('on-close');
    },

    showProgressPercent : function(data){

        this.$el.find('.progress-bar').fadeIn(500);
        var percentage = parseInt( data.percent );
        this.$el.find('.progress-bar-text').text(percentage+'%');
        this.$el.find('.progress-bar-inner').css('width',  percentage +'%');
    },

    hideProgressPercent : function( data ){

        var _that = this;

        this.$el.find('.progress-bar-text').text('100%');
        this.$el.find('.progress-bar-inner').css('width',  '100%');

        _that.$el.find('.progress-bar').fadeOut(500, function(){ /*_that.render()*/ });
    }


});