FileUploader = require('./file-uploader.js');

module.exports = PageImageFileUploader;

var path = require('path');
var fs = require('fs.extra');

function PageImageFileUploader(){

    this.targetFolder = 'imgpage';
}

PageImageFileUploader.prototype = new FileUploader();

PageImageFileUploader.prototype.getExtensionArray = function( ){

    return ['jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg'];
}

PageImageFileUploader.prototype.getPageID = function( actionkey){
    return '' + actionkey;
}

PageImageFileUploader.prototype.createDirPath = function( pageID, actionkey){

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