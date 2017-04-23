var PdfListWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window pdf-list-window',

    template: _.template($('#window-pdf-list-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events, {
             'close': 'closeWindow',
             'close-window': 'closeWindow'
        });
    },

    initialize: function( data ) {

        var _that = this;

        this.windowModel = data.windowModel;
        this.pdfListData = data.pdfListData;
        this.runListeners();

        this.collection = new PdfListItemCollection();

        this.pdfListView = new PdfListView({ collection:this.collection });

        _that.createPagesList();
    },

    createPagesList: function(){


        var _that = this;

        DataAccess.createPdfImageList(
            this.pdfListData,
            // onResult
            function(responce){

                var max = responce.max;
                var projectPath = responce.projectPath;
                var extension = responce.extension;
                var thumbs = responce.thumbs;
                var pdfFileName = responce.fileName;

                _that.pdfFileName = pdfFileName;

                _that.projectPath = projectPath;
                _that.extension = extension;

                for (var i = 0; i < max; i++) {

                    var src = '';

                    if(i < thumbs){
                        src = projectPath + i + extension;
                    }

                    var pdfListItemModel = new PdfListItemModel({ id: i });
                    pdfListItemModel.set('id', i);

                    if(src != ''){
                        pdfListItemModel.set('src', src);
                    }

                    _that.collection.add( pdfListItemModel );
                };

                _that.pdfListView.render();
            },
            // onFault
            function(responce){
                _log('convertPdfToImage', responce, _log.dataaccessOutFault);
            },
            // onComplete
            function(responce){
                //_that.hideProgressPercent();
            },
            // onProgress
            function(responce){
                responce.projectPath = _that.projectPath;
                responce.extension = _that.extension;

                _that.pdfListView.updateComing( responce );
            }
        );
    },

    onClose: function(){

        DataAccess.stopCreatePdfImageList(
            {},
            function(responce){ _log('stopCreatePdfImageList result', responce, _log.dataaccessOutResult); },
            function(responce){ _log('stopCreatePdfImageList fault', responce, _log.dataaccessOutFault); }
        );

        this.trigger('on-close');
    },

    onResult: function() {


    },

    afterRender: function() {
        this.$el.find('.pdf-list-wrapper').html(this.pdfListView.render().$el);
    },

    closeWindow: function(){

        var ids = this.pdfListView.getSelectedItemsIds();

        if(ids.length <= 0){ return; }

        var toSend = { fileName:this.pdfFileName, ids:ids };

        var addNewPageProgressWindow = WindowFactory.createAddNewPageProgressWindow(toSend);
        $('body').append(addNewPageProgressWindow.render().$el);

        this.trigger('on-start-converting');

        this.close();
    },

    onClose: function(){
       this.trigger('close-parent-window');
    }
});