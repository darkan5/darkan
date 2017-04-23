//var _ = require('underscore');

module.exports = ResponceResult;


function ResponceResult(result){
    this.code = 200;
    this.message = '';
    this.success = true;
    this.data = {};

    this.updateOptions(result);
}

ResponceResult.prototype.updateOptions = function(options){
    for (var item in options) {
        this[item] = options[item];
    };
}

ResponceResult.prototype.set = function(key, value){
	
	this[key] = value;
}

ResponceResult.prototype.get = function(key){
	
	return this[key];
}
