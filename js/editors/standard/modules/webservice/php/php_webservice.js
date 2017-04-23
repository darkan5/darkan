/**
 * Created with IntelliJ IDEA.
 * User: adm
 * Date: 03.02.15
 * Time: 16:08
 * To change this template use File | Settings | File Templates.
 */
function PhpWebservice(){

}

PhpWebservice.prototype = new WebService();

// PhpWebservice.prototype.createBlankPage = function(params, onResult, onFault, onProgress)
// {
//     var settings = {};
//     this.updateSettings(settings, params);

//     var path = 'php/server.php';
//     WebService.ajax(path, onResult, onFault, settings);

//     this.send();
// }

PhpWebservice.prototype.searchImages = function(data, onResult, onFault) {
    this.sendAndLoad(__meta__.APP_LINK + 'searchimages', data, onResult, onFault);
};

PhpWebservice.prototype.searchYoutube = function(data, onResult, onFault) {
    this.sendAndLoad(__meta__.app_folder + 'Modules/Editor/Youtube/searchyoutube.php', data, onResult, onFault);
};

PhpWebservice.prototype.searchVimeo = function(data, onResult, onFault) {
    this.sendAndLoad(__meta__.app_folder + 'Modules/Editor/Vimeo/searchvimeo.php', data, onResult, onFault);
};

PhpWebservice.prototype.libraryRequest = function(data, onResult, onFault) {
    this.sendAndLoad(__meta__.APP_LINK + 'darkanlibrary', data, onResult, onFault);
};

PhpWebservice.prototype.projectVersioinRequest = function(data, onResult, onFault) {
    this.sendAndLoad(__meta__.APP_LINK + 'projectversion', data, onResult, onFault);
};

PhpWebservice.prototype.publicationRequest = function(data, onResult, onFault) {
    this.sendAndLoad(__meta__.APP_LINK + 'publication', data, onResult, onFault);
};

PhpWebservice.prototype.sendMails = function(data, onResult, onFault) {
    this.sendAndLoad(__meta__.APP_LINK + 'mailings', data, onResult, onFault);
};

PhpWebservice.prototype.keepSession = function(data, onResult, onFault) {
    this.sendAndLoad(__meta__.APP_LINK + 'keepsession', data, onResult, onFault);
};

PhpWebservice.prototype.changeLanguage = function(data, onResult, onFault) {
    this.sendAndLoad(__meta__.APP_LINK + 'changelang/' + data.lang, data, onResult, onFault);
};

PhpWebservice.prototype.loadProjectById = function(data, onResult, onFault) {
    var projectData = { project: data.projectId };
    this.sendAndLoad(__meta__.APP_LINK + 'downloadFromOcs', projectData, onResult, onFault, false);
};

PhpWebservice.prototype.downloadFromOcs = function(data, onResult, onFault) {
    this.sendAndLoad(__meta__.APP_LINK + 'downloadFromOcs', data, onResult, onFault, false);
};

PhpWebservice.prototype.shareProjectToUser = function(data, onResult, onFault) {
    this.sendAndLoad(__meta__.APP_LINK + 'shareproject', data, onResult, onFault, false);
};

PhpWebservice.prototype.loginExternal = function(data, onResult, onFault) {

    var request = {
        request: 1,
        data: data,
        __meta__: __meta__
    };

    this.sendAndLoad(__meta__.APP_LINK + 'login/login_external', { request: JSON.stringify(request) }, onResult, onFault, true);
};

PhpWebservice.prototype.editPhotopeaImage = function(data, onResult, onFault) {
    this.sendAndLoad(__meta__.APP_LINK + 'photopea', data, onResult, onFault);
};

PhpWebservice.prototype.sendAndLoad = function (url, settings, onResult, onFault, async)
{
    var async = async || true;
    $.ajax(
        {
            type: 'POST',
            url:url,
            cache: false,
            //dataType: 'text',
            dataType: 'text',
            data: settings,
            async: async,
            success: function(data)
            {
                onResult(data);
            },
            error: function()
            {
                onFault();
            }
        });
}