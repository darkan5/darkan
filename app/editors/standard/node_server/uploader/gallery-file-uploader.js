FileUploader = require('./file-uploader.js');

module.exports = GalleryFileUploader;

var path = require('path');
var fs = require('fs.extra');

function GalleryFileUploader(){

    this.targetFolder = 'gallery';
}

GalleryFileUploader.prototype = new FileUploader();

GalleryFileUploader.prototype.getExtensionArray = function( ){

    return ['jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg'];
}