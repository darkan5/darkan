var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = CopyComponentVisitor2;


function CopyComponentVisitor2(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

CopyComponentVisitor2.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start copy components');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var data = this.data;

    //console.log('data', data);

    var sourcePageId =  parseInt(data.sourcePageId);
    var sourceProjectId = parseInt(data.sourceProjectId);
    var sourceUserId = parseInt(data.sourceUserId);

    if(!_.isNumber(sourcePageId) || !_.isNumber(sourceProjectId) || !_.isNumber(sourceUserId)){
        this.onFault({error:'Copy component fault fault'});
        return;
    }


    var pageId = data.pageId.toString();

    var pageModel = PageModel.get({ DIRNAME:this.DIRNAME, 
                                        // userId:sourceUserId.toString(), 
                                        // projectId:sourceProjectId.toString(), 
                                        // pageId:sourcePageId.toString(), 

                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(), 
                                        pageId:pageId, 

                                        socket:project.socket });

     console.log('pageModel', pageModel);

    if(!pageModel){
        this.onFault({error:'Copy component fault, no page'});
        return;
    }

    pageModel.on('onCopyFoldersToHash', function(e){
        _that.onCopyFoldersToHash(pageModel, data, e);
    });

    pageModel.copyFoldersToHash(data, 'copy');
}

CopyComponentVisitor2.prototype.onCopyFoldersToHash = function(pageModel, data, e) {

    var action = data.action;
    var pageId = data.pageId;
    var components = data.components;
    var hashModel = e.hashModel;
    var hash = e.hash;

    var result = pageModel.save();   

    if(!result){
        this.onFault({error:'Save page file fault'});
        project.socket.errorMailer.send('Save page file fault');
        return;
    }
    
    this.onResult({ 
        status:'copy components successed', 
        hash:hash,
    });

    this.onChangeResult( {
        status:'Page file changed and update component',
        name:'component',
        event: 'copyComponents',
        hash:hash
    });

    console.log('-------------------end copy components');
}
