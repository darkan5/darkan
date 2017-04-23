function ProjectsFactory(){

}

ProjectsFactory.createProjectByType = function( type, model ){


    var template = model.get('template');

    if(template == 1){


        switch(type){
            case 'userProjects':
            case 'userSharedProjects':
                return ProjectsFactory.createTemplateProjectView(model);
                break;  

            case 'sharedToUserProjects':
                return ProjectsFactory.createSharedToUserProjectView(model);
                break;      


            default:
                return ProjectsFactory.createNormalProjectView(model);
                // console.log("No component: " + type);
              break; 
          }


    }else{



        switch(type){
            case 'userProjects':
                return ProjectsFactory.createNormalProjectView(model);
                break;

            case 'userSharedProjects':
                return ProjectsFactory.createNormalProjectView(model);
                break;  

            case 'sharedToUserProjects':
                return ProjectsFactory.createSharedToUserProjectView(model);
                break;      


            default:
                return ProjectsFactory.createNormalProjectView(model);
                // console.log("No component: " + type);
              break;            
        }
    }

	
}

ProjectsFactory.updateOptionsModel = function( model, options ){

    for(var item in options){

        model.set(item, options[item], {silent:true});
    }
}

ProjectsFactory.createProjectModelByType = function( type, options ){

    var opts = options || {};

    switch(type){
        case 'userProjects':
            var model = new ProjectListItemModel();
            this.updateOptionsModel(model, opts);
            return model;
        break;


        default:
            var model = new ProjectListItemModel();
            this.updateOptionsModel(model, opts);
            return model;
            // console.log("No type: " + type);
            break;
    }

}

ProjectsFactory.createNormalProjectView = function( model ){
	
	model = model ||  new ProjectListItemModel( );

	var projectView = new NormalProjectItemView( { model: model } );

	return projectView;
}

ProjectsFactory.createTemplateProjectView = function( model ){


    
    model = model ||  new ProjectListItemModel( );

    var projectView = new TemplateProjectItemView( { model: model } );

    return projectView;
}

ProjectsFactory.createShareProjectView = function( model ){


    
    model = model ||  new ProjectListItemModel( );

    var projectView = new ShareProjectItemView( { model: model } );

    return projectView;
}

ProjectsFactory.createSharedToUserProjectView = function( model ){


    
    model = model ||  new ProjectListItemModel( );

    var projectView = new SharedToUserProjectItemView( { model: model } );

    return projectView;
}

