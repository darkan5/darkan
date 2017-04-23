function DarkanEditorController()
{
	
}

DarkanEditorController.goToPage = function(data, sender){

	ProjectView.instance.goToPage(data);
}

DarkanEditorController.goToNextPage = function(data, sender){

	ProjectView.instance.goToNextPage(data);
}

DarkanEditorController.goToPrewPage = function(data, sender){

	ProjectView.instance.goToPrewPage(data);
}

DarkanEditorController.goToPrevPage = function(data, sender){

	ProjectView.instance.goToPrevPage(data);
}

DarkanEditorController.sendCredentials = function(data, sender){

	DataAccess.loginExternal(
		data, 
		function(rdata){
			_log('sendCredentials result', rdata, _log.dataaccessOutResult);
		},
		function(rdata){
			_log('sendCredentials fault', rdata, _log.dataaccessOutFault);
		}
	);
}

DarkanEditorController.sortPages = function(data, sender){

	ProjectView.instance.sortPages(data);
}









