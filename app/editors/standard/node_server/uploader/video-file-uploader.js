FileUploader = require('./file-uploader.js');

module.exports = VideoFileUploader;

var path = require('path');
var fs = require('fs.extra');

function VideoFileUploader(){

    this.targetFolder = 'videos';
}

VideoFileUploader.prototype = new FileUploader();

VideoFileUploader.prototype.getExtensionArray = function( ){

    return ['mp4'];
}