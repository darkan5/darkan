var reportError = {};

reportError.init = function() {
    if (typeof ACV === 'object') {
        $(document).find('#menu-help').append('<a class="ico5" id="report-error" title="' + lang['TOOLTIP_0010'] + '"><span>' + lang['MENU_REPORT_HELP'] + '</span></a>');
    }
    
    // pokaz okno raportowania bledow
    $('#report-error').click(function() {
        reportError.drawPopup();
    });
    
    $('#profile .reportError-li').click(function() {
        reportError.drawPopup();
    });
    
    // zamknij okno raportowania bledow
    $(document).on('click', '.reportErrorClose', function() {
        $('.reportErrorWrapper').remove();
    });
    
    // wyslij raport
    $(document).on('click', '.reportErrorSendButton', function() {
        reportError.sendReport();
    });
    
    // zamknij okno raportowania bledow - anuluj
    $(document).on('click', '.reportErrorCancelButton', function() {
        $('.reportErrorWrapper').remove();
    });
};

reportError.drawPopup = function() {
    var appendHTML = '';
    
    appendHTML += '<div class="reportErrorWrapper">'
    appendHTML += '<div class="reportErrorContainer">';
    appendHTML += '<div class="reportErrorContainerHeader">';
    appendHTML += '<span>' + lang['MENU_REPORT_HELP'] + '</span><div class="reportErrorClose"></div>';
    appendHTML += '</div>';
    appendHTML += '<div class="reportErrorContainerBody">';
    appendHTML += '<label>'+lang['MENU_REPORT_CAT']+'</label>';
    appendHTML += '<div class="errorClear"></div>';
    appendHTML += '<select class="reportErrorCategoryInput">';
    appendHTML += '<option value="1">'+lang['MENU_REPORT_CAT_PORTAL']+'</option>';
    appendHTML += '<option value="2">'+lang['MENU_REPORT_CAT_PAGE']+'</option>';
    appendHTML += '<option value="3">'+lang['MENU_REPORT_CAT_APP']+'</option>';
    appendHTML += '<option value="4">'+lang['MENU_REPORT_CAT_OTHER']+'</option>';
    appendHTML += '</select>';
    appendHTML += '<div class="errorClear"></div>';
    appendHTML += '<label>'+lang['MENU_REPORT_CAT_MESSAGE']+'</label>';
    appendHTML += '<div class="errorClear"></div>';
    appendHTML += '<textarea class="reportErrorMsgInput" maxlength="1000"></textarea>';
    appendHTML += '<div class="errorClear"></div>';
    appendHTML += '<button class="reportErrorSendButton">'+lang['MENU_REPORT_CAT_SEND']+'</button>';
    appendHTML += '<button class="reportErrorCancelButton">'+lang['MENU_REPORT_CAT_CANCEL']+'</button>';
    appendHTML += '</div>';
    appendHTML += '<div class="errorClear"></div>';
    appendHTML += '</div>';
    appendHTML += '</div>';
    
    $('body').append(appendHTML);
}

reportError.reportedInfo = function() {
    var appendHTML = '';
    
    appendHTML += '<div class="reportErrorOkInfo">';
    appendHTML += 'Wysłano raport';
    appendHTML += '</div>';
    
    $('body').append(appendHTML);
    $('.reportErrorOkInfo').fadeIn();
    setTimeout(function() {
        $('.reportErrorOkInfo').fadeOut(function() {
            $('.reportErrorOkInfo').remove();
        });
    }, 2500);
}

reportError.sendReport = function() {
    
    dataUrl = 'none';
    message = $('.reportErrorContainer .reportErrorMsgInput').val();
    category = $('.reportErrorContainer .reportErrorCategoryInput').val();
    email = $('.profile .name').text();
    link = 'link';
    if (typeof ACV === 'object') {
        email = $('.profile .name').text().trim();
    } else {
        email = $('#user-mail').text().trim();
    }
    
    var url = '';
    if (typeof ACV === 'object') {
        url = 'php/ajax_report_error.php';
    } else {
        if ( loc === 'home' )
            url = 'app/1.0.0/php/ajax_report_error.php'
        else if ( loc === 'portal' )
            url = '../app/1.0.0/php/ajax_report_error.php'
        else if ( loc === 'pp' )
            url = 'app/1.0.0/php/ajax_report_error.php'
    }
    
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            image: dataUrl,
            message: message,
            category: category,
            email: email,
            link: link
        },
        success: function(data) {
            $('.reportErrorWrapper').remove();
            reportError.reportedInfo();
        },
        error: function(data){
            _dl('----------------------------- ERROR change_sound_pres.php ------------------------');
            _dl(data);
            _dl('----------------------------------------------------------------------------------');
        }
    });
}

$(document).ready(function() {
    reportError.init();
});
