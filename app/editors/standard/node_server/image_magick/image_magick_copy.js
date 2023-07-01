module.exports = ImageMagick;

var path = require('path');
var fs = require('fs.extra');
var fse = require('fs-extra');
var Project = require('../project/project.js');
//var PDFImage = require("pdf-image").PDFImage;
var nodeDir = require('node-dir');
var ConfigController = require('../config_controller/config_controller.js');

var im = require('imagemagick');
var exec = require('child_process').exec;

//var pngquant = require('node-pngquant-native');
//Użuć innej biblioteki niż pngquant
var pngquant = {};

var Jimp = require("jimp");
const { threadId } = require('worker_threads');


function ImageMagick(socket) {
    this.socket = socket;
    // this.DIRNAME = path.join(__dirname, '../','../', 'projects');
    this.DIRNAME = ConfigController.get('PROJECTS_PATH');
    this.libraryPath = ConfigController.get('LIBRARY_PATH');
    this.canCreateThumb = true;
    this.history_enabled = ConfigController.get('HISTORY_ENABLED', false);
}


ImageMagick.prototype.cropImage = function( data, onResult, onFault ) {

    var userID = this.socket.ownerId.toString();
    var projectID = this.socket.myRoom.toString();

    var filePath = path.join(this.DIRNAME, userID, projectID, 'pre', 'exported_view', data.link);

    if(fs.existsSync(filePath)){
        this.copyFileToHistory(filePath);
    }

    var cropCoords = data.cropCoords;
    var cropCoordsString = cropCoords.w + 'x' + cropCoords.h + '+' + cropCoords.x + '+' + cropCoords.y;


    Jimp.read(filePath, function (err, image) {

        if(err){
            onFault({ error: 'Crop image fault crop', err:err });
        }

        console.log('Start crop image', cropCoords);

        image.crop( cropCoords.x, cropCoords.y, cropCoords.w, cropCoords.h );

        image.write(filePath, function(){

            // On save

            var extension = path.extname(filePath);
            var name = path.basename(filePath, extension);
            var dir = path.dirname(filePath);

            var newFileName = new Date().getTime().toString() + extension;
            var newFilePath =  path.join(dir, newFileName);

            console.log('rename file');
            console.log('filePath', filePath);
            console.log('newFilePath', newFilePath);

            fse.renameSync(filePath, newFilePath);

            onResult({ cropCoordsString: cropCoordsString, newFileName:newFileName }); 

        }); 

        
    });
    

    

    // im.convert([filePath, '-crop', cropCoordsString, filePath],
    //     function(err, stdout){
    //         if (!err){

    //             try{

    //                 var extension = path.extname(filePath);
    //                 var name = path.basename(filePath, extension);
    //                 var dir = path.dirname(filePath);

    //                 var newFileName = new Date().getTime().toString() + extension;
    //                 var newFilePath =  path.join(dir, newFileName);

    //                 console.log('rename file');
    //                 console.log('filePath', filePath);
    //                 console.log('newFilePath', newFilePath);

    //                 fse.renameSync(filePath, newFilePath);

    //                 onResult({ cropCoordsString: cropCoordsString, newFileName:newFileName });

    //             }catch(ex){
    //                 onFault({ error: 'Crop image fault rename', ex:ex });
    //             }

    //         }else{
    //             onFault({ error: 'Crop image fault crop', err:err });
    //         }
    //     });

};

ImageMagick.prototype.copyFileToHistory = function(filePath){

    if (!this.history_enabled) {
        return
    }

    
    try{
    
        var sourcePath = filePath;
        var destPath = filePath.replace('pre', 'history');

        if(!fs.existsSync(destPath)){
            fse.copySync(sourcePath, destPath);
        }  

    }catch(ex){

    }
}

ImageMagick.prototype.resizeImage = function( data, onResult, onFault ) {

    var userID = this.socket.ownerId.toString();
    var projectID = this.socket.myRoom.toString();
    var pageID = data.pageID.toString();
    var actionkey = data.actionkey;
    var fileName = data.fileName;
    var extFileName = fileName.split('.').pop().toLowerCase();

    var width = parseInt(data.width);
    var height = parseInt(data.height);

    var fileDir = path.join(this.DIRNAME, userID, projectID, 'pre', 'exported_view', pageID, 'images', actionkey);
    var filePath = path.join(fileDir, fileName);
    var fileMinPath = path.join(fileDir, 'min.' + extFileName);

    // console.log('ta to jest jest resizeImage, min file name: ', 'min.' + extFileName);

    // onResult({});

    // if(extFileName == 'png'){

    //     im.convert([filePath, '-resize', width + 'x' + height + '\!', fileMinPath],

    //         function(err, stdout){
    //             if (!err){
  
    //                 fs.readFile(fileMinPath, function (err, buffer) {
    //                     if (err) {
    //                         return;
    //                     }
    //                     var resBuffer = pngquant.compress(buffer, {
    //                         "speed": 1 //1 ~ 11 
    //                     });

    //                     fs.writeFile(fileMinPath, resBuffer, {
    //                       flags: 'wb'
    //                     }, function(err){});
    //                 });

    //                 onResult({});
    //             }
    //     });

    // }else{

    //     im.convert([filePath, '-resize', width + 'x' + height + '\!', fileMinPath],

    //         function(err, stdout){
    //             if (!err){
    //                 onResult({});
    //             }
    //     });
    // }

    var minFile = fileMinPath;

    if(extFileName == 'png'){

        Jimp.read(minFile).then(function (lenna) {
            lenna.resize(width, height)
                 .quality(60)                 // set JPEG quality 
                 .write(minFile); // save 

                 onResult({});

        }).catch(function (err) {
            console.error(err);
        });

    }else{

        Jimp.read(minFile).then(function (lenna) {
            lenna.resize(width, height)
                 .write(minFile); // save 

                 onResult({});

        }).catch(function (err) {
            console.error(err);
        });
    }

    
};

ImageMagick.prototype.getImageSize = function( data, onResult, onFault ) {

    var userID = this.socket.ownerId.toString();
    var projectID = this.socket.myRoom.toString();
    var pageID = data.pageID.toString();
    var actionkey = data.actionkey;
    var fileName = data.fileName;

    var fileDir = path.join(this.DIRNAME, userID, projectID, 'pre', 'exported_view', pageID, 'images', actionkey);
    var filePath = path.join(fileDir, fileName);

    // onResult({});

    // console.log('getImageSize');

    try {
        im.identify(['-format', '%[fx:w]x%[fx:h]', filePath],
        function(err, stdout){
            if (!err){

                console.log('size: ' + stdout);
                onResult({ size: stdout });
            }
        });
    } catch(err) {
        console.log('err');
        console.log(err);
    }
};  

ImageMagick.prototype.copyLibraryFileToImage = function( data, onResult, onFault ){
    var _that = this;

    var statuses = [];
    var errors = [];
    console.log('DANE Z BIBLIO -----------------: ');
console.log(data);

    var userID = this.socket.ownerId.toString();
    var projectID = this.socket.myRoom.toString();
    var pageID = data.pageID.toString();
    var itemDir = data.itemDir;
    var fileName = itemDir.split('/').pop();
    var actionkey = data.actionkey;

    var libraryFilePath = path.join(this.libraryPath, itemDir);
    var imageFileDir = path.join(this.DIRNAME, userID, projectID, 'pre', 'exported_view', pageID, 'images', actionkey);
    var imageFilePath = path.join(this.DIRNAME, userID, projectID, 'pre', 'exported_view', pageID, 'images', actionkey, fileName);
    var oldFileName = data.oldFileName;

    var extFileName = fileName.split('.').pop().toLowerCase();

    var _oldFileName = oldFileName.split('/');

    if (_oldFileName.length > 1) {
        oldFileName = '';
    }


    try {

        fs.mkdirRecursiveSync(imageFileDir);

        if (oldFileName !== '') {

            var oldFileNamePath = path.join(imageFileDir, oldFileName);

            if(fs.existsSync(oldFileNamePath)){
                fs.unlinkSync(oldFileNamePath);
            }
            
        }
        console.log('kopiuje --------------------- START!!!!!!');
        // var file = imageFilePathl
        // var extFileName = file.split('.').pop().toLowerCase();
        // var pathN = path.dirname(file);
        // var minFile = path.join(pathN, 'min.' + extFileName);
        //
        // if(extFileName == 'png'){
        //
        //     Jimp.read(file).then(function (lenna) {
        //         lenna.resize(width, height)
        //             .quality(60)                 // set JPEG quality
        //              .write(file); // save
        //     }).catch(function (err) {
        //         console.error(err);
        //     });
        //
        //     fse.copySync(file, minFile);
        //
        // }else{
        //     fs.copy(file, minFile);
        // }
        //
        // onResult({ fileName: fileName, size: 0 });

        fs.copy(libraryFilePath, imageFilePath, { replace: true }, function(err) {

            if (err) {

                console.log('Error copy image ', err);
                onFault({error:'error', err:err });

            } else {

                //onResult({ fileName: fileName });

                im.identify(['-format', '%[fx:w]x%[fx:h]', imageFilePath],
                    function(err, stdout){
                        if (!err){

                            var file = imageFilePath;

                            var pathN = path.dirname(file);
                            var minFile = path.join(pathN, 'min.' + extFileName);


                            if(extFileName == 'png'){

                                var buffer = fs.readFileSync(file);
                                var resBuffer = pngquant.compress(buffer, {
                                    "speed": 1 //1 ~ 11
                                });
                                fs.writeFileSync(file, resBuffer);
                            }

                            fs.copy(file, minFile);

                            onResult({ fileName: fileName, size: stdout });

                            console.log('----------------end copy library to image');

                        } else {
                            console.log('ERROR copyLibraryFileToImage');
                            console.log(err);
                        }
                    });

            }
        });

    } catch(e) {
        onFault({error:'error', errorData:e});
    }


}