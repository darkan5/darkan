ImportPdfFileUploader = function(){
    this.type = "importpdf";
}

ImportPdfFileUploader.prototype = new ImportFileUploader();

ImportPdfFileUploader.prototype.sendFile = function( properties){

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


    DataAccess.uploadImportPdf(
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
            _that.trigger('on-complete-upload-pdf', data);
        },
        // onProgress
        function(data){

            _that.onProgress(data);
            _that.trigger('on-progress', data);
            _that.calculatePartBinaryFile(reader, file, data, actionkey);
        } );
}

ImportPdfFileUploader.prototype.sendBinaryPart = function( imageData, pageID ){
    DataAccess.uploadImportPdfProgress(pageID, { data : imageData, actionkey:pageID });
}


ImportPdfFileUploader.prototype.onComplete = function( data ){
    var _that = this;
}