function WebService(){

}

WebService.create = function(type){
    switch(type){
        case 'php':
            return new PhpWebservice();
            break;
        case 'node':
            return new NodeWebservice();
            break;
        case 'fake':
            return new FakeWebservice();
            break;

        default :
            return new FakeWebservice();
            break;
    }
}


WebService.prototype.sortCategories = function(settings, onResult, onFault)
{
    // To override
}

WebService.prototype.updateSettings = function(settings, params)
{
    settings = settings || {};

	for(var item in params)
	{
		settings[item] = params[item];
	}
}

WebService.prototype.sendAndLoad = function (url, settings, onResult, onFault)
{
    // To override
}


