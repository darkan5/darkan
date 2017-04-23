function DataAccess(){

}

DataAccess.connect = function(data, onResult, onFault, context){


	var hostname = window.location.hostname;

	var islocalhost = (hostname == 'jerzy.pl' || hostname == 'localhost');

	// if (islocalhost) {
	
	// 	this.webService = WebService.create('fake');
	// }else{
	// 	this.webService = WebService.create('node');
	// }	

	this.webService = WebService.create('node');

	this.webService.connect(data, onResult, onFault, context);
}

DataAccess.ledOnOff = function(data, onResult, onFault, context){

    this.webService.ledOnOff(data, onResult, onFault, context);
}

DataAccess.listenTemperatureSensors = function(data, onResult, onFault, context){

    this.webService.listenTemperatureSensors(data, onResult, onFault, context);
}

DataAccess.askAboutTemperature = function(data, onResult, onFault, context){

    this.webService.askAboutTemperature(data, onResult, onFault, context);
}



