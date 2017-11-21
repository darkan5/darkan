
/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes')
  , user    = require('./routes/user')
  , http    = require('http')
  , fs      = require('fs')
  , path    = require('path')
    , events = require('events');
var app = express();
var port = 3800;


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
// if ('development' == app.get('env')) {
//   app.use(express.errovbrHandler());
// }

app.get('/', routes.index);
app.get('/users', user.list);

/*
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/

var users = [];
var pointUser = [] ;
var pointUserJson = {} ;
var questionStatus = [];
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
    socket.on("clean",function () {
        questionStatus = [];
    });
    socket.on("updatePoint",function (userName) {
        console.log(questionStatus);
        sendPoint = pointUser[userName] ;
        io.sockets.emit("updatePointAll",userName,sendPoint);
    });


	socket.on("questionDone",function (currentQuestion) {


            console.log(questionStatus[currentQuestion] );
        if (isNaN(questionStatus[Number(currentQuestion)])){
            questionStatus[Number(currentQuestion)] = 0 ;
        }
	    questionStatus[Number(currentQuestion)] += 1 ;

        if (questionStatus[currentQuestion] == users.length) {

            io.sockets.emit("nextQuestion",pointUserJson);

        }
    });
    socket.on('startCount', function(){
        io.sockets.emit('startCounter');


    });
    socket.on('loadFile',function () {
        // fs.readFile(__dirname + "/lib/questions.json", "Utf-8", function(err, data){
        //     socket.emit('sendQuestions', JSON.parse(data));
        // });
        fs.readFile(__dirname + "/lib/questions2.json", "Utf-8", function(err, data){
            socket.emit('sendQuestions2', JSON.parse(data));
        });
    });

	//get some point from good question and emit update Point
    socket.on('addPointToUser', function(username,point){
        pointUser[username] = point ;
        pointUserJson = JSON.stringify(pointUser);


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
        pointUser.splice(index, 1);
		io.sockets.emit('updateUserList', {user:socket.username, connectionType:'delete'});
		console.log("user");
		console.log(users);
        console.log(pointUser);

        if (users.length == 0){
            questionStatus = [];
            console.log('clean questionStatus');
        }
	});


});
