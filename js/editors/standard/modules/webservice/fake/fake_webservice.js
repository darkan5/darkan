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

FakeWebservice.prototype.createBlankPage = function(params, onResult, onFault, onProgress)
{
    this.sendAndLoad();
}

FakeWebservice.prototype.saveFileOnServer = function(params, onResult, onFault, onProgress)
{
    console.log('Save file on server');
}

FakeWebservice.prototype.sendAndLoad = function (url, settings, onResult, onFault)
{
    console.log('Fake webservice send');

}