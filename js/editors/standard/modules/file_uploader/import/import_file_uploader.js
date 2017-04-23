ImportFileUploader = function(){
    this.blockSize = 100000;
    this.type = "";
}


ImportFileUploader.prototype = new FileUploader();

ImportFileUploader.create = function( path, componentModle, componentView ){


    var type = this.checkExt( path, componentView );


    switch (type){
        case 'pdf':
            var fileploader = new ImportPdfFileUploader();
            fileploader.setView(componentModle);
            fileploader.setView2(componentView);

            return fileploader;
            break;

        case 'image':
            var fileploader = new ImportImageFileUploader();
            fileploader.setView(componentModle);
            fileploader.setView2(componentView);

            return fileploader;
            break;

        case 'psd':
            var fileploader = new ImportPsdFileUploader();
            fileploader.setView(componentModle);
            fileploader.setView2(componentView);

            return fileploader;
            break;

        default :
            return undefined;
            break;
    }
}

ImportFileUploader.prototype.sendFile = function( properties){

    // To override
}

ImportFileUploader.prototype.sendBinaryPart = function( imageData, actionkey ){

    // To override
}

ImportFileUploader.checkExt = function( path, componentView ){

    //getExtensionFilesArray


    var exts = componentView.getExtensionImagesArray();

    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){
            return 'image';
        }
    };

    var exts = componentView.getExtensionPdfArray();

    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){
            return 'pdf';
        }
    };

    var exts = componentView.getExtensionPsdArray();

    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){
            return 'psd';
        }
    };
}

ImportFileUploader.prototype.onComplete = function( data ){


}
