function DarkanCourseController()
{
	
}

DarkanCourseController.goToPage = function(data, sender){

	TriggerController.instance.goToPage(data);
}

DarkanCourseController.goToNextPage = function(data, sender){

	TriggerController.instance.gotonextpage(data);
}

DarkanCourseController.goToPrewPage = function(data, sender){

	TriggerController.instance.gotoprevpage(data);
}

DarkanCourseController.goToPrevPage = function(data, sender){

	TriggerController.instance.gotoprevpage(data);
}


DarkanCourseController.saveScorm = function(data, sender){

	if(ScormController.instance){
		ScormController.instance.saveScorm(data);
	}
}




