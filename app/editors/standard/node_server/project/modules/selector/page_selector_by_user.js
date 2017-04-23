var Model = require('../../../libs/Model.js');
var Utils = require('../../../utils/Utils.js');
var path = require('path');
var fs = require('fs.extra');
var fse = require('fs-extra');
var _ = require('underscore');


module.exports = PageSelectorByUser;


function PageSelectorByUser(options) {
	var _that = this;

	this.listeners = {};

	this.pages = {};

    options = options || {};
    this.updateOptions(options);
}

PageSelectorByUser.prototype = new Model();



PageSelectorByUser.prototype.select = function(data, project){
	console.log('selectPageByUser', data);

	var pageId = data.pageId;

	if(_.isUndefined(pageId)){
		return false;
	}

	var login = this.socket.__meta__.login;

	console.log('login', login);

	for (var item in this.pages) {
		var selectedBy = this.pages[item] || [];
		var index = selectedBy.indexOf(_.findWhere(selectedBy, { login:login }));	

		if(index !== -1){
			selectedBy.splice(index, 1);
			this.pages[item] = selectedBy;
		}

		if(this.pages[item].length == 0){
			delete this.pages[item];
		}
	};

	var selectedBy = this.pages[pageId] || [];

    selectedBy.push( { login:login } );
    this.pages[pageId] = selectedBy;

    this.socket.broadcast.to(this.socket.myRoom).emit('onSelectPageByUser', this.pages);

    this.save();

    return { pages:this.pages, pageId:pageId };
}

PageSelectorByUser.prototype.reset = function(data){

	console.log('resetPagesByUser');	

	var login = this.socket.__meta__.login;

	console.log('login', login);

	for (var item in this.pages) {
		var selectedBy = this.pages[item] || [];
		var index = selectedBy.indexOf(_.findWhere(selectedBy, { login:login }));	

		if(index !== -1){
			selectedBy.splice(index, 1);
			this.pages[item] = selectedBy;
		}

		if(this.pages[item].length == 0){
			delete this.pages[item];
		}
	};

	console.log('this.pages', this.pages);

	this.socket.broadcast.to(this.socket.myRoom).emit('onSelectPageByUser', this.pages);
	this.save();
}


PageSelectorByUser.prototype.toJSON = function(){

	var fillable = ['pages'];

	var object = {};

	for (var i = 0; i < fillable.length; i++) {
		var item = fillable[i];

		object[item] = this[item];
	};

	return object;
}


PageSelectorByUser.get = function(params){

	var pageSelectorByUser = new PageSelectorByUser();

	params = params || {};

	if(params.DIRNAME == undefined ||
		params.userId == undefined ||
		params.projectId == undefined || 
		params.socket == undefined){
		return pageSelectorByUser;
	}

	var projectDir = path.join(params.DIRNAME, params.userId, params.projectId);

	var dirname  = path.join(projectDir, 'history', 'selector');
 	var filePath = path.join(dirname, 'pages.json' );

    if (!fs.existsSync(dirname)){
        fs.mkdirSync(dirname);
    }

    var exists = fs.existsSync(filePath);

    if (exists) {
    	var options = Utils.jsonParse(fs.readFileSync(filePath, 'utf8'));
        pageSelectorByUser.updateOptions(options);
    }else{

        var options = Utils.jsonStringify({});
        fs.writeFileSync(filePath, options);
    }

    pageSelectorByUser.projectDir = projectDir;
    pageSelectorByUser.dirname = dirname;
    pageSelectorByUser.filePath = filePath;
    pageSelectorByUser.DIRNAME = params.DIRNAME;
    pageSelectorByUser.userId = params.userId;
    pageSelectorByUser.projectId = params.projectId;
    pageSelectorByUser.socket = params.socket;

    return pageSelectorByUser;
}

PageSelectorByUser.prototype.save = function(){
	if(this.filePath){
        var fileContent = Utils.jsonStringify( this.toJSON() );
        fs.writeFileSync(this.filePath, fileContent);
        return true;
    }
    return false;
}