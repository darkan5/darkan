/**
 * Created with IntelliJ IDEA.
 * User: adm
 * Date: 03.02.15
 * Time: 16:12
 * To change this template use File | Settings | File Templates.
 */

function FakeWebservice(){

}

FakeWebservice.prototype = new WebService();



FakeWebservice.prototype.createNewFolder = function(params, onResult, onFault){

	onResult({ status:true });
}

FakeWebservice.prototype.createNewProject = function(params, onResult, onFault){

	onResult({ status:true });
}




FakeWebservice.prototype.sendAndLoad = function (url, settings, onResult, onFault)
{
    console.log('Fake webservice send');
}