FileUploader = require('./file-uploader.js');

module.exports = FileFileUploader;

var path = require('path');
var fs = require('fs.extra');

function FileFileUploader(){

    this.targetFolder = 'files';
}

FileFileUploader.prototype = new FileUploader();

FileFileUploader.prototype.getExtensionArray = function( ){

    return ['zip', 'rar', 'pdf', 'jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg', 'mp3',
    		'doc', 'docx', 'xls' , 'xlsx', 'dot', 'ppt', 'pptx', 'assdb', 'mdb' , 'rtf' , 'odt', 'dot', 'mdt', 'accda', 'odt' , 'ods', 'odp'
    	];
}