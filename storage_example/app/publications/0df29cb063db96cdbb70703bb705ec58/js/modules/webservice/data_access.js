function DataAccess(){

}

DataAccess.connect = function(data, onResult, onFault){

    //this.nodeWebService = WebService.create('node');
    this.phpWebService = WebService.create('php');
    this.fakeWebService = WebService.create('fake');
}

DataAccess.uploadDocFile = function(data, appLink, onResult, onFault, onProgress, onComplete){

    this.phpWebService.uploadDocFile(data, appLink, onResult, onFault, onProgress, onComplete);
}



DataAccess.connect();