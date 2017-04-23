var Model = require('../../../libs/Model.js');
var Utils = require('../../../utils/Utils.js');
var path = require('path');
var fs = require('fs.extra');
var fse = require('fs-extra');
var _ = require('underscore');


module.exports = HashModel;


function HashModel(options) {

    this.listeners = {};

    this.list = [];
    this.hashName = false;

    options = options || {};
    this.updateOptions(options);
}

HashModel.prototype = new Model();


HashModel.get = function(params){

	var hashModel = new HashModel();

	params = params || {};

	if(params.DIRNAME == undefined ||
		params.userId == undefined ||
        params.projectId == undefined || 
		params.hashName == undefined || 
		params.socket == undefined){
		return false;
	}

	var projectDir = path.join(params.DIRNAME, params.userId, params.projectId);

	var dirname  = path.join(projectDir, 'sitemap');
 	var historyPath = path.join(projectDir, 'history');
    var hashDir = path.join(historyPath, params.hashName);
    var hashFile = path.join(hashDir, params.hashName + '.json');

    var exists = fs.existsSync(hashFile);

    if (exists) {
    	var options = Utils.jsonParse(fs.readFileSync(hashFile, 'utf8'));
        hashModel.updateOptions(options);
    }

    hashModel.dirname = dirname;
    hashModel.hashFile = hashFile;

    return hashModel;
	
}

HashModel.prototype.toJSON = function(){

    var fillable = ['list', 'hashName'];

    var object = {};

    for (var i = 0; i < fillable.length; i++) {
        var item = fillable[i];

        object[item] = this[item];
    };

    return object;
}

HashModel.prototype.save = function(){
	if(this.mapFilePath){
        var fileContent = Utils.jsonStringify( this.toJSON() );
        fs.writeFileSync(this.mapFilePath, fileContent);
        return true;
    }
    return false;
}