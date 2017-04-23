function WebService(){

}

WebService.create = function(type){
    switch(type){
        case 'php':
            return new PhpWebservice();
            break;

        default :
            return new PhpWebservice();
            break;
    }
}

WebService.prototype.connect = function(params, onResult, onFault)
{
    // To override
}

WebService.prototype.sendAndLoad = function (url, settings, onResult, onFault)
{
    // To override
}