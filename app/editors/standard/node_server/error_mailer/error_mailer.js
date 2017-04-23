module.exports = ErrorMailer;

var nodemailer = require('nodemailer');

Utils = require('../utils/Utils.js');

function ErrorMailer(socket){



    this.socket = socket;

    this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'i.zieba@rapsody.com.pl',
            pass: 'raps1357'
        }
    });
}

ErrorMailer.ON_ERROR = 'On error';
ErrorMailer.ON_CATCH = 'On catch';
ErrorMailer.ON_CATCH_FAULT = 'On catch fault';
ErrorMailer.ON_FAULT = 'On fault';

ErrorMailer.prototype.send = function(err, type){

    this._DEBUG = false;

    try{

        if (this._DEBUG) {

            type = type == undefined ? ErrorMailer.ON_CATCH : type;

            var userId = this.socket.ownerId.toString();
            var projectId = this.socket.myRoom.toString();

            if(typeof err == 'string'){

                var temperr = {
                    message:err,
                    name:'function error'
                }

                err = temperr;

            }else{

                err = err == undefined ? {} : err;
            }

            var message = err.message == undefined ? 'No message' : err.message;
            var name = err.name == undefined ? 'No name' : err.name;
            var stack = err.stack == undefined ? 'No stack' : err.stack.split("\n").join('<br/>');

            var handshake = this.socket.handshake == undefined ? 'No handshake' : Utils.jsonStringify(this.socket.handshake);

            this.transporter.sendMail({
                from: 'i.zieba@rapsody.com.pl',
                to: 'j.kutyna@rapsody.com.pl, p.wiecaszek@rapsody.com.pl',
                subject: 'Darkan node error ' + '(' + type + ')',
                html: '<strong>Type: </strong>' + type +  '<br/>' +
                    '<strong>User id: </strong>' + userId +  '<br/>' +
                    '<strong>Project id: </strong>' + projectId +  '<br/>' +
                    '<strong>Name: </strong>' + name +  '<br/>' +
                    '<strong>Message: </strong>' + message +  '<br/>' +
                    '<strong>Stack: </strong>' + stack + '<br/>' +
                    '<strong>Handshake : </strong>'+ '<br/>'  + handshake
            });
            
        }


    }catch(ex){
        console.log('Catch to send email', ex);
    }
}
