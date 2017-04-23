var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = MoveComponentsToLayerVisitor;


function MoveComponentsToLayerVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

MoveComponentsToLayerVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start move components to layer');

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
    var moveResult = timeline.moveComponentsToLayer(data);

    console.log('result:', result);


    if(!moveResult){
        this.onFault({error:'Move components to layer fault'});
        project.socket.errorMailer.send('Move components to layer fault');
        return;
    }

    var result = pageModel.save();   

    if(!result){
        this.onFault({error:'Save page file fault'});
        project.socket.errorMailer.send('Save page file fault');
        return;
    }

    var responce = ResponceFactory.createResponceResult(moveResult);
    responce.set('status', 'Page file changed and move components');
    
    this.onResult(responce);

    var responceWatcher = ResponceFactory.createWatcherResponceResult(moveResult);
    responceWatcher.set('event', 'moveComponentsToLayer');
    responceWatcher.set('pageId', pageId);

    this.onChangeResult(responceWatcher);

    var components = _.map(moveResult.components, function(o) {
        return _.pick(o, "type", "actionkey");
    });

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('moveComponentsToLayer', { pageId:pageModel.options.pageid, components:components });

    console.log('-------------------end move components to layer');
}
