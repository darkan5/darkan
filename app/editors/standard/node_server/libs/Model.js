var EventDispatcher = require('../libs/event_dispatcher.js');

module.exports = Model;


function Model(options) {

    options = options || {};
    this.updateOptions(options);
}

Model.prototype = new EventDispatcher();

Model.prototype.updateOptions = function(options){
    for (var item in options) {
        this[item] = options[item];
    };
}

Model.prototype.set = function(key, value){
	
	this[key] = value;
}

Model.prototype.get = function(key){
	
	return this[key];
}

Model.prototype.toJSON = function(){

    return this;
}

Model.prototype.save = function(){

    return false;
}