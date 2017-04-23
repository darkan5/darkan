var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    ProjectModel = require('../../project/modules/project/s_project_model.js');

var _ = require('underscore');

module.exports = DuplicatePagesVisitor;


function DuplicatePagesVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;

    this.newPagesCollction = [];
}

DuplicatePagesVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start duplicate pages');

    try{

        this.onChangeResult = project.onChangeResult;
        this.DIRNAME = project.DIRNAME;
        this.project = project;

        var data = this.data;

        console.log('data', data);

        var responce = this.validateData(data);

        if(!responce){
            _that.onFault({error:'Validate data fault'});
            _that.project.socket.errorMailer.send('Duplicate pages from other project fault');
            return;
        }

        var pagesIds = responce.pagesIds; 
        var sourceUserId = responce.sourceUserId;
        var sourceProjectId = responce.sourceProjectId; 
        var oldPageId = responce.oldPageId; 

        var projectModel = new ProjectModel.get({ DIRNAME:this.DIRNAME, 
                                            userId:project.socket.ownerId.toString(), 
                                            projectId:project.socket.myRoom.toString(),
                                            socket:project.socket });

        if(!projectModel){
            _that.onFault({error:'Duplicate pages fault'});
            _that.project.socket.errorMailer.send('Duplicate pages fault');
            return;
        }

        

        projectModel.on('on-finish-copy-pages-files', function(e){
            _that.onCopyFinishCopyPagesFiles(duplicatedPages, e, projectModel, pagesIds, oldPageId);
        });

        projectModel.on('on-copy-page-files-fault', function(e){
            _that.onFault({error:'On copy page files fault'});
            _that.project.socket.errorMailer.send('On copy page files fault');
        });

        var duplicatedPages = projectModel.duplicatePages(data, projectModel);


    }catch(ex){
        throw ex;
    }

    console.log('-------------------end duplicate pages');
}

DuplicatePagesVisitor.prototype.validateData = function(data){

    var pagesIds = data.pagesIds; 
    var sourceUserId = parseInt(data.sourceUserId);
    var sourceProjectId = parseInt(data.sourceProjectId); 
    var oldPageId = data.oldPageId;

    if(!_.isArray(pagesIds)){
        _log('pagesIds is not array', pagesIds);
        return false;
    }

    if(_.isNumber(oldPageId)){
        oldPageId = oldPageId.toString();
    }else{
        oldPageId = undefined;
    }

    return {pagesIds:pagesIds, oldPageId:oldPageId };
}


DuplicatePagesVisitor.prototype.onCopyFinishCopyPagesFiles = function(duplicatedPages, e, projectModel, pagesIds, oldPageId) {

    var newPagesCollction = e.newPagesCollction;
    // var newProjectVariables = e.pv;

    // var projectVariables = projectModel.options.projectVariables;
    // projectModel.options.projectVariables = this.concatProjectVariables(projectVariables, newProjectVariables);
    
    var result = projectModel.save();

    if(!result){
        this.onFault({error:'Duplicate pages fault'});
        this.project.socket.errorMailer.send('Duplicate pages fault');
        return;
    }

    var duplicatedPagesIds = [];

    for (var i = 0; i < newPagesCollction.length; i++) {
        var page = newPagesCollction[i];
        var pageId = page.options.pageid;
        duplicatedPagesIds.push(pageId);
    };

    var lastSelectedPageId = _.last(pagesIds);

    var oldPageIndex = projectModel.mapModel.addPagesIds(duplicatedPagesIds, lastSelectedPageId);
    var result = projectModel.mapModel.save();

    if(!result){
        this.onFault({error:'Duplicate pages fault'});
        this.project.socket.errorMailer.send('Duplicate pages fault');
        return;
    }

    this.onResult({
        status: 'Duplicate pages result',
        pages:newPagesCollction,
        oldPageIndex:oldPageIndex,
        projectOptions: projectModel.options,
        oldPageId: parseInt(oldPageId)
    });

    this.onChangeResult( {
        status:'Duplicate pages',
        event: 'duplicatePages',
        pages:newPagesCollction,
        oldPageIndex:oldPageIndex,
        oldPageId: parseInt(oldPageId)
    });

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('duplicatePages', {});


}
