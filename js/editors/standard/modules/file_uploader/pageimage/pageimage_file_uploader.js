PageImageFileUploader = function(){
    this.type = "pagesound";
}

PageImageFileUploader.prototype = new FileUploader();

PageImageFileUploader.prototype.sendFile = function( properties ){

    var _that = this;

    this.onStartUploadingFile();

    this.properties = properties;

    var reader = new FileReader();

    var file = properties.file;
    var uploadData = properties.data;

    // var options = this.componentModle.get('options');
    var pageID = this.componentModle.get('pageid');
    // if (pageID === undefined) {
    //     pageID = this.componentModle.get('options').get('pageid');
    // }
    uploadData.actionkey = pageID;
    uploadData.type = this.type;

    var actionkey = pageID;

    DataAccess.uploadPageImage(
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

PageImageFileUploader.prototype.sendBinaryPart = function( imageData, pageID ){

    DataAccess.uploadPageImageProgress(pageID, { 'data' : imageData, actionkey:pageID, isDeleted:this.componentIsDeleted() });
}


PageImageFileUploader.prototype.onComplete = function( data ){
    this.componentModle.setImageFileName(data);
}
