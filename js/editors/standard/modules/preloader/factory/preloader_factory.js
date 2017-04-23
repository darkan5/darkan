function PreloaderFactory(){

}

PreloaderFactory.createDefaultLoader = function(){

	var loader = new PreladerView({ model: new PrelaoderModel() });

	return loader;
}

PreloaderFactory.createProjectsListControllerLoader = function(){

	var loader = new ProjectsListControllerLoader({ model: new PrelaoderModel() });

	return loader;
}

PreloaderFactory.createNotEditableProjectViewLoader = function(){

	var loader = new NotEditableProjectViewLoader({ model: new PrelaoderModel() });

	return loader;
}

PreloaderFactory.createCropWindowLoader = function(){

	var loader = new CropWindowLoader({ model: new PrelaoderModel() });

	return loader;
}

PreloaderFactory.createPreviewProjectLoader = function(){

	var loader = new PreviewProjectLoader({ model: new PrelaoderModel() });

	return loader;
}

PreloaderFactory.createLoadProjectLoader = function(){

	var loader = new LoadProjectLoader({ model: new PrelaoderModel() });

	return loader;
}



