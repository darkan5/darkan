var path = require('path'),
    fs = require('fs.extra'),
    fse = require('fs-extra'),
    async = require('async'),
    ConfigController = require('../../config_controller/config_controller.js'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = CopyComponentVisitor3;


function CopyComponentVisitor3(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
    this.history_enabled = ConfigController.get('HISTORY_ENABLED', false);
}

CopyComponentVisitor3.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start copy components');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    this.projectVariables = [];

    var data = this.data;

    if(!_.isArray(data.components)){
        this.onFault({error:'Copy component fault fault'});
        return;
    }

    var components = data.components || [];


    if(components.length == 0){
        this.onFault({error:'Copy component fault fault'});
        return;
    }


    var sourcePageId =  parseInt(data.sourcePageId);
    var sourceProjectId = parseInt(data.sourceProjectId);
    var sourceUserId = parseInt(data.sourceUserId);

    this.sourceProjectId = sourceProjectId;
    this.sourceUserId = sourceUserId;


    if(!_.isNumber(sourcePageId) || !_.isNumber(sourceProjectId) || !_.isNumber(sourceUserId)){
        this.onFault({error:'Copy component fault fault'});
        return;
    }


    this.pageId = sourcePageId.toString();
    this.projectDir = path.join(this.DIRNAME, sourceUserId.toString(), sourceProjectId.toString());
    this.historyProjectDir = path.join(this.DIRNAME, project.socket.ownerId.toString(), project.socket.myRoom.toString());

    // var pageModel = PageModel.get({ DIRNAME:this.DIRNAME, 
    //                                     // userId:sourceUserId.toString(), 
    //                                     // projectId:sourceProjectId.toString(), 
    //                                     // pageId:sourcePageId.toString(), 

    //                                     userId:project.socket.ownerId.toString(), 
    //                                     projectId:project.socket.myRoom.toString(), 
    //                                     pageId:pageId, 

    //                                     socket:project.socket });

    //  console.log('pageModel', pageModel);

    // if(!pageModel){
    //     this.onFault({error:'Copy component fault, no page'});
    //     return;
    // }

    // pageModel.on('onCopyFoldersToHash', function(e){
    //     _that.onCopyFoldersToHash(pageModel, data, e);
    // });

    // pageModel.copyFoldersToHash(data, 'copy');

    this.copyFoldersToHashOtherComponent(data, 'copy');
}

CopyComponentVisitor3.prototype.onCopyFoldersToHash = function(hash) {

    
    this.onResult({ 
        status:'copy components successed', 
        hash:hash,
    });

    this.onChangeResult( {
        status:'Page file changed and update component',
        name:'component',
        event: 'copyComponents',
        hash:hash
    });

    console.log('-------------------end copy components');
}

CopyComponentVisitor3.prototype.copyFoldersToHashOtherComponent = function( data, hashName){

    var _that = this;

    if(!_.isString(hashName)){
        return;
    }

    var components = data.components;



    var pageExportedPath = this.getPageExportedPath();

    var historyPath = this.getHistoryPath();

    if (!fs.existsSync(historyPath)){
        fs.mkdirSync(historyPath);
    }

    var historyExportedPath = this.getHistoryExportedPath();
    var hashDir = path.join(historyPath, hashName);
    var hashFile = path.join(hashDir, hashName + '.json');

    if (!fs.existsSync(hashDir)){
        fs.mkdirSync(hashDir);
    }

    var hashModel = this.getDataFromFile(hashFile);
    var hashId = hashModel.list.length.toString();

    var hash = {
        hashId:parseInt(hashId),
        hashName:hashName
    }

    console.log('pageExportedPath', pageExportedPath);

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

                    console.log('actualFolder', actualFolder);
                    console.log('pathN', pathN);
                    console.log('dirName', dirName);
                    console.log('prefixFolder', prefixFolder);
                    console.log('historyExportedPath', historyExportedPath);

                    for (var j = 0; j < components.length; j++) {

                        var component = components[j];

                        _that.findTrigger(component);

                        var actionkey = component.actionkey;

                        if(dirName == actionkey){
                            fse.copySync(actualFolder, hashPath);

                            //_that.copyFileToHistory(actualFolder);
                        }
                    }
                }

                var pws = _that.getProjectVariablesByIds(_that.projectVariables);

                console.log('_that.projectVariables', _that.projectVariables);
                console.log('pws', pws);

                hashModel.list.push({ components:components, projectVariables:pws });

                _that.setDataToFile(hashFile, hashModel);

                console.log('copy finished');

                _that.onCopyFoldersToHash(hash);
                
            } catch(error) {
                console.log(error);
            }
        });

    }catch (ex){
        console.log(ex);
    }
}

CopyComponentVisitor3.prototype.getPageExportedPath = function(){

    var dir = false;

    try{
        dir =  path.join(this.projectDir, 'pre', 'exported_view', this.pageId);
    }catch (ex){
        
    }

    return dir;
}

CopyComponentVisitor3.prototype.getHistoryPath = function(){

    var dir = false;

    try{
        dir =  path.join(this.historyProjectDir, 'history');
    }catch (ex){
        
    }

    return dir;
}

CopyComponentVisitor3.prototype.getHistoryExportedPath = function(){

    var dir = false;

    try{
        dir =  path.join(this.historyProjectDir, 'history', 'exported_view', this.pageId);
    }catch (ex){
        
    }

    return dir;
}

CopyComponentVisitor3.prototype.copyFileToHistory = function(filePath){

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

CopyComponentVisitor3.prototype.getDataFromFile = function(filePath){

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

CopyComponentVisitor3.prototype.setDataToFile = function(filePath, options){

    var options = options || {};

    var exists = fs.existsSync(filePath);

    if (exists) {
        fs.writeFileSync(filePath, Utils.jsonStringify(options));
    }

    return exists;
}

CopyComponentVisitor3.prototype.findTrigger = function(component) {

    var _that = this;

    var triggers =  component.triggers;

    for (var k = 0; k < triggers.length; k++) {
        var trigger = triggers[k];

        var subtriggers = trigger.subtriggers;
        var elseactions = trigger.elseactions;
        var conditions = trigger.conditions;

        this.findVariables(subtriggers);
        this.findVariables(elseactions);
        this.findVariablesInConditions(conditions);

    }
}

CopyComponentVisitor3.prototype.findVariablesInConditions = function(conditions) {
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

CopyComponentVisitor3.prototype.findVariables = function(subtriggers) {

    for (var m = 0; m < subtriggers.length; m++) {
        var subtrigger = subtriggers[m];


        var whattodo = subtrigger.whattodo;
        var objs = subtrigger.objs;

        console.log('whattodo', whattodo);


        if(whattodo == 'changevarvalue'){

            var varName = objs.varName; // hash

            console.log('varName', varName);

            if( this.projectVariables.indexOf(varName) == -1 ){
                this.projectVariables.push(varName);
            }

        }

        console.log('finded projectVariables', this.projectVariables);
    }
}

CopyComponentVisitor3.prototype.getProjectVariablesByIds = function(projectVariables) {

    var pvs = [];

    if(projectVariables && projectVariables.length == 0){
        return pvs;
    }

    var projectOptionsModel = ProjectOptionsModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:this.sourceUserId.toString(), 
                                        projectId:this.sourceProjectId.toString(),
                                        socket:this.project.socket });


    for (var i = 0; i < projectVariables.length; i++) {
        var varhash = projectVariables[i];

        var pv = projectOptionsModel.getProjectVariableByHash(varhash);
        pvs.push(pv);
    };

    return pvs;
}



