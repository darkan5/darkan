function PhpWebservice(){

    this.APP_LINK = 'http://176.119.54.149/egzaminy';
}

PhpWebservice.prototype = new WebService();


PhpWebservice.prototype.test = function(params, onResult, onFault){

    this.sendAndLoad(this.APP_LINK + '/test',  params, onResult, onFault);
}

PhpWebservice.prototype.uploadDocFile = function(params, appLink, onResult, onFault, onProgress, onComplete){

    this.uploadFile(appLink + 'courses/uploaddocfile',  params, onResult, onFault, onProgress, onComplete);
}


PhpWebservice.prototype.sendAndLoad = function (url, params, onResult, onFault, async){

    if (typeof async == "undefined") {
        async = true
    }

    console.log(url);

    $.ajax(
        {
            type: 'POST',
            url:url,
            cache: false,
            dataType: 'text',
            data: { params:JSON.stringify(params) },
            async: async,
            success: function(data)
            {
                var dataJ = JSON.parse(data);
                console.log('data access', dataJ);

                onResult(dataJ);

            },
            error: function(data)
            {

                console.log('data failed', data);

                onFault(data);
            }
        });
}

PhpWebservice.prototype.uploadFile = function (url, params, onResult, onFault, onProgress, onComplete){

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
        async:false,
        type:'post',
        processData: false,
        contentType: false,
        success: function(data)
        {

            if (showLoader) { loaderDarkan.hide(); }

            var dataJ = JSON.parse(data);

            onResult(dataJ);

        },
        error: function(data)
        {
            if (showLoader) { loaderDarkan.hide(); }

            onFault(data);
        }
    });
}

