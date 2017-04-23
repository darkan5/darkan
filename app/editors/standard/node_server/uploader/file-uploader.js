module.exports = FileUploader;

var Model = require('../libs/Model.js');
var path = require('path');
var fs = require('fs.extra');
var fse = require('fs-extra');
var Project = require('../project/project.js');
var ConfigController = require('../config_controller/config_controller.js');
var dateFormat = require('dateformat');


function FileUploader(){

    // this.DIRNAME = path.join(__dirname, '../','../', 'projects');
    this.DIRNAME = ConfigController.get('PROJECTS_PATH');;

    this.targetFolder = 'images';
}

FileUploader.prototype = new Model();

FileUploader.prototype.initialize = function(socket, data, onResult, onFault, onProgress, onComplete){

    var _that = this;

    this.socket = socket;
    this.onProgress = onProgress;
    this.onComplete = onComplete;

    this.userId = this.socket.ownerId.toString();
    this.projectId = this.socket.myRoom.toString();

    try{

        this.data = data;
        this.fileSize = data.size;
        this.fileName = data.name;
        this.actionkey = '' + data.actionkey;
        this.type = data.type;
        this.downloaded = 0;
        this.handler = null;
        this.fileBufferSize = 100000; //524288
        this.fileData = "";
        this.componentType = data.componentType;
        this.hash = data.hash;
        console.log('---- data:', data);

        this.pageId = this.getPageID(this.actionkey);


        var dir = this.createDirPath();

        _that.folderDir = dir;

        if(dir == undefined){
            onFault({ status:'Dir is no correct' });
            return;
        }



        _that.on('on-copy-folders-to-hash', function(){

            console.log('on-copy-folders-to-hash');


            //|| this.targetFolder == 'temp/pdf'
            if(_that.targetFolder == 'gallery' || _that.componentType == 'crossword' ){
                _that.createDirAndStartLoading( dir, onResult, onFault);
            }else{

                var result = _that.deleteFolder(dir);

                console.log('result', result);

                if(!result){
                    onFault({ status:'Dir can not by remove' });
                    return;    
                }

                _that.createDirAndStartLoading( dir, onResult, onFault );
     
            }

        });

        _that.copyFoldersToHash(dir, _that.actionkey); 

    }catch (ex){

        console.log("upload ex", ex);

        onFault({ status: "Fault", ex:ex, actionkey:_that.actionkey  });

        this.socket.errorMailer.send(ex);
    }
}

FileUploader.prototype.deleteFolder = function( path ) {

    try{
        fs.removeSync(path);
        return true;

    }catch(ex){
        console.log('Delete folder error', path);
        return false;
    }
}

FileUploader.prototype.createDirAndStartLoading = function( dir, onResult, onFault ){

    var _that = this;
    console.log('createDirAndStartLoading');

    try{



        fs.mkdirRecursiveSync(dir);

        //fs.mkdirs(dir, function (err) {

            //if(!err){

                _that.filePath =  path.join(dir, _that.fileName);

                var allow = _that.checkExt(_that.filePath);

                if(!allow){

                    onResult({ status: "Extension file is no allowed", key:1, actionkey:_that.actionkey });

                    _that.destroy();

                    return;
                }

                switch(_that.targetFolder){
                    case 'gallery':

                        fs.exists(_that.filePath, function(exists){

                            if(exists){

                                var d = new Date();
                                var n = d.getTime();

                                var extension = path.extname(_that.filePath);
                                var name = path.basename(_that.filePath, extension);

                                _that.fileName = name + '-' + n + extension;
                                _that.filePath =  path.join(dir, _that.fileName);
                            }

                            _that.startUploading( onResult, onFault );

                        });

                        break;

                    case 'files':

                        var d = new Date();
                            

                        var n = dateFormat(d, "yyyy-mm-dd hh-MM-ss");

                        console.log('______________n______________', n);

                        var extension = path.extname(_that.filePath);
                        var name = path.basename(_that.filePath, extension);

                        _that.fileName = name + ' - ' + n + extension;
                        _that.filePath =  path.join(dir, _that.fileName);

                        _that.startUploading( onResult, onFault );

                        break;

                    default:

                        if(_that.componentType == 'crossword'){


                            var opts =  _that.data.specialData.opts;
                            console.log('opts', opts);
                            var activeCellID =  _that.data.specialData.activeCellID;
                            var soundFile = opts.soundFile == undefined  ? '' : opts.soundFile;
                            var imageFile = opts.imageFile == undefined  ? '' : opts.imageFile;

                            if(soundFile != ''){
                                var sp =  path.join(dir, soundFile);
                                // _that.deleteFolder( sp );
                                try {
                                    fs.removeSync(sp);
                                } catch(ex) {
                                    console.log('error');
                                }
                            }

                            if(imageFile != ''){
                                var ip =  path.join(dir, imageFile);
                                console.log('ip', ip);
                                // _that.deleteFolder( ip );
                                try {
                                    fs.removeSync(ip);
                                } catch(ex) {
                                    console.log('error');
                                }
                            }


                            var n = activeCellID;

                            var extension = path.extname(_that.filePath);
                            var name = path.basename(_that.filePath, extension);

                            _that.fileName = 'file-' + n + extension;
                            _that.filePath =  path.join(dir, _that.fileName);

                            _that.startUploading( onResult, onFault );

                        }else{
                            
                            var extension = path.extname(_that.filePath);
                            var name = path.basename(_that.filePath, extension);

                            _that.fileName = new Date().getTime().toString() + extension;
                            _that.filePath =  path.join(dir, _that.fileName);

                            _that.startUploading( onResult, onFault );
                        }

                        break;
                }
                
            //}
        //});

    }catch(ex){

        console.log(ex)

        this.socket.errorMailer.send(ex);
    }
}


FileUploader.prototype.startUploading = function( onResult, onFault){

    var _that = this;

    try {

        console.log('startUploading', _that.filePath);

        fs.open( _that.filePath, "a", 0666, function(err, fd){
            if(err){
                console.log(err);

                onFault({ status: "Open file error", err:err, actionkey:_that.actionkey  });
            }
            else{

                _that.handler = fd; //We store the file handler so we can write to it later

                onResult({ status: "Start upload file", actionkey:_that.actionkey });

                _that.upload({ data: "" }, function(){}, function(){} );

            }
        });

    }catch(ex){

        this.socket.errorMailer.send(ex);
    }
}

FileUploader.prototype.getPageID = function( actionkey){
    return actionkey.split('-').pop();
}

FileUploader.prototype.createDirPath = function( pageID, actionkey){

    var dir;

    try {

        dir = path.join(this.DIRNAME,
            this.userId,
            this.projectId,
            'pre',
            'exported_view',
            this.pageId,
            this.targetFolder,
            this.actionkey);

       

    } catch (ex) {

        this.socket.errorMailer.send(ex);
        
    } finally {
        return dir;
    }
}

FileUploader.prototype.upload = function( response){

    var _that = this;

    try{

        _that.downloaded += response.data.length;
        _that.fileData += response.data;
        var isDeleted = response.isDeleted;

        if(isDeleted){
            fs.close(_that.handler);
            fs.removeSync(_that.folderDir);
            _that.destroy();

            console.log('Stop uploading, delete folder, destroy', _that.folderDir);

        }else{

            console.log("uploading... ", response.data.length);

            var percent = parseInt( _that.downloaded / _that.fileSize * 100 );
            var place = _that.downloaded / _that.fileBufferSize;

            _that.onProgress( _that.actionkey, { place:place,  percent:percent } );

            if(_that.downloaded == _that.fileSize) //If File is Fully Uploaded
            {
                fs.writeSync(_that.handler, _that.fileData, null, 'Binary');

                fs.closeSync(_that.handler);

                //_that.copyFoldersToHash(_that.pageId, _that.hash, _that.actionkey);
                _that.copyFileToHistory(_that.filePath);

                _that.onComplete(
                    _that.actionkey,
                    {   percent:100,
                        actionkey:_that.actionkey,
                        type:_that.type,
                        fileName:_that.fileName
                    }
                );

                _that.minimalizeFile(_that.filePath);

                _that.destroy();

            }

        }

    }catch(ex){

        console.log("upload ex", ex);

        this.socket.errorMailer.send(ex);
    }

}


FileUploader.prototype.minimalizeFile = function( file ){
    // To override
}

FileUploader.prototype.copyFileToHistory = function(filePath){
    
    try{
    
        var sourcePath = filePath;
        var destPath = filePath.replace('pre', 'history');

        if(!fs.existsSync(destPath)){
            fse.copySync(sourcePath, destPath);
        }  

    }catch(ex){

    }
}

// FileUploader.prototype.copyFilesToUploadHash = function(dir, filePath, actionkey){
    
//     try{

//         console.log('copyFilesToUploadHash', dir);
//         console.log('filePath', filePath);
//         console.log('actionkey', actionkey);

//         // if(!fs.existsSync(dir)){

//         // }
    
//         // var sourcePath = filePath;
//         // var destPath = filePath.replace('pre', 'history');

//         // fse.copySync(sourcePath, destPath);

//         this.copyFoldersToHash(actionkey);

//     }catch(ex){

//     }
// }

FileUploader.prototype.copyFoldersToHash = function(dir, actionkey){

    var _that = this;

    var pageExportedPath = this.getPageExportedPath();
    var historyPath = this.getHistoryPath();

    console.log('pageExportedPath', pageExportedPath);
    console.log('historyPath', historyPath);

    if(!pageExportedPath){
        return;
    }

    if(!fs.existsSync(pageExportedPath)){

        _that.trigger('on-copy-folders-to-hash', {});
        return;
    }

    if(!historyPath){
        return;
    }


    console.log('copyFoldersToHash', pageExportedPath);

    try{

        nodeDir.paths(pageExportedPath, function(err, paths) {
            if (err) {
                console.log('kritikal error ;]');
                return;
            }

            try {

                for (var i in paths.dirs) {

                    var actualFolder =  paths.dirs[i];
                    var pathN = path.dirname(actualFolder);
                    var dirName = path.basename(actualFolder);
                    var prefixFolder =  path.basename(pathN);

                    var hashPath =  path.join(historyPath, prefixFolder, dirName );

                    console.log('--------------------------');
                    
                    console.log('dirName', dirName);
                    console.log('actionkey', actionkey);


                    console.log('actualFolder', actualFolder);
                    console.log('hashPath', hashPath);
                    
                    console.log('--------------------------');

                    if(dirName == actionkey){

                        console.log('--------------------------');
                        console.log('Find folder OK');
                        console.log('--------------------------');

                        fse.copySync(actualFolder, hashPath);
                    }
                }

                //onResultCopy();

                console.log('copy finished');

                _that.trigger('on-copy-folders-to-hash', {});

                

                
            } catch(error) {
                console.log(error);
            }
        });

    }catch (ex){
        console.log(ex);
    }
}

FileUploader.prototype.getPageExportedPath = function(){

    var dir = false;

    var userId = this.socket.ownerId.toString();
    var projectId = this.socket.myRoom.toString();

    try{
        dir =  path.join(Project.DIRNAME, userId, projectId, 'pre', 'exported_view', this.pageId);
    }catch (ex){
        
    }

    return dir;
}

FileUploader.prototype.getHistoryPath = function(){

    var dir = false;

    var userId = this.socket.ownerId.toString();
    var projectId = this.socket.myRoom.toString();

    try{
        dir =  path.join(Project.DIRNAME, userId, projectId, 'history', 'exported_view', this.pageId);
    }catch (ex){
        
    }

    return dir;
}

// FileUploader.prototype.copyFoldersToHash = function( pageId, hash, actionkey ){

//     var _that = this;

//     if(hash == undefined){
//         return;
//     }

//     var userId = this.socket.ownerId.toString();
//     var projectId = this.socket.myRoom.toString();

//     var pagePath =  path.join(Project.DIRNAME, userId, projectId, 'pre', 'exported_view', pageId);

//     try{

//         var historyPath =  path.join(Project.DIRNAME, userId, projectId, 'history');

//         nodeDir.paths(pagePath, function(err, paths) {
//             if (err) {
//                 console.log('kritikal error ;]');
//                 return;
//             }

//             for (var i in paths.dirs) {

//                 var actualFolder =  paths.dirs[i];

//                 var pathN = path.dirname(actualFolder);
//                 var dirName = path.basename(actualFolder);

//                 var prefixFolder =  path.basename(pathN);

//                 var hashPath =  path.join(historyPath, hash, prefixFolder, dirName );

//                 if(dirName == actionkey){
//                     fse.copySync(actualFolder, hashPath);
//                 }
//             }
//         });

//     }catch (ex){
//         this.socket.errorMailer.send(ex);
//     }
// }

FileUploader.prototype.checkExt = function( path ){

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

        this.socket.errorMailer.send(ex);
    }

    return false;

}

FileUploader.prototype.getExtensionArray = function( ){

    return [];
}

FileUploader.prototype.destroy = function( ){

    delete this.socket[ this.actionkey ];
}





