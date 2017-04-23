FileUploader = require('./file-uploader.js');

module.exports = ProjectSoundFileUploader;

var path = require('path');
var fs = require('fs.extra');

function ProjectSoundFileUploader(){

    this.targetFolder = 'projectsound';
}

ProjectSoundFileUploader.prototype = new FileUploader();

ProjectSoundFileUploader.prototype.getExtensionArray = function( ){

    return ['mp3'];
}

ProjectSoundFileUploader.prototype.getPageID = function( actionkey){
    return '' + actionkey;
}

ProjectSoundFileUploader.prototype.createDirPath = function( pageID, actionkey){

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