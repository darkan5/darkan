var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = CutComponentsVisitor;


function CutComponentsVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

CutComponentsVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start cut components');

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

    pageModel.copyFoldersToHash(data, 'cut');
}

CutComponentsVisitor.prototype.onCopyFoldersToHash = function(pageModel, data, e) {

    var action = data.action;
    var pageId = data.pageId;
    var components = data.components;
    var hashModel = e.hashModel;
    var hash = e.hash;
    
    

    var cutResult = pageModel.deleteComponents(data);

    var cutedComponents = cutResult.deletedComponents;
    var deletedLayersIds = cutResult.deletedLayersIds;

    if(cutedComponents.length != components.length){
        this.onFault({error:'cut components fault'});
        this.project.socket.errorMailer.send('cut components fault');
        return;
    }


    var result = pageModel.save();   

    if(!result){
        this.onFault({error:'Save page file fault'});
        this.project.socket.errorMailer.send('Save page file fault');
        return;
    }
    
    this.onResult({ 
        status:'Cut components successed', 
        action: action, 
        components: cutedComponents,
        hash:hash,
        deletedLayersIds: deletedLayersIds,
        responce: ResponceFactory.createWatcherResponceResult()
    });

    this.onChangeResult( {
        status:'Page file changed and update component',
        name:'component',
        event: 'cutComponents',
        action: action,
        page: pageModel,
        components: cutedComponents,
        hash:hash,
        deletedLayersIds: deletedLayersIds,
        pageId: pageId
    } );

    var components = _.map(cutedComponents, function(o) {
        return _.pick(o, "type", "actionkey");
    });

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('cutComponents', { pageId:pageModel.options.pageid, components:components });

    console.log('-------------------end cut components');
}
