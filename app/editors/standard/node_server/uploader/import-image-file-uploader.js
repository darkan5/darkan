ImageFileUploader = require('./image-file-uploader.js');

module.exports = ImportImageFileUploader;

var path = require('path');
var fs = require('fs.extra');

function ImportImageFileUploader(){

    this.targetFolder = 'imgpage';
}

ImportImageFileUploader.prototype = new ImageFileUploader();

ImportImageFileUploader.prototype.getExtensionArray = function( ){

    return ['jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg'];
}


ImportImageFileUploader.prototype.createDirPath = function( pageID, actionkey){

    var dir;

    try {

        dir = path.join(this.DIRNAME,
            this.userId,
            this.projectId,
            'pre',
            'exported_view',
            this.pageId,
            this.targetFolder);



    } catch (ex) {

    } finally {
        return dir;
    }
}
