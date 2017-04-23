var Device = function(){
	
} 

Device.detect = function(){
	this.type = 'browser'; //browser, ipad
} 

Device.setDeviceType = function(type){
	this.type = type;
} 

Device.getDeviceType = function(){
	return this.type; //ipad
} 

Device.detect();