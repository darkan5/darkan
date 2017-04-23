var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = UpdatePageOptionsVisitor;


function UpdatePageOptionsVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

UpdatePageOptionsVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start update page options');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var data = this.data;

    var action = data.action;
    var pageOptions = data.pageOptions;
    var pageId = data.pageId.toString();

    var pageModel = PageModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(), 
                                        pageId:pageId, 
                                        socket:project.socket });

    var newPageOptions = pageModel.updatePageOptions({ pageOptions:pageOptions, action:action });

    if(!newPageOptions){
        this.onFault({error:'Updated page options fault'});
        project.socket.errorMailer.send('Updated page options fault');
        return;
    }

    var result = pageModel.save();   

    if(!result){
        this.onFault({error:'Save page file fault'});
        project.socket.errorMailer.send('Save page file fault');
        return;
    }
    
    this.onResult({ 
        status:'Update page successed', pageOptions: pageOptions
    });

    this.onChangeResult( {
        status:'Page file changed and update page options',
        event: 'updatePageOptions',
        pageId: pageId,
        pageOptions: newPageOptions
    } );

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('updatePageOptions', { pageId:pageModel.options.pageid });

    console.log('-------------------end update page options');
}
