FileUploader = require('./file-uploader.js');

module.exports = AudioFileUploader;

var path = require('path');
var fs = require('fs.extra');

function AudioFileUploader(){

    this.targetFolder = 'audio';
}

AudioFileUploader.prototype = new FileUploader();

AudioFileUploader.prototype.getExtensionArray = function( ){

    return ['mp3'];
}
