var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = DuplicateComponentsVisitor;


function DuplicateComponentsVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

DuplicateComponentsVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start duplicate components');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var data = this.data;

    // var sourcePageId = '' +data.sourcePageId;
    // var sourceProjectId = '' + data.sourceProjectId;
    // var sourceUserId = '' + data.sourceUserId;


    var pageId = data.pageId.toString();

    var pageModel = PageModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(), 
                                        pageId:pageId, 
                                        socket:project.socket });

    pageModel.on('onCopyFoldersToHash', function(e){
        _that.onCopyFoldersToHash(pageModel, data, e);
    });

    pageModel.on('onPasteComponents', function(e){
        _that.onPasteComponents(pageModel, data, e);
    });

    pageModel.copyFoldersToHash(data, 'copy');
}

DuplicateComponentsVisitor.prototype.onCopyFoldersToHash = function(pageModel, data, e) {

    data.hash = e.hash;

    pageModel.pasteComponents(data);
}

DuplicateComponentsVisitor.prototype.onPasteComponents = function(pageModel, data, pasteResult) {

    var action = data.action;

    var pageId = data.pageId.toString();
    var components = pasteResult.components;

    var result = pageModel.save();   

    if(!result){
        this.onFault({error:'Save page file fault'});
        project.socket.errorMailer.send('Save page file fault');
        return;
    }

    var responce = ResponceFactory.createResponceResult(pasteResult);
    responce.set('status', 'Page file changed and update component');
    
    this.onResult(responce);

    var responceWatcher = ResponceFactory.createWatcherResponceResult(pasteResult);
    responceWatcher.set('event', 'pasteComponents');
    responceWatcher.set('name', 'component');
    responceWatcher.set('pageId', pageId);
    responceWatcher.set('action', 'add');
    responceWatcher.set('page', pageModel.toJSON());

    this.onChangeResult(responceWatcher);

    var components = _.map(pasteResult.components, function(o) {
        return _.pick(o, "type", "actionkey");
    });

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('pasteComponents', { pageId:pageModel.options.pageid, components:components });
    
    console.log('-------------------end duplicate components');
}
