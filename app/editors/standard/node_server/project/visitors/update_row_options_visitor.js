var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = UpdateRowOptionsVisitor;


function UpdateRowOptionsVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

UpdateRowOptionsVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start update row options');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var data = this.data;

    var action = data.action;
    var rowOptions = data.rowOptions;


    var pageId = data.pageId.toString();

    var pageModel = PageModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(), 
                                        pageId:pageId, 
                                        socket:project.socket });

    var timeline = pageModel.getTimeline();
    var result = timeline.updateRowOptions(data);


    if(!result){
        this.onFault({error:'Upadate row options fault'});
        project.socket.errorMailer.send('Upadate row options fault');
        return;
    }

    var result = pageModel.save();   

    if(!result){
        this.onFault({error:'Save page file fault'});
        project.socket.errorMailer.send('Save page file fault');
        return;
    }

    var responce = ResponceFactory.createResponceResult();
    responce.set('status', 'Page file changed and update component');
    responce.set('rowOptions', rowOptions);
    
    this.onResult(responce);

    var responceWatcher = ResponceFactory.createWatcherResponceResult();
    responceWatcher.set('event', 'updateRowOptions');
    responceWatcher.set('pageId', pageId);
    responceWatcher.set('rowOptions', rowOptions);

    this.onChangeResult(responceWatcher);

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('updateRowOptions', { pageId:pageModel.options.pageid });

    console.log('-------------------end update row options');
}
