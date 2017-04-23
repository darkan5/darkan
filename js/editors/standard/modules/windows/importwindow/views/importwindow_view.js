var ImportWindowView = LoadedWindowView.extend({

    tagName: 'div',
    className : 'window window-import-view',

    template: _.template($('#window-import-template').html()),

    acceptTypeFormat : [],

    events: function(){
        return _.extend({},LoadedWindowView.prototype.events,{
            'close': 'close',
            'click .window-close-button': 'close',
            'click .import-images': 'importImages',
            'click .import-pdf': 'importPdf',
            'click .import-psd': 'importPsdOnClick',
            'click .import-psd a': 'downloadPlugin',
            'dragenter': 'onFileDragOver',
            'dragleave .loaded-dropzone': 'onFileDragOut',
            'drop .loaded-dropzone': 'importPsdOnDrop',
        });
    },

    afterInitialize : function() {

        this.getCapabilities();
    },

    onCapabilitiesChanged: function(capabilitiesModel) {

        this.capabilitiesParmasList = capabilitiesModel.createParams([
            { name:'importpdf', identifier:'.import-pdf'},
            { name:'importpsd', identifier:'.import-psd'}
        ]);

        var deleteEventsVisitor = DeleteEventsVisitor.getInstance();
        this.accept(deleteEventsVisitor);
        capabilitiesModel.off();
    },

    importImages: function() {

        this.acceptTypeFormat = this.getExtensionImagesArray();
        this.uploadOnClick();

    },

    downloadPlugin: function(e) {
        e.stopPropagation();
    },

    importPdf: function() {

        this.acceptTypeFormat = this.getExtensionPdfArray();
        this.uploadOnClick();
    },

    listenPsdConverter: function() {

        var _that = this;

        DataAccess.createPsdPage(
            {},
            function(data){
                //_log('data', data);

                FileUploader.hideProgressPercent({}, _that);

                ProjectView.instance.createPsdPage(data);

                _that.trigger('close-window');

                _that.close();

            },
            function(data){
                //_log('data', data);

                FileUploader.hideProgressPercent({}, _that);

                _that.showPupup({ content: _lang('PSD_FAILED'), title: _lang('MODAL_INFO_ERROR')}, this);
            },
            function(data){
                //_log('data', data);

                FileUploader.hideProgressPercent({}, _that);
            },
            function(data){


                var percent = Math.round((data.fileIndex / data.fileCount)*100);

                //_log('data', data);

                FileUploader.showProgressPercent({ percent:percent }, _that);
            }
        );

    },

    importPsdOnClick: function() {

        var _that = this;

        this.listenPsdConverter();
        this.acceptTypeFormat = this.getExtensionPsdArray();
        this.uploadOnClick();
    },

    importPsdOnDrop: function(e) {

        var _that = this;

        this.listenPsdConverter();
        this.acceptTypeFormat = this.getExtensionPsdArray();
        this.uploadOnFileDrop(e);
    },



    runUploadProcess :function( properties ){

        var _that = this;

        if(this.windowModel.uploadingNow){

            return;
        }

        var specialData = this.getSpecialProperties();
        var toSend = $.extend({}, properties, specialData);

        this.fileUploader =  ImportFileUploader.create( properties.data.name, this.windowModel, this );

        if(this.fileUploader == undefined) {

            this.showPupup({ content:_lang('FILETYPE_NOT_ACCEPTED'), title:_lang('MODAL_INFO_ERROR') }, this);
            return;
        }

        _log('this.fileUploader', this.fileUploader);

        this.fileUploader.sendFile( toSend );
        this.fileUploader.on('on-result', this.onResult,  this);
        this.fileUploader.on('on-fault', this.onFault,  this);
        this.fileUploader.on('on-complete', this.onComplete,  this);
        this.fileUploader.on('on-complete-upload-image', this.onCompleteUploadImage,  this);
        this.fileUploader.on('on-complete-upload-pdf', this.onCompleteUploadPdf,  this);
        this.fileUploader.on('on-progress', this.onProgress,  this);

    },

    onClosePopup: function() {


    },

    getAcceptTypeFormat: function() {

        var _mainTypes = this.acceptTypeFormat;

        var acceptTypeString = '';

        _.each(_mainTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        return acceptTypeString;
    },

    getExtensionPdfArray : function(){
        return ['pdf'];
    },

    getExtensionImagesArray : function(){
        return ['jpg', 'png', 'gif'];
    },

    getExtensionPsdArray : function(){
        return ['darkan'];
    },

    renderAfterComplete: function(data) {



    },

    onCompleteUploadImage: function(){
        this.close();
    },

    onCompleteUploadPdf: function(data){

        var _that = this;

        var popup = PopupFactory.createCreatePdfDialogPopup( {}, {} );
        popup.on('close-popup', function(){
            _that.close();
        });

        popup.on('ok-button-click', function(){

            var pdfListWindow = WindowFactory.createPdfListWindow( { fileName:data.fileName } );

            pdfListWindow.on('on-start-converting', function(){
                _that.trigger('close-window');
                _that.close();
            });

            pdfListWindow.on('window-close', function(){
                _that.trigger('close-window');
                _that.close();
            });

            pdfListWindow.on('close-parent-window', function(){
                _that.trigger('close-window');
                _that.close();
            });



            $('body').append(pdfListWindow.render().$el);

        });
        popup.on('cancel-button-click', function(){

            var addNewPageProgressWindow = WindowFactory.createAddNewPageProgressWindow({ fileName:data.fileName });
            $('body').append(addNewPageProgressWindow.render().$el);

            _that.trigger('close-window');
            _that.close();
        });

        $('body').append(popup.render({title:_lang('PDF_POPUP_TITLE'), content:_lang('PDF_POPUP_CONTENT')}).$el);
    },

    onClose: function(){

    }




});