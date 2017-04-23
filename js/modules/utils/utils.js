function setChatLanguage () {
    smartsupp('translate', {
        online: { // online window
            title: Lang.get('editor.SMARTSSUP_title'),
            infoTitle: Lang.get('editor.SMARTSSUP_infoTitle'),
            infoDesc: Lang.get('editor.SMARTSSUP_infoDesc')
        },
        offline: { // offline window
            title: Lang.get('editor.SMARTSSUP_offlinetitle'),
            notice: Lang.get('editor.SMARTSSUP_offlinenotice')
        },
        login: { // pre-chat form window
            title: Lang.get('editor.SMARTSSUP_logintitle'),
            messageLabel: Lang.get('editor.SMARTSSUP_loginessageLabel'),
            submit: Lang.get('editor.SMARTSSUP_loginsubmit')
        },
        widget: { // chat box
            online: Lang.get('editor.SMARTSSUP_widgetonline'),
            away: Lang.get('editor.SMARTSSUP_widgetawaw'),
            offline: Lang.get('editor.SMARTSSUP_widgetoffline'),
        },
        banner: { // chat banners
            bubble: {
                text: Lang.get('editor.SMARTSSUP_bannerbubbletext')
            },
            arrow: {
                title: Lang.get('editor.SMARTSSUP_bannerarrowtitle'),
                desc: Lang.get('editor.SMARTSSUP_bannerarrowdesc')
            }
        },
        button : { // mobile widget
            title: Lang.get('editor.SMARTSSUP_buttontitle')
        }
    }, 'en');
    smartsupp('translate', {
        online: { // online window
            title: Lang.get('editor.SMARTSSUP_title'),
            infoTitle: Lang.get('editor.SMARTSSUP_infoTitle'),
            infoDesc: Lang.get('editor.SMARTSSUP_infoDesc')
        },
        offline: { // offline window
            title: Lang.get('editor.SMARTSSUP_offlinetitle'),
            notice: Lang.get('editor.SMARTSSUP_offlinenotice')
        },
        login: { // pre-chat form window
            title: Lang.get('editor.SMARTSSUP_logintitle'),
            messageLabel: Lang.get('editor.SMARTSSUP_loginessageLabel'),
            submit: Lang.get('editor.SMARTSSUP_loginsubmit')
        },
        widget: { // chat box
            online: Lang.get('editor.SMARTSSUP_widgetonline'),
            away: Lang.get('editor.SMARTSSUP_widgetawaw'),
            offline: Lang.get('editor.SMARTSSUP_widgetoffline'),
        },
        banner: { // chat banners
            bubble: {
                text: Lang.get('editor.SMARTSSUP_bannerbubbletext')
            },
            arrow: {
                title: Lang.get('editor.SMARTSSUP_bannerarrowtitle'),
                desc: Lang.get('editor.SMARTSSUP_bannerarrowdesc')
            }
        },
        button : { // mobile widget
            title: Lang.get('editor.SMARTSSUP_buttontitle')
        }
    }, 'pl');

    smartsupp('language', __lang);
}
setChatLanguage();

$('.acceptcookiepolicy').click(function() {
    DataAccess.acceptCookiePolicy( {}, function() {}, function() {} );
    $('#cookieplicy-wrapper').addClass('animated bounceOutDown');
});