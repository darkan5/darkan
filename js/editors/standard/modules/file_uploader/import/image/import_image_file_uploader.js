ImportImageFileUploader = function(){
    this.blockSize = 100000;
    this.type = "importimage";
}

ImportImageFileUploader.prototype = new ImportFileUploader();

ImportImageFileUploader.prototype.sendFile = function( properties){

    var _that = this;

    this.onStartUploadingFile();

    var rightMenuView = RightMenuView.instance;
    var stageView = StageView.instance;

    var newPageModel = ProjectModel.instance.createNewPageModel();

    rightMenuView.pageListView.addNewBlankPage(
        newPageModel,
        false,
        function(pageModel){


            _that.properties = properties;

            var reader = new FileReader();

            var file = properties.file;
            var uploadData = properties.data;

            var pageID = pageModel.get('options').get('pageid');
            uploadData.actionkey = pageID;

            uploadData.type = _that.type;

            var actionkey = pageID;

            DataAccess.uploadImportImage(
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

                    pageModel.get('options').set('image', data.fileName);

                    _that.onCompleteUploadingFile();
                    _that.onComplete(data);
                    _that.trigger('on-complete', data);
                    _that.trigger('on-complete-upload-image', data);
                },
                // onProgress
                function(data){

                    _that.onProgress(data);
                    _that.trigger('on-progress', data);
                    _that.calculatePartBinaryFile(reader, file, data, actionkey);
                } );




        },
        function(data){

        } );




}

ImportImageFileUploader.prototype.sendBinaryPart = function( imageData, pageID ){

    DataAccess.uploadImportImageProgress(pageID, { 'data' : imageData, actionkey:pageID });
}


ImportImageFileUploader.prototype.onComplete = function( data ){


}


