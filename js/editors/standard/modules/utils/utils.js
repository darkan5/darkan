var Utils = { };

Utils.getURLParam = function()
{

    url =  window.location.search.substring(0);

    var result = {};
                var searchIndex = url.indexOf("?");
                if (searchIndex == -1 ) return result;
    var sPageURL = url.substring(searchIndex +1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {    	
        var sParameterName = sURLVariables[i].split('=');      
        result[sParameterName[0]] = sParameterName[1];
    }
    return result;
}

Utils.getMinutesUntilNextHour = function() { 
    return ((60 - new Date().getMinutes()) * 60) -  (60 - new Date().getSeconds())
};

Utils.setModalText = function(textValues, showRefreshButton) {

    if (!_.isUndefined(textValues.main)) {
        _layout.load_project_modal.find('.main').html(textValues.main);
    }
    if (!_.isUndefined(textValues.extra)) {
        _layout.load_project_modal.find('.extra').html(textValues.extra);
    }

    if (showRefreshButton) {
        _layout.load_project_modal.find('.extra').append(
            '<figcaption class="extra"><button class="refresh-page-btn editor-settings-button" onClick="window.location.reload()">' +
                                '<i class="fa fa-refresh"></i> ' + _lang('ERROR_OCCURED_REFRESH') + '</button></figcaption>');
    }
}

Utils.showErrorModal = function() {
    $('#unexpected-error-modal')
        .fadeIn(500)
        .css({
            'z-index': '99999'
        });
}

Utils.showNormalModal = function() {
    _layout.load_project_modal.show();
}

Backbone.Model.prototype.toJSON = function() {
    var json = _.clone(this.attributes);
    for(var attr in json) {
        if((json[attr] instanceof Backbone.Model) || (json[attr] instanceof Backbone.Collection)) {
            json[attr] = json[attr].toJSON();   
        }
    }
    return json;
};

function isFirefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

Utils.isFirefox = function() {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

Utils.isChrome = function() {
    return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
}

Utils.getInternetExplorerVersion = function()
{
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    return rv;
}


Utils.selectWholeText = function(el){
    if (isFirefox()) {
      return Utils.placeCaretAtEnd($(el).closest('.note-editable')[0]);
    }
    var sel, range;
    if (window.getSelection && document.createRange) {
        range = document.createRange();
        range.selectNodeContents(el);
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (document.body.createTextRange) {
        // range = document.body.createTextRange();
        // range.moveToElementText(el);
        // range.select();
    }
}

Utils.placeCaretAtEnd = function(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
    $(el).mouseup();
}

Utils.generateUniqueHash = function() {
    var ra = Math.floor((Math.random() * 100000));
    var da = new Date().getTime();
    var str = ra.toString() + da.toString();
    var ha = CryptoJS.MD5(str).toString();

    return ha;
}


function _lang(translationString) {
    return Lang.get('editor.' + translationString);//_.isUndefined(DARKAN_LANG[translationString]) ? 'Brak tłumaczenia :(' : DARKAN_LANG[translationString];
}

// jquery ui resizable naprawa (nie dalo sie w locie zmieniac aspect ratio)
(function() {
    var oldSetOption = $.ui.resizable.prototype._setOption;
    $.ui.resizable.prototype._setOption = function(key, value) {
        oldSetOption.apply(this, arguments);
        if (key === "aspectRatio") {
            this._aspectRatio = !!value;
        }
    };
})();


Utils.arrayAreEqual = function(array1, array2){
    return array1.length == array2.length && array1.every(function(element, index) {
        return element === array2[index];
    });
}

Utils.reduce = function(arr) {
    arr.reduce(function(a, b){return (a === b)?a:"";});
}

Utils.rgb2hex = function(rgb) {
    var isHexColor = /^#[0-9A-F]{6}$/i.test(rgb);
    
    
    if (!isHexColor && rgb.length != 4){
        
        if (rgb.substr(0, 3) == 'rgb' && rgb.substr(0, 4) != 'rgba'){
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        } else if (rgb.substr(0, 4) == 'rgba'){
            rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\S+))?\)$/);
        } else {
            rgb = new Array();
        }
        
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        
    } else {
        return rgb;
    }
}

Utils.isDarkanExtension = function(e) {

    if(e.originalEvent && e.originalEvent.dataTransfer){

        _log('e.originalEvent', e.originalEvent);

        //var link =  e.originalEvent.dataTransfer.getData('text');

        if(e.originalEvent.dataTransfer.files.length == 0){

            return false;

        }else{

            var file = e.originalEvent.dataTransfer.files[0];

            var fileName = file.name;

            var rePsd = new RegExp("^.*\." + 'darkan' + "$");

            if( rePsd.test( fileName ) ){
                return true;
            }
        }

    }else{
        return false;
    }

    return false;
}

Utils.setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },

Utils.getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

Utils.mapKeyCode = function (keyCode) {

    var keyboardMap = ["","","","CANCEL","","","HELP","","BACK_SPACE","TAB","","","CLEAR","ENTER","RETURN","","SHIFT","CONTROL","ALT","PAUSE","CAPS_LOCK","KANA","EISU","JUNJA","FINAL","HANJA","","ESCAPE","CONVERT","NONCONVERT","ACCEPT","MODECHANGE","SPACE","PAGE_UP","PAGE_DOWN","END","HOME","LEFT","UP","RIGHT","DOWN","SELECT","PRINT","EXECUTE","PRINTSCREEN","INSERT","DELETE","","0","1","2","3","4","5","6","7","8","9","COLON","SEMICOLON","LESS_THAN","EQUALS","GREATER_THAN","QUESTION_MARK","AT","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","WIN","","CONTEXT_MENU","","SLEEP","NUMPAD0","NUMPAD1","NUMPAD2","NUMPAD3","NUMPAD4","NUMPAD5","NUMPAD6","NUMPAD7","NUMPAD8","NUMPAD9","MULTIPLY","ADD","SEPARATOR","SUBTRACT","DECIMAL","DIVIDE","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","","","","","","","","","NUM_LOCK","SCROLL_LOCK","WIN_OEM_FJ_JISHO","WIN_OEM_FJ_MASSHOU","WIN_OEM_FJ_TOUROKU","WIN_OEM_FJ_LOYA","WIN_OEM_FJ_ROYA","","","","","","","","","","CIRCUMFLEX","EXCLAMATION","DOUBLE_QUOTE","HASH","DOLLAR","PERCENT","AMPERSAND","UNDERSCORE","OPEN_PAREN","CLOSE_PAREN","ASTERISK","PLUS","PIPE","HYPHEN_MINUS","OPEN_CURLY_BRACKET","CLOSE_CURLY_BRACKET","TILDE","","","","","VOLUME_MUTE","VOLUME_DOWN","VOLUME_UP","","","SEMICOLON","EQUALS","COMMA","MINUS","PERIOD","SLASH","BACK_QUOTE","","","","","","","","","","","","","","","","","","","","","","","","","","","OPEN_BRACKET","BACK_SLASH","CLOSE_BRACKET","QUOTE","","META","ALTGR","","WIN_ICO_HELP","WIN_ICO_00","","WIN_ICO_CLEAR","","","WIN_OEM_RESET","WIN_OEM_JUMP","WIN_OEM_PA1","WIN_OEM_PA2","WIN_OEM_PA3","WIN_OEM_WSCTRL","WIN_OEM_CUSEL","WIN_OEM_ATTN","WIN_OEM_FINISH","WIN_OEM_COPY","WIN_OEM_AUTO","WIN_OEM_ENLW","WIN_OEM_BACKTAB","ATTN","CRSEL","EXSEL","EREOF","PLAY","ZOOM","","PA1","WIN_OEM_CLEAR",""];
    return keyboardMap[keyCode];
}

Utils.ObjectLength = function(obj) {
   var length = 0;
   for (var o in obj) {
    length++;
   }
   return length;
}

Utils.isYoutubeLink = function(url) {
   var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return true;
    } else {
      return false;
    }
}

Utils.isImageLink = function(url) {
    var regExp = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
    return regExp.test(url);
}


Utils.setChatLanguage = function() {
    smartsupp('translate', {
        online: { // online window
            title: _lang('SMARTSSUP_title'),
            infoTitle: _lang('SMARTSSUP_infoTitle'),
            infoDesc: _lang('SMARTSSUP_infoDesc')
        },
        offline: { // offline window
            title: _lang('SMARTSSUP_offlinetitle'),
            notice: _lang('SMARTSSUP_offlinenotice')
        },
        login: { // pre-chat form window
            title: _lang('SMARTSSUP_logintitle'),
            messageLabel: _lang('SMARTSSUP_loginessageLabel'),
            submit: _lang('SMARTSSUP_loginsubmit')
        },
        widget: { // chat box
            online: _lang('SMARTSSUP_widgetonline'),
            away: _lang('SMARTSSUP_widgetawaw'),
            offline: _lang('SMARTSSUP_widgetoffline'),
        },
        banner: { // chat banners
            bubble: {
                text: _lang('SMARTSSUP_bannerbubbletext')
            },
            arrow: {
                title: _lang('SMARTSSUP_bannerarrowtitle'),
                desc: _lang('SMARTSSUP_bannerarrowdesc')
            }
        },
        button : { // mobile widget
            title: _lang('SMARTSSUP_buttontitle')
        }
    }, 'en');
    smartsupp('translate', {
        online: { // online window
            title: _lang('SMARTSSUP_title'),
            infoTitle: _lang('SMARTSSUP_infoTitle'),
            infoDesc: _lang('SMARTSSUP_infoDesc')
        },
        offline: { // offline window
            title: _lang('SMARTSSUP_offlinetitle'),
            notice: _lang('SMARTSSUP_offlinenotice')
        },
        login: { // pre-chat form window
            title: _lang('SMARTSSUP_logintitle'),
            messageLabel: _lang('SMARTSSUP_loginessageLabel'),
            submit: _lang('SMARTSSUP_loginsubmit')
        },
        widget: { // chat box
            online: _lang('SMARTSSUP_widgetonline'),
            away: _lang('SMARTSSUP_widgetawaw'),
            offline: _lang('SMARTSSUP_widgetoffline'),
        },
        banner: { // chat banners
            bubble: {
                text: _lang('SMARTSSUP_bannerbubbletext')
            },
            arrow: {
                title: _lang('SMARTSSUP_bannerarrowtitle'),
                desc: _lang('SMARTSSUP_bannerarrowdesc')
            }
        },
        button : { // mobile widget
            title: _lang('SMARTSSUP_buttontitle')
        }
    }, 'pl');

    smartsupp('language', __lang);
}
Utils.setChatLanguage();

// offsetRelative (or, if you prefer, positionRelative)
(function($){
    $.fn.offsetRelative = function(top){
        var $this = $(this);
        var $parent = $this.offsetParent();
        var offset = $this.position();
        if(!top) return offset; // Didn't pass a 'top' element 
        else if($parent.get(0).tagName == "BODY") return offset; // Reached top of document
        else if($(top,$parent).length) return offset; // Parent element contains the 'top' element we want the offset to be relative to 
        else if($parent[0] == $(top)[0]) return offset; // Reached the 'top' element we want the offset to be relative to 
        else { // Get parent's relative offset
            var parent_offset = $parent.offsetRelative(top);
            offset.top += parent_offset.top;
            offset.left += parent_offset.left;
            return offset;
        }
    };
    $.fn.positionRelative = function(top){
        return $(this).offsetRelative(top);
    };
}(jQuery));


// var minutesToRestart = Utils.getMinutesUntilNextHour();
// $('#restart-counter').text("Restart za: " + minutesToRestart + " minut");
// setInterval(function() {
//     var minutesToRestart = Utils.getMinutesUntilNextHour();
//     $('#restart-counter').text("Restart za: " + minutesToRestart + " minut");
// }, 60000);