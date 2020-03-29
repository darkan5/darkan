var Model = require('../../../libs/Model.js');
var Utils = require('../../../utils/Utils.js');
var path = require('path');
var fs = require('fs.extra');
var fse = require('fs-extra');
var _ = require('underscore');


module.exports = MapModel;


function MapModel(options) {

    this.listeners = {};

    this.pages = [];

    options = options || {};
    this.updateOptions(options);
}

MapModel.prototype = new Model();

MapModel.prototype.addPagesIds = function(pagesIds, lastSelectedPageId){

    var index = this.pages.indexOf(lastSelectedPageId);

    console.log('lastSelectedPageId', lastSelectedPageId);
    console.log('index', index);

    if(index !== -1){

        var newIndex = index + 1;

        this.insertArray(this.pages, pagesIds, newIndex);
        return newIndex;

    }else{
        this.pages = this.pages.concat(pagesIds);
        return index;
    }
}

MapModel.prototype.insertArray = function(arr, newArr, position) {
    for (var i=0; i<newArr.length; i++) {
        arr.splice((position + i), 0, newArr[i]);
    }
    return arr;
}

MapModel.prototype.addPageIdToList = function(newPageId, oldPageId){

    var oldPageIndex = this.pages.length;

    var newPageId = parseInt(newPageId);
    var oldPageId = parseInt(oldPageId);

    if(oldPageId){

        oldPageIndex = this.pages.indexOf(oldPageId) + 1;

        //this.pages.splice(oldPageIndex, 0, newPageId);
        console.log("work");
        this.pages.push(newPageId);
        console.log('oldPageId', oldPageId);
        console.log('oldPageIndex', oldPageIndex);
        console.log(' pageses',  this.pages);

    }else{
        this.pages.push(newPageId);
    }

    return oldPageIndex;
}

MapModel.prototype.deletePagesIds = function(pagesIds){

    var deletedPagesIds = [];
    
    for (var i = 0; i < pagesIds.length; i++) {
        var pageId = pagesIds[i];

        var index = this.pages.indexOf(pageId);

        if(index !== -1){
            this.pages.splice(index, 1);
            deletedPagesIds.push(pageId);
        }
    };

    return deletedPagesIds;
}

MapModel.prototype.updatePageSort = function(data){

    var pageId = parseInt(data.pageId);
    var position = parseInt(data.position);

    console.log('pageId', pageId);
    console.log('position', position);

    if(!_.isNumber(pageId)){
        return false;
    }

    if(!_.isNumber(position)){
        return false;
    }
    
    console.log('this.pages', this.pages);

    var index = this.pages.indexOf(pageId);

    console.log('index', index);

    this.pages.splice(index, 1);

    console.log('befor this.pages', this.pages);

    this.pages.splice(position, 0, pageId);

    console.log('after this.pages', this.pages);

    return this.pages;
}




MapModel.get = function(params){

	var mapModel = new MapModel();

	params = params || {};

	if(params.DIRNAME == undefined ||
		params.userId == undefined ||
		params.projectId == undefined || 
		params.socket == undefined){
		return false;
	}

	var projectDir = path.join(params.DIRNAME, params.userId, params.projectId);

	var dirname  = path.join(projectDir, 'sitemap');
 	var mapFilePath = path.join(projectDir, 'sitemap', 'map.json' );

    var exists = fs.existsSync(mapFilePath);

    if (exists) {
    	var map = Utils.jsonParse(fs.readFileSync(mapFilePath, 'utf8'));
        mapModel.pages = map.pages;
    }

    mapModel.dirname = dirname;
    mapModel.mapFilePath = mapFilePath;

    return mapModel;
	
}

MapModel.prototype.toJSON = function(){

    var fillable = ['pages'];

    var object = {};

    for (var i = 0; i < fillable.length; i++) {
        var item = fillable[i];

        object[item] = this[item];
    };

    return object;
}

MapModel.prototype.save = function(){
	if(this.mapFilePath){
        var fileContent = Utils.jsonStringify( this.toJSON() );
        fs.writeFileSync(this.mapFilePath, fileContent);
        return true;
    }
    return false;
}