var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = UpdateComponentsVisitor;


function UpdateComponentsVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

UpdateComponentsVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start update components');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var data = this.data;

    var components = data.components;
    var action = data.action;

    var pageId = data.pageId.toString();

     //console.log('generateHistoryItem', this.project.historyModel.project.socket.__meta__);

    var pageModel = PageModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(), 
                                        pageId:pageId, 
                                        socket:project.socket });

    var updatedComponents = pageModel.updateComponents(data);

    if(updatedComponents.length != components.length){
        this.onFault({error:'Updated component fault'});
        project.socket.errorMailer.send('Updated component fault');
        return;
    }

    var result = pageModel.save();   

    if(!result){
        this.onFault({error:'Save page file fault'});
        project.socket.errorMailer.send('Save page file fault');
    }
    
    this.onResult({ 
        status:'Update components successed', 
        action: action, 
        components: updatedComponents
    });

    this.onChangeResult( {
        status:'Page file changed and update component',
        event: 'updateComponent',
        components: updatedComponents,
        pageId: parseInt(pageId)
    } );

    var components = _.map(updatedComponents, function(o) {
        return _.pick(o, "type", "actionkey");
    });

    console.log('________________________2 updateComponents socket', this.project.socket.myRoom);

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('updateComponents', { pageId:pageModel.options.pageid, components:components });

    console.log('-------------------end update components');
}
