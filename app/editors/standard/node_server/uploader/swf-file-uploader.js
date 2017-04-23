FileUploader = require('./file-uploader.js');

module.exports = SwfFileUploader;

var path = require('path');
var fs = require('fs.extra');

function SwfFileUploader(){

    this.targetFolder = 'swf';
}

SwfFileUploader.prototype = new FileUploader();

SwfFileUploader.prototype.getExtensionArray = function( ){

    return ['swf'];
}