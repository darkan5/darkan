var TimelineRowOptionsModel = require('../../../project/modules/timeline/s_timeline_row_options_model.js');

module.exports = TimeleineRow;


function TimeleineRow(options) {

	this.listeners = {};

	options = options || {};
    this.updateOptions(options);

	this.options = new TimelineRowOptionsModel();
	this.objects = [];
	this.type = 'line';
}

TimeleineRow.prototype.updateOptions = function(options){
    for (var item in options) {
        this[item] = options[item];
    };
}