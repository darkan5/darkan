function DataAccess(){

}

DataAccess.connect = function(data, onResult, onFault){

    //this.nodeWebService = WebService.create('node');
    this.phpWebService = WebService.create('php');
    this.fakeWebService = WebService.create('fake');
}

DataAccess.saveFolderStructure = function(data, onResult, onFault){

    this.phpWebService.saveFolderStructure(data, onResult, onFault);
}

DataAccess.createNewFolder = function(data, onResult, onFault){

	_log('createNewFolder', data, _log.dataaccessIn);

    this.phpWebService.createNewFolder(data, onResult, onFault);
}

DataAccess.createNewProject = function(data, onResult, onFault){

	_log('createNewProject', data, _log.dataaccessIn);

    this.phpWebService.createNewProject(data, onResult, onFault);
}

DataAccess.deleteFolder = function(data, onResult, onFault){

	_log('deleteFolder', data, _log.dataaccessIn);

    this.phpWebService.deleteFolder(data, onResult, onFault);
}

DataAccess.deleteProject = function(data, onResult, onFault){

    _log('deleteProject', data, _log.dataaccessIn);

    this.phpWebService.deleteProject(data, onResult, onFault);
}

DataAccess.setLastVisitedFolderId = function(data, onResult, onFault){

    _log('setLastVisitedFolderId', data, _log.dataaccessIn);

    this.phpWebService.setLastVisitedFolderId(data, onResult, onFault);
}

DataAccess.copyProject = function(data, onResult, onFault){

    _log('copyProject', data, _log.dataaccessIn);

    this.phpWebService.copyProject(data, onResult, onFault);
}

DataAccess.templateProject = function(data, onResult, onFault){

    _log('templateProject', data, _log.dataaccessIn);

    this.phpWebService.templateProject(data, onResult, onFault);
}

DataAccess.shareProject = function(data, onResult, onFault){

    _log('shareProject', data, _log.dataaccessIn);

    this.phpWebService.shareProject(data, onResult, onFault);
}

DataAccess.unshareProject = function(data, onResult, onFault){

    _log('unshareProject', data, _log.dataaccessIn);

    this.phpWebService.unshareProject(data, onResult, onFault);
}

DataAccess.getShareProjectUsers = function(data, onResult, onFault){

    _log('getShareProjectUsers', data, _log.dataaccessIn);

    this.phpWebService.getShareProjectUsers(data, onResult, onFault);
}

DataAccess.updateProject = function(data, onResult, onFault){

    _log('updateProject', data, _log.dataaccessIn);

    this.phpWebService.updateProject(data, onResult, onFault);
}

DataAccess.updateFolder = function(data, onResult, onFault){

    _log('updateFolder', data, _log.dataaccessIn);

    this.phpWebService.updateFolder(data, onResult, onFault);
}

DataAccess.moveFolder = function(data, onResult, onFault){

    _log('moveFolder', data, _log.dataaccessIn);

    this.phpWebService.moveFolder(data, onResult, onFault);
}

DataAccess.moveProject = function(data, onResult, onFault){

    _log('moveProject', data, _log.dataaccessIn);

    this.phpWebService.moveProject(data, onResult, onFault);
}

DataAccess.checkSharedProjects = function(data, onResult, onFault){

    _log('checkSharedProjects', data, _log.dataaccessIn);

    this.phpWebService.checkSharedProjects(data, onResult, onFault);
}

DataAccess.disconectFromSharedProjects = function(data, onResult, onFault){

    _log('disconectFromSharedProjects', data, _log.dataaccessIn);

    this.phpWebService.disconectFromSharedProjects(data, onResult, onFault);
}

DataAccess.uploadZbit = function(data, onResult, onFault, onProgress, onComplete){

    _log('uploadZbit', data, _log.dataaccessIn);

    this.phpWebService.uploadZbit(data, onResult, onFault, onProgress, onComplete);
}

DataAccess.getSummaryUserProjects = function(data, onResult, onFault){

    _log('getSummaryUserProjects', data, _log.dataaccessIn);

    this.phpWebService.getSummaryUserProjects(data, onResult, onFault);
}

DataAccess.downloadProject = function(data, onResult, onFault){

    _log('downloadProject', data, _log.dataaccessIn);

    this.phpWebService.downloadProject(data, onResult, onFault);
}


    

DataAccess.sendAccessRequest= function(data, onResult, onFault){
    this.phpWebService.sendAccessRequest(data, onResult, onFault);
}





DataAccess.savePayment = function(data, onResult, onFault){
    this.phpWebService.savePayment(data, onResult, onFault);
}

DataAccess.showHidePublication = function(data, onResult, onFault) {
    this.phpWebService.showHidePublication(data, onResult, onFault);
}

DataAccess.deletePublication = function(data, onResult, onFault){
    this.phpWebService.deletePublication(data, onResult, onFault);
}

DataAccess.sortPublication = function(data, onResult, onFault){
    
    _log('sortPublication', data, _log.dataaccessIn);

    this.phpWebService.sortPublication(data, onResult, onFault);
}

DataAccess.saveSubdomain = function(data, onResult, onFault){

    this.phpWebService.saveSubdomain(data, onResult, onFault);
}

DataAccess.saveSubdomainName = function(data, onResult, onFault){

    this.phpWebService.saveSubdomainName(data, onResult, onFault);
}


DataAccess.changePassword = function(data, onResult, onFault){

    this.phpWebService.changePassword(data, onResult, onFault);
}

DataAccess.changeAvatar = function(data, onResult, onFault){

    this.phpWebService.changeAvatar(data, onResult, onFault);
}

DataAccess.initPortalPayment = function(data, onResult, onFault){

    this.phpWebService.initPortalPayment(data, onResult, onFault);
}

DataAccess.checkDiscountCode = function(data, onResult, onFault){

    this.phpWebService.checkDiscountCode(data, onResult, onFault);
}

DataAccess.changePortalSettings = function(data, onResult, onFault){

    this.phpWebService.changePortalSettings(data, onResult, onFault);
}

DataAccess.getPortalSettings = function(data, onResult, onFault){

    this.phpWebService.getPortalSettings(data, onResult, onFault);
}

DataAccess.changePortalSkin = function(data, onResult, onFault){

    this.phpWebService.changePortalSkin(data, onResult, onFault);
}

DataAccess.checkTestDriveForm = function(data, onResult, onFault){

    this.phpWebService.checkTestDriveForm(data, onResult, onFault);
}

DataAccess.acceptCookiePolicy = function(data, onResult, onFault){

    this.phpWebService.acceptCookiePolicy(data, onResult, onFault);
}



DataAccess.connect();