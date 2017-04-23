FileUploader = function(){
    this.blockSize = 100000;
    this.type = "";
}

FileUploader.prototype = new Backbone.Model();

FileUploader.create = function( path, componentModle, componentView ){


    var type = this.checkExt( path, componentModle );

    componentModle.uploadingNow = false;

    switch (type){
        case 'file':
            var fileFileUploader = new FileFileUploader();
            fileFileUploader.setView(componentModle);
            fileFileUploader.setView2(componentView);

            return fileFileUploader;
            break;
            
            case 'pagesound':
            var fileFileUploader = new PageSoundFileUploader();
            fileFileUploader.setView(componentModle);
            fileFileUploader.setView2(componentView);

            return fileFileUploader;
            break;

            case 'pageimage':
            var fileFileUploader = new PageImageFileUploader();
            fileFileUploader.setView(componentModle);
            fileFileUploader.setView2(componentView);

            return fileFileUploader;
            break;
            

        case 'image':
            var imageFileUploader = new ImageFileUploader();
            imageFileUploader.setView(componentModle);
            imageFileUploader.setView2(componentView);

            return imageFileUploader;
            break;

        case 'audio':

            var audioFileUploader = new AudioFileUploader();
            audioFileUploader.setView(componentModle);
            audioFileUploader.setView2(componentView);

            return audioFileUploader;
            break;

        case 'sound':

            var soundsFileUploader = new SoundsFileUploader();
            soundsFileUploader.setView(componentModle);
            soundsFileUploader.setView2(componentView);

            return soundsFileUploader;
            break;

        case 'video':

            var videoFileUploader = new VideoFileUploader();
            videoFileUploader.setView(componentModle);
            videoFileUploader.setView2(componentView);

            return videoFileUploader;
            break;

        case 'swf':

            var swfFileUploader = new SwfFileUploader();
            swfFileUploader.setView(componentModle);
            swfFileUploader.setView2(componentView);

            return swfFileUploader;
            break;

        case 'gallery':

            var galleryFileUploader = new GalleryFileUploader();
            galleryFileUploader.setView(componentModle);
            galleryFileUploader.setView2(componentView);

            return galleryFileUploader;
            break;

        default :
            return undefined;
            break;
    }
}

FileUploader.prototype.visit = function( view ){

},


FileUploader.prototype.setView = function( componentModle ){

     this.componentModle = componentModle;
}

FileUploader.prototype.setView2 = function( componentView ){

    this.componentView = componentView;
}




FileUploader.createOnClick = function(e, input, componentModle, componentView){


    var properties = this.getInputProperties(e, input);

    return FileUploader.create( properties.data.name, componentModle, componentView );
}

FileUploader.createOnOnDrop = function(e, componentModle, componentView){

    var properties = this.getDropProperties(e);

    return FileUploader.create( properties.data.name, componentModle, componentView );
}


FileUploader.prototype.sendFile = function( properties, onResult, onFault, onComplete, onProgress ){
    // To override
}




FileUploader.prototype.calculatePartBinaryFile = function( reader, file, data, actionkey ){

    var _that = this;

    var newFile; //The Variable that will hold the new Block of Data

    var blockSize = _that.blockSize;
    var fileSize = file.size;

    var place = data.place * blockSize; //The Next Blocks Starting Position

    if(file.slice){
        newFile = file.slice(place, place + Math.min( blockSize, (fileSize - place)));
    }else{
        newFile = file.mozSlice(place, place + Math.min( blockSize, (fileSize - place)));
    }

    _log("calculatePartBinaryFile");

    //reader.readAsText(newFile);

    if(reader.readAsBinaryString != undefined){

        //_log('reader.readAsBinaryString', reader.readAsBinaryString);

        reader.readAsBinaryString(newFile);
        reader.onload = function(evt){

            var imageData = evt.target.result;

            //_log("sendBinaryPart imageData", imageData);

            _that.sendBinaryPart(imageData, actionkey);
        }

    }else{


        // var binary = '';
        // var bytes = new Uint8Array( newFile );
        // var len = bytes.byteLength;
        // for (var i = 0; i < len; i++) {
        //     binary += String.fromCharCode( bytes[ i ] );
        // }
        reader.readAsDataURL(newFile);
        reader.onload = function(evt){

            var imageData = evt.target.result;

            //https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
            //<script src="libs/base64/base64_encoding,js.js?r=<?php echo $CFG['v'] ?>"></script>
            // var bs = base64DecToArr (imageData);
            if (imageData) {
                imageData = imageData.replace(/^[^,]+,/, '');
            }
            
            var byteCharacters = atob(imageData);

            //_log('binaryString', bs);

            //var binaryString = _that.uint8ToString(imageData);

            _that.sendBinaryPart(byteCharacters, actionkey);
        }
    }
}

FileUploader.prototype.uint8ToString = function(buf) {
    var i, length, out = '';
    for (i = 0, length = buf.length; i < length; i += 1) {
        out += String.fromCharCode(buf[i]);
    }
    return out;
}

FileUploader.prototype.b64EncodeUnicode = function(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

FileUploader.prototype.b64_to_utf8 = function( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}


FileUploader.prototype.sendBinaryPart = function( imageData, actionkey ){

    // To override
}

FileUploader.prototype.onStartUploadingFile = function(  ){

    this.componentModle.uploadingNow = true;
}

FileUploader.prototype.onCompleteUploadingFile = function(  ){

    this.componentModle.uploadingNow = false;
}

FileUploader.prototype.isUploadingNow = function(  ){

    return this.componentModle.uploadingNow;
}

FileUploader.checkExt = function( path, componentModle ){

    //getExtensionFilesArray


    var exts = componentModle.getExtensionFilesArray();

    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){
            return 'file';
        }
    };

    var exts = componentModle.getExtensionPageSoundArray();

    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){
            return 'pagesound';
        }
    };

    var exts = componentModle.getExtensionPageImageArray();

    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){
            return 'pageimage';
        }
    };




    



    var exts = componentModle.getExtensioAudioArray();

    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){
            return 'audio';
        }
    };

    var exts = componentModle.getExtensionImagesArray();

    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){
            return 'image';
        }
    };

    var exts = componentModle.getExtensionSoundsArray();

    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){
            return 'sound';
        }
    };

    var exts = componentModle.getExtensionVideosArray();

    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){
            return 'video';
        }
    };

    var exts = componentModle.getExtensionSwfArray();

    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){
            return 'swf';
        }
    };

    var exts = componentModle.getExtensionGalleryArray();

    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){
            return 'gallery';
        }
    };

    return undefined;
}

FileUploader.prototype.onResult = function( data ){
    //To override
}

FileUploader.prototype.onFault = function( data ){
    //To override
}

FileUploader.prototype.onProgress = function( data ){
    //To override
}

FileUploader.prototype.onComplete = function( data ){
    //To override
}

FileUploader.getInputProperties = function(e, sender){

    var file = e.originalEvent.target.files[0];

    _log('getInputProperties', file);

    var imageName = sender.value.split('\\').pop();
    var imageData = e.target.result;

    var data = {
        name: imageName,
        data : imageData,
        size: file.size
    };

    return { file: file, data:data };
}

FileUploader.getDropProperties = function(e){

    var file = e.originalEvent.dataTransfer.files[0];

    var imageName = file.name;
    var imageData = e.originalEvent.dataTransfer.result;

    var data = {
        name: imageName,
        data : imageData,
        size: file.size
    };

    return { file: file, data:data };
}


FileUploader.showProgressPercent = function(data, view){

    view.$el.find('.progress-bar').fadeIn(500);
    var percentage = parseInt( data.percent );
    view.$el.find('.progress-bar-text').text(_lang('ADD_SOUND_FILE_NAME_LOADING') + ' ' + percentage+'%');
    view.$el.find('.progress-bar-inner').css('width',  percentage +'%');
}

FileUploader.hideProgressPercent = function( data, view ){

    view.$el.find('.progress-bar-text').text(_lang('ADD_SOUND_FILE_NAME_LOADING') + ' 100%');
    view.$el.find('.progress-bar-inner').css('width',  '100%');

    setTimeout(function() {
        view.$el.find('.progress-bar').fadeOut(500, function(){ /*_that.render()*/ });
    }, 500);
}


FileUploader.createPublishIconLoader = function( path, model, view ){

    var exts = view.getExtensionArray();


    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){

            var fileFileUploader = new PublishIconFileUploader();

            fileFileUploader.setView(model);
            fileFileUploader.setView2(view);

            return fileFileUploader;
        }
    };

    return undefined;
}

FileUploader.createPublishBannerIconLoader = function( path, model, view ){

    var exts = view.getExtensionArray();


    for (var i = 0; i < exts.length; i++) {
        var ext = exts[i];
        var re = new RegExp("^.*\." + ext + "$");

        if( re.test( path ) ){

            var fileFileUploader = new PublishBannerIconFileUploader();

            fileFileUploader.setView(model);
            fileFileUploader.setView2(view);

            return fileFileUploader;
        }
    };

    return undefined;
}


FileUploader.prototype.componentIsDeleted = function(){

    return  this.componentModle.isDeleted;
}



