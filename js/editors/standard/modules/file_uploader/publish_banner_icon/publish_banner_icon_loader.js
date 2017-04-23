PublishBannerIconFileUploader = function(){
    this.type = "publish-icon";
}

PublishBannerIconFileUploader.prototype = new FileUploader();

PublishBannerIconFileUploader.prototype.sendFile = function( properties ){

    var _that = this;

    this.onStartUploadingFile();

    this.properties = properties;

    var reader = new FileReader();

    var file = properties.file;
    var uploadData = properties.data;

    var actionkey = "publish-banner-icon";
    uploadData.actionkey = actionkey;
    uploadData.type = this.type;
    uploadData.hash = this.componentModle.get('path');
    this.uploadData = uploadData;

    DataAccess.uploadPublishBannerIcon(
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

PublishBannerIconFileUploader.prototype.sendBinaryPart = function( imageData, actionkey ){

    DataAccess.uploadPublishBannerIconProgress(actionkey, { 'data' : imageData, actionkey:actionkey, isDeleted:this.componentIsDeleted() });
}


PublishBannerIconFileUploader.prototype.onComplete = function( data ){

    //var thumb = __meta__.APP_LINK + 'projects/' + __meta__.userID + '/' + __meta__.projectID + '/thumb/' + data.fileName;
    var thumb =  data.fileName;


    var thumb = __meta__.publications_link + this.uploadData.hash + '/thumb/' + thumb;

    this.componentModle.set('thumb', thumb);
    this.componentView.renderImage();

    this.componentView.saveToServer();
}
