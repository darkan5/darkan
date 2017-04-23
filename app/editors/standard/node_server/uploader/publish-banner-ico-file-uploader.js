FileUploader = require('./file-uploader.js');

module.exports = PublishBannerIconFileUploader;

var path = require('path');
var fs = require('fs.extra');
var Project = require('../project/project.js');
var ConfigController = require('../config_controller/config_controller.js');

function PublishBannerIconFileUploader(){

    this.targetFolder = 'thumb';
}

PublishBannerIconFileUploader.prototype = new FileUploader();

PublishBannerIconFileUploader.prototype.getExtensionArray = function( ){

    return ['jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg'];
}

PublishBannerIconFileUploader.prototype.createDirPath = function( pageID, actionkey){

    var dir;

    try {

        var hash = this.data.hash;

        dir = path.join(ConfigController.get('PUBLICATIONS_PATH'), hash, this.targetFolder);

    } catch (ex) {
        console.log(ex);

    } finally {
        return dir;
    }
}

PublishBannerIconFileUploader.prototype.copyFileToHistory = function(filePath){
    // Epty function
}