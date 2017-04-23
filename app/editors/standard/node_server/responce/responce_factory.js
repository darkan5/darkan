var ResponceResult = require('../responce/responce_result.js');
var ResponceWatcherResult = require('../responce/responce_watcher_result.js');

module.exports = ResponceFactory;


function ResponceFactory(){

}

ResponceFactory.createResponceResult = function(result){

	return new ResponceResult(result);
}

ResponceFactory.createResponceFault = function(){

	var responce = {

	};

	return responce;
}

ResponceFactory.createWatcherResponceResult = function(result){

	return new ResponceWatcherResult(result);
}

ResponceFactory.createWatcherResponceFault = function(){

	var responceFault = {
		status: false
	};

	return responce;
}
