var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    ProjectModel = require('../../project/modules/project/s_project_model.js');

var _ = require('underscore');

module.exports = DeletePagesVisitor;


function DeletePagesVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

DeletePagesVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start delete pages');

    try{

        this.onChangeResult = project.onChangeResult;
        this.DIRNAME = project.DIRNAME;
        this.project = project;

        var data = this.data;

        var action = data.action;
        

        var projectModel = new ProjectModel.get({ DIRNAME:this.DIRNAME, 
                                            userId:project.socket.ownerId.toString(), 
                                            projectId:project.socket.myRoom.toString(),
                                            socket:project.socket });

        var deletedPages = projectModel.deletePages(data);


        if(deletedPages.length == 0){
            this.onFault({error:'Delete pages fault'});
            project.socket.errorMailer.send('Delete pages fault');
            return;
        }

        
        this.onResult({
            status: 'Delete pages result',
            deletedPages:deletedPages
        });

        this.onChangeResult( {
            status:'Delete pages',
            name:'page',
            event: 'deletePages',
            deletedPages:deletedPages
        } );

        this.project.historyModel = this.project.historyModel || this.project.createHistory();

        this.project.historyModel.add('deletePages', { deletedPages:deletedPages });



    }catch(ex){
        throw ex;
    }

    console.log('-------------------end delete pages');
}
