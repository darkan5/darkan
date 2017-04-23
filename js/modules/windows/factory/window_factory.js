function WindowFactory(){

}

WindowFactory.createNewProjectWindow = function(data){

    var windowModel = new NewProjectWindowModel();

    var windowView = new NewProjectWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}

WindowFactory.createNewFolderWindow = function(data){

    var windowModel = new NewFolderWindowModel();

    var windowView = new NewFolderWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}

WindowFactory.createUploadZbitWindow = function(data){

    var windowModel = new UploadZbitWindowModel();

    var windowView = new UploadZbitWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}

WindowFactory.createShareProjectWindow = function(data){

    var windowModel = new ShareProjectWindowModel();

    var windowView = new ShareProjectWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}

WindowFactory.createLimitProjectsWindow = function(data){

    var windowModel = new LimitProjectsWindowModel();

    var windowView = new LimitProjectsWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}

WindowFactory.createDownloadZbitWindow = function(data){

    var windowModel = new DownloadZbitWindowModel();

    var windowView = new DownloadZbitWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}


WindowFactory.createDiscountCodeWindow = function(data){

    var windowModel = new DiscountCodeWindowModel();

    var windowView = new DiscountCodeWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}


WindowFactory.createPortalOptionsWindow = function(data){

    var windowModel = new PortalSettingsWindowModel();

    var windowView = new PortalSettingsWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}