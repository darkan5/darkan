ProjectSoundUploader = function(){
    this.type = "projectsound";
}

ProjectSoundUploader.prototype = new FileUploader();

ProjectSoundUploader.prototype.sendFile = function( properties ){

    var _that = this;

    this.onStartUploadingFile();

    this.properties = properties;

    var reader = new FileReader();

    var file = properties.file;
    var uploadData = properties.data;

    // var options = this.componentModle.get('options');
    var pageID = 'project';
    // if (pageID === undefined) {
    //     pageID = this.componentModle.get('options').get('pageid');
    // }
    uploadData.actionkey = pageID;
    uploadData.type = this.type;

    var actionkey = pageID;

    DataAccess.uploadProjectSound(
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

ProjectSoundUploader.prototype.sendBinaryPart = function( imageData, pageID ){

    DataAccess.uploadProjectSoundProgress(pageID, { 'data' : imageData, actionkey:pageID, isDeleted:this.componentIsDeleted() });
}


ProjectSoundUploader.prototype.onComplete = function( data ){

    this.componentModle.setFileName(data);
}
