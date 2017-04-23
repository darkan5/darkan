ImageFileUploader = function(){

}

ImageFileUploader.prototype = new FileUploader();

ImageFileUploader.prototype.sendFile = function( properties){

    var _that = this;

    this.onStartUploadingFile();

    this.properties = properties;

    var reader = new FileReader();

    var file = properties.file;
    var uploadData = properties.data;

    var actionkey = this.componentModle.get('actionkey');
    uploadData.actionkey = actionkey;
    uploadData.type = this.type;
    uploadData.componentType = this.componentModle.get('type');
    uploadData.specialData = properties.specialData;

    DataAccess.uploadImage(
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

ImageFileUploader.prototype.sendBinaryPart = function( imageData, actionkey ){

    DataAccess.uploadImageProgress(actionkey, { 'data' : imageData, actionkey:actionkey, isDeleted:this.componentIsDeleted() });
}


ImageFileUploader.prototype.tempUploadImage = function(file){

    var _that = this;

    var tempReader = new FileReader();
    tempReader.onload = function(evt) {
        _that.componentModle.view.$el.find('img').attr('src', evt.target.result);
    }
    tempReader.readAsDataURL(file);
}


ImageFileUploader.prototype.onResult = function( data ){

    var file = this.properties.file;

    this.tempUploadImage(file);

}

ImageFileUploader.prototype.onComplete = function( data ){


    //this.componentModle.set('imageFileName', data.fileName);

    this.componentModle.setFileName(data);
}
