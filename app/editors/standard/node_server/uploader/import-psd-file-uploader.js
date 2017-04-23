FileUploader = require('./file-uploader.js');

module.exports = ImportPsdFileUploader;

var path = require('path');
var fs = require('fs.extra');

function ImportPsdFileUploader(){

    this.targetFolder = 'temp/psd';
}

ImportPsdFileUploader.prototype = new FileUploader();

ImportPsdFileUploader.prototype.getExtensionArray = function( ){

    return ['.darkan'];
}

ImportPsdFileUploader.prototype.createDirPath = function( pageID, actionkey){

    var dir;

    try {

        dir = path.join(this.DIRNAME,
            this.userId,
            this.projectId,
            'pre',
            'exported_view',
            this.targetFolder);



    } catch (ex) {

    } finally {
        return dir;
    }
}

ImportPsdFileUploader.prototype.copyFileToHistory = function(filePath){
    // Epty function
}
