FileUploader = require('./file-uploader.js');

module.exports = SoundsFileUploader;

var path = require('path');
var fs = require('fs.extra');

function SoundsFileUploader(){

    this.targetFolder = 'sounds';
}

SoundsFileUploader.prototype = new FileUploader();

SoundsFileUploader.prototype.getExtensionArray = function( ){

    return ['mp3'];
}
