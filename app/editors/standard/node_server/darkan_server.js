//var ConnectionHandler = require('./connection_handler');

require('dotenv').config({path: '../.env'});



var protocol = "https" ;

if (process.env.APP_STATUS == "local"){
    protocol = "http" ;

}
console.log('--------------');
console.log(process.env.APP_STATUS);
console.log('--------------');

//connectionHandler = new ConnectionHandler();
var path = require('path'),
    util = require('util'),
    https = require(protocol),
    fs = require('fs'),
    express = require("express"),
    Utils = require("./utils/Utils.js"),
    MethodsController = require('./methods_controller/methods_controller.js'),
    // Database = require('./database/database.js'),
    ImageFileUploader = require('./uploader/image-file-uploader.js'),
    AudioFileUploader = require('./uploader/audio-file-uploader.js'),
    VideoFileUploader = require('./uploader/video-file-uploader.js'),
    SwfFileUploader = require('./uploader/swf-file-uploader.js'),
    FileFileUploader = require('./uploader/file-file-uploader.js'),
    SoundsFileUploader = require('./uploader/sounds-file-uploader.js'),
    GalleryFileUploader = require('./uploader/gallery-file-uploader.js'),
    PageSoundFileUploader = require('./uploader/pagesound-file-uploader.js'),
    ProjectSoundFileUploader = require('./uploader/projectsound-file-uploader.js'),
    PageImageFileUploader = require('./uploader/pageimage-file-uploader.js'),
    ImportPdfFileUploader = require('./uploader/import-pdf-file-uploader.js'),
    ImportPsdFileUploader = require('./uploader/import-psd-file-uploader.js'),
    ImportImageFileUploader = require('./uploader/import-image-file-uploader.js'),
    PublishIconFileUploader = require('./uploader/publish-ico-file-uploader.js'),
    PublishBannerIconFileUploader = require('./uploader/publish-banner-ico-file-uploader.js'),
    ConfigController = require('./config_controller/config_controller.js');


var ErrorMailer = require('./error_mailer/error_mailer.js');



var app = express();
var port = ConfigController.get('PORT', false);

if (process.env.APP_STATUS == "server") {
    options = {
         key: fs.readFileSync('/etc/letsencrypt/live/darkan.eu/privkey.pem'),
         cert: fs.readFileSync('/etc/letsencrypt/live/darkan.eu/cert.pem'),
         ca: fs.readFileSync('/etc/letsencrypt/live/darkan.eu/chain.pem')

    }
}
if (process.env.APP_STATUS == "local"){
    options = null

}


//var server = https.createServer(options,app).listen(app.get('3801'), function(){
  //console.log("Express server listening on port with https " + app.get('port'));
//});
   



var server = https.createServer(options, app);
var io = require('socket.io').listen(server);
server.listen(3000);




var FileBufferSize = 100000; //524288

// var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

// var database = new Database();

var guestsAccounts = [];


setInterval(function(){
    global.gc();
    console.log('GC done');
}, 1000 * 480); // 8 minut

io.sockets.on('uncaughtException', function(err) {
     console.log('____________________________uncaughtException_________________________________');
});
// io.sockets.on('error', function(err) {
//      console.log('____________________________error_________________________________');
// });

io.sockets.on('connection', function (socket) {
    console.log("User connected");

    

    socket.methodsController = new MethodsController(socket, io.sockets);
    socket.methodsController.connected();

    socket.errorMailer = new ErrorMailer(socket);


    socket.on('uncaughtException', function(err) {
        //console.log('uncaughtException');
    });

    socket.on('error', function(err) {

        if(err) {

            var message = err.message;
            var name = err.name;
            var stack = err.stack.split("\n");

            console.log('on error ', err);
            console.log('on error message ', message );
            console.log('on error name ', name );
            console.log('on error stack');

            for (var i = 0; i < stack.length; i++) {
                console.log(stack[i]);
            };

            socket.emit('darkan-node-error', {});

            socket.errorMailer.send(err, ErrorMailer.ON_ERROR);
        }

    });


    socket.on('projectDownloadedFromOcs', function(data) {

        socket.methodsController.projectDownloadedFromOcs(
            data,
            function(response){
                socket.emit('projectDownloadedFromOcs', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('projectDownloadedFromOcs', response);
            }
        );
    });





    socket.on('getAllProjectsList', function(data) {
        console.log('getAllProjectsList.....');

        socket.methodsController.getAllProjectsList(
            data,
            function(response){
                socket.emit('getAllProjectsList', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('getAllProjectsList', response);
            }
        );
    });

    socket.on('getTemplatesProjectsList', function(data) {
        console.log('getTemplatesProjectsList.....');

        socket.methodsController.getTemplatesProjectsList(
            data,
            function(response){
                socket.emit('getTemplatesProjectsList', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('getTemplatesProjectsList', response);
            }
        );
    });



    socket.on('loadProjectById', function(data) {
        console.log('loadProjectById.....');

        socket.methodsController.loadProjectById(
            data,
            function(response){
                socket.emit('loadProjectById', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('loadProjectById', response);
            }
        );
    });



    socket.on('createPageThumb', function(data) {
        console.log('Creating page thumb.....');

        socket.methodsController.createPageThumb(
            data,
            function(response){
                socket.broadcast.to(socket.myRoom).emit('pageThumbCreated', response);
                socket.emit('pageThumbCreated', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.broadcast.to(socket.myRoom).emit('pageThumbCreated', response);
                socket.emit('pageThumbCreated', response);
            }
        );
    });

    socket.on('updateTimelineOptions', function(data) {
        console.log('updateTimelineOptions.....');

        socket.methodsController.updateTimelineOptions(
            data,
            function(response){
                socket.emit('updateTimelineOptions', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('updateTimelineOptions', response);
            }
        );
    });

    socket.on('deleteSharedUser', function(data) {
        console.log('deleteSharedUser.....');

        socket.methodsController.deleteSharedUser(
            data,
            function(response){
                socket.emit('deleteSharedUser', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('deleteSharedUser', response);
            }
        );
    });

    socket.on('shareProjectToUser', function(data) {
        console.log('sharePrjectToUser.....');

        socket.methodsController.shareProjectToUser(
            data,
            function(response){
                socket.emit('shareProjectToUser', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('shareProjectToUser', response);
            }
        );
    });

    socket.on('getSharedUsers', function(data) {
        console.log('getSharedUsers.....');

        socket.methodsController.getSharedUsers(
            data,
            function(response){
                socket.emit('getSharedUsers', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('getSharedUsers', response);
            }
        );
    });

    socket.on('shareProjectToNoExistsUser', function(data) {
        console.log('shareProjectToNoExistsUser.....');

        socket.methodsController.shareProjectToNoExistsUser(
            data,
            function(response){
                socket.emit('shareProjectToNoExistsUser', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('shareProjectToNoExistsUser', response);
            }
        );
    });

    socket.on('changeLanguage', function(data) {
        console.log('changeLanguage.....');

        socket.methodsController.changeLanguage(
            data,
            function(response){
                socket.emit('changeLanguage', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('changeLanguage', response);
            }
        );
    });

    socket.on('joinToRoom', function(data) {

        console.log("JOINING TO ROOM : ", data);

        socket.methodsController.verifyAccessToProject(data.projectID, data.userID, function(userHaveAccess, projectOwner) {
        // database.verifyAccessToProject(data.projectID, data.userID, function(userHaveAccess, projectOwner) {
            //console.log("EMITING: verifyAccessToProject " + userHaveAccess.toString());
            // emit that user have access to project or not

            console.log('userHaveAccess');
            console.log(userHaveAccess);
            console.log('---------------------');
            console.log('projectOwner');
            console.log(projectOwner);

            if(userHaveAccess){

                socket.myRoom = data.projectID;
                socket.ownerId = projectOwner;
                socket.myId = data.userID;
                socket.__meta__ = data.meta;
                socket.join(data.projectID);
                



                if (socket.__meta__ && socket.__meta__.login == 'undefined') {
                    guestsAccounts.push(guestsAccounts.length);
                    socket.__meta__.login = "Guest " + guestsAccounts.length;
                }

                socket.methodsController.gettingStartedUsing(socket);
            }

            var properLogin = socket.__meta__ ? socket.__meta__.login : 'undefined';

            var verifyData = {
                ownerID: projectOwner,
                userHaveAccess: userHaveAccess,
                login: properLogin
            }

            console.log(verifyData);

            socket.emit('verifyAccessToProject', verifyData);

        }); 

    });

    socket.on('uploadImageProgress', function (data) {

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadImage', function (data) {

        var actionkey = data.actionkey;

        socket[actionkey] = new ImageFileUploader(  );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadImage'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadImage'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadImageProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadImageComplete'+ ak, response);
            }
        );
    });

    socket.on('uploadSwfProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadSwf', function (data) {

        var actionkey = data.actionkey;

        socket[actionkey] = new SwfFileUploader(  );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadSwf'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadSwf'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadSwfProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadSwfComplete'+ ak, response);
            }
        );
    });


    socket.on('uploadFileProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadFile', function (data) {

        var actionkey = data.actionkey;

        socket[actionkey] = new FileFileUploader(  );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadFile'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadFile'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadFileProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadFileComplete'+ ak, response);
            }
        );
    });



    socket.on('uploadSoundsProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });

    socket.on('uploadSounds', function (data) {

        var actionkey = data.actionkey;

        socket[actionkey] = new SoundsFileUploader( );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadSounds'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadSounds'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadSoundsProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadSoundsComplete'+ ak, response);
            }
        );
    });




    socket.on('uploadAudioProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadAudio', function (data) {

        var actionkey = data.actionkey;

        socket[actionkey] = new AudioFileUploader( );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadAudio'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadAudio'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadAudioProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadAudioComplete'+ ak, response);
            }
        );
    });

    socket.on('uploadVideoProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadVideo', function (data) {

        var actionkey = data.actionkey;

        socket[actionkey] = new VideoFileUploader( );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadVideo'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadVideo'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadVideoProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadVideoComplete'+ ak, response);
            }
        );
    });

    socket.on('uploadGalleryProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadGallery', function (data) {

        var actionkey = data.actionkey;

        socket[actionkey] = new GalleryFileUploader( );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadGallery'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadGallery'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadGalleryProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadGalleryComplete'+ ak, response);
            }
        );
    });

    socket.on('uploadPageSoundProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });

    socket.on('uploadProjectSoundProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadPageSound', function (data) {

        var actionkey = data.actionkey;

        console.log('uploadPageSound');

        socket[actionkey] = new PageSoundFileUploader( );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadPageSound'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadPageSound'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadPageSoundProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadPageSoundComplete'+ ak, response);
            }
        );
    });



    socket.on('uploadProjectSound', function (data) {

        var actionkey = data.actionkey;

        console.log('uploadProjectSound');

        socket[actionkey] = new ProjectSoundFileUploader( );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadProjectSound'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadProjectSound'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadProjectSoundProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadProjectSoundComplete'+ ak, response);
            }
        );
    });




    socket.on('uploadPageImageProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadPageImage', function (data) {

        var actionkey = data.actionkey;

        console.log('uploadPageImage');

        socket[actionkey] = new PageImageFileUploader( );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadPageImage'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadPageImage'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadPageImageProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadPageImageComplete'+ ak, response);
            }
        );
    });


    socket.on('uploadImportImageProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadImportImage', function (data) {

        var actionkey = data.actionkey;

        console.log('uploadImportImage');

        socket[actionkey] = new ImportImageFileUploader( );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadImportImage'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadImportImage'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadImportImageProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadImportImageComplete'+ ak, response);
            }
        );
    });



    socket.on('uploadImportPdfProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadImportPdf', function (data) {

        var actionkey = data.actionkey;

        console.log('uploadImportPdf');

        socket[actionkey] = new ImportPdfFileUploader( );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadImportPdf'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadImportPdf'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadImportPdfProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadImportPdfComplete'+ ak, response);
            }
        );
    });


    socket.on('uploadImportPsdProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadImportPsd', function (data) {

        var actionkey = data.actionkey;

        console.log('uploadImportPsd');

        socket[actionkey] = new ImportPsdFileUploader( );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadImportPsd'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadImportPsd'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadImportPsdProgress'+ ak, response);
            },
            //onComplete
            function(ak, responseOnComplete){

                socket.emit('uploadImportPsdComplete'+ ak, responseOnComplete);

                console.log('uploadImportPsdComplete');

                socket.methodsController.createPsdPage(
                    responseOnComplete,
                    function(response){

                        socket.emit('createPsdPage', response);
                    },
                    function(response){

                        response.error = response.error || 'Fault';
                        socket.emit('createPsdPage', response);
                    },
                    function(response){
                        socket.emit('createPsdPageProgress', response);
                    },
                    function(response){
                        socket.emit('createPsdPageComplete', response);
                    }
                )

            }
        );
    });


    socket.on('uploadPublishIconProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadPublishIcon', function (data) {

        var actionkey = data.actionkey;

        console.log('uploadPublishIcon');

        socket[actionkey] = new PublishIconFileUploader( );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadPublishIcon'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadPublishIcon'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadPublishIconProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadPublishIconComplete'+ ak, response);
            }
        );
    });

    socket.on('uploadPublishBannerIconProgress', function (data){

        var actionkey = data.actionkey;

        if(socket[actionkey] != undefined){
            socket[actionkey].upload(data);
        }
    });


    socket.on('uploadPublishBannerIcon', function (data) {

        var actionkey = data.actionkey;

        console.log('uploadPublishBannerIcon');

        socket[actionkey] = new PublishBannerIconFileUploader( );
        socket[actionkey].initialize(
            socket,
            data,
            // onResult
            function(response){
                socket.emit('uploadPublishBannerIcon'+ response.actionkey, response);
            },
            // onFault
            function(response){
                socket.emit('uploadPublishBannerIcon'+ response.actionkey, response);
            },
            // onProgress
            function(ak, response){
                socket.emit('uploadPublishBannerIconProgress'+ ak, response);
            },
            //onComplete
            function(ak, response){
                socket.emit('uploadPublishBannerIconComplete'+ ak, response);
            }
        );
    });






    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });

    socket.on('disconnect', function(e){
        socket.methodsController.disconnect(e);
    });

    socket.on('createBlankPage', function (data) {

        socket.methodsController.createBlankPage(
            data,
            function(response){

                socket.emit('createBlankPage', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('createBlankPage', response);
            }
        )
    });

    socket.on('updatePage', function (data) {

        socket.methodsController.updatePage(
            data,
            function(response){

                socket.emit('updatePage', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('updatePage', response);
            }
        )
    });

    socket.on('loadProject', function (data) {

        socket.methodsController.loadProject(
            data,
            function(response){

                socket.emit('loadProject', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('loadProject', response);
            }
        )
    });

    socket.on('deletePages', function (data) {

        socket.methodsController.deletePages(
            data,
            function(response){

                socket.emit('deletePages', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('deletePages', response);
            }
        )
    });

    socket.on('deletePage', function (data) {

        socket.methodsController.deletePage(
            data,
            function(response){

                socket.emit('deletePage', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('deletePage', response);
            }
        )
    });

    socket.on('copyPage', function (data) {

        socket.methodsController.copyPage(
            data,
            function(response){

                socket.emit('copyPage', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('copyPage', response);
            }
        )
    });


    //socket.off('watchProject');
    socket.on('watchProject', function (data) {

        var _that = this;

        socket.methodsController.watchProject(
            data,
            function(response){

                socket.broadcast.to(socket.myRoom).emit('onProjectChanged', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.broadcast.to(socket.myRoom).emit('onProjectChanged', response);
            }
        )
    });



    socket.on('goToHistoryItem', function (data) {

        socket.methodsController.goToHistoryItem(
            data,
            function(response){

                socket.broadcast.to(socket.myRoom).emit('goToHistoryItem', response);
                socket.emit('goToHistoryItem', response);
            },
            function(response){

                socket.broadcast.to(socket.myRoom).emit('goToHistoryItem', response);
                response.error = response.error || 'Fault';
                socket.emit('goToHistoryItem', response);
            }
        )
    });

    socket.on('updatePageSort', function (data) {

        socket.methodsController.updatePageSort(
            data,
            function(response){

                socket.emit('updatePageSort', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('updatePageSort', response);
            }
        )
    });

    socket.on('saveProjectOptions', function (data) {

        socket.methodsController.saveProjectOptions(
            data,
            function(response){

                socket.emit('saveProjectOptions', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('saveProjectOptions', response);
            }
        )
    });

    socket.on('addComponents', function (data) {

        socket.methodsController.addComponents(
            data,
            function(response){

                socket.emit('addComponents', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('addComponents', response);
            }
        )
    });

    socket.on('deleteComponents', function (data) {

        socket.methodsController.deleteComponents(
            data,
            function(response){

                socket.emit('deleteComponents', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('deleteComponents', response);
            }
        )
    });

    socket.on('updateComponents', function (data) {

        socket.methodsController.updateComponents(
            data,
            function(response){

                socket.emit('updateComponents', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('updateComponents', response);
            }
        )
    });

    socket.on('cutComponents', function (data) {

        socket.methodsController.cutComponents(
            data,
            function(response){

                socket.emit('cutComponents', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('cutComponents', response);
            }
        )
    });

    socket.on('pasteComponents', function (data) {

        socket.methodsController.pasteComponents(
            data,
            function(response){

                socket.emit('pasteComponents', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('pasteComponents', response);
            }
        )
    });

    socket.on('duplicateComponents', function (data) {

        socket.methodsController.duplicateComponents(
            data,
            function(response){

                socket.emit('duplicateComponents', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('duplicateComponents', response);
            }
        )
    });

    socket.on('moveComponentsToLayer', function (data) {

        socket.methodsController.moveComponentsToLayer(
            data,
            function(response){

                socket.emit('moveComponentsToLayer', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('moveComponentsToLayer', response);
            }
        )
    });

    socket.on('sortRows', function (data) {

        socket.methodsController.sortRows(
            data,
            function(response){

                socket.emit('sortRows', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('sortRows', response);
            }
        )
    });

    socket.on('duplicatePages', function (data) {

        socket.methodsController.duplicatePages(
            data,
            function(response){

                socket.emit('duplicatePages', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('duplicatePages', response);
            }
        )
    });

    socket.on('duplicatePagesFromOtherProject', function (data) {

        socket.methodsController.duplicatePagesFromOtherProject(
            data,
            function(response){

                socket.emit('duplicatePagesFromOtherProject', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('duplicatePagesFromOtherProject', response);
            }
        )
    });

    socket.on('getComponentsListToPaste', function (data) {

        socket.methodsController.getComponentsListToPaste(
            data,
            function(response){

                socket.emit('getComponentsListToPaste', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('getComponentsListToPaste', response);
            }
        )
    });


    

    socket.on('updateComponent', function (data) {

        socket.methodsController.updateComponent(
            data,
            function(response){

                socket.emit('updateComponent', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('updateComponent', response);
            }
        )
    });

    socket.on('updateTimeline', function (data) {

        socket.methodsController.updateTimeline(
            data,
            function(response){

                socket.emit('updateTimeline', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('updateTimeline', response);
            }
        )
    });

    socket.on('updatePageOptions', function (data) {

        socket.methodsController.updatePageOptions(
            data,
            function(response){

                socket.emit('updatePageOptions', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('updatePageOptions', response);
            }
        )
    });

    socket.on('updatePagesOptions', function (data) {

        socket.methodsController.updatePagesOptions(
            data,
            function(response){

                socket.emit('updatePagesOptions', response);
            },
            function(response){

                response.error = response.error || 'Fault';
                socket.emit('updatePagesOptions', response);
            }
        )
    });

    

    socket.on('clearProject', function (data) {

        socket.methodsController.clearProject(
            data,
            function(response){
                socket.emit('clearProject', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('clearProject', response);
            }
        )
    });

    socket.on('preparePreview', function (data) {

        socket.methodsController.preparePreview(
            data,
            function(response){
                socket.emit('preparePreview', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('preparePreview', response);
            }
        )
    });

    socket.on('copyComponents', function (data) {

        socket.methodsController.copyComponents(
            data,
            function(response){
                socket.emit('copyComponents', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('copyComponents', response);
            }
        )
    });

    socket.on('copyComponentsFromOtherProject', function (data) {

        socket.methodsController.copyComponentsFromOtherProject(
            data,
            function(response){
                socket.emit('copyComponentsFromOtherProject', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('copyComponentsFromOtherProject', response);
            }
        )
    });

    socket.on('convertPdfPageToImage', function (data) {

        socket.methodsController.convertPdfPageToImage(
            data,
            function(response){
                socket.emit('convertPdfPageToImage', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('convertPdfPageToImage', response);
            }
        )
    });




    socket.on('createPdfImageList', function (data) {

        console.log('createPdfImageList');

        socket.methodsController.createPdfImageList(
            data,
            // onResult
            function(response){
                socket.emit('createPdfImageList', response);
            },
            // onFault
            function(response){
                socket.emit('createPdfImageList', response);
            },
            // onProgress
            function(response){
                socket.emit('createPdfImageListProgress', response);
            },
            //onComplete
            function(response){
                socket.emit('createPdfImageListComplete', response);
            }
        );
    });

    socket.on('stopCreatePdfImageList', function (data) {

        socket.methodsController.stopCreatePdfImageList(
            data,
            function(response){
                socket.emit('stopCreatePdfImageList', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('stopCreatePdfImageList', response);
            }
        )
    });


    socket.on('copyLibraryFileToImage', function (data) {

        socket.methodsController.copyLibraryFileToImage(
            data,
            function(response){
                socket.emit('copyLibraryFileToImage', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('copyLibraryFileToImage', response);
            }
        )
    });


    socket.on('getPublishedData', function (data) {

        socket.methodsController.getPublishedData(
            data,
            function(response){
                socket.emit('getPublishedData', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('getPublishedData', response);
            }
        )
    });

    socket.on('newPublication', function (data) {

        socket.methodsController.newPublication(
            data,
            function(response){
                socket.emit('newPublication', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('newPublication', response);
            }
        )
    });

    socket.on('overridePublication', function (data) {

        socket.methodsController.overridePublication(
            data,
            function(response){
                socket.emit('overridePublication', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('overridePublication', response);
            }
        )
    });

    socket.on('setPublicationOptions', function (data) {

        socket.methodsController.setPublicationOptions(
            data,
            function(response){
                socket.emit('setPublicationOptions', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('setPublicationOptions', response);
            }
        )
    });

    // socket.on('deletePublication', function (data) {

    //     socket.methodsController.deletePublication(
    //         data,
    //         function(response){
    //             socket.emit('deletePublication', response);
    //         },
    //         function(response){
    //             response.error = response.error || 'Fault';
    //             socket.emit('deletePublication', response);
    //         }
    //     )
    // });

    socket.on('changeStageBackgroundLibrary', function (data) {

        socket.methodsController.changeStageBackgroundLibrary(
            data,
            function(response){
                socket.emit('changeStageBackgroundLibrary', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('changeStageBackgroundLibrary', response);
            }
        )
    });

    socket.on('cropImage', function (data) {

        socket.methodsController.cropImage(
            data,
            function(response){
                socket.emit('cropImage', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('cropImage', response);
            }
        )
    });

    socket.on('resizeImage', function (data) {

        socket.methodsController.resizeImage(
            data,
            function(response){
                socket.emit('resizeImage', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('resizeImage', response);
            }
        )
    });

    socket.on('getImageSize', function (data) {

        socket.methodsController.getImageSize(
            data,
            function(response){
                socket.emit('getImageSize', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('getImageSize', response);
            }
        )
    });

    socket.on('convertLinkToImage', function (data) {

        socket.methodsController.convertLinkToImage(
            data,
            function(response){
                socket.emit('convertLinkToImage', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('convertLinkToImage', response);
            }
        )
    });

    socket.on('saveHistory', function (data) {

        socket.methodsController.saveHistory(
            data,
            function(response){
                socket.emit('saveHistory', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('saveHistory', response);
            }
        )
    });

    socket.on('calculateProjectSize', function (data) {

        socket.methodsController.calculateProjectSize(
            data,
            function(response){
                socket.emit('calculateProjectSize', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('calculateProjectSize', response);
            }
        )
    });

    socket.on('submitTestDriveEmail', function (data) {

        socket.methodsController.submitTestDriveEmail(
            data,
            function(response){
                socket.emit('submitTestDriveEmail', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('submitTestDriveEmail', response);
            }
        )
    });

    socket.on('getServerDate', function (data) {

        socket.methodsController.getServerDate(
            data,
            function(response){
                socket.emit('getServerDate', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('getServerDate', response);
            }
        )
    });

    socket.on('getCapabilities', function (data) {

        socket.methodsController.getCapabilities(
            data,
            function(response){
                socket.emit('getCapabilities', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('getCapabilities', response);
            }
        )
    });

    socket.on('selectPageByUser', function (data) {

        socket.methodsController.selectPageByUser(data);
    });

    socket.on('selectComponentsByUser', function (data) {

        socket.methodsController.selectComponentsByUser(data);
    });


    socket.on('getFoldersStructure', function (data) {

        socket.methodsController.getFoldersStructure(
            data,
            function(response){
                socket.emit('getFoldersStructure', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('getFoldersStructure', response);
            }
        )
    });

    socket.on('setProjectPermissions', function (data) {

        socket.methodsController.setProjectPermissions(
            data,
            function(response){
                socket.emit('setProjectPermissions', response);
            },
            function(response){
                response.error = response.error || 'Fault';
                socket.emit('setProjectPermissions', response);
            }
        )
    });
    

});







