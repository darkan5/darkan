var ServerSocketIo = function(address) {
    var that = this;

    this.socket = io.connect(address);
}

ServerSocketIo.prototype.sendMessage = function(data, onResult, onFault) {

    this.socket.on('message', function (responseData) {
        if(responseData.message) {

            console.log("responseData ");
            console.log(responseData);

            try{
                var responce = JSON.parse( responseData.message.data );

                console.log("responseData " +  responce );

                if(responce.error == undefined){

                    onResult(responce);
                }else{

                    onFault(responce);
                }

            }catch (ex){

                onFault( JSON.stringify( { responce:{ error:"Parse Json error" }, ex: ex } ) );
            }

        } else {
            console.log("There is a problem:", responseData);
        }
    });

    this.socket.emit(data.fn, { message: data });

    // odebranie informacji z serwera
//    this.socket.onmessage = function(responseData) {
//
//        try{
//            var responce = JSON.parse( responseData.data );
//
//            console.log("responseData " +  responce );
//
//            if(responce.error == undefined){
//
//                onResult(responce);
//            }else{
//
//                onFault(responce);
//            }
//
//        }catch (ex){
//
//            onFault( JSON.stringify( { responce:{ error:"Parse Json error" }, ex: ex } ) );
//        }
//    };
//
//    this.socket.send(JSON.stringify(data));
}
