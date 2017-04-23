/**
 * Created with IntelliJ IDEA.
 * User: adm
 * Date: 03.02.15
 * Time: 16:08
 * To change this template use File | Settings | File Templates.
 */



function PhpWebservice(){
    this.url = 'server/php/searchimages.php';
    this.APP_LINK = _appLink;
}

PhpWebservice.prototype = new WebService();


PhpWebservice.prototype.saveFolderStructure = function(params, onResult, onFault){
    // this.updateSettings(request, params);
    this.sendAndLoad(this.APP_LINK + '/savefolderstructure',  params, onResult, onFault);
}

PhpWebservice.prototype.createNewFolder = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/createnewfolder',  params, onResult, onFault);
}

PhpWebservice.prototype.createNewProject = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/createnewproject',  params, onResult, onFault);
}

PhpWebservice.prototype.deleteFolder = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/deletefolder',  params, onResult, onFault);
}

PhpWebservice.prototype.deleteProject = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/deleteproject',  params, onResult, onFault);
}

PhpWebservice.prototype.setLastVisitedFolderId = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/setlastvisitedfolderid',  params, onResult, onFault);
}

PhpWebservice.prototype.copyProject = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/copyproject',  params, onResult, onFault);
}

PhpWebservice.prototype.templateProject = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/templateproject',  params, onResult, onFault);
}

PhpWebservice.prototype.shareProject = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/shareproject',  params, onResult, onFault);
}

PhpWebservice.prototype.unshareProject = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/unshareproject',  params, onResult, onFault);
}

PhpWebservice.prototype.getShareProjectUsers = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/getsharesrojectusers',  params, onResult, onFault);
}

PhpWebservice.prototype.updateProject = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/updateproject',  params, onResult, onFault);
}

PhpWebservice.prototype.updateFolder = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/updatefolder',  params, onResult, onFault);
}

PhpWebservice.prototype.moveFolder = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/movefolder',  params, onResult, onFault);
}

PhpWebservice.prototype.moveProject = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/moveproject',  params, onResult, onFault);
}

PhpWebservice.prototype.checkSharedProjects = function(params, onResult, onFault){
    params.showLoader = false;
    this.sendAndLoad(this.APP_LINK + '/checksharedprojects',  params, onResult, onFault);
}

PhpWebservice.prototype.disconectFromSharedProjects = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/disconectfromsharedprojects',  params, onResult, onFault);
}

PhpWebservice.prototype.uploadZbit = function(params, onResult, onFault, onProgress, onComplete){

    this.uploadFile(this.APP_LINK + '/uploadzbit',  params, onResult, onFault, onProgress, onComplete);
}

PhpWebservice.prototype.getSummaryUserProjects = function(params, onResult, onFault){
    params.showLoader = false;
    this.sendAndLoad(this.APP_LINK + '/getsummaryuserprojects',  params, onResult, onFault);
}

PhpWebservice.prototype.downloadProject = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/downloadproject',  params, onResult, onFault);
}






PhpWebservice.prototype.savePayment = function(params, onResult, onFault){
    this.sendAndLoad(this.APP_LINK + '/savepayment',  params, onResult, onFault);
}
PhpWebservice.prototype.showHidePublication = function(params, onResult, onFault){
    this.sendAndLoad(this.APP_LINK + '/portal/showhide/' + params.bannerId,  params, onResult, onFault);
}
PhpWebservice.prototype.deletePublication = function(params, onResult, onFault){
    this.sendAndLoad(this.APP_LINK + '/portal/deletepublication/' + params.bannerId,  params, onResult, onFault);
}
PhpWebservice.prototype.sortPublication = function(params, onResult, onFault){
    this.sendAndLoad(this.APP_LINK + '/portal/sortpublication',  params, onResult, onFault);
}


PhpWebservice.prototype.saveSubdomain = function(request, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/profilerequest/savesubdomain',  request, onResult, onFault);
}

PhpWebservice.prototype.saveSubdomainName = function(request, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/profilerequest/savesubdomainname',  request, onResult, onFault);
}

PhpWebservice.prototype.changePassword = function(request, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/profilerequest/changepassword',  request, onResult, onFault);
}

PhpWebservice.prototype.changeAvatar = function(request, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/profilerequest/changeavatar',  request, onResult, onFault);
}

PhpWebservice.prototype.sendAccessRequest = function(request, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/portal/sendaccessrequest',  request, onResult, onFault);
}

PhpWebservice.prototype.initPortalPayment = function(request, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/portal/saveportalpayment',  request, onResult, onFault);
}

PhpWebservice.prototype.checkDiscountCode = function(request, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/checkdiscountcode',  request, onResult, onFault);
}

PhpWebservice.prototype.changePortalSettings = function(request, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/portal/changeportalsettings',  request, onResult, onFault);
}

PhpWebservice.prototype.getPortalSettings = function(request, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/portal/getportalsettings',  request, onResult, onFault);
}

PhpWebservice.prototype.changePortalSkin = function(request, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/portal/changeportalskin',  request, onResult, onFault);
}

PhpWebservice.prototype.checkTestDriveForm = function(request, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/checktestdriveform',  request, onResult, onFault);
}

PhpWebservice.prototype.acceptCookiePolicy = function(request, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/acceptcookiepolicy',  request, onResult, onFault);
}


PhpWebservice.prototype.sendAndLoad = function (url, params, onResult, onFault, async){

    if (typeof async == "undefined") {
        async = true
    }
    if (typeof params.showLoader == "undefined") {
        params.showLoader = true;
    }

    var showLoader = params.showLoader;
    if (showLoader) { loaderDarkan.show(); }
    delete params.showLoader;

    // console.log(url);

    $.ajax(
        {
            type: 'POST',
            url:url,
            cache: false,
            //dataType: 'text',
            dataType: 'text',
            data: { _token: _token, params:JSON.stringify(params) },
            async: async,
            success: function(data)
            {
                if (showLoader) { loaderDarkan.hide(); }
                var dataJ = JSON.parse(data);
                // console.log('data access', dataJ);

                onResult(dataJ);

            },
            error: function(data)
            {
                if (showLoader) { loaderDarkan.hide(); }
                // $('body').html(data.responseText);
                // console.log('data failed', data);

                onFault(data);
            }
        });
}

PhpWebservice.prototype.uploadFile = function (url, params, onResult, onFault, onProgress, onComplet){


    if (typeof params.showLoader == "undefined") {
        params.showLoader = true;
    }
    var showLoader = params.showLoader;
    if (showLoader) { loaderDarkan.show(); }

    delete params.showLoader;

    $.ajax({
        url:url,
        data: params,
        dataType:'text',
        async:true,
        type:'post',
        processData: false,
        contentType: false,
        success: function(data)
        {
            if (showLoader) { loaderDarkan.hide(); }

            var dataJ = JSON.parse(data);
            // console.log('data access', dataJ);

            onResult(dataJ);

        },
        error: function(data)
        {
            if (showLoader) { loaderDarkan.hide(); }
            // console.log('data failed', data);

            onFault(data);
        }
    });
}

