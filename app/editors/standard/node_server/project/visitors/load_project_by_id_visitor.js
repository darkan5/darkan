var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    ProjectModel = require('../../project/modules/project/s_project_model.js');
    ProjectOptionsModel = require('../../project/modules/project/s_projects_options_model.js');

var _ = require('underscore');

module.exports = LoadProjectByIdVisitor;


function LoadProjectByIdVisitor(data, onResult, onFault, onProjectLoaded) {
    this.onResult = onResult;
    this.onProjectLoaded = onProjectLoaded;
    this.onFault = onFault;
    this.data = data;
}

LoadProjectByIdVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start load project by id');

    try{

        this.onChangeResult = project.onChangeResult;
        this.DIRNAME = project.DIRNAME;
        this.project = project;

        var data = this.data;

        var userId = '' + data.userId;
        var projectId = '' + data.projectId;
        

        var projectModel = new ProjectModel.get({ DIRNAME:this.DIRNAME, 
                                            userId:userId, 
                                            projectId:projectId,
                                            socket:project.socket });

        if(!projectModel){
            this.onFault ({ 
                status:"Load project by id fault"
            });

            return;
        }
        
        this.onResult ({ 
            status:"Load project by id result", 
            files:[], 
            pages: projectModel.get('collection'), 
            options:projectModel.get('options').toJSON()

        });

        if(_.isFunction(this.onProjectLoaded)){
            this.onProjectLoaded ({ 
                projectModel:projectModel
            });
        }

        

    }catch(ex){
        throw ex;
    }

    console.log('-------------------end load project by id');
}
