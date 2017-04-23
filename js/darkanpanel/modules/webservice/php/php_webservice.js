/**
 * Created with IntelliJ IDEA.
 * User: adm
 * Date: 03.02.15
 * Time: 16:08
 * To change this template use File | Settings | File Templates.
 */

function PhpWebservice(){
     // this.phpUrl = 'server/php/lms_controller/lms_controller.php';
     this.phpUrl = _appLink + '/darkanpanel/lmsrequest';
     this.loader = loaderDarkan;
}

PhpWebservice.prototype = new WebService();

PhpWebservice.prototype.lmsRequest = function(data, onResult, onFault, context) {
    this.sendAndLoad(this.phpUrl, data, onResult, onFault, context);
};

PhpWebservice.prototype.getNumberOfUsersAndCourses = function(data, onResult, onFault, context) {

    data.request = 'getNumberOfUsersAndCourses';

    var request = { request: JSON.stringify(data) }

    this.sendAndLoad(this.phpUrl, request, onResult, onFault, context);
};

PhpWebservice.prototype.getUsersPageTimes = function(data, onResult, onFault, context) {

    data.request = 'getUsersPageTimes';

    var request = { request: JSON.stringify(data) }

    this.sendAndLoad(this.phpUrl, request, onResult, onFault, context);
};

PhpWebservice.prototype.courseStatus = function(data, onResult, onFault, context) {

    data.request = 'courseStatus';

    var request = { request: JSON.stringify(data) }

    this.sendAndLoad(this.phpUrl, request, onResult, onFault, context);
};

PhpWebservice.prototype.userStatus = function(data, onResult, onFault, context) {

    data.request = 'userStatus';

    var request = { request: JSON.stringify(data) }

    this.sendAndLoad(this.phpUrl, request, onResult, onFault, context);
};

PhpWebservice.prototype.getUsersDetailsInCourse = function(data, onResult, onFault, context) {

    data.request = 'getUsersDetailsInCourse';

    var request = { request: JSON.stringify(data) }

    this.sendAndLoad(this.phpUrl, request, onResult, onFault, context);
};

PhpWebservice.prototype.sendMails = function(data, onResult, onFault, context) {
    this.sendAndLoad(_appLink + '/darkanpanel/mailing', data, onResult, onFault, context);
};

PhpWebservice.prototype.getPanelSettings = function(data, onResult, onFault, context) {
    data.request = 'getPanelSettings';

    var request = { request: JSON.stringify(data) }

    this.sendAndLoad(this.phpUrl, request, onResult, onFault, context);
};

PhpWebservice.prototype.setPanelSettings = function(data, onResult, onFault, context) {
    data.request = 'setPanelSettings';

    var request = { request: JSON.stringify(data) }

    this.sendAndLoad(this.phpUrl, request, onResult, onFault, context);
};


PhpWebservice.prototype.getCourseQuestionsData  = function(data, onResult, onFault, context) {
    _log('data', data, _log.error);
    data.request = 'getCourseQuestionsData';

    var request = { request: JSON.stringify(data) }

    this.sendAndLoad(this.phpUrl, request, onResult, onFault, context);
};

PhpWebservice.prototype.getCourseQuestionsDataByUserId  = function(data, onResult, onFault, context) {
    _log('data', data, _log.error);
    data.request = 'getCourseQuestionsDataByUserId';

    var request = { request: JSON.stringify(data) }

    this.sendAndLoad(this.phpUrl, request, onResult, onFault, context);
};

PhpWebservice.prototype.downloadChartPivotTableSingleCourse  = function(data, onResult, onFault, context) {
    _log('data', data, _log.error);
    data.request = 'downloadChartPivotTableSingleCourse';

    var request = { request: JSON.stringify(data) }

    this.sendAndLoad(this.phpUrl, request, onResult, onFault, context);
};







PhpWebservice.prototype.sendAndLoad = function (url, settings, onResult, onFault, context)
{
    var _that = this;

    settings._token = _token;

    this.loader.show();
    

    $.ajax(
        {
            type: 'POST',
            url:url,
            cache: false,
            //dataType: 'text',
            dataType: 'text',
            data: settings,
            async: true,
            success: function(data)
            {
                if(onResult != undefined && !context.isDestroyed) {
                    onResult.call(context, data);
                }
                _that.loader.hide();
                
            },
            error: function()
            {
                if(onFault != undefined && !context.isDestroyed){
                    onFault.call(context);
                }
                _that.loader.hide();
                
            }
        });
}