var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    ProjectModel = require('../../project/modules/project/s_project_model.js');

var _ = require('underscore');

module.exports = AddNewPageVisitor;


function AddNewPageVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

AddNewPageVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start adding new page-----');

    try{

        this.onChangeResult = project.onChangeResult;
        //this.onChangeHistoryResult = project.onChangeHistoryResult;
        this.DIRNAME = project.DIRNAME;
        this.project = project;

        var data = this.data;

        var action = data.action;
        

        var projectModel = new ProjectModel.get({ DIRNAME:this.DIRNAME, 
                                            userId:project.socket.ownerId.toString(), 
                                            projectId:project.socket.myRoom.toString(),
                                            socket:project.socket });

        var newPage = projectModel.addNewPage(data);


        if(!newPage){
            this.onFault({error:'Add new page fault'});
            project.socket.errorMailer.send('Add new page fault');
            return;
        }

        var result = projectModel.save();

        if(!result){
            this.onFault({error:'Save project options fault'});
            project.socket.errorMailer.send('Save project options fault');
            return;
        }

        
        this.onResult({
            status: 'Add new page result',
            page: newPage,
            lastPageId:newPage.newPageId,
            oldPageId:newPage.oldPageId,
            oldPageIndex:newPage.oldPageIndex
        });

        this.onChangeResult( {
            status:'Created new page',
            name:'page',
            event: 'addNewPage',
            page: newPage,
            lastPageId:newPage.newPageId,
            oldPageId:newPage.oldPageId,
            oldPageIndex:newPage.oldPageIndex
        } );

        this.project.historyModel = this.project.historyModel || this.project.createHistory();

        this.project.historyModel.add('addNewPage', { pageId:newPage.options.pageid });

    }catch(ex){
        throw ex;
    }

    console.log('-------------------end adding new page');
}
