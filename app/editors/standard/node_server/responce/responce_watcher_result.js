//var _ = require('underscore');

module.exports = ResponceWatcherResult;


function ResponceWatcherResult(result){
    this.code = 200;
    this.message = '';
    this.success = true;
    this.data = {};
    this.action = null;
	this.event = null;
	this.page = null;
	this.components = [];
	this.pageId = null;
    
    this.updateOptions(result);
}

ResponceWatcherResult.prototype.updateOptions = function(options){
    for (var item in options) {
        this[item] = options[item];
    };
}

ResponceWatcherResult.prototype.set = function(key, value){
	
	this[key] = value;
}

ResponceWatcherResult.prototype.get = function(key){
	
	return this[key];
}
