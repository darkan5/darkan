function DataAccess(){

}

DataAccess.connect = function(data, onResult, onFault)
{
    _log("connect", data, _log.dataaccessIn );

    this.nodeWebService = WebService.create('node');
    this.phpWebService = WebService.create('php');

    this.nodeWebService.connect(data, onResult, onFault);
}

DataAccess.watchProject = function(data, onResult, onFault)
{
    _log("watchProject", data, _log.dataaccessIn );

    this.nodeWebService.watchProject(data, onResult, onFault);
}

DataAccess.onHistoryChanged = function(data, onResult, onFault)
{
    _log("onHistoryChanged", data, _log.dataaccessIn );

    this.nodeWebService.onHistoryChanged(data, onResult, onFault);
}

DataAccess.getAllProjectsList = function(data, onResult, onFault)
{
    _log("getAllProjectsList", data, _log.dataaccessIn );

    this.nodeWebService.getAllProjectsList(data, onResult, onFault);
}

DataAccess.getTemplatesProjectsList = function(data, onResult, onFault)
{
    _log("getTemplatesProjectsList", data, _log.dataaccessIn );

    this.nodeWebService.getTemplatesProjectsList(data, onResult, onFault);
}



DataAccess.loadProjectById = function(data, onResult, onFault)
{
    var _that = this;
    // _log("loadProjectById", data, _log.dataaccessIn );
    this.phpWebService.loadProjectById(data, function() {
        _that.nodeWebService.loadProjectById(data, onResult, onFault);
    }, onFault);
}



DataAccess.loadProject = function(data, onResult, onFault)
{
    _log("loadProject", data, _log.dataaccessIn );

    this.nodeWebService.loadProject(data, onResult, onFault);
}

DataAccess.createBlankPage = function(data, onResult, onFault)
{
    _log("createBlankPage", data, _log.dataaccessIn );

    this.nodeWebService.createBlankPage(data, onResult, onFault);
}

DataAccess.updatePage = function(data, onResult, onFault)
{
    _log("updatePage", data, _log.dataaccessIn );

    this.nodeWebService.updatePage(data, onResult, onFault);
}

DataAccess.deletePages = function(data, onResult, onFault)
{
    _log("deletePages", data, _log.dataaccessIn );

    this.nodeWebService.deletePages(data, onResult, onFault);
}


DataAccess.deletePage = function(data, onResult, onFault)
{
    _log("deletePage", data, _log.dataaccessIn );

    this.nodeWebService.deletePage(data, onResult, onFault);
}

DataAccess.copyPage = function(data, onResult, onFault)
{
    _log("copyPage", data, _log.dataaccessIn );

    this.nodeWebService.copyPage(data, onResult, onFault);
}

DataAccess.updatePageSort = function(data, onResult, onFault)
{
    _log("updatePageSort", data, _log.dataaccessIn );

    this.nodeWebService.updatePageSort(data, onResult, onFault);
}

DataAccess.saveProjectOptions = function(data, onResult, onFault)
{
    _log("saveProjectOptions", data, _log.dataaccessIn );

    this.nodeWebService.saveProjectOptions(data, onResult, onFault);
}

DataAccess.addComponents = function(data, onResult, onFault)
{
    _log("addComponents", data, _log.dataaccessIn );

    this.nodeWebService.addComponents(data, onResult, onFault);
}

DataAccess.deleteComponents = function(data, onResult, onFault)
{
    _log("deleteComponents", data, _log.dataaccessIn );

    this.nodeWebService.deleteComponents(data, onResult, onFault);
}

DataAccess.updateComponents = function(data, onResult, onFault)
{
    _log("updateComponents", data, _log.dataaccessIn );

    this.nodeWebService.updateComponents(data, onResult, onFault);
}

DataAccess.cutComponents = function(data, onResult, onFault)
{
    _log("cutComponents", data, _log.dataaccessIn );

    this.nodeWebService.cutComponents(data, onResult, onFault);
}

DataAccess.pasteComponents = function(data, onResult, onFault)
{
    _log("pasteComponents", data, _log.dataaccessIn );

    this.nodeWebService.pasteComponents(data, onResult, onFault);
}

DataAccess.duplicateComponents = function(data, onResult, onFault)
{
    _log("duplicateComponents", data, _log.dataaccessIn );

    this.nodeWebService.duplicateComponents(data, onResult, onFault);
}

DataAccess.moveComponentsToLayer = function(data, onResult, onFault)
{
    _log("moveComponentsToLayer", data, _log.dataaccessIn );

    this.nodeWebService.moveComponentsToLayer(data, onResult, onFault);
}

DataAccess.sortRows = function(data, onResult, onFault)
{
    _log("sortRows", data, _log.dataaccessIn );

    this.nodeWebService.sortRows(data, onResult, onFault);
}

DataAccess.duplicatePages = function(data, onResult, onFault)
{
    _log("duplicatePages", data, _log.dataaccessIn );

    this.nodeWebService.duplicatePages(data, onResult, onFault);
}

DataAccess.duplicatePagesFromOtherProject = function(data, onResult, onFault)
{
    _log("duplicatePagesFromOtherProject", data, _log.dataaccessIn );

    this.nodeWebService.duplicatePagesFromOtherProject(data, onResult, onFault);
}

DataAccess.getComponentsListToPaste = function(data, onResult, onFault)
{
    _log("getComponentsListToPaste", data, _log.dataaccessIn );

    this.nodeWebService.getComponentsListToPaste(data, onResult, onFault);
}



// DataAccess.updateComponent = function(data, onResult, onFault)
// {
//     _log("updateComponent", data, _log.dataaccessIn );

//     HistoryListView.instance.remember(data);

//     this.nodeWebService.updateComponent(data, onResult, onFault);
// }

DataAccess.updateTimeline = function(data, onResult, onFault)
{
    _log("updateTimeline", data, _log.dataaccessIn );

    this.nodeWebService.updateTimeline(data, onResult, onFault);
}

DataAccess.updateTimelineOptions = function(data, onResult, onFault)
{
    _log("updateTimelineOptions", data, _log.dataaccessIn );

    this.nodeWebService.updateTimelineOptions(data, onResult, onFault);
}


DataAccess.uploadImage = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadImage(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadAudio = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadAudio(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadVideo = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadVideo(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadSwf = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadSwf(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadFile = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadFile(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadSounds = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadSounds(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadGallery = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadGallery(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadPageSound = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadPageSound(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadProjectSound = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadProjectSound(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadProjectSoundProgress = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadProjectSoundProgress(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadPageImage = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadPageImage(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadPublishIcon = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadPublishIcon(data, onResult, onFault, onComplete, onProgress);
}


DataAccess.uploadPublishBannerIcon = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadPublishBannerIcon(data, onResult, onFault, onComplete, onProgress);
}






DataAccess.uploadAudioProgress = function(actionkey, data)
{
    this.nodeWebService.uploadAudioProgress(actionkey, data);
}

DataAccess.uploadImageProgress = function(actionkey, data)
{
    this.nodeWebService.uploadImageProgress(actionkey, data);
}

DataAccess.uploadVideoProgress = function(actionkey, data)
{
    this.nodeWebService.uploadVideoProgress(actionkey, data);
}

DataAccess.uploadSwfProgress = function(actionkey, data)
{
    this.nodeWebService.uploadSwfProgress(actionkey, data);
}

DataAccess.uploadFileProgress = function(actionkey, data)
{
    this.nodeWebService.uploadFileProgress(actionkey, data);
}

DataAccess.uploadSoundsProgress = function(actionkey, data)
{
    this.nodeWebService.uploadSoundsProgress(actionkey, data);
}

DataAccess.uploadGalleryProgress = function(actionkey, data)
{
    this.nodeWebService.uploadGalleryProgress(actionkey, data);
}

DataAccess.uploadPageSoundProgress = function(actionkey, data)
{
    this.nodeWebService.uploadPageSoundProgress(actionkey, data);
}

DataAccess.uploadPageImageProgress = function(actionkey, data)
{
    this.nodeWebService.uploadPageImageProgress(actionkey, data);
}

DataAccess.uploadImportImageProgress = function(actionkey, data)
{
    this.nodeWebService.uploadImportImageProgress(actionkey, data);
}

DataAccess.uploadImportPdfProgress = function(actionkey, data)
{
    this.nodeWebService.uploadImportPdfProgress(actionkey, data);
}

DataAccess.uploadImportPsdProgress = function(actionkey, data)
{
    this.nodeWebService.uploadImportPsdProgress(actionkey, data);
}




DataAccess.uploadImportImage = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadImportImage(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadImportPdf = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadImportPdf(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadImportPsd = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadImportPsd(data, onResult, onFault, onComplete, onProgress);
}



DataAccess.uploadPublishIconProgress = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadPublishIconProgress(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.uploadPublishBannerIconProgress = function(data, onResult, onFault, onComplete, onProgress)
{
    return this.nodeWebService.uploadPublishBannerIconProgress(data, onResult, onFault, onComplete, onProgress);
}






DataAccess.updatePageOptions = function(data, onResult, onFault)
{
    this.nodeWebService.updatePageOptions(data, onResult, onFault);
}

DataAccess.updatePagesOptions = function(data, onResult, onFault)
{
    _log("updatePagesOptions", data, _log.dataaccessIn );

    this.nodeWebService.updatePagesOptions(data, onResult, onFault);
}

DataAccess.clearProject = function(data, onResult, onFault)
{
    this.nodeWebService.clearProject(data, onResult, onFault);
}

DataAccess.preparePreview = function(data, onResult, onFault, onProggres)
{
    this.nodeWebService.preparePreview(data, onResult, onFault, onProggres);
}

DataAccess.createPageThumb = function(data, onResult, onFault)
{
    this.nodeWebService.createPageThumb(data, onResult, onFault);
}

DataAccess.copyComponents = function(data, onResult, onFault)
{
    _log("copyComponents", data, _log.dataaccessIn );
    
    this.nodeWebService.copyComponents(data, onResult, onFault);
}

DataAccess.copyComponentsFromOtherProject = function(data, onResult, onFault)
{
    _log("copyComponentsFromOtherProject", data, _log.dataaccessIn );
        
    this.nodeWebService.copyComponentsFromOtherProject(data, onResult, onFault);
}


DataAccess.shareProjectToUser = function(data, onResult, onFault)
{
    // this.nodeWebService.shareProjectToUser(data, onResult, onFault);
    this.phpWebService.shareProjectToUser(data, onResult, onFault);
}

DataAccess.shareProjectToNoExistsUser = function(data, onResult, onFault)
{
    this.nodeWebService.shareProjectToNoExistsUser(data, onResult, onFault);
}

DataAccess.getSharedUsers = function(data, onResult, onFault)
{
    this.nodeWebService.getSharedUsers(data, onResult, onFault);
}

DataAccess.deleteSharedUser = function(data, onResult, onFault)
{
    this.nodeWebService.deleteSharedUser(data, onResult, onFault);
}

DataAccess.changeLanguage = function(data, onResult, onFault)
{
    this.phpWebService.changeLanguage(data, onResult, onFault);
}

DataAccess.searchImages = function(data, onResult, onFault)
{
    this.phpWebService.searchImages(data, onResult, onFault);
}

DataAccess.searchYoutube = function(data, onResult, onFault)
{
    this.phpWebService.searchYoutube(data, onResult, onFault);
}

DataAccess.searchVimeo = function(data, onResult, onFault)
{
    this.phpWebService.searchVimeo(data, onResult, onFault);
}

DataAccess.libraryRequest = function(data, onResult, onFault)
{
    this.phpWebService.libraryRequest(data, onResult, onFault);
}

DataAccess.createPdfImageList = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.createPdfImageList(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.stopCreatePdfImageList = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.stopCreatePdfImageList(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.convertPdfPageToImage = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.convertPdfPageToImage(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.copyLibraryFileToImage = function(data, onResult, onFault, onComplete, onProgress)
{
    _log("copyLibraryFileToImage", data, _log.dataaccessIn );
    
    this.nodeWebService.copyLibraryFileToImage(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.getPublishedData = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.getPublishedData(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.newPublication = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.newPublication(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.overridePublication = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.overridePublication(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.setPublicationOptions = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.setPublicationOptions(data, onResult, onFault, onComplete, onProgress);
}

// DataAccess.deletePublication = function(data, onResult, onFault, onComplete, onProgress)
// {
//     this.nodeWebService.deletePublication(data, onResult, onFault, onComplete, onProgress);
// }

DataAccess.changeStageBackgroundLibrary = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.changeStageBackgroundLibrary(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.cropImage = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.cropImage(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.resizeImage = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.resizeImage(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.getImageSize = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.getImageSize(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.convertLinkToImage = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.convertLinkToImage(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.projectVersioinRequest = function(data, onResult, onFault, onComplete, onProgress)
{
    var _that = this;
    if (data.request.request == 12) {
        this.nodeWebService.setProjectPermissions(data, function() {
            _that.phpWebService.projectVersioinRequest(data, onResult, onFault, onComplete, onProgress);
        }, function() {});
    } else {
        this.phpWebService.projectVersioinRequest(data, onResult, onFault, onComplete, onProgress);
    }
    
}

DataAccess.publicationRequest = function(data, onResult, onFault, onComplete, onProgress)
{
    this.phpWebService.publicationRequest(data, onResult, onFault, onComplete, onProgress);
}


DataAccess.saveHistory  = function(data, onResult, onFault)
{

    _log("saveHistory", data, _log.dataaccessIn );

    this.nodeWebService.saveHistory(data, onResult, onFault);
}

DataAccess.sendMails = function(data, onResult, onFault, onComplete, onProgress)
{
    this.phpWebService.sendMails(data, onResult, onFault, onComplete, onProgress);
}


DataAccess.keepSession = function(data, onResult, onFault, onComplete, onProgress)
{
    this.phpWebService.keepSession(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.calculateProjectSize  = function(data, onResult, onFault)
{

    this.nodeWebService.calculateProjectSize(data, onResult, onFault);
}

DataAccess.createPsdPage  = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.createPsdPage(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.downloadFromOcs = function(data, onResult, onFault, onComplete, onProgress)
{
    this.phpWebService.downloadFromOcs(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.submitTestDriveEmail = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.submitTestDriveEmail(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.getServerDate = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.getServerDate(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.getCapabilities = function(data, onResult, onFault, onComplete, onProgress)
{
    this.nodeWebService.getCapabilities(data, onResult, onFault, onComplete, onProgress);
}

DataAccess.goToHistoryItem = function(data, onResult, onFault)
{
    this.nodeWebService.goToHistoryItem(data, onResult, onFault);
}

DataAccess.selectPageByUser = function(data, onResult, onFault)
{
    this.nodeWebService.selectPageByUser(data, onResult, onFault);
}

DataAccess.onSelectPageByUser = function(data, onResult, onFault)
{
    this.nodeWebService.onSelectPageByUser(data, onResult, onFault);
}

DataAccess.selectComponentsByUser = function(data, onResult, onFault)
{
    this.nodeWebService.selectComponentsByUser(data, onResult, onFault);
}

DataAccess.onSelectComponentsByUser = function(data, onResult, onFault)
{
    this.nodeWebService.onSelectComponentsByUser(data, onResult, onFault);
}

DataAccess.getFoldersStructure = function(data, onResult, onFault)
{
    _log("getFoldersStructure", data, _log.dataaccessIn );
    
    this.nodeWebService.getFoldersStructure(data, onResult, onFault);
}

DataAccess.generatePdf = function(data, onResult, onFault)
{
    var _that = this;

    _log("generatePdf", data, _log.dataaccessIn );

    this.nodeWebService.setProjectPermissions(data, function() {
        _that.phpWebService.publicationRequest(data, onResult, onFault);
    }, function() {});
}




DataAccess.loginExternal = function(data, onResult, onFault)
{
    var _that = this;

    this.phpWebService.loginExternal(data, function(rdata){

        var jData = JSON.parse(rdata);

        

        if(jData.status == 'success'){

            __meta__.userID = jData.userId;
            __meta__.login = jData.login;
            

            _that.nodeWebService.loginExternal(jData, onResult, onFault);
        }else{

             Utils.setModalText({
                main: _lang('YOU_HAVE_NO_ACCESS'),
                extra: _lang('YOU_HAVE_NO_ACCESS_EXTRA')
                        
            }, true);
            $('#darkanapp').html('');

            onFault(jData);
        }

    }, onFault);

}

DataAccess.editPhotopeaImage = function(data, onResult, onFault)
{
    this.phpWebService.editPhotopeaImage(data, onResult, onFault);
}
DataAccess.editPhotopeaImageSave = function(data, onResult, onFault)
{
    this.phpWebService.editPhotopeaImageSave(data, onResult, onFault);
}



