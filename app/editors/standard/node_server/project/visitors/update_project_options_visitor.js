var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    ProjectOptionsModel = require('../../project/modules/project/s_projects_options_model.js');

var _ = require('underscore');

module.exports = UpdateProjectOptionsVisitor;


function UpdateProjectOptionsVisitor(data, onResult, onFault) {
    this.onResult = onResult;
    this.onFault = onFault;
    this.data = data;
}

UpdateProjectOptionsVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start update project options');

    this.onChangeResult = project.onChangeResult;
    this.DIRNAME = project.DIRNAME;
    this.project = project;

    var data = this.data;

    var action = data.action;
    var projectOptions = data.projectOptions;

    if(!projectOptions){
        this.onFault({error:'Save page file fault'});
        return;
    }

    var projectOptionsModel = ProjectOptionsModel.get({ DIRNAME:this.DIRNAME, 
                                        userId:project.socket.ownerId.toString(), 
                                        projectId:project.socket.myRoom.toString(),
                                        socket:project.socket });

    var newProjectOptions = projectOptionsModel.updateProjectOptions({ projectOptions:projectOptions, action:action });

    if(!newProjectOptions){
        this.onFault({error:'Updated project options fault'});
        project.socket.errorMailer.send('Updated project options fault');
        return;
    }

    var result = projectOptionsModel.save();   

    if(!result){
        this.onFault({error:'Save page file fault'});
        project.socket.errorMailer.send('Save project options file fault');
    }
    

    this.onResult({ status:'Update project options successed' });

    this.onChangeResult( {
        status:'Project options file changed and update project options',
        name:'options',
        event: 'saveProjectOptions',
        options: newProjectOptions.toJSON()
    } );

    this.project.historyModel = this.project.historyModel || this.project.createHistory();

    this.project.historyModel.add('updateProjectOptions', {});

    console.log('-------------------end update project options');
}
