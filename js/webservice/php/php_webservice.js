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


// PhpWebservice.prototype.saveLastWord = function(params, onResult, onFault){

//     this.sendAndLoad(this.APP_LINK + '/user/savelastword',  params, onResult, onFault);
// }

PhpWebservice.prototype.sendAndLoad = function (url, params, onResult, onFault, async){

    if (typeof async == "undefined") {
        async = true
    }

    params = params || {};
    params._token = _token;

    //console.log(params);

    $.ajax(
        {
            type: 'POST',
            url:url,
            cache: false,
            //dataType: 'text',
            dataType: 'text',
            data: params,
            async: async,
            crossDomain: true,
            success: function(data)
            {   
                try {

                    var jData = JSON.parse(data);

                    if(jData.errors){
                        onFault(jData.errors);

                    }else{
                        onResult(jData);
                    }


                }catch(ex) {
                    onFault({});
                }

            },
            error: function(data)
            {
                onFault(data);
            }
        });
}