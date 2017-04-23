PublishIconFileUploader = function(){
    this.type = "publish-icon";
}

PublishIconFileUploader.prototype = new FileUploader();

PublishIconFileUploader.prototype.sendFile = function( properties ){

    var _that = this;

    this.onStartUploadingFile();

    this.properties = properties;

    var reader = new FileReader();

    var file = properties.file;
    var uploadData = properties.data;

    var actionkey = "publish-icon";
    uploadData.actionkey = actionkey;
    uploadData.type = this.type;

    DataAccess.uploadPublishIcon(
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

PublishIconFileUploader.prototype.sendBinaryPart = function( imageData, actionkey ){

    DataAccess.uploadPublishIconProgress(actionkey, { 'data' : imageData, actionkey:actionkey, isDeleted:this.componentIsDeleted() });
}


PublishIconFileUploader.prototype.onComplete = function( data ){

    var thumb = 'projects/' + __meta__.ownerID + '/' + __meta__.projectID + '/thumb/' + data.fileName;


    this.componentModle.set('thumb', thumb);
    //this.componentView.renderImage();
}
