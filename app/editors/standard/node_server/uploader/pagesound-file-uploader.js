FileUploader = require('./file-uploader.js');

module.exports = PageSoundFileUploader;

var path = require('path');
var fs = require('fs.extra');

function PageSoundFileUploader(){

    this.targetFolder = 'audio/page';
}

PageSoundFileUploader.prototype = new FileUploader();

PageSoundFileUploader.prototype.getExtensionArray = function( ){

    return ['mp3'];
}

PageSoundFileUploader.prototype.getPageID = function( actionkey){
    return '' + actionkey;
}

PageSoundFileUploader.prototype.createDirPath = function( pageID, actionkey){

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