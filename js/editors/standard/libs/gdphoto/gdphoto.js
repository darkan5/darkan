var CLIENT_ID = '750193458986-q399ro53bvhe2shec0hl0e39r94vt0dp.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDIyhhVgcWyfVJm1FxoSden7ERQJmAoFAo';
var SCOPES = 'https://www.googleapis.com/auth/drive';

// var CLIENT_ID = '898331037992.apps.googleusercontent.com';
// var API_KEY = 'AIzaSyCGhZLgwJFVlMgp0aPGglKDRHbasrw_eNE';
// var SCOPES = 'https://www.googleapis.com/auth/drive';


function handleClientLoad() {
    gapi.client.setApiKey(API_KEY);
    window.setTimeout(checkAuth,1);
}

function checkAuth() {
    var options = {
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: true
    };
    gapi.auth.authorize(options, handleAuthResult);
}

function handleAuthResult(authResult) {
    // var authorizeButton = document.getElementById('authorize-button');

    if (authResult && !authResult.error) {
        // authorizeButton.style.visibility = 'hidden';
        makeApiCall();
    } else {
        // authorizeButton.style.visibility = '';
        // authorizeButton.onclick = handleAuthClick;
        //handleAuthClick();
        $('.gdrive-image-search-results').html('').append('<div class="gdrive-login-button">' + lang['LOGIN'] + '</div>');
    }
}

function handleAuthClick(event) {
    var options = {
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
    };
    gapi.auth.authorize(options, handleAuthResult);
    return false;
}

function makeApiCall() {  
    gapi.client.load('drive', 'v2', makeRequest);
}

function makeRequest() {
    var request = gapi.client.drive.files.list({'maxResults': 1000, 'q': "mimeType = 'image/jpeg' or mimeType = 'image/png'" });
    var modalClone = $('#circularG').clone();
    $('.gdrive-image-search-results').html('').append(modalClone.show());
    request.execute(function(resp) {   
        console.log(resp);  
        $('.gdrive-image-search-results').html('');     
        for (i=0; i<resp.items.length; i++) {
            if (resp.items[i].mimeType == 'image/jpeg' || resp.items[i].mimeType == 'image/png') {

                $('.gdrive-image-search-results').append('<div class="gdrive-image-thumb" download-url="' + resp.items[i].downloadUrl.replace('&e=download&gd=true', '') + '" thumb-url="' + resp.items[i].thumbnailLink + '" file-name="' + resp.items[i].originalFilename + '" mime-type="' + resp.items[i].mimeType + '"><img src="' + resp.items[i].thumbnailLink + '" /></div>');
                console.log(resp.items[i].downloadUrl.replace('&e=download&gd=true', ''));
            }
        }
    });    
}

function convertImgToBase64(url, outputFormat, fileName){
    // $('body').append('<img class="gdirve-hide-img" id="id1" />');
    // var _img = document.getElementById('id1');
    // var newImg = new Image;
    // newImg.onload = function() {
    //     _img.src = this.src;


    //     var canvas = document.createElement('CANVAS');
    //     var ctx = canvas.getContext('2d');

    //     var img = new Image;
    //     img.crossOrigin = 'Anonymous';
    //     img.onload = function(){
    //         canvas.height = img.height;
    //         canvas.width = img.width;
    //         ctx.drawImage(img,0,0);
    //         var dataURL = canvas.toDataURL(outputFormat || 'image/png');

    //         sendToServer(dataURL, fileName, outputFormat);

    //         // Clean up
    //         // document.body.appendChild(canvas);
    //         canvas = null; 
    //     };
    //     img.src = url;

    // }
    // newImg.src = url;



    //$('body').append('<img class="gdirve-hide-img" id="id1" />');
    //var _img = document.getElementById('id1');


    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');

    var newImg = new Image;
    newImg.crossOrigin = 'Anonymous';
    newImg.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');

        sendToServer(dataURL, fileName, outputFormat);

        // Clean up
        canvas = null;
    }
    newImg.src = url;
}

function sendToServer(dataFile, fileName, outputFormat) {
    var next_point_number = check_number_of_points();
    next_point_number = ACV.paths['user_hash'] + '-' + next_point_number + '-' + ACV.numerstrony.attr('pageid');

    $.ajax({
       type: 'POST',
       dataType: 'json',
       url: 'php/download_gdrive.php?project=' + ACV.project_id,
       data: { data: dataFile,
               path: ACV.activeactionkey.attr('actionkey'),
               pageid: ACV.numerstrony.attr('pageid'),
               filename: fileName,
               mimetype: outputFormat
           },
       success: function(data){
            var s_w = data[0];
            var s_h = data[1];

            if (s_w > parseInt($('.edition-image').css('width'))) {
                s_w = parseInt($('.edition-image').css('width'));
                s_h = (s_w * data[1]) / data[0];
            }

            ACV.activeactionkey.css({
                'width': s_w,
                'height': s_h
            });
            
            ACV.activeactionkey.find('img').attr('src', 'projects/' + ACV.paths['path_project'] + 'pre/exported_view/' + ACV.numerstrony.attr('pageid') + '/images/' + ACV.activeactionkey.attr('actionkey') + '/' + data[2]);
            ACV.activeactionkey.attr('imagefile', data[2]);
            ACV.activeactionkey.css('left', '0px');

            // $('.edition-image').append('<div class="div-point-image animated" actionkey="' + next_point_number + '" action="10" status="0" score="0" animation-order="0" style="top:0;left:0;display:inline-block;width:' + s_w + 'px;height:' + s_h + 'px;position:absolute;" imagefile="' + data[2] + '" animation-async="0"><div class="img-container"><img src="projects/' + ACV.paths['path_project'] + 'pre/exported_view/' + ACV.numerstrony.attr('pageid') + '/images/' + next_point_number + '/' + data[2] + '" width="100%" height="100%" /></div></div>');
            // newPoint = $('.edition-image').find('.div-point-image').last();

            if (getNumberOfFileuploads()) {
                $('#addimageform9').fileupload('destroy');
            }

            // make_draggable(newPoint);
            // stworz_linie_do_draggable(newPoint);
            // add_point_to_timeline(newPoint);
            // update_changes(newPoint, 'create');
            // make_active_point(newPoint, false);

            resize_image(ACV.activeactionkey, ACV.numerstrony.attr('pageid'));
            update_changes(ACV.activeactionkey, 'update');

            $('.gdirve-hide-img').remove();

            $('#modal, #modal-block').hide();
            $('.paste-image-content').hide('drop', {direction: 'down'}, 500);
       },
       error: function(data){
           _dl('--------------------------------- ERROR savejpg.php ------------------------------');
           _dl(data);
           _dl('----------------------------------------------------------------------------------');
       }
    });
}

$(document).ready(function() {

    // $(document).on('click', '.ico-extras-gdphoto', function() {
    //     $.getScript('//apis.google.com/js/api.js', function() {
    //         gapi.load('auth:client', handleClientLoad);
    //     });
    // });

    $(document).on('click', '.gdrive-login-button', handleAuthClick);

    $(document).on('click', '.gdrive-image-thumb', function() {
        $('#modal').show();
        var downloadURL = $(this).attr('download-url');
        var fileName = $(this).attr('file-name');
        var mimeType = $(this).attr('mime-type');

        convertImgToBase64(downloadURL, mimeType, fileName);
    });

    var searchTO = null;
    $('#gdrive-search-val').keyup(function() {
        var val = $(this).val();
        clearTimeout(searchTO);
        searchTO = setTimeout(function(){
            $('.gdrive-image-thumb').show();
            if (val != '') {
                $('.gdrive-image-thumb:not([file-name*="' + val + '"])').hide();
            }
        }, 800);
    });
});