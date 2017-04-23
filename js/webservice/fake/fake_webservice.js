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

FakeWebservice.prototype.connect = function (parems, onResult, onFault, context)
{
	onResult.call(context, {});
}


FakeWebservice.prototype.ledOnOff = function (parems, onResult, onFault, context)
{
    onResult.call(context, {} );
}