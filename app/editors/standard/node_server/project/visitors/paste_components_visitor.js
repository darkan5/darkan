var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageModel = require('../../project/modules/pages/s_page_model.js');

var _ = require('underscore');

module.exports = PasteComponentsVisitor;


function PasteComponentsVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

PasteComponentsVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start paste components');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var data = this.data;


    var pageId = data.pageId.toString();

    var pageModel = PageModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(), 
                                        pageId:pageId, 
                                        socket:project.socket });

    

    pageModel.on('onPasteComponents', function(e){
        _that.onPasteComponents(pageModel, data, e);
    });

    pageModel.pasteComponents(data);

    

    
}



PasteComponentsVisitor.prototype.onPasteComponents = function(pageModel, data, pasteResult) {

    // if(!pasteResult){
    //     this.onFault({error:'Add component fault'});
    //     project.socket.errorMailer.send('Add component fault');
    //     return;
    // }

    var action = data.action;

    var pageId = data.pageId.toString();
    var components = pasteResult.components;
    var projectVariables = pasteResult.projectVariables;

    console.log('projectVariables pasteResult', projectVariables);


    var newProjectVariables = this.pasteProjectVariables(projectVariables || []);
    
    var result = pageModel.save();   

    if(!result){
        this.onFault({error:'Save page file fault'});
        project.socket.errorMailer.send('Save page file fault');
        return;
    }

    var responce = ResponceFactory.createResponceResult(pasteResult);
    responce.set('status', 'Page file changed and update component');
    responce.set('newProjectVariables', newProjectVariables);
    
    this.onResult(responce);

    var responceWatcher = ResponceFactory.createWatcherResponceResult(pasteResult);
    responceWatcher.set('event', 'pasteComponents');
    responceWatcher.set('pageId', pageId);
    responceWatcher.set('newProjectVariables', newProjectVariables);

    this.onChangeResult(responceWatcher);

    var components = _.map(pasteResult.components, function(o) {
        return _.pick(o, "type", "actionkey");
    });

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('pasteComponents', { pageId:pageModel.options.pageid, components:components });


    console.log('-------------------end paste components');
}

PasteComponentsVisitor.prototype.concatProjectVariables = function(projectVariables, newProjectVariables) {

    projectVariables || [];

    for (var i = 0; i < newProjectVariables.length; i++) {
        var newProjectVariable = newProjectVariables[i];
        var newVarHash = newProjectVariable.varhash;

        var exist = false;

        for (var j = 0; j < projectVariables.length; j++) {
            var projectVariable = projectVariables[j];

            var varHash = projectVariable.varhash;

            if(varHash == newVarHash){
                exist = true;
                break;
            }
        };

        if(!exist){
            projectVariables.push(newProjectVariable);
        } 
    };

    return projectVariables;
};

PasteComponentsVisitor.prototype.pasteProjectVariables = function(newProjectVariables) {

    var projectOptionsModel = ProjectOptionsModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:this.project.socket.ownerId.toString(), 
                                        projectId:this.project.socket.myRoom.toString(), 
                                        socket:this.project.socket });

    if(!projectOptionsModel){
        return false;
    }

    if(newProjectVariables.length == 0){
        return false;
    }

    var projectVariables = projectOptionsModel.projectVariables || [];

    projectOptionsModel.projectVariables = this.concatProjectVariables(projectVariables, newProjectVariables);

    var result = projectOptionsModel.save();

    return result ? projectOptionsModel.projectVariables : false;
}
