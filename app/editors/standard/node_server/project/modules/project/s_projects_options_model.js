var Model = require('../../../libs/Model.js');
var Utils = require('../../../utils/Utils.js');
var path = require('path');
var fs = require('fs.extra');
var fse = require('fs-extra');
var _ = require('underscore');


module.exports = ProjectOptionsModel;


function ProjectOptionsModel(options) {

    this.listeners = {};
    
	options = options || {};
    this.updateOptions(options);
}

ProjectOptionsModel.prototype = new Model();

ProjectOptionsModel.prototype.updateOptions = function(options){


	//console.log('updateOptions', options);

    for (var item in options) {
        this[item] = options[item];
    };
}

ProjectOptionsModel.prototype.updateProjectOptions = function(params){
	var newProjectOptions = params.projectOptions;
	var action = params.action;

	switch(action){
 
		case 'delete-project-sound':

			var result = this.deleteProjectSound();

			break;	

	}

	this.updateOptions(newProjectOptions);

	return this;

}

ProjectOptionsModel.prototype.deleteProjectSound = function(params){

    console.log('deleteProjectSound check this function if working correct');
    console.log('params', params);

	var pageExportedPath = this.getPageExportedPath();

	if(!pageExportedPath){
    	return false;
    }

    var projectSoundFolder = path.join(pageExportedPath, 'projectsound');

	return this.deleteFolder(projectSoundFolder);
}

ProjectOptionsModel.prototype.getProjectVariableByHash = function(hash) {

    var projectVariables = this.projectVariables;
    var ret = false;

    if(!projectVariables){
        return ret; 
    }

    _.each(projectVariables, function(variable) {

        if (variable.varhash == hash) {
            ret = variable;
        }
    });

    return ret;
},

ProjectOptionsModel.get = function(params){

	var projectsOptions = new ProjectOptionsModel();

	params = params || {};

	if(params.DIRNAME == undefined ||
		params.userId == undefined ||
		params.projectId == undefined || 
		params.socket == undefined){
		return false;
	}

	var projectDir = path.join(params.DIRNAME, params.userId, params.projectId);

	var dirname  = path.join(projectDir, 'sitemap');
 	var filePath = path.join(projectDir, 'sitemap', 'options.json' );

    var exists = fs.existsSync(filePath);

    if (exists) {
    	var options = Utils.jsonParse(fs.readFileSync(filePath, 'utf8'));

    	projectsOptions.updateOptions(options);
    }

    projectsOptions.dirname = dirname;
    projectsOptions.filePath = filePath;

    return projectsOptions;
	
}

ProjectOptionsModel.prototype.toJSON = function(){

    var hideden = ['dirname', 'filePath'];

    var object = {};

    for (var item in this) {

    	if(_.isFunction(this[item])){
        	continue;
        } 

        if(hideden.indexOf(item.toString()) !== -1){
        	continue;
        }   

        //console.log('Create options : ' + item + ' to: ', this[item]);

        object[item] = this[item];
    };

    return object;
}

ProjectOptionsModel.prototype.save = function(){
	if(this.filePath){
        var fileContent = Utils.jsonStringify( this.toJSON() );
        fs.writeFileSync(this.filePath, fileContent);
        return true;
    }
    return false;
}
