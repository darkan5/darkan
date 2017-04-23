ImportPsdFileUploader = function(){
    this.type = "importpsd";
}

ImportPsdFileUploader.prototype = new ImportFileUploader();

ImportPsdFileUploader.prototype.sendFile = function( properties){

    var _that = this;

    this.onStartUploadingFile();

    this.properties = properties;

    var reader = new FileReader();

    var file = properties.file;
    var uploadData = properties.data;

    var pageID = ProjectModel.instance.get('options').get('lastPageId');
    uploadData.actionkey = pageID;

    uploadData.type = this.type;

    var actionkey = pageID;


    DataAccess.uploadImportPsd(
        uploadData,
        // onResult
        function(data){

            _that.onResult(data);
            _that.trigger('on-result', data);
        },
        // onFault
        function(data){

            _that.onFault(data);
            _that.trigger('on-fault', data);
        },
        // onComplete
        function(data){

            _that.onCompleteUploadingFile();
            _that.onComplete(data);
            _that.trigger('on-complete', data);
        },
        // onProgress
        function(data){

            _that.onProgress(data);
            _that.trigger('on-progress', data);
            _that.calculatePartBinaryFile(reader, file, data, actionkey);
        } );
}

ImportPsdFileUploader.prototype.sendBinaryPart = function( imageData, pageID ){
    DataAccess.uploadImportPsdProgress(pageID, { data : imageData, actionkey:pageID });
}


ImportPsdFileUploader.prototype.onComplete = function( data ){
    var _that = this;


//    var popup = PopupFactory.createCreatePdfDialogPopup( {}, {} );
//    popup.on('ok-button-click', function(){
//
//        var pdfListWindow = WindowFactory.createPdfListWindow( { fileName:data.fileName } );
//        $('body').append(pdfListWindow.render().$el);
//
//    });
//    popup.on('cancel-button-click', function(){
//
//        var addNewPageProgressWindow = WindowFactory.createAddNewPageProgressWindow({ fileName:data.fileName });
//        $('body').append(addNewPageProgressWindow.render().$el);
//    });
//
//    $('body').append(popup.render({title:_lang('PDF_POPUP_TITLE'), content:_lang('PDF_POPUP_CONTENT')}).$el);
//
//    this.componentView.close();
}