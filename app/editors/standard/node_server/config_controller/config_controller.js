var Config = require('../config.js');
var path = require('path');

module.exports = ConfigController;


function ConfigController(){

}

ConfigController.get = function(constant, usePathJoin) {
	if (typeof Config[constant] === undefined) {
		return '';
		
	} else {
		if (typeof usePathJoin === undefined || usePathJoin === false) {
			return Config[constant];
		} else {
			return path.join(Config[constant]);
		}
	}
}

// ConfigController.getStoragePath = function(){
// 	return path.join(Config.STORAGE_PATH);
// 	//return path.join(__dirname, '../','../', 'projects');
// }

// ConfigController.getLibraryPath = function(){
// 	return path.join(Config.LIBRARY_PATH);
// 	//return path.join(__dirname, '../','../', 'projects');
// }

// ConfigController.getPublicPath = function(){
// 	return path.join(Config.PUBLIC_PATH);
// 	//return path.join(__dirname, '../','../', 'projects');
// }

// ConfigController.getVersion = function(){
// 	return Config.VERSION;
// 	//return path.join(__dirname, '../','../', 'projects');
// }