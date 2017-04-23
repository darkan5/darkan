var Model = require('../../../libs/Model.js');
var Utils = require('../../../utils/Utils.js');
var path = require('path');
var fs = require('fs.extra');
var fse = require('fs-extra');
var _ = require('underscore');


module.exports = ComponentsSelectorByUser;


function ComponentsSelectorByUser(options) {
	var _that = this;

	this.listeners = {};

	this.components = {};

    options = options || {};
    this.updateOptions(options);
}

ComponentsSelectorByUser.prototype = new Model();



ComponentsSelectorByUser.prototype.select = function(data){
	console.log('selectComponentsByUser', data);

	var pageId = data.pageId;
	var actionkeys = data.actionkeys;

	if(_.isUndefined(pageId)){
		return false;
	}

	if(!_.isArray(actionkeys)){
		return false;
	}

	var login = this.socket.__meta__.login;

	console.log('login', login);

	for (var item in this.components) {
		var selectedBy = this.components[item] || [];
		var index = selectedBy.indexOf(_.findWhere(selectedBy, { login:login }));	

		if(index !== -1){
			selectedBy.splice(index, 1);
			this.components[item] = selectedBy;
		}

		if(this.components[item].length == 0){
			delete this.components[item];
		}
	};

	

    for (var i = 0; i < actionkeys.length; i++) {
    	var actionkey = actionkeys[i];

    	var selectedBy = this.components[actionkey] || [];
    	selectedBy.push( { login:login } );

    	this.components[actionkey] = selectedBy;
    };

   

    this.socket.broadcast.to(this.socket.myRoom).emit('onSelectComponentsByUser', this.components);

    this.save();
}

ComponentsSelectorByUser.prototype.reset = function(data){

	console.log('resetComponentsByUser');	

	var login = this.socket.__meta__.login;

	console.log('login', login);

	for (var item in this.components) {
		var selectedBy = this.components[item] || [];
		var index = selectedBy.indexOf(_.findWhere(selectedBy, { login:login }));	

		if(index !== -1){
			selectedBy.splice(index, 1);
			this.components[item] = selectedBy;
		}

		if(this.components[item].length == 0){
			delete this.components[item];
		}
	};

	console.log('this.components', this.components);

	this.socket.broadcast.to(this.socket.myRoom).emit('onSelectComponentsByUser', this.components);
	this.save();
}


ComponentsSelectorByUser.prototype.toJSON = function(){

	var fillable = ['components'];

	var object = {};

	for (var i = 0; i < fillable.length; i++) {
		var item = fillable[i];

		object[item] = this[item];
	};

	return object;
}


ComponentsSelectorByUser.get = function(params){

	var componentsSelectorByUser = new ComponentsSelectorByUser();

	params = params || {};

	if(params.DIRNAME == undefined ||
		params.userId == undefined ||
		params.projectId == undefined || 
		params.socket == undefined){
		return componentsSelectorByUser;
	}

	var projectDir = path.join(params.DIRNAME, params.userId, params.projectId);

	var dirname  = path.join(projectDir, 'history', 'selector');
 	var filePath = path.join(dirname, 'components.json' );

    if (!fs.existsSync(dirname)){
        fs.mkdirSync(dirname);
    }

    var exists = fs.existsSync(filePath);

    if (exists) {
    	var options = Utils.jsonParse(fs.readFileSync(filePath, 'utf8'));
        componentsSelectorByUser.updateOptions(options);
    }else{

        var options = Utils.jsonStringify({});
        fs.writeFileSync(filePath, options);
    }

    componentsSelectorByUser.projectDir = projectDir;
    componentsSelectorByUser.dirname = dirname;
    componentsSelectorByUser.filePath = filePath;
    componentsSelectorByUser.DIRNAME = params.DIRNAME;
    componentsSelectorByUser.userId = params.userId;
    componentsSelectorByUser.projectId = params.projectId;
    componentsSelectorByUser.socket = params.socket;

    return componentsSelectorByUser;
}

ComponentsSelectorByUser.prototype.save = function(){
	if(this.filePath){
        var fileContent = Utils.jsonStringify( this.toJSON() );
        fs.writeFileSync(this.filePath, fileContent);
        return true;
    }
    return false;
}