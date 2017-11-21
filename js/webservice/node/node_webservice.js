/**
 * Created with IntelliJ IDEA.
 * User: adm
 * Date: 03.02.15
 * Time: 16:08
 * To change this template use File | Settings | File Templates.
 */

function NodeWebservice(){


    this.connectionString = 'https://darkan.eu:3801';
}

NodeWebservice.prototype = new WebService();

NodeWebservice.prototype.connect = function(params, onResult, onFault, context)
{
    var _that = this;

    this.socket = io.connect(this.connectionString, {
        // 'reconnection': true,
        // 'reconnectionDelay': 1000,
        // 'reconnectionDelayMax' : 5000,
        // 'reconnectionAttempts': 5
    });

    this.socket.on('connect', function(data){
        console.log('On connect', data);
        onResult.call(context, data);
    });


    this.socket.on('error', function(err){
        console.log('error', err);
    });


}

NodeWebservice.prototype.ledOnOff = function(params, onResult, onFault, context)
{
    var _that = this;

    this.socket.emit('ledOnOff',  params );

    this.socket.off('ledOnOff');
    this.socket.on('ledOnOff', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault, context );
    });
}

NodeWebservice.prototype.listenTemperatureSensors = function(params, onResult, onFault, context)
{
    var _that = this;

    this.socket.off('listenTemperatureSensors');
    this.socket.on('listenTemperatureSensors', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault, context );
    });
}

NodeWebservice.prototype.askAboutTemperature = function(params, onResult, onFault, context)
{
    var _that = this;

    this.socket.emit('askAboutTemperature',  params );

    this.socket.off('askAboutTemperature');
    this.socket.on('askAboutTemperature', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault, context );
    });
}




NodeWebservice.prototype.onMessageBack = function (responce, onResult, onFault, context)
{
    if(responce.error == undefined){
        onResult.call(context, responce);
    }else{
        onFault.call(context, responce);
    }
}
