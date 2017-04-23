var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    ProjectModel = require('../../project/modules/project/s_project_model.js'),
    Psd2Darkan = require('../../project/psd/psd2darkan.js');

var _ = require('underscore');

module.exports = AddNewPsdPageVisitor;


function AddNewPsdPageVisitor(data, onResult, onFault, onProggres, onComplete) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.onProggres = onProggres;
    this.onComplete = onComplete;
    this.data = data;
}

AddNewPsdPageVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start adding psd new page');

    try{

        this.onChangeResult = project.onChangeResult;
        //this.onChangeHistoryResult = project.onChangeHistoryResult;
        this.DIRNAME = project.DIRNAME;
        this.project = project;

        var data = this.data;

        var action = data.action;

        var userId = project.socket.ownerId.toString();
        var projectId = project.socket.myRoom.toString(); 


        this.psd2Darkan = new Psd2Darkan();
        this.psd2Darkan.extract(this.DIRNAME, userId, projectId, data, project);

        this.psd2Darkan.addEventListener(Psd2Darkan.ON_EXTRACT_PROGGRESS, this.onProggres);
        this.psd2Darkan.addEventListener(Psd2Darkan.ON_EXTRACT_COMPLETE, function(e){
            _that.onExtractComplete(e, data);
        });
        this.psd2Darkan.addEventListener(Psd2Darkan.ON_CONVERT_COMPLETE, this.onConvertComplete, this);
        this.psd2Darkan.addEventListener(Psd2Darkan.ON_CONVERT_FAIL, this.onFault);
        

        

        // var result = projectModel.save();

        // if(!result){
        //     this.onFault({error:'Save project options fault'});
        //     project.socket.errorMailer.send('Save project options fault');
        //     return;
        // }

        
        // this.onResult({
        //     status: 'Add new page result',
        //     page: newPage,
        //     lastPageId:newPage.newPageId,
        //     oldPageId:newPage.oldPageId,
        //     oldPageIndex:newPage.oldPageIndex
        // });

        // this.onChangeResult( {
        //     status:'Created new page',
        //     name:'page',
        //     event: 'addNewPage',
        //     page: newPage,
        //     lastPageId:newPage.newPageId,
        //     oldPageId:newPage.oldPageId,
        //     oldPageIndex:newPage.oldPageIndex
        // } );

        // this.project.historyModel.add('addNewPsdPage', { pageId:newPage.options.pageid });

    }catch(ex){
        throw ex;
    }

    console.log('-------------------end adding psd new page');
}

AddNewPsdPageVisitor.prototype.onExtractComplete = function(e, data) {

    console.log('e.psdFileZipDestination', e.psdFileZipDestination);
    console.log('e.psdFileZipSource', e.psdFileZipSource);
    console.log('data', data);

    var psdFileZipDestination = e.psdFileZipDestination;
    var psdFileZipSource = e.psdFileZipSource;

    

    var pageFileSource = path.join(psdFileZipDestination, 'darkan', 'darkan.json');
    var pageFileContent = Utils.jsonParse(fs.readFileSync(pageFileSource, 'utf8'));

    var pageData = {
        page: pageFileContent,
        oldPageId: data.actionkey
    };

    console.log('pageFileContent', pageFileContent);

    var projectModel = new ProjectModel.get({ DIRNAME:this.DIRNAME, 
                                            userId:this.project.socket.ownerId.toString(), 
                                            projectId:this.project.socket.myRoom.toString(),
                                            socket:this.project.socket });

    var newPage = projectModel.addNewPsdPage(pageData);

    if(!newPage){
        this.onFault({error:'Add new page fault'});
        this.project.socket.errorMailer.send('Add new page fault');
        return;
    }

    var result = this.psd2Darkan.changeComponentsActionkeysLoginHash(newPage);

    if(!result){
        this.onFault({error:'Change actionkeys fault'});
        this.project.socket.errorMailer.send('Change actionkeys fault');
        return;
    }

    var result = this.psd2Darkan.copyFilesToPage(newPage, projectModel, psdFileZipDestination, psdFileZipSource);

}


AddNewPsdPageVisitor.prototype.onConvertComplete = function(e) {

    var newPage = e.newPage;
    var projectModel = e.projectModel;

    if(_.isUndefined(newPage)){
        return;
    }

    var result = projectModel.save();

    if(!result){
        this.onFault({error:'Save project options fault'});
        this.project.socket.errorMailer.send('Save project options fault');
        return;
    }

    var result = newPage.save();

    if(!result){
        this.onFault({error:'Save page fault'});
        this.project.socket.errorMailer.send('Save page fault');
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
}