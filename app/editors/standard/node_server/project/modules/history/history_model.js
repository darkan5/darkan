var Model = require('../../../libs/Model.js');
var Utils = require('../../../utils/Utils.js');
var path = require('path');
var fs = require('fs.extra');
var fse = require('fs-extra');
var _ = require('underscore');
var nodeDir = require('node-dir');
var ProjectModel = require('../../../project/modules/project/s_project_model.js');
var PageModel = require('../../../project/modules/pages/s_page_model.js');
var CopyHistoryFiles = require('../../../project/modules/history/copy_history_files.js');
var ConfigController = require('../../../config_controller/config_controller.js');
//var pngquant = require('node-pngquant-native');
//Użuć innej biblioteki niż pngquant
var pngquant = {};

var Jimp = require("jimp");




module.exports = HistoryModel;


function HistoryModel(options) {

    var _that = this;

    this.listeners = {};

    this.index = -1;
    this.deleteIndex = -1;

    this.actions = [];
    this.projectCopied = false;

    options = options || {};
    this.updateOptions(options);

    this.history_enabled = ConfigController.get('HISTORY_ENABLED', false);
}

HistoryModel.prototype = new Model();

HistoryModel.prototype.add = function(action, params){

    if (!this.history_enabled) {
        return false
    }

    var _that = this;

    var meta = this.project.socket.__meta__;


    params = params || {};

    this.getDataFromFile();

    var isDeleted = this.deleteHistoryItemsAfterIndex(meta);

    // if(isDeleted){
    //     this.onChangeHistoryResult({
    //         event:'deleteSitempas',
    //         actions:this.actions
    //     }); 
    // }


    switch(action){

        case 'onProjectLoaded':

            this.copyHistoryFiles.copySitemaps(action, this.actions, params, meta);

            break;

        // Not working!!!
        // case 'updateComponents':
        // case 'addComponents':
        // case 'cutComponents':
        // case 'deleteComponents':
        // case 'pasteComponents':
        // case 'updatePageOptions':

        //     this.copyHistoryFiles.copySitemapPage(action, this.actions, params, meta);
        
        // break; 

        default :


            this.copyHistoryFiles.copySitemaps(action, this.actions, params, meta);

            break;
   }

   this.deleteIndex = -1;
}

HistoryModel.prototype.goToHistoryItem = function(data, onResult, onFault){

    if (!this.history_enabled) {
        return false
    }

    var _that = this;

    var id = parseInt(data.id);

    if(!_.isNumber(id)){
        onFault({ status:'Id is not a number' });
        return;
    }

    this.deleteIndex = id;

    console.log('------------------------------');
    console.log('id', id);
    

    this.getDataFromFile();

    //var action =  this.actions[id];
    var action =  _.findWhere(this.actions, { id:id });

    console.log('action', action);
    console.log('------------------------------');

    //console.log('id', id);
    //console.log('action', action);
    //console.log('this.actions', this.actions.length);

    if(!action){
        onFault({ status:'No action!' });
        return;
    }

    var direction = data.direction;

    console.log('direction', direction);

    var login = this.socket.__meta__.login;

    if(!login){
        return false;
    }

    if(direction == 'back'){



        var userActions = _.where(this.actions, {login:login});
        var aids = _.pluck( userActions, 'id');
        var index = aids.indexOf(action.id);

        if(index === -1){
            return false;
        }

        backAction = userActions[index-1] || {};
        nowAction = userActions[index+1] || {};

        // for (var i = 0; i < this.actions.length; i++) {
        //     var a = this.actions[i];

        //     if(a.id > action.id && a.login == action.login){
        //         backAction = a;
        //         break;
        //     }
        // };

        // for (var i = 0; i < this.actions.length; i++) {
        //     var a = this.actions[i];

        //     if(a.id == action.id && a.login == action.login){
        //         nowAction = a;
        //         break;
        //     }
        // };

        console.log('backAction', backAction);
        console.log('nowAction', nowAction);
        console.log('action', action);

        if(this.isPageAction(backAction.action) && this.isPageAction(action.action) && this.isPageAction(nowAction.action)){

            console.log('is page action');

            this.copyHistoryFiles.copyBackPage(id, action, nowAction);


        }else{
            this.copyHistoryFiles.copyBackSitemap(id, action, nowAction);
        }


    }else if(direction == 'prev'){

        var userActions = _.where(this.actions, {login:login});
        var aids = _.pluck( userActions, 'id');
        var index = aids.indexOf(action.id);

        if(index === -1){
            return false;
        }

        nextAction = userActions[index+1] || {};
        nowAction = userActions[index-1] || {};

        // for (var i = 0; i < this.actions.length; i++) {
        //     var a = this.actions[i];

        //     if(a.id < action.id && a.login == action.login){
        //         nextAction = a;
        //         break
        //     }
        // };

        // for (var i = 0; i < this.actions.length; i++) {
        //     var a = this.actions[i];

        //     if(a.id == action.id && a.login == action.login){
        //         nowAction = a;
        //         break
        //     }
        // };

        console.log('nextAction', nextAction);
        console.log('nowAction', nowAction);
        console.log('action', action);

        if(this.isPageAction(nextAction.action) && this.isPageAction(action.action) && this.isPageAction(nowAction.action)){

            console.log('is page action');

            this.copyHistoryFiles.copyBackPage(id, action, action);


        }else{
            this.copyHistoryFiles.copyBackSitemap(id, action, action);
        }

    }else{
        this.copyHistoryFiles.copyBackSitemap(id, action, action);
    }



    
}

HistoryModel.prototype.isPageAction = function( action ) {

    var pageActions = ['updateComponents','addComponents','cutComponents','deleteComponents','pasteComponents','updatePageOptions'];

    return pageActions.indexOf(action) !== -1 ? true : false;
}

HistoryModel.prototype.deleteFolder = function( path ) {

    try{
        fs.removeSync(path);
        return true;

    }catch(ex){
        console.log('Delete folder error', path);
        return false;
    }
}

HistoryModel.prototype.generateHistoryItem = function(data){

    var action = data.action;
    var params = data.params;

    var id = data.index;

    var login = data.meta.login;

    console.log('generateHistoryItem login', login);

    var date = this.getDateTime();
    var historyItem = { action:action, login:login, date:date, id:id, params:params };

    return historyItem;
}

HistoryModel.prototype.getDataFromFile = function(){

    if (fs.existsSync(this.filePath)) {
        var options = Utils.jsonParse(fs.readFileSync(this.filePath, 'utf8'));
        this.updateOptions(options);
    }else{

        console.log('History file path not exist');
    }
}



HistoryModel.prototype.copyLoadedProject = function(){

}

HistoryModel.prototype.deleteHistoryItemsAfterIndex = function(meta){

    var _that = this;

    //console.log('this.deleteIndex', this.deleteIndex);

    


    var userActions = _.filter(this.actions, function(action){

        return (action.login == meta.login); 
    });

    
    var max = 20;

    var actionsToRemove = [];

    if(this.deleteIndex != -1){
        var aids = _.pluck( userActions, 'id');
        var index = aids.indexOf(this.deleteIndex);
        
        actionsToRemove = _.last(userActions, (userActions.length - (index+1)));
        userActions = _.first(userActions, index);
    }

    // console.log('userActions', userActions);
    // console.log('userActions.length', userActions.length);
    // console.log('delta', userActions.length - max);


    if(userActions.length > max){
        actionsToRemove = _.first(userActions, (userActions.length - max));
    }

    console.log('actionsToRemove', actionsToRemove);
    console.log('actionsToRemove.length', actionsToRemove.length);


    var toRemove = _.pluck( actionsToRemove, 'id');

    console.log('toRemove', toRemove);

    for (var i = 0; i < toRemove.length; i++) {
        var id = toRemove[i];

        for (var j = 0; j < this.actions.length; j++) {
            var action = this.actions[j];

            var actionId = action.id;

            if(actionId == id){
                this.actions.splice(j, 1);
                break;
            }
        }
    };

    //console.log('toRemove', toRemove);
    //console.log('this.actions', this.actions);

    // var toRemove = [];

    // for (var i = 0; i < this.actions.length; i++) {
    //     var action = this.actions[i];

    //     //console.log('d action', action);

    //     if(action.id > this.deleteIndex){
    //         toRemove.push(action.id);
    //     }
    // };

    // for (var i = 0; i < toRemove.length; i++) {
    //     var index = toRemove[i];
    //     this.actions.pop();
    // }

    var remove = toRemove.length > 0 ? true : false;

    if(remove){
        this.copyHistoryFiles.deleteSitemaps(toRemove);
    }

    this.save();

    return remove;
}

HistoryModel.prototype.getDateTime = function(){
    var date = new Date();
    var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
    return formattedDate;
}

HistoryModel.prototype.copyPageFiles = function(){

}

HistoryModel.get = function(params, project){

	var historyModel = new HistoryModel();

	params = params || {};

	if(params.DIRNAME == undefined ||
		params.userId == undefined ||
		params.projectId == undefined || 
		params.socket == undefined){
		return historyModel;
	}

	var projectDir = path.join(params.DIRNAME, params.userId, params.projectId);

	var dirname  = path.join(projectDir, 'history');
 	var filePath = path.join(dirname, 'history.json' );

    if (!fs.existsSync(dirname)){
        fs.mkdirSync(dirname);
    }

    fs.chownSync(dirname, 31, 31);

    var exists = fs.existsSync(filePath);

    if (exists) {
    	var options = Utils.jsonParse(fs.readFileSync(filePath, 'utf8'));
        historyModel.updateOptions(options);
    }else{

        var options = Utils.jsonStringify({});
        fs.writeFileSync(filePath, options);
    }

    historyModel.projectDir = projectDir;
    historyModel.dirname = dirname;
    historyModel.filePath = filePath;
    historyModel.DIRNAME = params.DIRNAME;
    historyModel.userId = params.userId;
    historyModel.projectId = params.projectId;
    historyModel.project = project;
    historyModel.socket = params.socket;

    historyModel.copyHistoryFiles = historyModel.createCopier({ projectDir:projectDir, dirname:dirname });

    return historyModel;
	
}

HistoryModel.prototype.createCopier = function(options){

    var _that = this;

    var copyHistoryFiles = new CopyHistoryFiles(options);
    // copyHistoryFiles.on('onCopyAllProjectFiles', function(e){

    //     _that.projectCopied = true;

    //     var historyItem = _that.generateHistoryItem(e);

    //     _that.actions.push(historyItem);

    //     if(!_that.project){ return; };
    //     if(!_that.onChangeHistoryResult){ return; };

    //     _that.onChangeHistoryResult({
    //         event:'loadHistory',
    //         actions:_that.actions
    //     });

    //     _that.save();
    // });

    copyHistoryFiles.on('onCopySitemaps', function(e){

        _that.getDataFromFile();

        var historyItem = _that.generateHistoryItem(e);

        _that.actions.push(historyItem);

        //console.log('onCopySitemaps actions', _that.actions);

        if(!_that.project){ return; };
        if(!_that.onChangeHistoryResult){ return; };

        if(e.action == 'onProjectLoaded'){

            _that.onChangeHistoryResult({
                event:'loadHistory',
                actions:_that.actions
            });
            
        }else{
            _that.onChangeHistoryResult({
                event:'addItem',
                //action:historyItem,
                actions:_that.actions
            });
        }

        

        _that.save();
    });

    // copyHistoryFiles.on('onCopySitemapPage', function(e){

    //     _that.getDataFromFile();

    //     var historyItem = _that.generateHistoryItem(e);

    //     _that.actions.push(historyItem);

    //     //console.log('onCopySitemaps actions', _that.actions);

    //     if(!_that.project){ return; };
    //     if(!_that.onChangeHistoryResult){ return; };

    //     _that.onChangeHistoryResult({
    //         event:'addItem',
    //         action:historyItem
    //     });

    //     _that.save();
    // });

    

    copyHistoryFiles.on('onCopyBackPage', function(e){

        if(!_that.project){ return; };
        if(!_that.onChangeHistoryResult){ return; };

        console.log('e', e);

        var params = e.nowAction.params || {};
        var pageId = parseInt(params.pageId);

        console.log('pageId', pageId);

        if(!_.isNumber(pageId)){

            console.log('no page id');

            return false;
        }

        var pageModel = new PageModel.get({ DIRNAME:_that.DIRNAME, 
                                            userId:_that.userId, 
                                            projectId:_that.projectId,
                                            pageId:pageId.toString(),
                                            socket:_that.project.socket });

        _that.changeBackPageFiles(pageModel);


        _that.onChangeHistoryResult ({ 
            status:"Load project result", 
            event:'goToHistoryItemPage',
            page: pageModel.toJSON(),
            id: e.id,
            action: e.action,
            nowAction: e.nowAction
        });
    });

    copyHistoryFiles.on('onCopyBackSitemap', function(e){

        console.log('____________________________________onCopyBackSitemap', e);

        var projectModel = new ProjectModel.get({ DIRNAME:_that.DIRNAME, 
                                            userId:_that.userId, 
                                            projectId:_that.projectId,
                                            socket:_that.project.socket });

        if(!projectModel){
            return;
        }

        for (var i = 0; i < projectModel.collection.length; i++) {
            var page = projectModel.collection[i];

            _that.changeBackPageFiles(page);

        };

        _that.changeBackProjectFiles(projectModel);

        if(!_that.project){ return; };
        if(!_that.onChangeHistoryResult){ return; };

        _that.onChangeHistoryResult ({ 
            status:"Load project result", 
            event:'goToHistoryItem',
            pages: projectModel.get('collection'), 
            options:projectModel.get('options').toJSON(),
            id: e.id,
            action: e.action,
            nowAction: e.nowAction
        });
    });

    copyHistoryFiles.on('onDeleteSitemaps', function(e){

        
    });

    

    return copyHistoryFiles;
}

HistoryModel.prototype.changeBackProjectFiles = function( projectModel ){

    var _that = this;

    try{

        var projectOptions = projectModel.options;

        audioFileName = projectOptions.soundfilename;

        if(!_.isUndefined(audioFileName)){

            if(audioFileName != ''){

                var audioFilePath  = path.join(_that.projectDir, 'pre', 'exported_view', 'projectsound', audioFileName);

                if(!fs.existsSync(audioFilePath)){

                    var historyAudioFilePath  = path.join(_that.projectDir, 'history', 'exported_view', 'projectsound', audioFileName);


                    if(fs.existsSync(historyAudioFilePath)){

                        var audioDir = path.join(_that.projectDir, 'pre', 'exported_view', 'projectsound');

                        if(fs.existsSync(audioDir)){
                            _that.deleteFolder(audioDir);  
                        }                             

                        fse.copySync(historyAudioFilePath, audioFilePath);
                    }else{
                        console.log('No history file!!!');
                    }
                }
            }else{
                var audioDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'audio', 'projectsound');

                if(fs.existsSync(audioDir)){
                   _that.deleteFolder(audioDir); 
                }                   
            }
        }

    }catch(ex){
        console.log('changeBackProjectFiles fault');
    }

}

HistoryModel.prototype.changeBackPageFiles = function( page ){

    var _that = this;

    // To do: Dopisać sytuację odwrotna, czyli jeżeli plik istnieje, a nie ma go model danych to go usunąć!!!

    try{

        var pageId = '' + page.options.pageid;

        for (var j = 0; j < page.lines.length; j++) {
            var line = page.lines[j];

            for (var k = 0; k < line.objects.length; k++) {
                var object = line.objects[k];


                var actionkey = object.actionkey;
                var type = object.type;

                var imageFileName = object.imageFileName;
                var soundFileName = object['point-sound'];
                var audioFileName = object['sound'];

                if(!_.isUndefined(imageFileName)){

                    if(imageFileName != ''){

                        var imageFilePath  = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'images', actionkey, imageFileName);

                        if(!fs.existsSync(imageFilePath)){

                            var historyImageFilePath  = path.join(_that.projectDir, 'history', 'exported_view', pageId, 'images', actionkey, imageFileName);


                            if(fs.existsSync(historyImageFilePath)){

                                var imageDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'images', actionkey);

                                if(fs.existsSync(imageDir)){
                                    _that.deleteFolder(imageDir);
                                }

                                fse.copySync(historyImageFilePath, imageFilePath);

                                _that.minimalizeFile(imageFilePath);

                            }else{
                                console.log('No history file!!!');
                            }
                        }
                            
                    }else{
                        var imageDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'images', actionkey);
                        if(fs.existsSync(imageDir)){
                            _that.deleteFolder(imageDir);
                        }
                    }
                }

                //console.log('point-sound', object['point-sound']);
                //console.log('soundFileName', soundFileName);

                if(!_.isUndefined(soundFileName)){

                    if(soundFileName != ''){

                        var soundFilePath  = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'sounds', actionkey, soundFileName);

                        if(!fs.existsSync(soundFilePath)){

                            var historySoundFilePath  = path.join(_that.projectDir, 'history', 'exported_view', pageId, 'sounds', actionkey, soundFileName);


                            if(fs.existsSync(historySoundFilePath)){

                                var soundDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'sounds', actionkey);
                                if(fs.existsSync(soundDir)){
                                    _that.deleteFolder(soundDir);
                                }

                                fse.copySync(historySoundFilePath, soundFilePath);
                            }else{
                                console.log('No history file!!!');
                            }
                        }
                            
                    }else{
                        var soundDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'sounds', actionkey);
                        if(fs.existsSync(soundDir)){
                            _that.deleteFolder(soundDir);
                        }
                    }
                }

                if(!_.isUndefined(audioFileName)){

                    if(audioFileName != ''){

                        var audioFilePath  = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'audio', actionkey, audioFileName);

                        if(!fs.existsSync(audioFilePath)){

                            var historyAudioFilePath  = path.join(_that.projectDir, 'history', 'exported_view', pageId, 'audio', actionkey, audioFileName);


                            if(fs.existsSync(historyAudioFilePath)){

                                var audioDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'audio', actionkey);
                                if(fs.existsSync(audioDir)){
                                    _that.deleteFolder(audioDir);  
                                }                              

                                fse.copySync(historyAudioFilePath, audioFilePath);
                            }else{
                                console.log('No history file!!!');
                            }
                        }
                    }else{
                        var audioDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'audio', actionkey);
                        if(fs.existsSync(audioDir)){
                            _that.deleteFolder(audioDir);  
                        }                                

                    }
                }

                switch(type){
                    case 'infopoint-gallery':


                        var galleryFiles = object['galleryFiles'];

                        for (var i = 0; i < galleryFiles.length; i++) {
                            var galleryFile = galleryFiles[i];

                            if(!_.isUndefined(galleryFile)){

                                if(galleryFile != ''){

                                    var galleryFilePath  = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'audio', actionkey, galleryFile);

                                    if(!fs.existsSync(galleryFilePath)){

                                        var historyGalleryFilePath  = path.join(_that.projectDir, 'history', 'exported_view', pageId, 'audio', actionkey, galleryFile);

                                        if(fs.existsSync(historyGalleryFilePath)){

                                            fse.copySync(historyGalleryFilePath, galleryFilePath);
                                        }else{
                                            console.log('No history file!!!');
                                        }
                                    }
                                }
                            }
                        };


                    break;

                    case 'infopoint-download':

                        var fileToDownload = object['fileToDownload'];

                        if(fileToDownload != ''){

                            var fileToDownloadFilePath  = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'files', actionkey, fileToDownload);

                            if(!fs.existsSync(fileToDownloadFilePath)){

                                var historyfileToDownloadFilePath  = path.join(_that.projectDir, 'history', 'exported_view', pageId, 'files', actionkey, fileToDownload);


                                if(fs.existsSync(historyfileToDownloadFilePath)){

                                    var fileToDownloadDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'files', actionkey);
                                    if(fs.existsSync(fileToDownloadDir)){
                                        _that.deleteFolder(fileToDownloadDir);
                                    }

                                    fse.copySync(historyfileToDownloadFilePath, fileToDownloadFilePath);
                                }else{
                                    console.log('No history file!!!');
                                }
                            }
                                
                        }else{
                            var fileToDownloadDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'files', actionkey);
                            if(fs.existsSync(fileToDownloadDir)){
                                _that.deleteFolder(fileToDownloadDir);
                            }
                        }

                    break;

                    case 'crossword':

                    break;  
                }

            };
        };


        var imageFileName = page.options.image;
        var audioFileName = page.options.soundfilename; 


        if(!_.isUndefined(imageFileName)){

            if(imageFileName != ''){

                var imageFilePath  = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'imgpage', imageFileName);

                if(!fs.existsSync(imageFilePath)){

                    var historyImageFilePath  = path.join(_that.projectDir, 'history', 'exported_view', pageId, 'imgpage', imageFileName);


                    if(fs.existsSync(historyImageFilePath)){

                        var imageDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'imgpage');
                        if(fs.existsSync(imageDir)){
                            _that.deleteFolder(imageDir);
                        }

                        fse.copySync(historyImageFilePath, imageFilePath);

                    }else{
                        console.log('No history file!!!');
                    }
                }
                    
            }else{
                var imageDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'imgpage');
                if(fs.existsSync(imageDir)){
                    _that.deleteFolder(imageDir);
                }
            }
        }

        if(!_.isUndefined(audioFileName)){

            if(audioFileName != ''){

                var audioFilePath  = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'audio', 'page', audioFileName);

                if(!fs.existsSync(audioFilePath)){

                    var historyAudioFilePath  = path.join(_that.projectDir, 'history', 'exported_view', pageId, 'audio', 'page', audioFileName);


                    if(fs.existsSync(historyAudioFilePath)){

                        var audioDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'audio', 'page');

                        if(fs.existsSync(audioDir)){
                            _that.deleteFolder(audioDir); 
                        }                               

                        fse.copySync(historyAudioFilePath, audioFilePath);
                    }else{
                        console.log('No history file!!!');
                    }
                }
            }else{
                var audioDir = path.join(_that.projectDir, 'pre', 'exported_view', pageId, 'audio', 'page');

                if(fs.existsSync(audioDir)){
                    _that.deleteFolder(audioDir);   
                }                               

            }
        }

        var historyThumbPath  = path.join(_that.projectDir, 'history', 'exported_view', pageId, 'pagethumb.jpg');
        var historyThumbHtmlPath  = path.join(_that.projectDir, 'history', 'exported_view', pageId, 'pagethumb.html');

        if(fs.existsSync(historyThumbPath)){
            var thumbPath = historyThumbPath.replace('history', 'pre');
            fse.copySync(historyThumbPath, thumbPath);
            console.log('copy thumb path ', thumbPath);
        }

        if(fs.existsSync(historyThumbHtmlPath)){
            var thumbHtmlPath = historyThumbHtmlPath.replace('history', 'pre');
            fse.copySync(historyThumbHtmlPath, thumbHtmlPath);
            console.log('copy html thumb path ', thumbHtmlPath);
        }

    }catch(ex){
        console.log('changeBackPageFiles fault');
    }
}

HistoryModel.prototype.minimalizeFile = function( file ){

    var _that = this;

    var extFileName = file.split('.').pop().toLowerCase();

    var pathN = path.dirname(file);
    var minFile = path.join(pathN, 'min.' + extFileName);

    //fs.copy(file, minFile);

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

        // var buffer = fs.readFileSync(file);
        // var resBuffer = pngquant.compress(buffer, {
        //     "speed": 1 //1 ~ 11 
        // });
        // fs.writeFileSync(file, resBuffer);

    }else{
        fs.copy(file, minFile);
    }

}

HistoryModel.prototype.getFileListDeep = function(dir) {
  return fs.readdirSync(dir).reduce(function(list, file) {
    var name = path.join(dir, file);
    var isDir = fs.statSync(name).isDirectory();
    return list.concat(isDir ? fileList(name) : [name]);
  }, []);
}

HistoryModel.prototype.getFileList = function(dir) {

    var files = [];

    var list = fs.readdirSync(dir);

    for (var i = 0; i < list.length; i++) {
       var file = list[i];
       var name = path.join(dir, file);

       var isDir = fs.statSync(name).isDirectory();

       if(!isDir){
            files.push(name);
       }
    };

    return files;
}

HistoryModel.prototype.toJSON = function(){

    var hideden = ['dirname', 'filePath', 'project', 'projectDir', 'DIRNAME', 'userId', 'projectId', 'deleteIndex', 'copyHistoryFiles', 'listeners'];

    var object = {};

    for (var item in this) {

        if(_.isFunction(this[item])){
            continue;
        } 

        if(hideden.indexOf(item.toString()) !== -1){
            continue;
        }   

        object[item] = this[item];
    };

    return object;
}

HistoryModel.prototype.save = function(){
	if(this.filePath){

        var historyJson = this.toJSON();

        var fileContent = Utils.jsonStringify( historyJson );
        fs.writeFileSync(this.filePath, fileContent);

        return true;
    }
    return false;
}

HistoryModel.prototype.onChangeHistoryResult = function(response){

    var socket = this.socket;

    socket.broadcast.to(socket.myRoom).emit('onHistoryChanged', response);
    socket.emit('onHistoryChanged', response);
}