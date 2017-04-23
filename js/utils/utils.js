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

Utils.setModalText = function(textValues) {
    if (!_.isUndefined(textValues.main)) {
        _layout.load_project_modal.find('.main').html(textValues.main);
    }
    if (!_.isUndefined(textValues.extra)) {
        _layout.load_project_modal.find('.extra').html(textValues.extra);
    }
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
    return _.isUndefined(DARKAN_LANG[translationString]) ? 'Brak tłumaczenia :(' : DARKAN_LANG[translationString];
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