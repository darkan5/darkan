var ServerSocket = function(address) {
	var that = this;

	this.address = address;
	this.socket = new WebSocket(address);
	this.receivedData = {};


	// polaczenie z serwerem
 	this.socket.onopen = function() {
  		console.log('connected');
 	};



}

ServerSocket.prototype.sendMessage = function(data, onResult, onFault) {

    // odebranie informacji z serwera
    this.socket.onmessage = function(responseData) {

        try{
            var responce = JSON.parse( responseData.data );

            console.log("responseData " +  responce );

            if(responce.error == undefined){

                onResult(responce);
            }else{

                onFault(responce);
            }

        }catch (ex){

            onFault( JSON.stringify( { responce:{ error:"Parse Json error" }, ex: ex } ) );
        }
    };

	this.socket.send(JSON.stringify(data));
}