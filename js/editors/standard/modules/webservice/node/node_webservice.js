/**
 * Created with IntelliJ IDEA.
 * User: adm
 * Date: 03.02.15
 * Time: 16:08
 * To change this template use File | Settings | File Templates.
 */

function NodeWebservice(){

    //this.serverSocket = new ServerSocket('ws://localhost:8080');
    //this.serverSocket = new ServerSocketIo('http://localhost:3700');

    //this.connectionString = 'http://pio.pl:3700/';
    //this.connectionString = 'http://darkan.eu:3200/';
    //this.connectionString = 'http://darkan.eu:3900/';
    // this.connectionString = 'http://darkan.eu:3700/';
    //this.connectionString = 'http://pio.pl:3700/';
    // this.connectionString = 'http://darkan.eu:3900/';
    // this.connectionString = 'http://darkan.eu:3700/';
    //this.connectionString = 'http://jerzy.pl:3700/';
    // this.connectionString = 'http://jerzy.pl:3700/';
    //this.connectionString = 'http://jerzy.pl:3700/';
    this.connectionString = 'http://darkan.local:3000';

}

NodeWebservice.prototype = new WebService();

NodeWebservice.prototype.joinToRoom = function(){


    this.socket.emit('joinToRoom', {
        projectID: __meta__.projectID,
        userID: __meta__.userID,
        meta: __meta__
    });

}
NodeWebservice.prototype.showWorkingAsOffline = function()
{
   $('.online-working-status').attr('status', 'offline');
}

NodeWebservice.prototype.showWorkingAsOnline = function()
{
    $('.online-working-status').attr('status', 'online');
}

NodeWebservice.prototype.connect = function(params, onResult, onFault)
{
    var _that = this;

    $('#unexpected-error-modal').hide();

    // NOT LOGGED IN INFO
    if (_.isUndefined(__meta__.userID)) {
        Utils.setModalText({
            main: _lang('MODAL_INFO_NOTLOGGED')
        });
    }

    //this.socket = io.connect(this.connectionString);

    this.socket = io.connect(this.connectionString, {
        'reconnection': true,
        'reconnectionDelay': 1000,
        //'reconnectionDelayMax' : 5000,
        //'reconnectionAttempts': 5
    });

    this.socket.on('darkan-node-error', function(e){
        Utils.showErrorModal();
    });


    switch(__meta__.external){
        case 0:
            this.socket.on('connect', function(){
                _that.joinToRoom();
            });
            break;
        case 1:
            Utils.setModalText({
                main: _lang('WAITING_FOR_APIKEY'),
                extra: _lang('WAITING_FOR_APIKEY_EXTRA')
            });
            break;
    }

    

    this.socket.on('connect_error', function(err){
        // _layout.load_project_modal.fadeIn(500);

        // Utils.setModalText({
        //     main: _lang('MODAL_INFO_ERROR'),
        //     extra: _lang('CONNECTION_ERROR')
        // });

        _that.showWorkingAsOffline();

    });

    this.socket.on('verifyAccessToProject', function(verifyData){
    console.log(verifyData);
        if (verifyData.userHaveAccess) {

            if (verifyData.userHaveAccess == 'notexist') {

                Utils.setModalText({
                    main: _lang('PROJECTNOT_EXIST'),
                    extra: _lang('PROJECTNOT_EXIST_EXTRA')
                });
                _layout.darkanapp.html('');

            // verified!
            } else {
                Utils.setModalText({
                    main: _lang('PROJECT_GETTING_FROM_OSC'),
                    extra: _lang('PROJECT_LOADING_EXTRA')
                });


                DataAccess.downloadFromOcs(
                    {project:__meta__.projectID},
                    function(data) {
                        try {

                            var ocsData = JSON.parse(data);

                            _log('OCS data', ocsData, _log.error);

                            switch (ocsData.status) {
                                case 'success':
                                    Utils.setModalText({
                                        main: _lang('PROJECT_LOADING'),
                                        extra: _lang('PROJECT_LOADING_EXTRA')
                                    });

                                    _log('verifyData', verifyData);
                                    __meta__.ownerID = verifyData.ownerID;
                                    __meta__.login = verifyData.login;
                                    _layout.load_project_modal.fadeOut(500);

                                    _that.showWorkingAsOnline();

                                    _that.projectDownloadedFromOcs(
                                        {}, 
                                        function(){
              
                                            onResult();
                                            $('#topmenu-user-login').html(__meta__.login);
                                        }, 
                                        function(){
                                            onFault();
                                        }
                                    );
                                    
                                    

                                    break;

                                case 'notexists':
                                    Utils.setModalText({
                                        main: _lang('PROJECTNOT_EXIST'),
                                        extra: _lang('PROJECTNOT_EXIST_EXTRA')
                                    });
                                    break;

                                case 'noaccess':
                                    Utils.setModalText({
                                        main: _lang('YOU_HAVE_NO_ACCESS'),
                                        extra: _lang('YOU_HAVE_NO_ACCESS_EXTRA') + 
                                                ' <a target="_blank" href="http://'+__meta__.serverLink+'/auth/login">' + 
                                                _lang('YOU_HAVE_NO_ACCESS_EXTRA_2') + '</a> '
                                                
                                    }, true);
                                    break;

                                case 'ocsbusy':
                                    Utils.setModalText({
                                        main: _lang('OCS_BUSY'),
                                        extra: _lang('OCS_BUSY_EXTRA')
                                    }, true);
                                    break;

                                case 'error':
                                    Utils.showErrorModal();
                                    break;
                            }

                        } catch (err) {
                            Utils.setModalText({
                                main: _lang('OCS_BUSY'),
                                extra: _lang('OCS_BUSY_EXTRA')
                            }, true);
                        }


                    },
                    function(data) {
                        Utils.showErrorModal();
                    }
                );
            }
        } else {
            // NO ACCESS INFO
            Utils.setModalText({
                main: _lang('YOU_HAVE_NO_ACCESS'),
                extra: _lang('YOU_HAVE_NO_ACCESS_EXTRA') + 
                        ' <a target="_blank" href="http://'+__meta__.serverLink+'/auth/login">' + 
                        _lang('YOU_HAVE_NO_ACCESS_EXTRA_2') + '</a> '
                        
            }, true);
            $('#darkanapp').html('');
        }
    });

    this.socket.on('pageFileChanged', function(data){
        // console.log("CHanged: ", data )
    });
}

NodeWebservice.prototype.projectDownloadedFromOcs = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('projectDownloadedFromOcs',  data );

    this.socket.off('projectDownloadedFromOcs');
    this.socket.on('projectDownloadedFromOcs', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.watchProject = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('watchProject',  data );

    this.socket.off('onProjectChanged');
    this.socket.on('onProjectChanged', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.goToHistoryItem = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('goToHistoryItem',  data );

    this.socket.off('goToHistoryItem');
    this.socket.on('goToHistoryItem', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}



NodeWebservice.prototype.onHistoryChanged = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('onHistoryChanged');
    this.socket.on('onHistoryChanged', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}



NodeWebservice.prototype.getAllProjectsList = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('getAllProjectsList',  data );

    this.socket.off('getAllProjectsList');
    this.socket.on('getAllProjectsList', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.getTemplatesProjectsList = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('getTemplatesProjectsList',  data );

    this.socket.off('getTemplatesProjectsList');
    this.socket.on('getTemplatesProjectsList', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}



NodeWebservice.prototype.loadProjectById = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('loadProjectById',  data );

    this.socket.off('loadProjectById');
    this.socket.on('loadProjectById', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}





NodeWebservice.prototype.loadProject = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('loadProject',  data );

    this.socket.off('loadProject');
    this.socket.on('loadProject', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.createBlankPage = function(params, onResult, onFault, onProgress)
{
   // var settings = {};
    //settings.fn = 'createBlankPage';
    //this.updateSettings(settings, params);

    //this.sendAndLoad(settings, onResult, onFault);

    var _that = this;

    this.socket.emit('createBlankPage',  params );

    this.socket.off('createBlankPage');
    this.socket.on('createBlankPage', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.updatePage = function(params, onResult, onFault, onProgress)
{
    var _that = this;

    this.socket.emit('updatePage',  params );

    this.socket.off('updatePage');
    this.socket.on('updatePage', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.deletePages = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('deletePages',  data );

    this.socket.off('deletePages');
    this.socket.on('deletePages', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.deletePage = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('deletePage',  data );

    this.socket.off('deletePage');
    this.socket.on('deletePage', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.copyPage = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('copyPage',  data );

    this.socket.off('copyPage');
    this.socket.on('copyPage', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.updatePageSort = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('updatePageSort',  data );

    this.socket.off('updatePageSort');
    this.socket.on('updatePageSort', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.saveProjectOptions = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('saveProjectOptions',  data );

    this.socket.off('saveProjectOptions');
    this.socket.on('saveProjectOptions', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.addComponents = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('addComponents',  data );

    this.socket.off('addComponents');
    this.socket.on('addComponents', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.deleteComponents = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('deleteComponents',  data );

    this.socket.off('deleteComponents');
    this.socket.on('deleteComponents', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.updateComponents = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('updateComponents',  data );

    this.socket.off('updateComponents');
    this.socket.on('updateComponents', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.cutComponents = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('cutComponents',  data );

    this.socket.off('cutComponents');
    this.socket.on('cutComponents', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.pasteComponents = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('pasteComponents',  data );

    this.socket.off('pasteComponents');
    this.socket.on('pasteComponents', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.duplicateComponents = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('duplicateComponents',  data );

    this.socket.off('duplicateComponents');
    this.socket.on('duplicateComponents', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.moveComponentsToLayer = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('moveComponentsToLayer',  data );

    this.socket.off('moveComponentsToLayer');
    this.socket.on('moveComponentsToLayer', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.sortRows = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('sortRows',  data );

    this.socket.off('sortRows');
    this.socket.on('sortRows', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.duplicatePages = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('duplicatePages',  data );

    this.socket.off('duplicatePages');
    this.socket.on('duplicatePages', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.duplicatePagesFromOtherProject = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('duplicatePagesFromOtherProject',  data );

    this.socket.off('duplicatePagesFromOtherProject');
    this.socket.on('duplicatePagesFromOtherProject', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.getComponentsListToPaste = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('getComponentsListToPaste',  data );

    this.socket.off('getComponentsListToPaste');
    this.socket.on('getComponentsListToPaste', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}



NodeWebservice.prototype.updateComponent = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('updateComponent',  data );

    this.socket.off('updateComponent');
    this.socket.on('updateComponent', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.updateTimeline = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('updateTimeline',  data );

    this.socket.off('updateTimeline');
    this.socket.on('updateTimeline', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.updateTimelineOptions = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('updateTimelineOptions',  data );

    this.socket.off('updateTimelineOptions');
    this.socket.on('updateTimelineOptions', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.updatePageOptions = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('updatePageOptions',  data );

    this.socket.off('updatePageOptions');
    this.socket.on('updatePageOptions', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.updatePagesOptions = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.emit('updatePagesOptions',  data );

    this.socket.off('updatePagesOptions');
    this.socket.on('updatePagesOptions', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
} 



NodeWebservice.prototype.onMessageBack = function (responce, onResult, onFault)
{
    if(responce.error == undefined){
        onResult(responce);
    }else{
        onFault(responce);
    }
}


NodeWebservice.prototype.sendAndLoad = function (settings, onResult, onFault)
{
    this.serverSocket.sendMessage( settings, onResult, onFault);
}

NodeWebservice.prototype.uploadImage = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadImageComplete'+ actionkey);
    this.socket.on('uploadImageComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadImageComplete'+ responseData.actionkey);
        _that.socket.off('uploadImageProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadImageProgress'+ actionkey);
    this.socket.on('uploadImageProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadImage'+ actionkey);
    this.socket.on('uploadImage'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadImage', data);

}

NodeWebservice.prototype.uploadAudio = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadAudioComplete'+ actionkey);
    this.socket.on('uploadAudioComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadAudioComplete'+ responseData.actionkey);
        _that.socket.off('uploadAudioProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadAudioProgress'+ actionkey);
    this.socket.on('uploadAudioProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadAudio'+ actionkey);
    this.socket.on('uploadAudio'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadAudio', data);

}

NodeWebservice.prototype.uploadVideo = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadVideoComplete'+ actionkey);
    this.socket.on('uploadVideoComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadVideoComplete'+ responseData.actionkey);
        _that.socket.off('uploadVideoProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadVideoProgress'+ actionkey);
    this.socket.on('uploadVideoProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadVideo'+ actionkey);
    this.socket.on('uploadVideo'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadVideo', data);

}

NodeWebservice.prototype.uploadSwf = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadSwfComplete'+ actionkey);
    this.socket.on('uploadSwfComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadSwfComplete'+ responseData.actionkey);
        _that.socket.off('uploadSwfProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadSwfProgress'+ actionkey);
    this.socket.on('uploadSwfProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadSwf'+ actionkey);
    this.socket.on('uploadSwf'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadSwf', data);

}

NodeWebservice.prototype.uploadFile = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadFileComplete'+ actionkey);
    this.socket.on('uploadFileComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadFileComplete'+ responseData.actionkey);
        _that.socket.off('uploadFileProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadFileProgress'+ actionkey);
    this.socket.on('uploadFileProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadFile'+ actionkey);
    this.socket.on('uploadFile'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadFile', data);

}

NodeWebservice.prototype.uploadSounds = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadSoundsComplete'+ actionkey);
    this.socket.on('uploadSoundsComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadSoundsComplete'+ responseData.actionkey);
        _that.socket.off('uploadSoundsProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadSoundsProgress'+ actionkey);
    this.socket.on('uploadSoundsProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadSounds'+ actionkey);
    this.socket.on('uploadSounds'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadSounds', data);

}

NodeWebservice.prototype.uploadGallery = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadGalleryComplete'+ actionkey);
    this.socket.on('uploadGalleryComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadGalleryComplete'+ responseData.actionkey);
        _that.socket.off('uploadGalleryProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadGalleryProgress'+ actionkey);
    this.socket.on('uploadGalleryProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadGallery'+ actionkey);
    this.socket.on('uploadGallery'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadGallery', data);

}

NodeWebservice.prototype.uploadPageSound = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;


    this.socket.off('uploadPageSoundComplete'+ actionkey);
    this.socket.on('uploadPageSoundComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadPageSoundComplete'+ responseData.actionkey);
        _that.socket.off('uploadPageSoundProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadPageSoundProgress'+ actionkey);
    this.socket.on('uploadPageSoundProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadPageSound'+ actionkey);
    this.socket.on('uploadPageSound'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadPageSound', data);

}

NodeWebservice.prototype.uploadProjectSound = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;


    this.socket.off('uploadProjectSoundComplete'+ actionkey);
    this.socket.on('uploadProjectSoundComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadProjectSoundComplete'+ responseData.actionkey);
        _that.socket.off('uploadProjectSoundProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadProjectSoundProgress'+ actionkey);
    this.socket.on('uploadProjectSoundProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadProjectSound'+ actionkey);
    this.socket.on('uploadProjectSound'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadProjectSound', data);

}

NodeWebservice.prototype.uploadPageImage = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadPageImageComplete'+ actionkey);
    this.socket.on('uploadPageImageComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadPageImageComplete'+ responseData.actionkey);
        _that.socket.off('uploadPageImageProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadPageImageProgress'+ actionkey);
    this.socket.on('uploadPageImageProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadPageImage'+ actionkey);
    this.socket.on('uploadPageImage'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadPageImage', data);

}


NodeWebservice.prototype.uploadImportPdf = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadImportPdfComplete'+ actionkey);
    this.socket.on('uploadImportPdfComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadImportPdfComplete'+ responseData.actionkey);
        _that.socket.off('uploadImportPdfProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadImportPdfProgress'+ actionkey);
    this.socket.on('uploadImportPdfProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadImportPdf'+ actionkey);
    this.socket.on('uploadImportPdf'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadImportPdf', data);

}

NodeWebservice.prototype.uploadImportPsd = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadImportPsdComplete'+ actionkey);
    this.socket.on('uploadImportPsdComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadImportPsdComplete'+ responseData.actionkey);
        _that.socket.off('uploadImportPsdProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadImportPsdProgress'+ actionkey);
    this.socket.on('uploadImportPsdProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadImportPsd'+ actionkey);
    this.socket.on('uploadImportPsd'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadImportPsd', data);

}








NodeWebservice.prototype.uploadImportImage = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadImportImageComplete'+ actionkey);
    this.socket.on('uploadImportImageComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadImportImageComplete'+ responseData.actionkey);
        _that.socket.off('uploadImportImageProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadImportImageProgress'+ actionkey);
    this.socket.on('uploadImportImageProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadImportImage'+ actionkey);
    this.socket.on('uploadImportImage'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadImportImage', data);

}

NodeWebservice.prototype.uploadPublishIcon = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadPublishIconComplete'+ actionkey);
    this.socket.on('uploadPublishIconComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadPublishIconComplete'+ responseData.actionkey);
        _that.socket.off('uploadPublishIconProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadPublishIconProgress'+ actionkey);
    this.socket.on('uploadPublishIconProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadPublishIcon'+ actionkey);
    this.socket.on('uploadPublishIcon'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadPublishIcon', data);

}

NodeWebservice.prototype.uploadPublishBannerIcon = function (data, onResult, onFault, onComplete, onProgress )
{
    var _that = this;

    var actionkey = data.actionkey;

    this.socket.off('uploadPublishBannerIconComplete'+ actionkey);
    this.socket.on('uploadPublishBannerIconComplete'+ actionkey, function( responseData ){

        _that.socket.off('uploadPublishBannerIconComplete'+ responseData.actionkey);
        _that.socket.off('uploadPublishBannerIconProgress'+ responseData.actionkey);

        onComplete(responseData);
    });


    this.socket.off('uploadPublishBannerIconProgress'+ actionkey);
    this.socket.on('uploadPublishBannerIconProgress'+ actionkey, function(responseData){

        onProgress(responseData);
    });

    this.socket.off('uploadPublishBannerIcon'+ actionkey);
    this.socket.on('uploadPublishBannerIcon'+ actionkey, function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('uploadPublishBannerIcon', data);

}










NodeWebservice.prototype.uploadAudioProgress = function(actionkey, data)
{
    this.socket.emit('uploadAudioProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadImageProgress = function(actionkey, data)
{
    this.socket.emit('uploadImageProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadVideoProgress = function(actionkey, data)
{
    this.socket.emit('uploadVideoProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadSwfProgress = function(actionkey, data)
{
    this.socket.emit('uploadSwfProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadFileProgress = function(actionkey, data)
{
    this.socket.emit('uploadFileProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadSoundsProgress = function(actionkey, data)
{
    this.socket.emit('uploadSoundsProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadGalleryProgress = function(actionkey, data)
{
    this.socket.emit('uploadGalleryProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadPageSoundProgress = function(actionkey, data)
{
    this.socket.emit('uploadPageSoundProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadProjectSoundProgress = function(actionkey, data)
{
    this.socket.emit('uploadProjectSoundProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadPageImageProgress = function(actionkey, data)
{
    this.socket.emit('uploadPageImageProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadImportPdfProgress = function(actionkey, data)
{
    this.socket.emit('uploadImportPdfProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadImportPsdProgress = function(actionkey, data)
{
    this.socket.emit('uploadImportPsdProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}



NodeWebservice.prototype.uploadImportImageProgress = function(actionkey, data)
{
    this.socket.emit('uploadImportImageProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadPublishIconProgress = function(actionkey, data)
{
    this.socket.emit('uploadPublishIconProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}

NodeWebservice.prototype.uploadPublishBannerIconProgress = function(actionkey, data)
{
    this.socket.emit('uploadPublishIconProgress', data); // Wysłanie pakietu danych  , w data jest actionkey
}




NodeWebservice.prototype.clearProject = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('clearProject');
    this.socket.on('clearProject', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('clearProject', data);
}



NodeWebservice.prototype.preparePreview = function(data, onResult, onFault, onProgress)
{    
    var _that = this;
    
    this.socket.off('preparePreview');
    this.socket.on('preparePreview', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.off('preparePreviewProgress');
    this.socket.on('preparePreviewProgress', function(responseData){

        if(onProgress){
            onProgress(responseData);
        }
        
    });
    
    this.socket.emit('preparePreview', data);
}


NodeWebservice.prototype.createPageThumb = function(data, onResult, onFault)
{    
    var _that = this;
    
    this.socket.off('pageThumbCreated');
    this.socket.on('pageThumbCreated', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('createPageThumb', data);
}

NodeWebservice.prototype.copyComponents = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('copyComponents');
    this.socket.on('copyComponents', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('copyComponents', data);
}

NodeWebservice.prototype.copyComponentsFromOtherProject = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('copyComponentsFromOtherProject');
    this.socket.on('copyComponentsFromOtherProject', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('copyComponentsFromOtherProject', data);
}

NodeWebservice.prototype.deleteSharedUser = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('deleteSharedUser');
    this.socket.on('deleteSharedUser', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('deleteSharedUser', data);
}

NodeWebservice.prototype.shareProjectToUser = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('shareProjectToUser');
    this.socket.on('shareProjectToUser', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('shareProjectToUser', data);
}

NodeWebservice.prototype.shareProjectToNoExistsUser = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('shareProjectToNoExistsUser');
    this.socket.on('shareProjectToNoExistsUser', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('shareProjectToNoExistsUser', data);
}

NodeWebservice.prototype.getSharedUsers = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('getSharedUsers');
    this.socket.on('getSharedUsers', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('getSharedUsers', data);
}

NodeWebservice.prototype.changeLanguage = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('changeLanguage');
    this.socket.on('changeLanguage', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('changeLanguage', data);
}



NodeWebservice.prototype.createPdfImageList = function(data, onResult, onFault, onComplete, onProgress)
{
    var _that = this;

    this.socket.off('createPdfImageListComplete');
    this.socket.on('createPdfImageListComplete', function( responseData ){

        _that.socket.off('createPdfImageListComplete');
        _that.socket.off('createPdfImageListProgress');

        onComplete(responseData);
    });


    this.socket.off('createPdfImageListProgress');
    this.socket.on('createPdfImageListProgress', function(responseData){

        onProgress(responseData);
    });

    this.socket.off('createPdfImageList');
    this.socket.on('createPdfImageList', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });

    this.socket.emit('createPdfImageList', data);
}



NodeWebservice.prototype.stopCreatePdfImageList = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('stopCreatePdfImageList');
    this.socket.on('stopCreatePdfImageList', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('stopCreatePdfImageList', data);
}

NodeWebservice.prototype.convertPdfPageToImage = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('convertPdfPageToImage');
    this.socket.on('convertPdfPageToImage', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('convertPdfPageToImage', data);
}

NodeWebservice.prototype.copyLibraryFileToImage = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('copyLibraryFileToImage');
    this.socket.on('copyLibraryFileToImage', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('copyLibraryFileToImage', data);
}


NodeWebservice.prototype.getPublishedData = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('getPublishedData');
    this.socket.on('getPublishedData', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('getPublishedData', data);
}

NodeWebservice.prototype.newPublication = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('newPublication');
    this.socket.on('newPublication', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('newPublication', data);
}

NodeWebservice.prototype.overridePublication = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('overridePublication');
    this.socket.on('overridePublication', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('overridePublication', data);
}

NodeWebservice.prototype.setPublicationOptions = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('setPublicationOptions');
    this.socket.on('setPublicationOptions', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('setPublicationOptions', data);
}

// NodeWebservice.prototype.deletePublication = function(data, onResult, onFault)
// {
//     var _that = this;

//     this.socket.off('deletePublication');
//     this.socket.on('deletePublication', function (responseData) {
//         _that.onMessageBack(responseData, onResult, onFault );
//     });
//     this.socket.emit('deletePublication', data);
// }

NodeWebservice.prototype.changeStageBackgroundLibrary = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('changeStageBackgroundLibrary');
    this.socket.on('changeStageBackgroundLibrary', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('changeStageBackgroundLibrary', data);
}

NodeWebservice.prototype.cropImage = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('cropImage');
    this.socket.on('cropImage', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('cropImage', data);
}

NodeWebservice.prototype.resizeImage = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('resizeImage');
    this.socket.on('resizeImage', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('resizeImage', data);
}

NodeWebservice.prototype.getImageSize = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('getImageSize');
    this.socket.on('getImageSize', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('getImageSize', data);
}

NodeWebservice.prototype.convertLinkToImage = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('convertLinkToImage');
    this.socket.on('convertLinkToImage', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('convertLinkToImage', data);
}

NodeWebservice.prototype.saveHistory = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('saveHistory');
    this.socket.on('saveHistory', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('saveHistory', data);
}

NodeWebservice.prototype.calculateProjectSize = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('calculateProjectSize');
    this.socket.on('calculateProjectSize', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('calculateProjectSize', data);
}

NodeWebservice.prototype.createPsdPage = function(data, onResult, onFault, onComplete, onProgress)
{
    var _that = this;

    this.socket.off('createPsdPageComplete');
    this.socket.on('createPsdPageComplete', function( responseData ){

        _that.socket.off('createPsdPageComplete');
        _that.socket.off('createPsdPageProgress');

        onComplete(responseData);
    });


    this.socket.off('createPsdPageProgress');
    this.socket.on('createPsdPageProgress', function(responseData){

        onProgress(responseData);
    });

    this.socket.off('createPsdPage');
    this.socket.on('createPsdPage', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.submitTestDriveEmail = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('submitTestDriveEmail');
    this.socket.on('submitTestDriveEmail', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('submitTestDriveEmail', data);
}

NodeWebservice.prototype.getServerDate = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('getServerDate');
    this.socket.on('getServerDate', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('getServerDate', data);
}




NodeWebservice.prototype.getCapabilities = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('getCapabilities');
    this.socket.on('getCapabilities', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('getCapabilities', data);
}

NodeWebservice.prototype.loginExternal = function(data, onResult, onFault)
{
    this.joinToRoom();
}

NodeWebservice.prototype.selectPageByUser = function(data, onResult, onFault)
{
    this.socket.emit('selectPageByUser', data);
}

NodeWebservice.prototype.onSelectPageByUser = function(data, onResult, onFault)
{
    var _that = this;
    
    this.socket.off('onSelectPageByUser');
    this.socket.on('onSelectPageByUser', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.selectComponentsByUser = function(data, onResult, onFault)
{
    this.socket.emit('selectComponentsByUser', data);
}

NodeWebservice.prototype.onSelectComponentsByUser = function(data, onResult, onFault)
{
    var _that = this;
    
    this.socket.off('onSelectComponentsByUser');
    this.socket.on('onSelectComponentsByUser', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
}

NodeWebservice.prototype.setProjectPermissions = function(data, onResult, onFault)
{
    var _that = this;

    this.socket.off('setProjectPermissions');
    this.socket.on('setProjectPermissions', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('setProjectPermissions', data);
}

NodeWebservice.prototype.getFoldersStructure = function(data, onResult, onFault)
{
    var _that = this;
    
    this.socket.off('getFoldersStructure');
    this.socket.on('getFoldersStructure', function (responseData) {
        _that.onMessageBack(responseData, onResult, onFault );
    });
    this.socket.emit('getFoldersStructure', data);
}


