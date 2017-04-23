AudioFileUploader = function(){
    this.type = "audio";
}

AudioFileUploader.prototype = new FileUploader();

AudioFileUploader.prototype.sendFile = function( properties ){

    var _that = this;

    this.onStartUploadingFile();

    this.properties = properties;

    var reader = new FileReader();

    var file = properties.file;
    var uploadData = properties.data;

    var actionkey = this.componentModle.get('actionkey');
    uploadData.actionkey = actionkey;
    uploadData.type = this.type;

    DataAccess.uploadAudio(
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

AudioFileUploader.prototype.sendBinaryPart = function( imageData, actionkey ){

    DataAccess.uploadAudioProgress(actionkey, { 'data' : imageData, actionkey:actionkey, isDeleted:this.componentIsDeleted() });
}

AudioFileUploader.prototype.onComplete = function( data ){

    // this.componentModle.set('sound', data.fileName);

    this.componentModle.setAudioFileName(data);
}
