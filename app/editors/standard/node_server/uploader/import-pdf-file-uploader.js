FileUploader = require('./file-uploader.js');

module.exports = ImportPdfFileUploader;

var path = require('path');
var fs = require('fs.extra');

function ImportPdfFileUploader(){

    this.targetFolder = 'temp/pdf';
}

ImportPdfFileUploader.prototype = new FileUploader();

ImportPdfFileUploader.prototype.getExtensionArray = function( ){

    return ['pdf'];
}

ImportPdfFileUploader.prototype.createDirPath = function( pageID, actionkey){

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

ImportPdfFileUploader.prototype.copyFileToHistory = function(filePath){
    // Epty function
}
