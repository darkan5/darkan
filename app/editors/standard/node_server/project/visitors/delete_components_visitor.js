var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = DeleteComponentsVisitor;


function DeleteComponentsVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

DeleteComponentsVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start delete components');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var data = this.data;

    var components = data.components;
    var action = data.action;

    var pageId = data.pageId.toString();

    var pageModel = PageModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(), 
                                        pageId:pageId, 
                                        socket:project.socket });


    pageModel.on('onCopyFoldersToHash', function(e){
        _that.onCopyFoldersToHash(pageModel, data, e);
    });

    pageModel.copyFoldersToHash(data, 'delete');

}

DeleteComponentsVisitor.prototype.onCopyFoldersToHash = function(pageModel, data, e) {

    var action = data.action;
    var pageId = data.pageId;
    var components = data.components;
    var hashModel = e.hashModel;
    var hash = e.hash;

    var deleteResult = pageModel.deleteComponents(data);

    if(!deleteResult){
        this.onFault({error:'Delete component fault'});
        project.socket.errorMailer.send('Delete component fault');
        return;
    }

    var deletedComponents = deleteResult.deletedComponents;
    var deletedLayersIds = deleteResult.deletedLayersIds;

    if(deletedComponents.length != components.length){
        this.onFault({error:'Delete component fault'});
        project.socket.errorMailer.send('Delete component fault');
        return;
    }

    var result = pageModel.save();   

    if(!result){
        this.onFault({error:'Save page file fault'});
        project.socket.errorMailer.send('Save page file fault');
        return;
    }
    
    this.onResult({ 
        status:'Delete components successed', 
        components: deletedComponents,
        deletedLayersIds: deletedLayersIds,
        hash:hash
    });

    this.onChangeResult( {
        status:'Page file changed and update component',
        event: 'deleteComponents',
        components: deletedComponents,
        deletedLayersIds: deletedLayersIds,
        hash:hash,
        pageId: pageId
    } );

    var components = _.map(deletedComponents, function(o) {
        return _.pick(o, "type", "actionkey");
    });

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('deleteComponents', { pageId:pageModel.options.pageid, components:components });

    console.log('-------------------end delete components');
}
