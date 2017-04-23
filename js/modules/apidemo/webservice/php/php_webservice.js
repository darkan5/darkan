/**
 * Created with IntelliJ IDEA.
 * User: adm
 * Date: 03.02.15
 * Time: 16:08
 * To change this template use File | Settings | File Templates.
 */



function PhpWebservice(){
    this.APP_LINK = _appLink;
}

PhpWebservice.prototype = new WebService();

PhpWebservice.prototype.getHashedApikey = function(params, onResult, onFault){
    // this.updateSettings(request, params);
    this.sendAndLoad(this.APP_LINK + '/apidemo/gethashedapikey',  params, onResult, onFault);
}


PhpWebservice.prototype.addNewProject = function(params, onResult, onFault){
    // this.updateSettings(request, params);
    this.sendAndLoad(this.APP_LINK + '/apidemo/addnewproject',  params, onResult, onFault);
}

PhpWebservice.prototype.publishProject = function(params, onResult, onFault){
    // this.updateSettings(request, params);
    this.sendAndLoad(this.APP_LINK + '/apidemo/publishproject',  params, onResult, onFault);
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

