var path = require('path'),
    fs = require('fs.extra'),
    async = require('async'),
    Utils = require('../../utils/Utils.js'),
    ResponceFactory = require('../../responce/responce_factory.js'),
    PageSelectorByUser = require('../../project/modules/selector/page_selector_by_user.js'),
    ComponentsSelectorByUser = require('../../project/modules/selector/components_selector_by_user.js'),
    ProjectModel = require('../../project/modules/project/s_project_model.js'),
    ProjectOptionsModel = require('../../project/modules/project/s_projects_options_model.js');

var _ = require('underscore');

module.exports = LoadProjectVisitor;


function LoadProjectVisitor(data, onResult, onFault, onProjectLoaded) {
    this.onResult = onResult;
    this.onProjectLoaded = onProjectLoaded;
    this.onFault = onFault;
    this.data = data;
}

LoadProjectVisitor.prototype.visit = function(project) {
	var _that = this;

    console.log('-------------------start load project');

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
                status:"Load project fault"
            });

            return;
        }

        var projectOptionsModel = new ProjectOptionsModel.get({ DIRNAME:this.DIRNAME, 
                                            userId:userId, 
                                            projectId:projectId,
                                            socket:project.socket });

        var result = this.createProjectOptionsIfNotExist(projectOptionsModel, data);

        if(!result){
            this.onFault ({ 
                status:"Create project options fault"
            });

            return;
        }

        var pageSelectorByUser = new PageSelectorByUser.get({ DIRNAME:this.DIRNAME,  userId:userId, projectId:projectId, socket:project.socket });
        var selectedPages = pageSelectorByUser.pages || {};

        var componentsSelectorByUser = new ComponentsSelectorByUser.get({ DIRNAME:this.DIRNAME,  userId:userId,  projectId:projectId, socket:project.socket });
        var selectedComponents = componentsSelectorByUser.components || {};

        this.onResult ({ 
            status:"Load project result", 
            files:[], 
            pages: projectModel.get('collection'), 
            options:projectModel.get('options').toJSON(),
            selectedPages:selectedPages,
            selectedComponents:selectedComponents

        });

        if(_.isFunction(this.onProjectLoaded)){
            this.onProjectLoaded ({ 
                projectModel:projectModel
            });
        }

        

    }catch(ex){
        throw ex;
    }

    console.log('-------------------end load project');
}

LoadProjectVisitor.prototype.createProjectOptionsIfNotExist = function(projectOptionsModel, data) {

    if(!fs.existsSync(projectOptionsModel.filePath)){

        var options = data.options;

        if(!_.isObject(options)){
            return false;
        }

        console.log('create project options');
        console.log('options', options);

        projectOptionsModel.updateOptions(options);

        var result = projectOptionsModel.save();

        console.log('result', result);

        return result;
    }

    console.log('project options exist', result);

    return true;

}
