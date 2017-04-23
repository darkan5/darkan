FileUploader = require('./file-uploader.js');

module.exports = PublishIconFileUploader;

var path = require('path');
var fs = require('fs.extra');

function PublishIconFileUploader(){

    this.targetFolder = 'thumb';
}

PublishIconFileUploader.prototype = new FileUploader();

PublishIconFileUploader.prototype.getExtensionArray = function( ){

    return ['jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg'];
}

PublishIconFileUploader.prototype.createDirPath = function( pageID, actionkey){

    var dir;

    try {

        dir = path.join(this.DIRNAME,
            this.userId,
            this.projectId,
            this.targetFolder);



    } catch (ex) {

    } finally {
        return dir;
    }
}

PublishIconFileUploader.prototype.copyFileToHistory = function(filePath){
    // Epty function
}