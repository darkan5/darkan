module.exports = LinkToImageConverter;
var path = require('path');
var fs = require('fs.extra');
var Project = require('../project/project.js');
var exec = require('child_process').exec;
var fse = require('fs-extra');

//var pngquant = require('node-pngquant-native');
//Użuć innej biblioteki niż pngquant
var pngquant = {};

var Jimp = require("jimp");


function LinkToImageConverter(socket, DIRNAME) {
    this.socket = socket;
}

LinkToImageConverter.prototype.convert = function( data, onResult, onFault ) {

    var _that = this;

    try{

        var imageUrl = data.imageUrl;
        var extension = path.extname(imageUrl);

        if(!this.extensionIsAccept(extension)){
            onFault({ error:'File extension is not allowed' });
            return;
        }

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();
        var pageId = '' + data.pageId;
        var actionkey = '' + data.actionkey;
        this.hash = data.hash;
        this.actionkey = actionkey;
        this.pageId = pageId;

        var taggetPath = "";

        if(data.actionkey == undefined){
            taggetPath  = path.join('imgpage');
        }else{
            taggetPath  = path.join('images', actionkey);
        }


        var name = path.basename(imageUrl, extension);

        var d = new Date();
        var n = d.getTime();

        var fileName = n + extension;

        var phpFilePath = path.join(__dirname, '..', 'php', 'download_dropbox.php');
        var imageDir = path.join(Project.DIRNAME, userId, projectId, 'pre', 'exported_view', pageId, taggetPath);
        var imagePath = path.join(imageDir,  fileName);

        fs.mkdirsSync(imageDir);

        exec('php -f '+ phpFilePath + ' "' + imageUrl + '" "' + imagePath + '"', function (error, stdout, stderr) {

            _that.copyFoldersToHash(_that.pageId, _that.hash, _that.actionkey);

            _that.minimalizeFile(imagePath);

            onResult({ fileName:fileName });

        });

    }catch (ex){
        onFault({ error:'Download file error' });

        this.socket.errorMailer.send(ex);
    }
}

LinkToImageConverter.prototype.extensionIsAccept = function( path ){

    try{
        var exts = this.getExtensionArray();
        //var exts = ['.gif'];

        for (var i = 0; i < exts.length; i++) {
            var ext = exts[i];

            var re = new RegExp("^.*\." + ext + "$");

            if( re.test(path) ){

                return true;
            }
        };

    }catch (ex){
        return false;
    }

    return false;

}

LinkToImageConverter.prototype.getExtensionArray = function( ){

    return ['jpg', 'png', 'gif', 'JPG', 'JPEG', 'jpeg'];
}

LinkToImageConverter.prototype.minimalizeFile = function( file ){

    var _that = this;

    var extFileName = file.split('.').pop().toLowerCase();

    var pathN = path.dirname(file);
    var minFile = path.join(pathN, 'min.' + extFileName);

    // fs.copy(file, minFile);

    // if(extFileName == 'png'){

    //     var buffer = fs.readFileSync(file);
    //     var resBuffer = pngquant.compress(buffer, {
    //         "speed": 1 //1 ~ 11 
    //     });
    //     fs.writeFileSync(file, resBuffer);
    // }

    if(extFileName == 'png'){

        Jimp.read(file).then(function (lenna) {
            lenna.quality(60)                 // set JPEG quality 
                 .write(file); // save 
        }).catch(function (err) {
            console.error(err);
        });

        fse.copySync(file, minFile);

    }else{
        fs.copy(file, minFile);
    }

}

LinkToImageConverter.prototype.copyFoldersToHash = function( pageId, hash, actionkey ){

    var _that = this;

    if(hash == undefined){
        return;
    }

    var userId = this.socket.ownerId.toString();
    var projectId = this.socket.myRoom.toString();

    var pagePath =  path.join(Project.DIRNAME, userId, projectId, 'pre', 'exported_view', pageId);

    try{

        var historyPath =  path.join(Project.DIRNAME, userId, projectId, 'history');

        nodeDir.paths(pagePath, function(err, paths) {
            if (err) {
                console.log('kritikal error ;]');
            }

            for (var i in paths.dirs) {

                var actualFolder =  paths.dirs[i];

                var pathN = path.dirname(actualFolder);
                var dirName = path.basename(actualFolder);

                var prefixFolder =  path.basename(pathN);

                var hashPath =  path.join(historyPath, hash, prefixFolder, dirName );

                if(dirName == actionkey){
                    fse.copySync(actualFolder, hashPath);
                }
            }
        });

    }catch (ex){
        this.socket.errorMailer.send(ex);
    }
}