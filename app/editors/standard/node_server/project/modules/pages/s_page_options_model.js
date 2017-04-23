var Model = require('../../../libs/Model.js');

module.exports = PageOptionsModel;


function PageOptionsModel(options) {

	this.listeners = {};
	
	options = options || {};
    this.updateOptions(options);
}

PageOptionsModel.prototype = new Model();