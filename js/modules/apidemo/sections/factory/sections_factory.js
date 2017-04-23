function SectionsFactory(){

}

SectionsFactory.createProjectsListSection = function(data){

    var model = new ProjectsListModel();

    var section = new ProjectsListView( { model: model, data:data } );

    return section;
}

SectionsFactory.createApiEditorSection = function(data){

    var model = new ApiEditorModel();

    var section = new ApiEditorView( { model: model, data:data } );

    return section;
}

SectionsFactory.createApiCourseSection = function(data){

    var model = new ApiCourseModel();

    var section = new ApiCourseView( { model: model, data:data } );

    return section;
}

SectionsFactory.createIframeSection = function(data){

    var model = new IframeModel();

    var section = new IframeView( { model: model, data:data } );

    return section;
}

SectionsFactory.createIframeEditorSection = function(data){

    var model = new IframeModel();

    var section = new IframeEditorView( { model: model, data:data } );

    return section;
}

SectionsFactory.createIframeCourseSection = function(data){

    var model = new IframeModel();

    var section = new IframeCourseView( { model: model, data:data } );

    return section;
}



SectionsFactory.createNavigationSection = function(data){

    var model = new NavigationModel();

    var section = new NavigationView( { model: model, data:data } );

    return section;
}

SectionsFactory.createNavigationEditorSection = function(data){

    var model = new NavigationModel();

    var section = new NavigationEditorView( { model: model, data:data } );

    return section;
}

SectionsFactory.createNavigationCourseSection = function(data){

    var model = new NavigationModel();

    var section = new NavigationCourseView( { model: model, data:data } );

    return section;
}

SectionsFactory.createEventsListSection = function(data){

    var model = new EventsListModel();

    var section = new EventsListView( { model: model, data:data } );

    return section;
}

SectionsFactory.createCommandLineSection = function(data){

    var model = new CommandLineModel();

    var section = new CommandLineView( { model: model, data:data } );

    return section;
}

SectionsFactory.createCommandLineEditorSection = function(data){

    var model = new CommandLineModel();

    var section = new CommandLineEditorView( { model: model, data:data } );

    return section;
}

SectionsFactory.createCommandLineCourseSection = function(data){

    var model = new CommandLineModel();

    var section = new CommandLineCourseView( { model: model, data:data } );

    return section;
}