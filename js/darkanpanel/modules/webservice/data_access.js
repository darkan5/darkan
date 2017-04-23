function DataAccess(){
	
}

DataAccess.start = function()
{
    this.phpWebService = WebService.create('php');
}


DataAccess.start();

DataAccess.lmsRequest = function(data, onResult, onFault, context) {
	this.phpWebService.lmsRequest(data, onResult, onFault, context);
}

DataAccess.getNumberOfUsersAndCourses = function(data, onResult, onFault, context) {
    this.phpWebService.getNumberOfUsersAndCourses(data, onResult, onFault, context);
}

DataAccess.getUsersPageTimes = function(data, onResult, onFault, context) {
    this.phpWebService.getUsersPageTimes(data, onResult, onFault, context);
}

DataAccess.courseStatus = function(data, onResult, onFault, context) {
    this.phpWebService.courseStatus(data, onResult, onFault, context);
}

DataAccess.userStatus = function(data, onResult, onFault, context) {
    this.phpWebService.userStatus(data, onResult, onFault, context);
}

DataAccess.getUsersDetailsInCourse = function(data, onResult, onFault, context) {
    this.phpWebService.getUsersDetailsInCourse(data, onResult, onFault, context);
}

DataAccess.sendMails = function(data, onResult, onFault, context) {
    this.phpWebService.sendMails(data, onResult, onFault, context);
}

DataAccess.getPanelSettings = function(data, onResult, onFault, context) {
    this.phpWebService.getPanelSettings(data, onResult, onFault, context);
}

DataAccess.setPanelSettings = function(data, onResult, onFault, context) {
    this.phpWebService.setPanelSettings(data, onResult, onFault, context);
}

DataAccess.getCourseQuestionsData  = function(data, onResult, onFault, context) {
    this.phpWebService.getCourseQuestionsData (data, onResult, onFault, context);
}

DataAccess.getCourseQuestionsDataByUserId  = function(data, onResult, onFault, context) {
    this.phpWebService.getCourseQuestionsDataByUserId (data, onResult, onFault, context);
}

DataAccess.downloadChartPivotTableSingleCourse  = function(data, onResult, onFault, context) {
    this.phpWebService.downloadChartPivotTableSingleCourse (data, onResult, onFault, context);
}



