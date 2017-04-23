GalleryFileUploader = function(){
    this.type = "gallery";
}

GalleryFileUploader.prototype = new FileUploader();

GalleryFileUploader.prototype.sendFile = function( properties ){

    var _that = this;

    this.onStartUploadingFile();

    this.properties = properties;

    var reader = new FileReader();

    var file = properties.file;
    var uploadData = properties.data;

    var actionkey = this.componentModle.get('actionkey');
    uploadData.actionkey = actionkey;
    uploadData.type = this.type;

    DataAccess.uploadGallery(
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

GalleryFileUploader.prototype.sendBinaryPart = function( imageData, actionkey ){

    DataAccess.uploadGalleryProgress(actionkey, { 'data' : imageData, actionkey:actionkey, isDeleted:this.componentIsDeleted() });
}


GalleryFileUploader.prototype.onComplete = function( data ){

    _log('GalleryFileUploader onComplete data', data);
    _log('GalleryFileUploader onComplete this.componentModle', this.componentModle);


    var galleryFiles =  this.componentModle.get('galleryFiles');
   

    galleryFiles.push(data.fileName);



    //this.componentModle.set('galleryFiles', galleryFiles);

    this.componentModle.setFileName(galleryFiles);



    this.componentModle.trigger('change');
    this.componentModle.setGalleryFile();

    
}
