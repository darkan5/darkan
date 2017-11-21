
/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes')
  , user    = require('./routes/user')
  , http    = require('http')
  , fs      = require('fs')
  , path    = require('path');

var app = express();
var port = 3000;


// all environments
app.set('port', process.env.PORT || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

/*
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/

var users = [];

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function(socket){

	console.log('New connection attempt');
	io.sockets.emit('newUserList', {userList:users});

	socket.on('addUser', function(name){
	socket.username = name ;
	console.log(name + " has joined");
	users.push(name);
	io.sockets.emit('updateUserList', {user:name , connectionType:'add'});



	});
    socket.on('startCount', function(){
        io.sockets.emit('startCounter');


    });
    socket.on('loadFile',function () {
        fs.readFile(__dirname + "/lib/questions.json", "Utf-8", function(err, data){
            socket.emit('sendQuestions', JSON.parse(data));
        });
    });

	//get some point from good question and emit update Point
    socket.on('addPointToUser', function(username,point){

        io.sockets.emit('updatePoint',username,point);

    });
   //change next question
    socket.on('changeQuestion',function (user,state) {

        io.sockets.emit('changeQuestionInAll', user,state);

    });
    socket.on('nextQuestion',function (data,state) {
		state = state + 1 ;
        io.sockets.emit('nextQuestionChange', data,state);

    });
	socket.on('disconnect', function(){
		console.log(socket.username + " has disconnected");
		var index = users.indexOf(socket.username);
		users.splice(index, 1);
		io.sockets.emit('updateUserList', {user:socket.username, connectionType:'delete'});
	});

});

function getQuestions(){

}
