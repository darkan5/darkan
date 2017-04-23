var FileUploader = require('./file-uploader.js');
var path = require('path');
var fs = require('fs.extra');
var fse = require('fs-extra');

//var pngquant = require('node-pngquant-native');
//Użuć innej biblioteki niż pngquant
var pngquant = {};

var Jimp = require("jimp");

module.exports = ImageFileUploader;



function ImageFileUploader(){

    this.targetFolder = 'images';
}

ImageFileUploader.prototype = new FileUploader();

ImageFileUploader.prototype.getExtensionArray = function( ){

    return ['jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg'];
}

ImageFileUploader.prototype.minimalizeFile = function( file ){

	var _that = this;

    var extFileName = file.split('.').pop().toLowerCase();

    var pathN = path.dirname(file);
    var minFile = path.join(pathN, 'min.' + extFileName);


    if(extFileName == 'png'){

        Jimp.read(file).then(function (lenna) {
            lenna.quality(60)                 // set JPEG quality 
                 .write(file); // save 
        }).catch(function (err) {
            console.error(err);
        });

        fse.copySync(file, minFile);

        // var buffer = fs.readFileSync(file);
        // var resBuffer = pngquant.compress(buffer, {
        //     "speed": 1 //1 ~ 11 
        // });
        // fs.writeFileSync(file, resBuffer);

    }else{
        fs.copy(file, minFile);
    }

}