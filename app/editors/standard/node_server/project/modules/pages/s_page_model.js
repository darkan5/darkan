var Model = require('../../../libs/Model.js');
var TimeleineRow = require('../../../project/modules/timeline/s_timeline_row.js');
var PageOptionsModel = require('../../../project/modules/pages/s_page_options_model.js');
var Utils = require('../../../utils/Utils.js');
var path = require('path');
var fs = require('fs.extra');
var fse = require('fs-extra');
var ConfigController = require('../../../config_controller/config_controller.js');
var _ = require('underscore');
var nodeDir = require('node-dir');
var Timeleine = require('../../../project/modules/timeline/s_timeline.js');

//var pngquant = require('node-pngquant-native');
//Użuć innej biblioteki niż pngquant
var pngquant = {};

var Jimp = require("jimp");

module.exports = PageModel;


function PageModel(options) {

    this.listeners = {};

	this.options = new PageOptionsModel(options); 
	this.lines = [];
    this.filePath = null;
	this.type = 'page';

    this.projectVariables = [];
    this.history_enabled = ConfigController.get('HISTORY_ENABLED', false);
}

PageModel.prototype = new Model();

PageModel.prototype.deletePage = function(){

}

PageModel.prototype.getLines = function(){
	
}

PageModel.prototype.updatePageOptions = function(params){
	var newPageOptions = params.pageOptions;
	var action = params.action;

	switch(action){
 
		case 'delete-page-sound':

			var result = this.deletePageSound();

			break;

		case 'delete-page-background':

			var result = this.deletePageBackground();

			break;		

	}

	for (var item in newPageOptions) {

		//console.log('Changed option param : ' + item + ' to: ', newPageOptions[item]);

		this.options[item] = newPageOptions[item];
	};

	return this.options;

}

PageModel.prototype.updateComponents = function(params){

	var updatedComponents = [];

    var result = this.deleteComponentFile(params);

    if(!result){
        return updatedComponents;
    }

	var components = params.components;
    var action = params.action;

	for (var i = 0; i < components.length; i++) {
		var component = components[i];
		var actionkey = component.actionkey;

		var finedComponent = this.getComponentByByActionkey(actionkey);

		//console.log('Fined component actionkey:', actionkey);

		if(finedComponent){
			for (var item in component) {

				//console.log('Changed param: ' + item + ' to: ', component[item]);

				finedComponent[item] = component[item];
			};

			updatedComponents.push(finedComponent);
		}
	};

	return updatedComponents;
}

PageModel.prototype.validateData = function(data){

    if(!data){
        return false;
    }

    for (var item in data) {
        if(_.isUndefined(data[item])){
            return false;
        }
    };

    return true;
}

PageModel.prototype.deleteComponentFile = function(data){

    try{

        // var result = this.validateData();

        // if(!result){
        //     return false;
        // }

        var pageExportedPath = this.getPageExportedPath();

        if(!pageExportedPath){
            return false;
        }

        var components = data.components;
        var action = data.action;

        var component = components[0];

        if(!component){
            return false;
        }

        switch(action){
     
            case 'delete-file-gallery':

                console.log('-------------------start delete file gallery');
                
                var result = this.deleteGalleryFile(data, pageExportedPath, component);

                console.log('-------------------end delete file gallery');

                return result;

                break;

            case 'delete-file-crossword':

                console.log('-------------------start delete file crossword');
                
                var result = this.deleteFileCrossword(data, pageExportedPath, component);

                console.log('-------------------end delete file crossword');

                return result;

                break;

            case 'delete-file-sound':

                console.log('-------------------start delete file sound');
                
                var result1 = this.deleteSoundFile(data, pageExportedPath, component);
                var result2 = this.deleteAudioFile(data, pageExportedPath, component);

                return (result1 || result2);

                console.log('-------------------end delete file sound');

                break;

            case 'delete-file-file':

                console.log('-------------------start delete file file');
                
                var result = this.deleteFileFile(data, pageExportedPath, component);

                console.log('-------------------end delete file file');

                return result;
                

                break;

            case 'delete-file-video':

                console.log('-------------------start delete file video');
                
                var result = this.deleteFileVideo(data, pageExportedPath, component);

                console.log('-------------------end delete file video');

                return result;

                break;

            default:
                break;      

        }

    }catch(ex){
        console.log('err', ex);
    }

    return true;
}

PageModel.prototype.deleteGalleryFile = function(data, pageExportedPath, component){

    var actionkey = data.actionkey;
    var fileName = data.fileName;

    var filePath  = path.join(pageExportedPath, 'gallery', actionkey, fileName);

    if(!fs.existsSync(filePath)){
        return false;
    }

    var dResult = this.deleteFile(filePath);

    if(dResult){
        // Update model
        var galleryFiles = component.galleryFiles;
        var index = galleryFiles.indexOf(fileName);

        if(index !== -1){
            galleryFiles.splice(index, 1);
        }
    }

    return dResult;
}

PageModel.prototype.deleteAudioFile = function(data, pageExportedPath, component){

    var actionkey = data.actionkey;
    var fileName = data.fileName;

    console.log('actionkey', actionkey);

    var fileName = component.sound;

    var soundFilePath  = path.join(pageExportedPath, 'audio', actionkey, fileName);

    if(!fs.existsSync(soundFilePath)){
        return false;
    }

    var dResult = this.deleteFile(soundFilePath);

    if(dResult){
        component.sound = '';
    }

    return dResult;
}

PageModel.prototype.deleteSoundFile = function(data, pageExportedPath, component){


    var actionkey = data.actionkey;
    var fileName = data.fileName;

    console.log('actionkey', actionkey);

    var fileName = component['point-sound'];

    var soundFilePath  = path.join(pageExportedPath, 'sounds', actionkey, fileName);

    if(!fs.existsSync(soundFilePath)){
        return false;
    }

    var dResult = this.deleteFile(soundFilePath);

    if(dResult){
        component['point-sound'] = '';
    }

    return dResult;
}

PageModel.prototype.deleteFileFile = function(data, pageExportedPath, component){

    var actionkey = data.actionkey;
    var fileName = data.fileName;

    var filePath = path.join(pageExportedPath, 'files', actionkey, fileName);

    console.log('filePath', filePath);

    if(!fs.existsSync(filePath)){
        return false;
    }



    var dResult = this.deleteFile(filePath);

    if(dResult){
        component['fileToDownload'] = '';
    }

     console.log('dResult', dResult);
     console.log('component', component);

    return dResult;
}

PageModel.prototype.deleteFileVideo = function(data, pageExportedPath, component){

    var actionkey = data.actionkey;
    var fileName = data.fileName;

    var filePath = path.join(pageExportedPath, 'videos', actionkey, fileName);

    if(!fs.existsSync(filePath)){
        return false;
    }

    var dResult = this.deleteFile(filePath);

    if(dResult){
        component['videoFileName'] = '';
    }

    return dResult;
}

PageModel.prototype.deleteFileCrossword = function(data, pageExportedPath, component){

    var actionkey = data.actionkey;
    var fileName = data.fileName;
    var type = data.type;

    var filePath;

    if (type == 'image') {
        filePath = path.join(pageExportedPath, 'images', actionkey, fileName);
    } 

    if (type == 'sound') {
        filePath = path.join(pageExportedPath, 'sounds', actionkey, fileName);
    }

    if(filePath != undefined && !fs.existsSync(filePath)){
        return false;
    }

    var dResult =  this.deleteFile(filePath);

    if(dResult){

        var activeCellID = data.activeCellID;
        var objsx = component.objs;

        if(!objsx){
            return false;
        }

        if(!objsx[activeCellID]){
            return false;
        }

        if(!objsx[activeCellID].opts){
            return false;
        }
        
        if (type == 'image') {

            if(!objsx[activeCellID].opts.imageFile){
                return false;
            }

            objsx[activeCellID].opts.imageFile = '';
        } 

        if (type == 'sound') {

            if(!objsx[activeCellID].opts.soundFile){
                return false;
            }

            objsx[activeCellID].opts.soundFile = '';
        }
    }

    return dResult;
}

PageModel.prototype.deleteEmptyLayers = function(){

    var deletedLines = [];

    for (var i = 0; i < this.lines.length -1; i++) {
        var line = this.lines[i];

        if(line.objects.length == 0){
            deletedLines.push(line);
            this.lines.splice(i, 1);
        }
    };

    return deletedLines;
}

PageModel.prototype.getIdsFromLines = function(lines){

    var ids = [];

    for (var i = 0; i < lines.length; i++) {
        var layer = lines[i];

        var id = layer.options.id;

        ids.push(id);
    };

    return ids;
}

PageModel.prototype.pasteComponents = function(data){

    console.log('pasteComponents', data)

    var hash = data.hash; 
    var hashId = hash.hashId; 
    var hashName = hash.hashName; 
    var selectedRowId = data.selectedRowId;

    var pageExportedPath = this.getPageExportedPath();

    var folderStructurePathsArray = this.getFolderStructurePathsArray();
    var historyPath = this.getHistoryPath();
    var hashDir = path.join(historyPath, hashName);
    var hashFile = path.join(hashDir, hashName + '.json');


    var hashModel = this.getDataFromFile(hashFile);

    var hashItem = hashModel.list[hashId];

    if(_.isUndefined(hashItem)){
        return false;
    }

    var components = hashItem.components;
    var projectVariables = hashItem.projectVariables;

    if(_.isUndefined(components)){
        return false;
    }

    components = components.reverse();

    //console.log('hashModel', hashModel);
    //console.log('hashModel.list', hashModel.list);
    //console.log('selectedRowId', selectedRowId);
    //console.log('hashId', hashId);
    //console.log('components', components);

   
    var addResult = this.addComponents({ components:components, selectedRowId:selectedRowId, projectVariables:projectVariables, itsCopy:true });

    //console.log('addResult.components', addResult.components);


    this.copyFoldersFromHash( addResult, hash);

    return false;

}

PageModel.prototype.copyFilesFromHash = function(component){

}

PageModel.prototype.deleteComponents = function(params){

    var deletedComponents = [];

    var components = params.components;
    var action = params.action;

     var lines = this.lines;

    for (var i = 0; i < lines.length; i++) {

        var objects = lines[i].objects;

        for (var k = 0; k < components.length; k++) {
            var dComponent = components[k];

            for (var j = 0; j < objects.length; j++) {
                var component = objects[j];

                if(component.actionkey == dComponent.actionkey){

                    deletedComponents.push(dComponent);

                    objects.splice(j, 1);
                }
            };
        }  
    };

    //console.log('components', components.length);
    //console.log('deletedComponents', deletedComponents.length);

    var emptyLayers = this.deleteEmptyLayers();

    //console.log('emptyLayers', emptyLayers.length);

    var deletedLayersIds = this.getIdsFromLines(emptyLayers);

    //console.log('deletedLayersIds:', deletedLayersIds);

    // switch(action){
 
    //     case 'delete-without-delete-folder':

    //             // TODO: zrobić usuwanie elementów z tablicy this.componentsToDelete
    //             //       zbudować tablice sciezek do usuniecia i wykonac w DISCONNECT 
    //             //       usuwanie tych ciezek z dysku - dopiero jak bedzie dopracowany CTRL+Z
    //             break;

    //     case 'delete':

    //         var result = this.deleteComponentsFiles(deletedComponents);

    //         break;      

    // }

    var result = this.deleteComponentsFiles(deletedComponents);

    return { deletedComponents:deletedComponents, deletedLayersIds:deletedLayersIds };
}

PageModel.prototype.copyFoldersFromHash = function( data, hash){

    console.log('copyFoldersFromHash', data, hash)

    var _that = this;

    var hashId = hash.hashId; 
    var hashName = hash.hashName; 

    if(!_.isString(hashName)){
        return;
    }

    if(!_.isNumber(hashId)){
        return;
    }

    if(!_.isArray(data.components)){
        return;
    }

    var components = data.components;
    var hashId = hashId.toString();

    var pageExportedPath = this.getPageExportedPath();

    var folderStructurePathsArray = this.getFolderStructurePathsArray();
    var historyPath = this.getHistoryPath();
    var hashDir = path.join(historyPath, hashName, hashId);




    var actionKeysMap = data.actionKeysMap;

    console.log('copyFoldersFromHash actionKeysMap', actionKeysMap);



    var exist = fs.existsSync(hashDir);

    if(!exist){

        for (var i = 0; i < components.length; i++) {
            var component = components[i];

            var newActionkey = component.actionkey;
            var oldActionkey = component.oldActionkey;

            _that.changeComponentActionKeys(component, component.oldActionkey, actionKeysMap[component.oldActionkey], actionKeysMap);
        }

        for (var j = 0; j < components.length; j++) {
           delete components[j].oldActionkey;
        }
        
        _that.trigger('onPasteComponents', data);
        return;
    }


    // console.log('------------------------------------------');
    // console.log('copy files: ');

    // for (var i = 0; i < components.length; i++) {
    //     var component = components[i];
    //     component.hashId = parseInt(hashId);
    // };

    //console.log('hashDir', hashDir);

    try{

        nodeDir.paths(hashDir, function(err, paths) {
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
                    

                    for (var j = 0; j < components.length; j++) {

                        var actionkey = components[j].actionkey;
                        var oldActionkey = components[j].oldActionkey;

                        // console.log('------------------------------------------');
                        // console.log('oldActionkey: ' + oldActionkey);
                        // console.log('dirName: ' + dirName);

                        var hashPath =  path.join(pageExportedPath, prefixFolder, actionkey);
    

                        if(dirName == oldActionkey){

                            // console.log('------------------------------------------');
                            // console.log('hashPath: ' + hashPath);
                            //console.log('------------------------------------------');
                            //console.log('actualFolder: ' + actualFolder);

                            fse.copySync(actualFolder, hashPath);
                        }
                    }
                }

                for (var i = 0; i < components.length; i++) {
                    var component = components[i];

                    var newActionkey = component.actionkey;
                    var oldActionkey = component.oldActionkey;

                    _that.changeComponentActionKeys(component, component.oldActionkey, actionKeysMap[component.oldActionkey], actionKeysMap);
                }

                for (var j = 0; j < components.length; j++) {
                   delete components[j].oldActionkey;
                }

                console.log('copy finished');

                _that.trigger('onPasteComponents', data);
                
            } catch(error) {
                console.log(error);
            }
        });

    }catch (ex){
        console.log(ex);
    }
}

PageModel.prototype.copyFoldersToHash = function( data, hashName){

    console.log('copyFoldersToHash', data, hashName)

    var _that = this;

    if(!_.isString(hashName)){
        return;
    }

    var components = data.components;

    var pageExportedPath = this.getPageExportedPath();

    //var folderStructurePathsArray = this.getFolderStructurePathsArray();
    var historyPath = this.getHistoryPath();
    var historyExportedPath = this.getHistoryExportedPath();
    var hashDir = path.join(historyPath, hashName);
    var hashFile = path.join(hashDir, hashName + '.json');

    
    // ToDo: Delete all from historyPath, add this to: start session, end session
    if (!this.history_enabled) {
        var historyPathCopy = path.join(historyPath, 'copy');
        console.log('historyPathCopy', historyPathCopy)
        fse.rmSync(historyPathCopy, { recursive: true, force: true });
        if (!fs.existsSync(historyPathCopy)){
            fs.mkdirSync(historyPathCopy);
        }

        var historyPathDelete = path.join(historyPath, 'delete');
        console.log('historyPathDelete', historyPathDelete)
        fse.rmSync(historyPathDelete, { recursive: true, force: true });
        if (!fs.existsSync(historyPathDelete)){
            fs.mkdirSync(historyPathDelete);
        } 
    }
 
    if (!fs.existsSync(hashDir)){
        fs.mkdirSync(hashDir);
    }

    var hashModel = this.getDataFromFile(hashFile);
    var hashId = hashModel.list.length.toString();

    var hash = {
        hashId:parseInt(hashId),
        hashName:hashName
    }

    //console.log('pageExportedPath', pageExportedPath);

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
                    var hashPath =  path.join(historyPath, hashName, hashId, prefixFolder, dirName);

                    // console.log('actualFolder', actualFolder);
                    // console.log('pathN', pathN);
                    // console.log('dirName', dirName);
                    // console.log('prefixFolder', prefixFolder);
                    // console.log('historyExportedPath', historyExportedPath);

                    for (var j = 0; j < components.length; j++) {

                        var component = components[j];

                        var actionkey = component.actionkey;

                        if(dirName == actionkey){

                            fse.copySync(actualFolder, hashPath);

                            if(hashName == 'cut' || hashName == 'delete'){
                                _that.copyFileToHistory(actualFolder);
                            }
                        }
                    }
                }

                hashModel.list.push({ components:components });

                _that.setDataToFile(hashFile, hashModel);

                console.log('copy finished');

                _that.trigger('onCopyFoldersToHash', {components:components, hash:hash, hashModel:hashModel});
                
            } catch(error) {
                console.log(error);
            }
        });

    }catch (ex){
        console.log(ex);
    }
}

PageModel.prototype.setDataToFile = function(filePath, options){

    var options = options || {};

    var exists = fs.existsSync(filePath);

    if (exists) {
        fs.writeFileSync(filePath, Utils.jsonStringify(options));
    }

    return exists;
}


PageModel.prototype.getDataFromFile = function(filePath){

    var options = {
        list: []
    };

    var exists = fs.existsSync(filePath);

    if (exists) {
        options = Utils.jsonParse(fs.readFileSync(filePath, 'utf8'));
    }else{

        fs.writeFileSync(filePath, Utils.jsonStringify(options));
    }

    return options;
}


PageModel.prototype.deleteComponentsFiles = function( components ){

    var _that = this;

    var folderStructurePathsArray = this.getFolderStructurePathsArray();

    for (var j = 0; j < components.length; j++) {

        var actionkey = components[j].actionkey;

        for (var k = 0; k < folderStructurePathsArray.length; k++) {
            var dir = folderStructurePathsArray[k];

            console.log('delete', actionkey);

            var filePath = path.join(dir, actionkey);
            var result = this.deleteFolder(filePath);
        };
    }

    return true;
}

PageModel.prototype.addComponents = function(params){

	var components = params.components;
	var selectedRowId = params.selectedRowId;

	if(params.components == undefined || params.selectedRowId == undefined){
		return false;
	}

    var itsCopy = params.itsCopy || false;

	//console.log('Get line by id:', selectedRowId);
	//console.log('Lines:', this.lines);

	var line = this.getLineById(selectedRowId);

    if(!line){
        return false;
    }

    var actionKeysMap = {}; 

	
	//console.log('Line before:', line);

	for (var i = 0; i < components.length; i++) {
		var component = components[i];

        if(itsCopy){
            component.oldActionkey = component.actionkey;
        }

		component.actionkey = this.createActionkey();

        if(itsCopy){
            actionKeysMap[component.oldActionkey] = component.actionkey;
        }

        
        if(!itsCopy){
            this.addFilesToComponent(component);
        }

        this.addSpecyficComponentProperites(component);
		
        //line.objects.push(component);
		line.objects.unshift(component);

		//console.log('Add component actionkey:', component.actionkey);
	}

    console.log('actionKeysMap', actionKeysMap);  




	//console.log('Line after:', line);

	var lastLine = _.last(this.lines);

	//console.log('Last line:', lastLine);

	var newLine;

    if(lastLine.objects.length > 0){

        newLine = this.addNewLine();
    }

    var lastLineId = this.getLastLineId();
    var lastComponentId = this.getLastComponentId();


	return { components:components, projectVariables:params.projectVariables, selectedRowId:selectedRowId, newLine:newLine, lastLineId:lastLineId, lastComponentId:lastComponentId, actionKeysMap:actionKeysMap  };
}



PageModel.prototype.addSpecyficComponentProperites = function(component){

    try{

        var type = component.type;

        switch(type){
            case 'timer':

                var a = component.actionkey.split('-');
                timerId = 'timer-' + a[2] + '-' + a[1];
                component.timerId = timerId;

                break;
        }

    }catch(ex){

    }
}

PageModel.prototype.addNewLine = function(){
    var newLineId = this.incrementLastLineId();

    console.log('newLineId:', newLineId);

    newLine = new TimeleineRow();
    newLine.options.id = newLineId;

    console.log('newLine:', newLine);

    this.lines.push( newLine );

    console.log('Add new line:', newLineId);

    return newLine;
}

PageModel.prototype.createActionkey = function(){
    //return __meta__.loginHashed - licznikKomponentow - numerstrony;

    var loginHashed = this.__meta__.loginHashed;
    var lastComponentId = this.incrementlastComponentId();
    var pageid = this.options.pageid;

    var actionkey = loginHashed + '-' + lastComponentId + '-' + pageid;

    
    // actionkey not exists yet, go along
    if (!this.actionkeyExists(actionkey)) {
        console.log('THIS ACTIONKEY NOT EXISTS YET, GO ALONG', actionkey);
        this.setlastComponentId( lastComponentId );
        return actionkey;

    // whoa! this actionkey already exists on stage, make new one
    } else {
        console.log('WHOA! this actionkey already exists on stage, make new one', actionkey);
        this.setlastComponentId( lastComponentId );
        return this.createActionkey();
    }
},

PageModel.prototype.actionkeyExists = function(actionkey) {

    var findExistingActionkey = false;

    for (var i = 0; i < this.lines.length; i++) {
    	var line = this.lines[i];

    	for (var j = 0; j < line.objects.length; j++) {
    		var object = line.objects[j];

    		if(object.actionkey == actionkey){
    			return true;
    		}
    	};
    }; 

    return false;
},

PageModel.prototype.getAllComponents = function(){

    var components = [];

    for (var i = 0; i < this.lines.length; i++) {
    	var line = this.lines[i];

    	for (var j = 0; j < line.objects.length; j++) {
    		var object = line.objects[j];

    		components.push(object);
    	};
    };

    return components;
},


PageModel.prototype.incrementlastComponentId = function(){

    this.options.lastComponentId = this.options.lastComponentId + 1;
    return this.options.lastComponentId;
}

PageModel.prototype.getLastComponentId = function(){
    return this.options.lastComponentId;
}

PageModel.prototype.setlastComponentId = function(lastComponentId){
   this.options.lastComponentId = lastComponentId;
}



PageModel.prototype.incrementLastLineId = function(){

    this.options.lastLineId = this.options.lastLineId + 1;
    return this.options.lastLineId;
}

PageModel.prototype.getLastLineId = function(){
    return this.options.lastLineId;
}

PageModel.prototype.setLastLineId = function(lastLineId){
   this.options.lastLineId = lastLineId;
}

PageModel.prototype.addFilesToComponent = function(component){

	var oneComponent = component;
    var actionkey = oneComponent.actionkey;

    switch (oneComponent.type) {

        case 'infopoint-download':
        case 'infopoint-gallery':
        case 'infopoint-link':
        case 'infopoint-popup':
        case 'infopoint-sound':
        case 'infopoint-soundrecord':
        case 'form-upload':
        //case 'image':

        	console.log('Add files to component', component.type);

            var fileName = oneComponent.type + '.png';

            var pageExportedPath = this.getPageExportedPath();

            if(!pageExportedPath){
            	return false;
            }

            


            var imageFilePath =  path.join(ConfigController.get('APP_IMAGES_PATH'), 'buttons', fileName);

            var copiedFileName = this.generateNewFileName(imageFilePath);

            var copiedImageFilePath =  path.join(pageExportedPath, 'images', actionkey, copiedFileName );

            oneComponent.imageFileName = copiedFileName;

            var exists = fs.existsSync(imageFilePath);

    		if (exists) {


                fse.copySync(imageFilePath, copiedImageFilePath);

                this.copyFileToHistory(copiedImageFilePath);
                
                var file = copiedImageFilePath;

                var extFileName = file.split('.').pop().toLowerCase();

                var pathN = path.dirname(file);
                var minFile = path.join(pathN, 'min.' + extFileName);

                var width = parseInt(oneComponent.width);
                var height = parseInt(oneComponent.height);


                if(extFileName == 'png'){

                    fse.copySync(file, minFile);

                    Jimp.read(file).then(function (lenna) {
                        lenna.quality(60)                 // set JPEG quality 
                             .write(file); // save 
                    }).catch(function (err) {
                        console.error(err);
                    });

                    Jimp.read(minFile).then(function (lenna) {
                        lenna.resize(width, height)  
                            .quality(60)                 // set JPEG quality 
                             .write(minFile); // save 
                    }).catch(function (err) {
                        console.error(err);
                    });

                    

                    // var buffer = fs.readFileSync(file);
                    // var resBuffer = pngquant.compress(buffer, {
                    //     "speed": 1 //1 ~ 11 
                    // });
                    // fs.writeFileSync(file, resBuffer);

                }else{
                    fse.copySync(file, minFile);

                    Jimp.read(minFile).then(function (lenna) {
                        lenna.resize(width, height)  
                             .write(minFile); // save 
                    }).catch(function (err) {
                        console.error(err);
                    });
                }
            }

            break;
    }

    return true;
}

PageModel.prototype.copyFileToHistory = function(filePath){

    if (!this.history_enabled) {
        return
    }

    try{
    
        var sourcePath = filePath;
        var destPath = filePath.replace('pre', 'history');

        fse.copySync(sourcePath, destPath);

    }catch(ex){

    }
}

PageModel.prototype.generateNewFileName = function(filePath){

    var d = new Date();
    var n = d.getTime();

    var extension = path.extname(filePath);
    var name = path.basename(filePath, extension);

    var copiedFileName = name + '-' + n + extension;

    return copiedFileName;
}

PageModel.prototype.getPageExportedPath = function(){

    var dir = false;

    try{
        dir =  path.join(this.projectDir, 'pre', 'exported_view', this.pageId);
    }catch (ex){
        
    }

    return dir;
}

PageModel.prototype.getHistoryPath = function(){

    var dir = false;

    try{
        dir =  path.join(this.projectDir, 'history');
    }catch (ex){
        
    }

    return dir;
}

PageModel.prototype.getHistoryExportedPath = function(){

    var dir = false;

    try{
        dir =  path.join(this.projectDir, 'history', 'exported_view', this.pageId);
    }catch (ex){
        
    }

    return dir;
}

PageModel.prototype.getHistoryExportedPathToDelete = function(){

    var dir = false;

    try{
        dir =  path.join(this.projectDir, 'history', 'exported_view');
    }catch (ex){
        
    }

    return dir;
}

PageModel.prototype.getComponentByByActionkey = function(actionkey){

	var lines = this.lines;

    for (var i = 0; i < lines.length; i++) {

        var objects = lines[i].objects;

        for (var j = 0; j < objects.length; j++) {
        	var component = objects[j];

        	if(component.actionkey == actionkey){
	            return component;
	        }
        }  
    };

    return false;
}

PageModel.prototype.getLineById = function(lineId){

	var lines = this.lines;

    for (var i = 0; i < lines.length; i++) {

        var line = lines[i];

        if(line.options.id == lineId){
            return line;
        }
    };

    return false;
}

PageModel.prototype.save = function(){

	console.log('Save page file:', this.filePath);
	
	if(this.filePath){
		var fileContent = Utils.jsonStringify( this.toJSON() );
    	fs.writeFileSync(this.filePath, fileContent);
    	return true;
	}
	return false;
}

PageModel.prototype.deletePageSound = function(params){

	var pageExportedPath = this.getPageExportedPath();

	if(!pageExportedPath){
    	return false;
    }

	var pageSoundFilesDir  = path.join(pageExportedPath, 'audio', 'page');

    this.copyFileToHistory(pageSoundFilesDir);

	return this.deleteFolder(pageSoundFilesDir);
}

PageModel.prototype.deletePageBackground = function(params){

	var pageExportedPath = this.getPageExportedPath();

	if(!pageExportedPath){
    	return false;
    }

    var pageImageFilesDir  = path.join(pageExportedPath, 'imgpage');

    this.copyFileToHistory(pageImageFilesDir);

    return this.deleteFolder(pageImageFilesDir);
}

PageModel.prototype.deleteFolder = function( path ) {

    try{
        fs.removeSync(path);
        return true;

    }catch(ex){
        console.log('Delete folder error', path);
        return false;
    }
}

PageModel.prototype.deleteFile = function( path ) {

    try{
        fs.unlinkSync(path);
        return true;

    }catch(ex){
        console.log('Delete file error', path);
        return false;
    }
}

PageModel.prototype.createFolder = function( path ){

    try{

        fs.mkdirsSync(path);
        return true;

    }catch(ex){
    	console.log('Create folder error', path);
        return false;
    }
}

PageModel.prototype.deleteExportedFoderIfExist = function(){

    var pageExportedPath = this.getPageExportedPath();

    var exist = fs.existsSync(pageExportedPath);

    console.log('------------------------------ deleteExportedFoderIfExist');
    console.log('pageExportedPath', pageExportedPath);
    console.log('exist', exist);

    if(exist){
        result = this.deleteFolder( pageExportedPath );

        console.log('delete page Folder', result);
    }
}

PageModel.prototype.createPageFolderStructure = function(){

    var _that = this;

    this.deleteExportedFoderIfExist(); 

    var folderStructurePathsArray = this.getFolderStructurePathsArray();

    if(!folderStructurePathsArray){
    	return false;
    }

    for (var i = 0; i < folderStructurePathsArray.length; i++) {
        var dir = folderStructurePathsArray[i];

        this.createFolder(dir);
    };

    return true;
}

PageModel.prototype.getFolderStructurePathsArray = function(){

	var pageExportedPath = this.getPageExportedPath();

	if(!pageExportedPath){
    	return false;
    }

    var arr = [];

    var audioPath =  path.join(pageExportedPath, 'audio');
    var soundsPath =  path.join(pageExportedPath, 'sounds');
    var filePath =  path.join(pageExportedPath, 'files');
    var galleryPath =  path.join(pageExportedPath, 'gallery');
    var imagesPath =  path.join(pageExportedPath, 'images');
    var imgpagePath =  path.join(pageExportedPath, 'imgpage');
    var swfPath =  path.join(pageExportedPath, 'swf');
    var videoPath =  path.join(pageExportedPath, 'videos');
    var thumbPath =  path.join(pageExportedPath, 'thumb');

    arr = [audioPath, soundsPath, filePath, galleryPath, imagesPath, imgpagePath, swfPath, swfPath, videoPath, thumbPath ];

    return arr;
}

PageModel.prototype.toJSON = function(){

	var fillable = ['options', 'lines', 'type'];

	var object = {};

	for (var i = 0; i < fillable.length; i++) {
		var item = fillable[i];

		object[item] = this[item];
	};

	return object;
}


PageModel.get = function(params){

	var pageModel = new PageModel();

	params = params || {};

	if(params.DIRNAME == undefined ||
		params.userId == undefined ||
		params.projectId == undefined ||
		params.pageId == undefined ||
		params.socket == undefined){
		return false;
	}

	var projectDir = path.join(params.DIRNAME, params.userId, params.projectId);
	var sitemapDir  = path.join(projectDir, 'sitemap');

	var pageDir = path.join( sitemapDir, params.pageId);
	var filePath = pageDir + '.json';

	var content = Utils.jsonParse(fs.readFileSync(filePath, 'utf8'));

	pageModel.options = content.options;
	pageModel.lines = content.lines;

	pageModel.pageId = params.pageId;
	pageModel.filePath = filePath;
	pageModel.projectDir = projectDir;
	pageModel.pageDir = pageDir;
	pageModel.__meta__ = params.socket.__meta__;

	return pageModel;
}

PageModel.create = function(params){
	
	var pageModel = new PageModel();

	params = params || {};

	if(params.DIRNAME == undefined ||
		params.userId == undefined ||
		params.projectId == undefined ||
		params.pageId == undefined){
		return false;
	}

	var projectDir = path.join(params.DIRNAME, params.userId, params.projectId);
	var sitemapDir  = path.join(projectDir, 'sitemap');

	var pageDir = path.join( sitemapDir, params.pageId);


	var filePath = pageDir + '.json';

	pageModel.pageId = params.pageId;
	pageModel.filePath = filePath;
	pageModel.projectDir = projectDir;
	pageModel.pageDir = pageDir;
    

	return pageModel;
}

PageModel.prototype.getTimeline = function() {
    return new Timeleine(this.toJSON());
}

// PageModel.prototype.changeComponentActionKeys = function(object, oldActionKey, newActionKey, actionKeysMap) {

//     var _that = this;

//     if (typeof object === 'object') {

//         for (var item in object) {

//             if (typeof object[item] === 'object') {

//                 // podmiana kluczy (actionitem)
//                 if (typeof item === 'string') {

//                     if (actionKeysMap[item] != undefined) {

//                         object[actionKeysMap[item]] = object[item];

//                         delete object[item];

//                         // zmiana w nowym itemu
//                         this.changeComponentActionKeys(object[item], oldActionKey,  newActionKey, actionKeysMap);
//                     }
//                 }

//                 this.changeComponentActionKeys(object[item], oldActionKey, newActionKey, actionKeysMap);

//             } else {

//                 // podmiana wartosci (actionitem)
//                 if (typeof object[item] === 'string') {

//                     var _valArr = object[item].split('-');

//                     if ( _valArr[0].length === 32) {

//                         if (actionKeysMap[object[item]] != undefined) {

//                             object[item] = actionKeysMap[object[item]];
//                         }
//                     }
//                 }
//             }
//         }
//     }
// };

PageModel.prototype.changeComponentActionKeys = function(object, oldPageID, newPageID, actionKeysMap) {



    object = object || {};

    for (var item in object) {

        // console.log('changeComponentActionKeys', item);

        if(_.isString(item)){

            var newActionkey = actionKeysMap[item];

            // console.log('newActionkey', newActionkey)

            if (!_.isUndefined(newActionkey)) {

                object[newActionkey] = _.clone(object[item]);
                delete object[item];

                this.changeComponentActionKeys(object[newActionkey], oldPageID, newPageID, actionKeysMap);
            }    
        }

        var val = object[item];

        if(_.isObject(val)){

            this.changeComponentActionKeys(val, oldPageID, newPageID, actionKeysMap);

        }else{

            if(_.isString(val)){

                var newActionkey = actionKeysMap[val];

                if (!_.isUndefined(newActionkey)) {
                    object[item] = newActionkey;
                }
            }
        } 
    };
};