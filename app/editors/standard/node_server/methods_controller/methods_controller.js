module.exports = MethodsController;

var File = require('../io/file/File.js'),
    Project = require('../project/project.js'),
    FileUploader = require('../uploader/file-uploader.js'),
    Database = require('../database/database.js'),
    PageThumbCreator = require('../page_thumbs/page_thumbs.js'),
    PdfToImageConverter = require('../pdf_to_image/pdf_to_image_converter.js'),
    LinkToImageConverter = require('../link_to_image/link_to_image_converter.js'),
    ImageMagick = require('../image_magick/image_magick.js');
    // Publication = require('../publication/publication.js');


function MethodsController(socket, sockets){
    this.socket = socket;
    this.project = new Project(socket, sockets);
    this.database = new Database(socket);
    this.pageThumbCreator = new PageThumbCreator(socket);
    this.pdfToImageConverter = new PdfToImageConverter(socket);
    this.linkToImageConverter = new LinkToImageConverter(socket);
    this.imageMagick = new ImageMagick(socket);
    // this.publication = new Publication(socket);
}

MethodsController.prototype.execute = function( message, onResult, onFault ){

    if(this[message.fn] != undefined){
        this[message.fn]( message.data, onResult, onFault );
    }
}



MethodsController.prototype.connected = function( ){

    this.project.connected();
}

MethodsController.prototype.disconnect = function(e, data, onResult, onFault ){
    
    this.database.stopLastVisitInterval();

    // calculate project size and update database
    this.database.calculateProjectSize( data, onResult, onFault );

    // clear all vars and projects stuff
    this.project.disconnect(e, data, onResult, onFault );

    // delete temp folders
    this.pdfToImageConverter.deleteTempFolder();
}



MethodsController.prototype.projectDownloadedFromOcs = function(data, onResult, onFault){
    this.project.projectDownloadedFromOcs(data, onResult, onFault);
}


MethodsController.prototype.gettingStartedUsing = function(socket){
    this.database.startLastVisitInterval();
}

MethodsController.prototype.loadProject = function( data, onResult, onFault ){
    //console.log("loadProject Controller");

    var _that = this;

    var userID = this.socket.ownerId;
    var projectID = this.socket.myRoom;

    console.log('loadProject', 'loadProject');
    console.log('userID', userID);
    console.log('projectID', projectID);

    var result = function(userHaveAccess){

        console.log('userHaveAccess', userHaveAccess);

        if(userHaveAccess == true){

            data.userId = userID;
            data.projectId = projectID;

            _that.project.loadProject(data, onResult, onFault);
        }else{
            onFault({error:'No access to project'});
        }
    }

    this.verifyAccessToProject(projectID, userID, result);

}

MethodsController.prototype.createBlankPage = function( data, onResult, onFault ){
    ///console.log("createBlanckPage Controller");

    this.project.createBlankPage( data, onResult, onFault );

}

MethodsController.prototype.updatePage = function( data, onResult, onFault ){
    //console.log("updatePage Controller");

    this.project.updatePage( data, onResult, onFault );

}

MethodsController.prototype.deletePages = function( data, onResult, onFault ){
    //console.log("deletePage Controller");

    this.project.deletePages( data, onResult, onFault );

}

MethodsController.prototype.deletePage = function( data, onResult, onFault ){
    //console.log("deletePage Controller");

    this.project.deletePage( data, onResult, onFault );

}


MethodsController.prototype.copyPage = function( data, onResult, onFault ){
    //console.log("copyPage2 Controller");

    this.project.copyPage(data, onResult, onFault);
}

MethodsController.prototype.watchProject = function( data, onResult, onFault ){
    //console.log("watchProject Controller");

    this.project.watchProject( data, onResult, onFault );

}

MethodsController.prototype.goToHistoryItem = function( data, onResult, onFault ){

    this.project.goToHistoryItem( data, onResult, onFault );
}



MethodsController.prototype.updatePageSort = function( data, onResult, onFault ){
    //console.log("updatePageSort Controller");

    this.project.updatePageSort( data, onResult, onFault );

}

MethodsController.prototype.saveProjectOptions = function( data, onResult, onFault ){
    //console.log("saveProjectOptions Controller");

    this.project.saveProjectOptions( data, onResult, onFault );

}

MethodsController.prototype.addComponents = function(data, onResult, onFault ){
    this.project.addComponents( data, onResult, onFault);
}

MethodsController.prototype.deleteComponents = function(data, onResult, onFault ){
    this.project.deleteComponents( data, onResult, onFault);
}

MethodsController.prototype.updateComponents = function( data, onResult, onFault ){
    this.project.updateComponents( data, onResult, onFault, this.imageMagick );

}

MethodsController.prototype.cutComponents = function( data, onResult, onFault ){
    this.project.cutComponents( data, onResult, onFault, this.imageMagick );

}

MethodsController.prototype.pasteComponents = function( data, onResult, onFault ){
    this.project.pasteComponents( data, onResult, onFault );
}

MethodsController.prototype.duplicateComponents = function( data, onResult, onFault ){
    this.project.duplicateComponents( data, onResult, onFault );
}

MethodsController.prototype.moveComponentsToLayer = function( data, onResult, onFault ){
    this.project.moveComponentsToLayer( data, onResult, onFault );
}

MethodsController.prototype.sortRows = function( data, onResult, onFault ){
    this.project.sortRows( data, onResult, onFault );
}

MethodsController.prototype.duplicatePages = function( data, onResult, onFault ){
    this.project.duplicatePages( data, onResult, onFault );
}

MethodsController.prototype.duplicatePagesFromOtherProject = function( data, onResult, onFault ){
    this.project.duplicatePagesFromOtherProject( data, onResult, onFault );
}

MethodsController.prototype.getComponentsListToPaste = function( data, onResult, onFault ){
    this.project.getComponentsListToPaste( data, onResult, onFault );
}






MethodsController.prototype.updateComponent = function( data, onResult, onFault ){
    //console.log("updateComponent Controller");

    this.project.updateComponent( data, onResult, onFault, this.imageMagick );

}

MethodsController.prototype.updateTimeline = function( data, onResult, onFault ){
    //console.log("updateTimeline Controller");

    this.project.updateTimeline( data, onResult, onFault );

}

MethodsController.prototype.updateTimelineOptions = function( data, onResult, onFault ){
    //console.log("updateTimelineOptions Controller");

    this.project.updateTimelineOptions( data, onResult, onFault );

}

MethodsController.prototype.updatePageOptions = function( data, onResult, onFault ){
    //console.log("updatePageOptions Controller");

    this.project.updatePageOptions( data, onResult, onFault );

}

MethodsController.prototype.updatePagesOptions = function( data, onResult, onFault ){
    //console.log("updatePagesOptions Controller");

    this.project.updatePagesOptions( data, onResult, onFault );

}




MethodsController.prototype.uploadImage = function( data, onResult, onFault, onComplete, onProgress ){
    //console.log("uploadImage Controller");

    var fileUploader = new FileUploader( this.socket );

    fileUploader.upload( data, onResult, onFault, onComplete, onProgress );

}

MethodsController.prototype.clearProject = function( data, onResult, onFault ){
    this.project.clearProject( data, onResult, onFault );
}

MethodsController.prototype.preparePreview = function( data, onResult, onFault, onProggres ){
    this.project.preparePreview( data, onResult, onFault, onProggres  );
}

MethodsController.prototype.createPageThumb = function( data, onResult, onFault ){
    this.pageThumbCreator.createPageThumb( data, onResult, onFault,  this.project.onChangeResult );
}

MethodsController.prototype.copyComponents = function( data, onResult, onFault ){

    this.project.copyComponents( data, onResult, onFault );
}

MethodsController.prototype.copyComponentsFromOtherProject = function( data, onResult, onFault ){

    this.project.copyComponentsFromOtherProject( data, onResult, onFault );
}

MethodsController.prototype.shareProjectToUser = function( data, onResult, onFault ){
    this.database.shareProjectToUser( data, onResult, onFault );
}

MethodsController.prototype.shareProjectToNoExistsUser = function( data, onResult, onFault ){
    this.database.shareProjectToNoExistsUser( data, onResult, onFault );
}

MethodsController.prototype.getSharedUsers = function( data, onResult, onFault ){
    this.database.getSharedUsers( data, onResult, onFault );
}

MethodsController.prototype.deleteSharedUser = function( data, onResult, onFault ){
    this.database.deleteSharedUser( data, onResult, onFault );
}

MethodsController.prototype.verifyAccessToProject = function(projectID, userID, callback){
    this.database.verifyAccessToProject(projectID, userID, callback);
}

MethodsController.prototype.getAllProjectsList = function(data, onResult, onFault){

    this.database.getAllProjectsList(data, onResult, onFault);


}

MethodsController.prototype.getTemplatesProjectsList = function(data, onResult, onFault){

    var _that = this;

    this.database.getTemplatesProjectsList(
        data,
        function(responce){
            _that.project.addMapFromProjectToTemplate(responce);

            onResult(responce);
        },
        onFault
    );
}



MethodsController.prototype.loadProjectById = function(data, onResult, onFault){

    var _that = this;


    var userID = parseInt( data.userId )
    var projectID =  parseInt( data.projectId );

    console.log('userID', userID);
    console.log('projectID', projectID);

    var result = function(userHaveAccess){

        console.log('userHaveAccess', userHaveAccess);

        if(userHaveAccess == true){
            _that.project.loadProjectById(data, onResult, onFault);
            _that.database.startSecondProjectVisitInterval(projectID);
        }else{
            onFault({error:'No access to project'});
        }
    }

    this.verifyAccessToProject(projectID, userID, result);

}



MethodsController.prototype.convertPdfPageToImage = function( data, onResult, onFault ){
    this.pdfToImageConverter.convertPdfPageToImage( data, onResult, onFault );
}

MethodsController.prototype.createPdfImageList = function( data, onResult, onFault, onComplete, onProgress ){
    this.pdfToImageConverter.createPdfImageList( data, onResult, onFault, onComplete, onProgress );
}

MethodsController.prototype.stopCreatePdfImageList = function( data, onResult, onFault, onComplete, onProgress ){
    this.pdfToImageConverter.stopCreatePdfImageList( data, onResult, onFault, onComplete, onProgress );
}

MethodsController.prototype.changeLanguage = function( data, onResult, onFault ){
    this.database.changeLanguage( data, onResult, onFault );
}

MethodsController.prototype.copyLibraryFileToImage = function( data, onResult, onFault ){
    this.imageMagick.copyLibraryFileToImage( data, onResult, onFault );
}

MethodsController.prototype.getProjectMap = function( data, onResult, onFault ){
    this.project.getProjectMap( data, onResult, onFault );
}

MethodsController.prototype.changeStageBackgroundLibrary = function( data, onResult, onFault ){
    this.project.changeStageBackgroundLibrary( data, onResult, onFault );
}

MethodsController.prototype.cropImage = function( data, onResult, onFault ){
    this.imageMagick.cropImage( data, onResult, onFault );
}

MethodsController.prototype.resizeImage = function( data, onResult, onFault ){
    this.imageMagick.resizeImage( data, onResult, onFault );
}

MethodsController.prototype.getImageSize = function( data, onResult, onFault ){
    this.imageMagick.getImageSize( data, onResult, onFault );
}

MethodsController.prototype.convertLinkToImage = function( data, onResult, onFault ){
    this.linkToImageConverter.convert( data, onResult, onFault );
}

// MethodsController.prototype.abcTest = function( data, onResult, onFault ){
//     this.publication.abcTest( data, onResult, onFault );
// }

// MethodsController.prototype.deletePublication = function( data, onResult, onFault ){
//     this.database.deletePublication( data, onResult, onFault );
// }

MethodsController.prototype.setPublicationOptions = function( data, onResult, onFault ){
    this.database.setPublicationOptions( data, onResult, onFault );
}

// MethodsController.prototype.overridePublication = function( data, onResult, onFault ){
//     this.publication.overridePublication( data, onResult, onFault );
// }

// MethodsController.prototype.newPublication = function( data, onResult, onFault ){
//     this.publication.newPublication( data, onResult, onFault );
// }

MethodsController.prototype.getPublishedData = function( data, onResult, onFault ){
    this.database.getPublishedData( data, onResult, onFault );
}

MethodsController.prototype.saveHistory = function( data, onResult, onFault ){
    this.project.saveHistory( data, onResult, onFault );
}

MethodsController.prototype.calculateProjectSize = function( data, onResult, onFault ){
    this.database.calculateProjectSize( data, onResult, onFault );
}

MethodsController.prototype.createPsdPage = function( data, onResult, onFault, onProggres, onComplete ){
    this.project.createPsdPage( data, onResult, onFault, onProggres, onComplete );
}

MethodsController.prototype.submitTestDriveEmail = function( data, onResult, onFault ){
    this.database.submitTestDriveEmail( data, onResult, onFault);
}

MethodsController.prototype.getCapabilities = function( data, onResult, onFault ){
    this.database.getCapabilities( data, onResult, onFault);
}

MethodsController.prototype.selectPageByUser = function(data){
    this.project.selectPageByUser(data);
}

MethodsController.prototype.selectComponentsByUser = function(data){
    this.project.selectComponentsByUser(data);
}

MethodsController.prototype.getFoldersStructure = function( data, onResult, onFault ){
    this.database.getFoldersStructure( data, onResult, onFault  );
}

MethodsController.prototype.setProjectPermissions = function( data, onResult, onFault ){
    this.project.setProjectPermissions( data, onResult, onFault);
}


MethodsController.prototype.getServerDate = function( data, onResult, onFault ){
   
    var date = new Date();

    // var date2 = new Date(null);
    // date2.setHowers(1);

    // var secondsToFullHour = ((59 - date.getMinutes()) * 60) +  (60 - date.getSeconds())


    var nextFullHour = new Date();
    nextFullHour.setHours(new Date().getHours() + 1);
    nextFullHour.setMinutes(0);
    nextFullHour.setSeconds(0);

    var milisecondsToNextHour = nextFullHour - new Date();

    var secondsToFullHour = parseInt( milisecondsToNextHour / 1000 );

    onResult({
        date:date,
        secondsToFullHour: secondsToFullHour
    });
}






