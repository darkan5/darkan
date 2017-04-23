function WindowFactory(){

}

WindowFactory.createModalWindow = function(){

	var windowModel = new WindowModel( { type:"modal", modal:true } );

	var windowView = new WindowModalView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createProjectVersionWindow = function(){

	var windowModel = new ProjectVersionWindowModel( { modal:true } );

	var windowView = new ProjectVersionWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createBorderWindow = function(){

	var windowModel = new BorderWindowModel( { modal:false, draggable: true } );

	var windowView = new BorderWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createImageWindow = function(activeTab, sender){

	var windowModel = new ImagesWindowModel( { modal:true } );

	var windowView = new ImagesWindowView( { windowModel: windowModel, activeTab:activeTab, sender:sender } );

	return windowView;
}

WindowFactory.createVideoWindow = function(){

	var windowModel = new VideoWindowModel( { modal:true } );

	var windowView = new VideoWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createExportWindow = function(){

	var windowModel = new ExportWindowModel( { modal:true } );

	var windowView = new ExportWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createImportWindow = function(){

	var windowModel = new ImportWindowModel( { modal:true } );

	var windowView = new ImportWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createNewpageWindow = function(){

	var windowModel = new NewpageWindowModel( { modal:true } );

	var windowView = new NewpageWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createStartingNewpageWindow = function(){

    var windowModel = new StartingNewpageWindowModel( { modal:true } );

    var windowView = new StartingNewpageWindowView( { windowModel: windowModel } );

    return windowView;
}

WindowFactory.createPublishWindow = function(){

	var windowModel = new PublishWindowModel( { modal:true } );

	var windowView = new PublishWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createCreateNewVariableWindow = function(){

	var windowModel = new CreateNewVariableWindowModel( { modal:true } );

	var windowView = new CreateNewVariableWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createAnimateWindow = function(animtionData){

    var windowModel = new AnimationWindowModel( { modal:true } );

    var windowView = new AnimationView( { windowModel: windowModel, animtionData: animtionData } );

    return windowView;
}

WindowFactory.createLibraryWindow = function(){

	var windowModel = new LibraryWindowModel( { modal:true } );

	var windowView = new LibraryWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createProjectOptionsWindow = function(){

	var windowModel = new ProjectOptionsWindowModel( { modal:true } );

	var windowView = new ProjectOptionsWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createShareWindow = function(){

	var windowModel = new ShareWindowModel( { modal:true } );

	var windowView = new ShareWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createPreviewWindow = function(){

	var windowModel = new PreviewWindowModel( { modal:true } );

	var windowView = new PreviewWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createTriggerWindow = function(){

	var windowModel = new TriggerWindowModel( { modal:true } );

	var windowView = new TriggerWindowView( { windowModel: windowModel } );

	return windowView;
}

WindowFactory.createAddNewPageProgressWindow = function(addNewPageData){

    var windowModel = new AddNewPageProgressModel( );

    var windowView = new AddNewPageProgressView( { windowModel: windowModel, addNewPageData:addNewPageData } );

    return windowView;
}

WindowFactory.createPdfListWindow = function(pdfListData){

    var windowModel = new PdfListWindowModel( );

    var windowView = new PdfListWindowView( { windowModel: windowModel, pdfListData:pdfListData } );

    return windowView;
}

WindowFactory.createExportHtml5Window = function(){

    var windowModel = new WindowModel({draggable: false, modal: true});

    var windowView = new ExportHtmlWindowView( { windowModel: windowModel } );

    return windowView;
}

WindowFactory.createExportScormWindow = function(){

    var windowModel = new WindowModel({draggable: false, modal: true});

    var windowView = new ExportScormWindowView( { windowModel: windowModel } );

    return windowView;
}

WindowFactory.createExportPdfWindow = function(){

    var windowModel = new WindowModel({draggable: false, modal: true});

    var windowView = new ExportPdfWindowView( { windowModel: windowModel } );

    return windowView;
}

WindowFactory.createMailingWindow = function(projectModel){

    var windowModel = new MailingWindowModel();

    var windowView = new MailingWindowView( { windowModel: windowModel, model: projectModel } );

    return windowView;
}

WindowFactory.createGeneratePdfProgressWindow = function(data){

    var windowModel = new WindowModel({ modal:false });

    var windowView = new GeneratePdfProgressView( { windowModel: windowModel, data:data } );

    return windowView;
}

WindowFactory.createGraphBaizerPrevievWindow = function(data){

    var windowModel = new BaizerWindowModel({ modal:false });

    var windowView = new BaizerWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}

WindowFactory.createTestDriveWindow = function(data){

    var windowModel = new TestDriveWindowModel();

    var windowView = new TestDriveWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}

WindowFactory.createTimerWindow = function(data){

    var windowModel = new TimerWindowModel();

    var windowView = new TimerWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}


WindowFactory.createFunctionNotAvailableWindow = function(data){

    var windowModel = new FunctionNotAvailableWindowModel();

    var windowView = new FunctionNotAvailableWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}

WindowFactory.createPhotopeaWindow = function(data){

    var windowModel = new PhotopeaWindowModel();

    var windowView = new PhotopeaWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}

WindowFactory.createPasteComponentsWindow = function(data){

    var windowModel = new PasteComponentsWindowModel();

    var windowView = new PasteComponentsWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}


WindowFactory.createSoundManagerWindow = function(data){

    var windowModel = new SoundManagerWindowModel();

    var windowView = new SoundManagerWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}


WindowFactory.createQuizfillInBlanksOptionsWindow = function(data){

    var windowModel = new QuizfillInBlanksOptionsWindowModel();

    var windowView = new QuizfillInBlanksOptionsWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}

WindowFactory.createEditorConatinerWindow = function(data){

    var windowModel = new EditorConatinerWindowModel();

    var windowView = new EditorConatinerWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}

WindowFactory.createAddMultiComponentsWindow = function(data){

    var windowModel = new AddMultiComponentsWindowModel();

    var windowView = new AddMultiComponentsWindowView( { windowModel: windowModel, data:data } );

    return windowView;
}




