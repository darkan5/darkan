var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = SortRowsVisitor;


function SortRowsVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

SortRowsVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start sort rows layer');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var data = this.data;

    var action = data.action;


    var pageId = data.pageId.toString();

    var pageModel = PageModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(), 
                                        pageId:pageId, 
                                        socket:project.socket });

    var timeline = pageModel.getTimeline();

    timeline.__meta__ = project.socket.__meta__;
    var sortRowsResult = timeline.sortRows(data);

    console.log('result:', result);


    if(!sortRowsResult){
        this.onFault({error:'Sort rows layer fault'});
        project.socket.errorMailer.send('sort rows layer fault');
        return;
    }

    var result = pageModel.save();   

    if(!result){
        this.onFault({error:'Save page file fault'});
        project.socket.errorMailer.send('Save page file fault');
        return;
    }

    var responce = ResponceFactory.createResponceResult(sortRowsResult);
    responce.set('status', 'Page file changed and move components');
    
    this.onResult(responce);

    var responceWatcher = ResponceFactory.createWatcherResponceResult(sortRowsResult);
    responceWatcher.set('event', 'sortRows');
    responceWatcher.set('pageId', pageId);

    this.onChangeResult(responceWatcher);

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('sortRows', { pageId:pageModel.options.pageid });

    console.log('-------------------end sort rows layer');
}
