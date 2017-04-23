function DataAccess(){

}

DataAccess.connect = function(data, onResult, onFault){

    //this.nodeWebService = WebService.create('node');
    this.phpWebService = WebService.create('php');
    this.fakeWebService = WebService.create('fake');
}



DataAccess.getHashedApikey = function(data, onResult, onFault){

    this.phpWebService.getHashedApikey(data, onResult, onFault);
}


DataAccess.addNewProject = function(data, onResult, onFault){

    this.phpWebService.addNewProject(data, onResult, onFault);
}

DataAccess.publishProject = function(data, onResult, onFault){

    this.phpWebService.publishProject(data, onResult, onFault);
}



DataAccess.connect();