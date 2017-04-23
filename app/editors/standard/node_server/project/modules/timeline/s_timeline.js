var Model = require('../../../libs/Model.js');
var TimeleineRow = require('../../../project/modules/timeline/s_timeline_row.js');
var _ = require('underscore');

module.exports = Timeleine;


function Timeleine(options) {

	this.listeners = {};
	
	this.lines = [];

	options = options || {};
    this.updateOptions(options);
}

Timeleine.prototype = new Model();


Timeleine.prototype.updateRowOptions = function(data){

	var rowOptions = data.rowOptions;

	console.log('rowOptions', rowOptions);

	if(!_.isObject(rowOptions)){
		return false;
	}

	var rowId = parseInt(rowOptions.id);

	if(!_.isNumber(rowId)){
		return false;
	}

	var line = this.getLineById(rowId);

	line.options = rowOptions;

	return true;
}

Timeleine.prototype.sortRows = function(data){

	var rowId = parseInt(data.rowId);
	var position = parseInt(data.position);

	if(!_.isNumber(rowId)){
		return false;
	}

	if(!_.isNumber(position)){
		return false;
	}

	var line = this.getLineById(rowId);

	if(!line){
		return false;
	}

	var index = this.getLineIndexByLine(line);

	if(index === -1){
		return false;
	}

	this.lines.splice(index, 1);
	this.lines.splice(position, 0, line);

	return { rowId:rowId, position:position };
}

Timeleine.prototype.moveComponentsToLayer = function(data){

	var rowId = parseInt(data.rowId);
	var actionkeys = data.actionkeys;
	var position = data.position || 0;

	console.log('rowId', rowId);
	console.log('actionkeys', actionkeys);
	console.log('position', position);

	if(!_.isNumber(rowId)){
		return;
	}

	// if(!_.isNumber(position)){
	// 	return;
	// }

	if(!_.isArray(actionkeys)){
		return;
	}

	var line = this.getLineById(rowId);

	if(!line){
		return false;
	}

	var deletedComponents = this.deleteComponentsByActionkeys(actionkeys);

	console.log('deletedComponents', deletedComponents.length);

	for (var i = deletedComponents.length - 1; i >= 0; i--) {

		var component = deletedComponents[i];	
		//line.objects.unshift(component);

		line.objects.splice(position, 0, component);

		console.log('Add component actionkey:', component.actionkey);
	}

	//console.log('Line after:', line);

	var emptyLayers = this.deleteEmptyLayers();

	console.log('emptyLayers', emptyLayers.length);


	var deletedLayersIds = this.getIdsFromLines(emptyLayers);

	console.log('deletedLayersIds:', deletedLayersIds);

	var lastLine = _.last(this.lines);

	console.log('lastLineId', lastLine);

	var newLine;

	if(lastLine.objects.length > 0){

        newLine = this.addNewLine();
	}

    var lastLineId = this.getLastLineId();
    var lastComponentId = this.getLastComponentId();

    console.log('lastLineId', lastLineId);
    console.log('lastComponentId', lastComponentId);

	return { components:deletedComponents, position:position, rowId:rowId, newLine:newLine, deletedLayersIds:deletedLayersIds, lastLineId:lastLineId, lastComponentId:lastComponentId};
}

Timeleine.prototype.addNewLine = function(){
	var newLineId = this.incrementLastLineId();

    console.log('newLineId:', newLineId);

	newLine = new TimeleineRow();
	newLine.options.id = newLineId;

    console.log('newLine:', newLine);

	this.lines.push( newLine );

	console.log('Add new line:', newLineId);

	return newLine;
}

Timeleine.prototype.incrementlastComponentId = function(){

    this.options.lastComponentId = this.options.lastComponentId + 1;
    return this.options.lastComponentId;
}

Timeleine.prototype.getLastComponentId = function(){
    return this.options.lastComponentId;
}

Timeleine.prototype.setlastComponentId = function(lastComponentId){
   this.options.lastComponentId = lastComponentId;
}



Timeleine.prototype.incrementLastLineId = function(){

    this.options.lastLineId = this.options.lastLineId + 1;
    return this.options.lastLineId;
}

Timeleine.prototype.getLastLineId = function(){
    return this.options.lastLineId;
}

Timeleine.prototype.setLastLineId = function(lastLineId){
   this.options.lastLineId = lastLineId;
}



Timeleine.prototype.deleteComponentsByActionkeys = function(actionkeys){

	var components = [];

	for (var k = 0; k < actionkeys.length; k++) {
		var actionkey = actionkeys[k];

		for (var i = 0; i < this.lines.length; i++) {
			var line = this.lines[i];

			for (var j = 0; j < line.objects.length; j++) {
				var object = line.objects[j];

				if(object.actionkey == actionkey){
					components.push(object);
					line.objects.splice(j, 1);
				}
			};
		};
	};

	

	// for (var k = 0; k < actionkeys.length; k++) {
	// 	var actionkey = actionkeys[k];


	// 	for (var i = 0; i < this.lines.length; i++) {
	// 		var line = this.lines[i];

	// 		for (var j = 0; j < line.objects.length; j++) {
	// 			var object = line.objects[j];

	// 			if(object.actionkey == actionkey){
	// 				object.splice(j, 1);
	// 				break;
	// 			}
	// 		};
	// 	};
	// };


	return components;
}

Timeleine.prototype.deleteEmptyLayers = function(){

	var deletedLines = [];

	for (var i = 0; i < this.lines.length -1; i++) {
		var line = this.lines[i];

		if(line.objects.length == 0){
			deletedLines.push(line);
			this.lines.splice(i, 1);
		}
	};

	return deletedLines;
}

Timeleine.prototype.getIdsFromLines = function(lines){

	var ids = [];

	for (var i = 0; i < lines.length; i++) {
		var layer = lines[i];

		var id = layer.options.id;

		ids.push(id);
	};

	return ids;
}





Timeleine.prototype.getLineById = function(lineId){

	var lines = this.lines;

    for (var i = 0; i < lines.length; i++) {

        var line = lines[i];

        if(line.options.id == lineId){
            return line;
        }
    };

    return false;
}

Timeleine.prototype.getLineIndexByLine = function(finedLine){

	var lines = this.lines;

    for (var i = 0; i < lines.length; i++) {

        var line = lines[i];

        if(line.options.id == finedLine.options.id){
            return i;
        }
    };

    return -1;
}



