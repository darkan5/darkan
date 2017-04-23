var path = require('path'),
    fs = require('fs.extra'),
    fse = require('fs-extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    nodeDir = require('node-dir');

var _ = require('underscore'); 

//pngquant = require('node-pngquant-native');
//Użuć innej biblioteki niż pngquant
var pngquant = {};

var Jimp = require("jimp");

module.exports = Psd2Darkan;


function Psd2Darkan() {
    this.listeners = {};
}

Psd2Darkan.ON_EXTRACT_PROGGRESS = "ON_EXTRACT_PROGGRESS";
Psd2Darkan.ON_EXTRACT_COMPLETE = "ON_EXTRACT_COMPLETE";
Psd2Darkan.ON_CONVERT_COMPLETE = "ON_CONVERT_COMPLETE";
Psd2Darkan.ON_CONVERT_FAIL = "ON_CONVERT_FAIL";

Psd2Darkan.prototype.extract = function(DIRNAME, userId, projectId, data, project) {

    var _that = this;

    try{


        this.DIRNAME = DIRNAME;
        this.userId = userId;
        this.projectId = projectId;
        this.project = project;

        var fileName = data.fileName;

        var psdFileDir = path.join(DIRNAME,userId, projectId,'pre','exported_view', 'temp', 'psd');
        var psdFileZipDestination = path.join(psdFileDir, 'output');
        var psdFileZipSource = path.join(psdFileDir, fileName);

        this.removePsdTempFiles([ psdFileZipDestination ]);

        fse.mkdirSync(psdFileZipDestination);

        console.log('fileName', fileName);
        console.log('psdFileZip', psdFileZipSource);

        var DecompressZip = require('decompress-zip');
        var unzipper = new DecompressZip(psdFileZipSource);

        unzipper.on('error', function (err) {
            console.log('Caught an error', err);
            _that.dispatchEvent(Psd2Darkan.ON_CONVERT_FAIL, { err:err });
        });

        unzipper.on('extract', function (log) {
            console.log('Finished extracting');

            //_that.copyFilesToProject(psdFileZipDestination, psdFileZipSource);

            _that.dispatchEvent(Psd2Darkan.ON_EXTRACT_COMPLETE, { log:log, psdFileZipDestination:psdFileZipDestination, psdFileZipSource:psdFileZipSource });
        });

        unzipper.on('progress', function (fileIndex, fileCount) {
            console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);

            _that.dispatchEvent(Psd2Darkan.ON_EXTRACT_PROGGRESS, { fileIndex:fileIndex, fileCount:fileCount });
        });

        unzipper.extract({
            path: psdFileZipDestination,
            filter: function (file) {
                if (file.type == "File") {
                    console.log('file', file);
                }
                
                return file.type !== "SymbolicLink";
            }
        });

    }catch(ex){
        console.log('Error extract file', ex);
        throw ex;
    }
};

// Psd2Darkan.prototype.copyFilesToProject = function(psdFileZipDestination, psdFileZipSource) {

//     var _that = this;

//     try{

//         var __meta__ = this.project.socket.__meta__;

//         var loginHashed = __meta__.loginHashed;



//         console.log('copyFilesToProject');

//         var pageFileSource = path.join(psdFileZipDestination, 'darkan', 'darkan.json');


//         var pageFileContent = Utils.jsonParse(fs.readFileSync(pageFileSource, 'utf8'));

//         console.log(pageFileContent);




//         var optionsFilePath  = path.join(this.DIRNAME, this.userId, this.projectId, 'sitemap', 'options.json');

//         var pageId = this.project.setLastPageID( optionsFilePath );

//         pageFileContent.options.pageid = pageId;

//         var lines = pageFileContent.lines;

//         for (var i = 0; i < lines.length; i++) {
//             var objects = lines[i].objects;

//             for (var j = 0; j < objects.length; j++) {
//                 var object = objects[j];

//                 var oldActionkey = object.actionkey;

//                 var oldActionkeyArr = oldActionkey.split('-');

//                 var newActionkey = loginHashed + '-' + oldActionkeyArr[1]+ '-' + pageId;

//                 object.actionkey = newActionkey;
//             };
//         };

//         //pageFileContent.lines = lines;



//         var pageFileDestination = path.join(this.DIRNAME, this.userId, this.projectId, 'sitemap', '' + pageId + '.json');

//         fs.writeFileSync(pageFileDestination, Utils.jsonStringify(pageFileContent));




//         var mapFilePath = path.join(this.DIRNAME, this.userId, this.projectId, 'sitemap', 'map.json' );
//         var map = Utils.jsonParse(fs.readFileSync(mapFilePath, 'utf8'));
//         map.pages.push(pageId);
//         fs.writeFileSync(mapFilePath, Utils.jsonStringify(map));





//         var pageExportedViewSource = path.join(psdFileZipDestination, 'darkan');
//         var pageExportedViewDestination = path.join(this.DIRNAME, this.userId, this.projectId, 'pre','exported_view', '' + pageId);

//         fs.copyRecursive(pageExportedViewSource, pageExportedViewDestination, function(){

//             nodeDir.paths(pageExportedViewDestination, function(err, paths) {
//                 if (err) {

//                 }

//                 for (var i in paths.dirs) {

//                     var pathN = path.dirname(paths.dirs[i]);
//                     var dirName = path.basename(paths.dirs[i]);
//                     var dirNameArr = dirName.split('-');

//                     if (dirNameArr.length === 3) {

//                         var newDirName = loginHashed + '-' + dirNameArr[1] + '-' + pageId;

//                         var newDirFolder = path.join(pathN, newDirName);

//                         fs.renameSync(paths.dirs[i], newDirFolder);

//                         _that.createMiniatures(newDirFolder);


//                     }
//                 }

//                 fs.removeSync(psdFileZipDestination);
//                 fs.removeSync(psdFileZipSource);

//                 _that.dispatchEvent(Psd2Darkan.ON_CONVERT_COMPLETE,{
//                         message:'Convert complete',
//                         page: pageFileContent,
//                         lastPageId: pageId

//                     });

//                 _that.project.onChangeResult( {
//                     status:'Create blank page ',
//                     name:'page',
//                     event: 'createBlankPage',
//                     page: pageFileContent,
//                     lastPageId:pageId
//                 });

//             });

//         });

//     }catch(ex){

//     }

// };

Psd2Darkan.prototype.changeComponentsActionkeysLoginHash = function(newPage) {

    var __meta__ = this.project.socket.__meta__;

    if(_.isUndefined(__meta__)){
        return false;
    }

    var loginHashed = __meta__.loginHashed;

    if(_.isUndefined(loginHashed)){
        return false;
    }

    var lines = newPage.lines;

    if(_.isUndefined(lines)){
        return false;
    }

    var pageId = newPage.options.pageid;

    if(_.isUndefined(pageId)){
        return false;
    }

    for (var i = 0; i < lines.length; i++) {
        var objects = lines[i].objects;

        for (var j = 0; j < objects.length; j++) {
            var object = objects[j];

            var oldActionkey = object.actionkey;

            var oldActionkeyArr = oldActionkey.split('-');

            var newActionkey = loginHashed + '-' + oldActionkeyArr[1]+ '-' + pageId;

            object.actionkey = newActionkey;
        };
    };

    return true;
}

Psd2Darkan.prototype.copyFilesToPage = function(newPage, projectModel, psdFileZipSource, psdFileZipDestination ) {

    var _that = this;

    var __meta__ = this.project.socket.__meta__;

    if(_.isUndefined(__meta__)){
        return false;
    }

    var loginHashed = __meta__.loginHashed;

    if(_.isUndefined(loginHashed)){
        return false;
    }

    try{

        var pageId = newPage.options.pageid;


        var pageExportedViewSource = path.join(psdFileZipSource, 'darkan');
        var pageExportedViewDestination = newPage.getPageExportedPath();

        fs.copyRecursive(pageExportedViewSource, pageExportedViewDestination, function(){

            nodeDir.paths(pageExportedViewDestination, function(err, paths) {
                if (err) {
                    return;
                }

                for (var i in paths.dirs) {

                    var pathN = path.dirname(paths.dirs[i]);
                    var dirName = path.basename(paths.dirs[i]);
                    var dirNameArr = dirName.split('-');

                    if (dirNameArr.length === 3) {

                        var newDirName = loginHashed + '-' + dirNameArr[1] + '-' + pageId;

                        var newDirFolder = path.join(pathN, newDirName);

                        fs.renameSync(paths.dirs[i], newDirFolder);

                        _that.createMiniatures(newDirFolder);


                    }
                }

                _that.removePsdTempFiles([ psdFileZipDestination, psdFileZipSource ]);

                _that.dispatchEvent(Psd2Darkan.ON_CONVERT_COMPLETE, {newPage:newPage, projectModel:projectModel} );
            });

        });

    }catch(ex){

    }

};

Psd2Darkan.prototype.removePsdTempFiles = function(paths)
{
    for (var i = 0; i < paths.length; i++) {
        var path = paths[i];

        if(path){

            try{

                if(fs.existsSync(path)){
                     fs.removeSync(path);
                }

            }catch(ex){
                console.log('Can not remove psd tem file', path);
            }
        }
    };
}

Psd2Darkan.prototype.dispatchEvent = function(type, params, sender)
{
    var action = this.listeners[type];

    if(action == undefined){
        return;
    }

    var fn = this.listeners[type].fn;
    var context = this.listeners[type].context;

    if(fn == undefined){
        return;
    }

    if(context){
        action.fn.call(context, params, sender);
    }else{
        action.fn(params, sender);
    }   
}

Psd2Darkan.prototype.addEventListener = function(type, callback, context)
{
    this.listeners[type] = {
        fn : callback,
        context : context
    };
}

Psd2Darkan.prototype.removeEventListener = function(type)
{
    delete this.listeners[type];
}


Psd2Darkan.prototype.checkArchive = function( files ){

    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        var rePng = new RegExp("^.*\." + 'png' + "$");
        var reJson = new RegExp("^.*\." + 'json' + "$");

        var allow = false;

        if( rePng.test( file ) || reJson.test( file ) ){
            allow = true;
        }

        if(!allow){
            return false;
        }
    };

    return true;
}

Psd2Darkan.prototype.createMiniatures = function(newDirFolder){

    nodeDir.paths(newDirFolder, function(err, paths) {
        if (err) {
            return;
        }

        //console.log('paths.files', paths.files);

        for (var i in paths.files) {

            var file = paths.files[i];
            var pathN = path.dirname(file);
            var minFile = path.join(pathN, 'min.png');

            console.log('file', file);
            console.log('minFile', minFile);


            // var buffer = fs.readFileSync(file);  
            // var resBuffer = pngquant.compress(buffer, {
            //     "speed": 1 //1 ~ 11 
            // });
            // fs.writeFileSync(file, resBuffer);

            Jimp.read(file).then(function (lenna) {
                lenna.quality(60)                 // set JPEG quality 
                     .write(file); // save 
            }).catch(function (err) {
                console.error(err);

                fs.copy(file, minFile);
            });

        }
    });
}
