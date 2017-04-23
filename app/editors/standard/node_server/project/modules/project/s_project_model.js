var Model = require('../../../libs/Model.js');
var ProjectOptionsModel = require('../../../project/modules/project/s_projects_options_model.js');
var Utils = require('../../../utils/Utils.js');
var path = require('path');
var fs = require('fs.extra');
var fse = require('fs-extra');
var PageModel = require('../../../project/modules/pages/s_page_model.js');
var PageOptionsModel = require('../../../project/modules/pages/s_page_options_model.js');
var MapModel = require('../../../project/modules/map/s_map_model.js');
var _ = require('underscore');


module.exports = ProjectModel;


function ProjectModel(options) {

    this.listeners = {};

	this.options = new ProjectOptionsModel(options);
    this.collection = [];
	this.mapModel = new MapModel();
}

ProjectModel.prototype = new Model();



ProjectModel.prototype.duplicatePages = function(data, projectModelWhereCopy){

    if(!projectModelWhereCopy){
        return false;
    }

    var pagesToDuplicate = [];

    var duplicatedPagesIds = [];

    var newPagesCollction = [];

    var pagesIds = data.pagesIds;

    this.mappedPagesIdis = {};

    console.log('pagesIds', pagesIds);

    this.projectVariables = [];

    if(!_.isArray(pagesIds)){
        return false;
    } 

    var pagesToCopy = [];

    for (var i = 0; i < pagesIds.length; i++) {
        var pageId = pagesIds[i];

        var pageModel = this.getPageModelById(pageId);  

        if(!pageModel){
            continue;
        }

        var oldPageId = pageModel.options.pageid;
        var newPageId = projectModelWhereCopy.incrementLastPageId();

        this.mappedPagesIdis[oldPageId] = newPageId;

        var newPageModel = PageModel.create({ DIRNAME:projectModelWhereCopy.DIRNAME,
                                        userId:projectModelWhereCopy.userId, 
                                        projectId:projectModelWhereCopy.projectId, 
                                        pageId:newPageId.toString(), 
                                        socket:this.socket });



        if(!newPageModel){
            continue;
        }



        console.log('this.mappedPagesIdis', this.mappedPagesIdis);

        newPageModel.options = _.clone(pageModel.options) ;
        newPageModel.lines = _.clone(pageModel.lines);
        newPageModel.options.pageid = newPageId;
        
        
        duplicatedPagesIds.push(newPageId);

        pagesToDuplicate.push({ pageModel:pageModel, newPageModel:newPageModel });
    };

    for (var i = 0; i < pagesToDuplicate.length; i++) {

        var item = pagesToDuplicate[i];

        var pageModel = item.pageModel;
        var newPageModel = item.newPageModel;

        var oldPageId = pageModel.options.pageid;
        var newPageId = newPageModel.options.pageid;

        this.changeActionKeys(newPageModel, oldPageId, newPageId);
        this.findTriggerMapPageId(newPageModel, oldPageId, newPageId);

        this.collection.push(newPageModel.toJSON());

        this.setPageNameToPageOptions(newPageModel.options);

    }


    for (var i = 0; i < pagesToDuplicate.length; i++) {
        var item = pagesToDuplicate[i];

        console.log('i', i);
        console.log('pagesToDuplicate.length', pagesToDuplicate.length);

        this.copyPageFiles(item.pageModel, item.newPageModel, pagesToDuplicate, newPagesCollction, duplicatedPagesIds);
    };


    return pagesToDuplicate;
 
}

ProjectModel.prototype.changeActionKeys = function(object, oldPageID, newPageID) {


    object = object || {};

    for (var item in object) {

        if(_.isString(item)){

            var keyArr = item.split('-');

            if (keyArr.length == 3 && keyArr[2] == oldPageID && keyArr[0].length == 32) {

                keyArr[2] = newPageID;

                var newActionkey = keyArr.join('-');
                object[newActionkey] = object[item];
                delete object[item];

                this.changeActionKeys(object[newActionkey], oldPageID, newPageID);
            }    
        }

        var val = object[item];

        if(_.isObject(val)){

            this.changeActionKeys(val, oldPageID, newPageID);

        }else{

            if(_.isString(val)){

                var keyArr = val.split('-');

                if (keyArr.length == 3 && keyArr[2] == oldPageID && keyArr[0].length == 32) {

                    keyArr[2] = newPageID;

                    object[item] = keyArr.join('-');

                    console.log('actionkey', object[item]);
                }
            }
        } 
    };
};

ProjectModel.prototype.findTriggerMapPageId = function(page, oldPageID, newPageID) {

    var _that = this;

    var pageId = parseInt(page.options.pageid);

    var lines = page.lines;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        var objects = line.objects;

        for (var j = 0; j < objects.length; j++) {
            var object = objects[j];

            var triggers =  object.triggers;

            for (var k = 0; k < triggers.length; k++) {
                var trigger = triggers[k];

                var subtriggers = trigger.subtriggers;
                var elseactions = trigger.elseactions;
                var conditions = trigger.conditions;

                this.convertTriggerMapPageId(subtriggers);
                this.convertTriggerMapPageId(elseactions);

                this.findVariables(subtriggers);
                this.findVariables(elseactions);
                this.findVariablesInConditions(conditions);

            }
        }
    };
}

ProjectModel.prototype.convertTriggerMapPageId = function(subtriggers) {
    for (var m = 0; m < subtriggers.length; m++) {
        var subtrigger = subtriggers[m];


        var whattodo = subtrigger.whattodo;
        var objs = subtrigger.objs;


        if(whattodo == 'gotopage'){

            var oldPageId = parseInt(objs[0]);
            var newPageId = this.mappedPagesIdis[oldPageId.toString()];

            console.log('convertTriggerMapPageId', newPageId);
            console.log('this.mappedPagesIdis', this.mappedPagesIdis);

            if(!_.isUndefined(newPageId)){

                objs = [];
                objs.push( "" + newPageId );
            }else{
                objs = [];
            }
        }

        subtrigger.objs = objs;
    }
}

ProjectModel.prototype.findVariables = function(subtriggers) {

    for (var m = 0; m < subtriggers.length; m++) {
        var subtrigger = subtriggers[m];


        var whattodo = subtrigger.whattodo;
        var objs = subtrigger.objs;


        if(whattodo == 'changevarvalue'){

            var varName = objs.varName; // hash

            if( this.projectVariables.indexOf(varName) == -1 ){
                this.projectVariables.push(varName);
            }

        }
    }
}

ProjectModel.prototype.findVariablesInConditions = function(conditions) {
    for (var m = 0; m < conditions.length; m++) {
        var condition = conditions[m];

        var variable = condition.variable;

        if(variable){
            if( this.projectVariables.indexOf(variable) == -1 ){
                this.projectVariables.push(variable);
            }
        }
    }
},

ProjectModel.prototype.getProjectVariablesByHashes = function(projectVariables) {

    var sourceProjectOptions = this.options;
    var sourceProjectVariables = sourceProjectOptions.projectVariables;

    var tempVariables = [];

    for (var i = 0; i < this.projectVariables.length; i++) {

        var varhash1 = this.projectVariables[i];


        var variableExist = false;

        for (var j = 0; j < tempVariables.length; j++) {
             var varhash2 = tempVariables[j].varhash;

             if(varhash1 == varhash2){
                variableExist = true;
                break;
             }
        };

        if(!variableExist){
            var variable = this.getSourceProjectVariablesByHash(varhash1, sourceProjectVariables);

            tempVariables.push(variable);
        }   
    };

    return tempVariables;
}

ProjectModel.prototype.getSourceProjectVariablesByHash = function(hash, sourceProjectVariables) {

    var variable = {};

    for (var k = 0; k < sourceProjectVariables.length; k++) {
         var varName = sourceProjectVariables[k].varhash;

         if(varName == hash){
            variable =  sourceProjectVariables[k];
            break;
         }
    };

    return variable;
};

ProjectModel.prototype.copyPageFiles = function(pageModel, newPageModel, pagesToDuplicate, newPagesCollction, duplicatedPagesIds) {
    var _that = this;

    var oldPageId = pageModel.options.pageid;
    var newPageId = newPageModel.options.pageid;


    var sourcePath = pageModel.getPageExportedPath();
    var destPath = newPageModel.getPageExportedPath();

    

    try{

        newPageModel.deleteExportedFoderIfExist();

        fs.copyRecursive(sourcePath, destPath, function() {

            try{

                // zmiana nazw katalogow (actionkey)
                nodeDir.paths(destPath, function(err, paths) {
                    if (err) {
                        return;
                    }

                    try{

                        for (var i in paths.dirs) {

                            var pathN = path.dirname(paths.dirs[i]);
                            var dirName = path.basename(paths.dirs[i]);
                            var dirNameArr = dirName.split('-');

                            if (dirNameArr.length == 3 &&  oldPageId == dirNameArr.pop()) {

                                var newDirName = dirNameArr[0] + '-' + dirNameArr[1] + '-' + newPageId;

                                var oldFilePath = paths.dirs[i];
                                var newFilePath = path.join(pathN, newDirName);

                                var exist = fs.existsSync(oldFilePath);

                                if(exist){
                                    fse.renameSync(oldFilePath, newFilePath);
                                }
                            }
                        }

                        var result = newPageModel.save();

                        if(result){
                            newPagesCollction.push(newPageModel);
                        }

                        if(pagesToDuplicate.length == newPagesCollction.length){
                            console.log('finish copy');

                            var pv = _that.getProjectVariablesByHashes(_that.projectVariables);

                            var pc = [];

                            for (var i = 0; i < duplicatedPagesIds.length; i++) {
                                var pid = duplicatedPagesIds[i];

                                for (var j = 0; j < newPagesCollction.length; j++) {
                                    var pm = newPagesCollction[j];

                                    if(pm.options.pageid == pid){
                                        pc.push(pm);
                                    }
                                };
                            };

                           _that.trigger('on-finish-copy-pages-files', { pv:pv, newPagesCollction:pc } );
                        }

                        // _that.trigger('on-copy-page-files', { 
                        //     newPageModel:newPageModel, 
                        //     pagesToDuplicate:pagesToDuplicate,
                        //     projectVariables:_that.projectVariables
                        // });

                    }catch(ex){

                        console.log('on-copy-page-files-fault 3', ex);

                        _that.trigger('on-copy-page-files-fault', {});
                    }

                });

            }catch(ex){

                console.log('on-copy-page-files-fault 2', ex);

                _that.trigger('on-copy-page-files-fault', {});

                try{
                    _that.deleteFolder( destPath );

                }catch(ex){

                }
            }

        });

    }catch(ex){
        console.log('on-copy-page-files-fault 1', ex);

        _that.trigger('on-copy-page-files-fault', {});
    }
};

ProjectModel.prototype.addNewPage = function(params){


    var page = params.page;
    var options = page.options;
    var lines = page.lines;

    var oldPageId = parseInt(params.oldPageId);

	var newPageId = this.generateNewPageId();

    var oldPageIndex = this.mapModel.addPageIdToList(newPageId, oldPageId);

    
    console.log('oldPageId', oldPageId);
    console.log('newPageId', newPageId);
    console.log('oldPageIndex', oldPageIndex);

    if(this.mapModel.pages.length <= this.collection.length){
        return false;
    }    



    var newPageModel = PageModel.create({ DIRNAME:this.DIRNAME, 
                                        userId:this.userId, 
                                        projectId:this.projectId, 
                                        pageId:newPageId.toString(), 
                                        socket:params.socket });

    //console.log('newPageModel', newPageModel);

    if(!newPageModel){
        return false;
    }

    var result = newPageModel.createPageFolderStructure();

    if(!result){
        return false;
    }

    options.pageid = newPageId;

    this.setPageNameToPageOptions(options);

    newPageModel.set('options', options);
    newPageModel.set('lines', lines);
    newPageModel.set('oldPageId', oldPageId);
    newPageModel.set('newPageId', newPageId);
    newPageModel.set('oldPageIndex', oldPageIndex);


    if(this.options.get('keep_dimensions')){

        var width = parseInt(this.options.get('width'));
        var height = parseInt(this.options.get('height'));

        newPageModel.options.width = width;
        newPageModel.options.height = height;
    }

    var result = newPageModel.save();

    if(!result){
        return false;
    }

    var result = this.mapModel.save();

    if(!result){
        return false;
    }

    return newPageModel;

}

ProjectModel.prototype.setPageNameToPageOptions = function(options){

    try{

        var newPageId = options.pageid;

        var lang = this.socket.__meta__.lang;

        switch(lang){
            case 'pl':
                options.pagename = "Slajd " + newPageId;
                break;

            case 'en':
                options.pagename = "Page " + newPageId;
                break;

            default:
                options.pagename = "" + newPageId;
                break;
        }
        
    }catch(ex){

    } 
}

ProjectModel.prototype.addNewPsdPage = function(params){


    console.log('addNewPsdPage', params);

    var newPageModel = this.addNewPage(params);

    if(!newPageModel){
        return false;
    }

    var lastLine = _.last(newPageModel.lines);

    if(lastLine.objects.length > 0){

        newPageModel.addNewLine();
    }

    return newPageModel;
}

ProjectModel.prototype.deletePages = function(data){

    var pagesIds = data.pagesIds;

    console.log('pagesIds', pagesIds);

    if(!_.isArray(pagesIds)){
        return false;
    }

    var deletedPagesIds = this.mapModel.deletePagesIds(pagesIds);

    console.log('deletedPagesIds', deletedPagesIds);

    if(pagesIds.length != deletedPagesIds.length){

    }

    this.mapModel.save();

    var deletedPagesIdsFiles = [];

    for (var i = 0; i < deletedPagesIds.length; i++) {
        var pageId = deletedPagesIds[i];

        var result1 = this.deleteOnePageFile(pageId);
        var result2 = this.deletePageFolderStructure(pageId);

        console.log('result1', result1);
        console.log('result2', result2);

        deletedPagesIdsFiles.push(pageId);

    };

    return deletedPagesIdsFiles;
}

ProjectModel.prototype.deletePageFolderStructure = function(pageId){


    try{

        console.log('projectDir', this.projectDir);

        var pageExportedPath = this.getPageExportedPath(pageId);

        
        console.log('pageExportedPath', pageExportedPath);

        if(!fs.existsSync(pageExportedPath)){
            return false;
        }

        this.copyFileToHistory(pageExportedPath);

        var result = this.deleteFolder(pageExportedPath);

        // var historyExportedPath = pageExportedPath.replace('pre', 'history');

        // console.log('-----------------------------------');
        // console.log('pageExportedPath', pageExportedPath);
        // console.log('historyExportedPath', historyExportedPath);


        // fse.renameSync(pageExportedPath, historyExportedPath);

        console.log('Finish move');
        console.log('-----------------------------------');

        return true;


    }catch(ex){
        return false;
    }
}

ProjectModel.prototype.copyFileToHistory = function(filePath){

    try{
    
        var sourcePath = filePath;
        var destPath = filePath.replace('pre', 'history');

        fse.copySync(sourcePath, destPath);

    }catch(ex){

    }
}

ProjectModel.prototype.deleteOnePageFile = function(pageId){


    try{

        var pagePath  = path.join(this.dirname, pageId + '.json' );

        if(!fs.existsSync(pagePath)){
            return false;
        }

        var result = this.deleteFile(pagePath);

        return result;

    }catch(ex){
        return false;
    }
}

ProjectModel.prototype.getPageExportedPath = function(pageId){

    var dir = false;

    try{
        dir =  path.join(this.projectDir, 'pre', 'exported_view', pageId.toString());
    }catch (ex){
        
    }

    return dir;
}

ProjectModel.prototype.deleteFolder = function( path ) {

    try{
        fs.removeSync(path);
        return true;

    }catch(ex){
        console.log('Delete folder error', path);
        return false;
    }
}

ProjectModel.prototype.deleteFile = function( path ) {

    try{
        fs.unlinkSync(path);
        return true;

    }catch(ex){
        console.log('Delete file error', path);
        return false;
    }
}


ProjectModel.prototype.setSelectionBy = function(options) {

},

ProjectModel.prototype.deletePage = function(){
	
}

ProjectModel.prototype.generateNewPageId = function(){

    var newPageId = this.incrementLastPageId();

    var pages = this.mapModel.get('pages');

    if(pages.indexOf(parseInt(newPageId)) !== -1){
        return this.generateNewPageId();
    }else{
        return newPageId;
    }
}

ProjectModel.prototype.incrementLastPageId = function(){

    this.options.last_page_id = this.options.last_page_id + 1;

    return this.options.last_page_id;
}

ProjectModel.prototype.getLastPageId = function(){
    return this.options.last_page_id;
}

ProjectModel.prototype.setLastPageId = function(lastPageId){
   this.options.last_page_id = lastPageId;
}

ProjectModel.prototype.getPageModelById = function(pageId){
	
    var params = {};

    params.DIRNAME = this.DIRNAME;
    params.userId = this.userId;
    params.projectId = this.projectId;
    params.pageId = pageId.toString();
    params.socket = this.socket;

    return PageModel.get(params);

}

ProjectModel.prototype.set = function(key, value){
	
	this[key] = value;
}

ProjectModel.prototype.get = function(key){
	
	return this[key];
}

ProjectModel.get = function(params){

	var projectModel = new ProjectModel();

	params = params || {};

	if(params.DIRNAME == undefined ||
		params.userId == undefined ||
		params.projectId == undefined || 
		params.socket == undefined){
		return false;
	}

	var projectDir = path.join(params.DIRNAME, params.userId, params.projectId);

	var dirname  = path.join(projectDir, 'sitemap');

    projectModel.mapModel = new MapModel.get(params);
    projectModel.DIRNAME = params.DIRNAME;
    projectModel.userId = params.userId;
    projectModel.projectId = params.projectId;
    projectModel.socket = params.socket;
    projectModel.__meta__ = params.socket.__meta__;

    projectModel.dirname = dirname;
    projectModel.projectDir = projectDir;

    var pages = projectModel.mapModel.pages;

    projectModel.openPageFiles(dirname, pages, params);

    return projectModel;
	
}

ProjectModel.prototype.openPageFiles = function(dir, list, params) {

    var results = [];

    try{

        var skipNotActive = params.skipNotActive == undefined ? false : params.skipNotActive;
        for (var i = 0; i < list.length; i++) {
            var fileName = list[i];

            var filePath = path.join( dir, fileName + '.json');

            var content = Utils.jsonParse(fs.readFileSync(filePath, 'utf8'));

            if(skipNotActive){
                if(content.options.active){
                    results.push(  content  );
                }
            }else{
                results.push(content);
            }
        };

        var projectOptionsFilePath = path.join(dir, 'options.json' );
        var contentOptions = Utils.jsonParse(fs.readFileSync(projectOptionsFilePath, 'utf8'));

        this.collection = results;
        this.options = new ProjectOptionsModel(contentOptions);
        this.projectOptionsFilePath = projectOptionsFilePath;

    }catch (ex) {
        console.log({ ex:ex, message:'ERROR on openPageFiles' });

        params.socket.errorMailer.send(ex);
    }
}

ProjectModel.prototype.toJSON = function(){

    return this.options;
}

ProjectModel.prototype.save = function(){
	if(this.projectOptionsFilePath){
        var fileContent = Utils.jsonStringify( this.toJSON() );
        fs.writeFileSync(this.projectOptionsFilePath, fileContent);
        return true;
    }
    return false;
}