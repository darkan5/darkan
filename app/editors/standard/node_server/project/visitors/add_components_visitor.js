var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = AddComponentsVisitor;


function AddComponentsVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

AddComponentsVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start adding components');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var data = this.data;

    var components = data.components;
    var action = data.action;
    var selectedRowId = data.selectedRowId;

    var pageId = data.pageId.toString();

    var pageModel = PageModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(), 
                                        pageId:pageId, 
                                        socket:project.socket });

    var resultAdd = pageModel.addComponents({ components:components, selectedRowId:selectedRowId });

    

    if(!resultAdd){
        this.onFault({error:'Add component fault'});
        project.socket.errorMailer.send('Add component fault');
        return;
    }

    var result = pageModel.save();   

    if(!result){
        this.onFault({error:'Save page file fault'});
        project.socket.errorMailer.send('Save page file fault');
        return;
    }

    var responce = ResponceFactory.createResponceResult(resultAdd);
    responce.set('status', 'Page file changed and update component');
    
    this.onResult(responce);

    var responceWatcher = ResponceFactory.createWatcherResponceResult(resultAdd);
    responceWatcher.set('event', 'addComponents');
    responceWatcher.set('pageId', pageId);


    this.onChangeResult(responceWatcher);

    var components = _.map(resultAdd.components, function(o) {
        return _.pick(o, "type", "actionkey");
    });

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('addComponents', { pageId:pageModel.options.pageid, components:components });

    // this.onChangeResult( {
    //     status:'Page file changed and update component',
    //     name:'component',
    //     event: 'updateComponent',
    //     action: action,
    //     page: pageModel,
    //     components: components,
    //     newLine: newLine,
    //     pageId: pageId,
    //     selectedRowId: selectedRowId
    // } );

    console.log('-------------------end adding components');
}
