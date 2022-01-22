var Utils = { };

var scaleFactor = 1;

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
        _layout.load_project_modal.find('.main').text(textValues.main);
    }
    if (!_.isUndefined(textValues.extra)) {
        _layout.load_project_modal.find('.extra').text(textValues.extra);
    }
}

Backbone.Model.prototype.toJSON = function() {
    var json = _.clone(this.attributes);
    for(var attr in json) {
        if((json[attr] instanceof Backbone.Model) || (json[attr] instanceof Backbone.Collection)) {
            json[attr] = json[attr].toJSONAll();
        }
    }
    return json;
};

function isFirefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

Utils.getRandomArrayElements = function(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(elt /*, from*/) {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}


Utils.arrayAreEqual = function(array1, array2){
  return array1.length == array2.length && array1.every(function(element, index) {
    return element === array2[index]; 
  });
}

Utils.isIE = function() {
  var rv = false;
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

Utils.isMobile = function() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

Utils.isIOS = function() {
  var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  return iOS;
}


Utils.validateUrl = function(url) {

  var valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
  console.log(valid)

  if(valid){
    return url;
  }else{
    return 'http://' + url;
  }
}

Utils.ObjectLength = function(obj) {
   var length = 0;
   for (var o in obj) {
    length++;
   }
   return length;
}

function _lang(translationString) {
    return _.isUndefined(lang[__lang][translationString]) ? 'Brak tłumaczenia :(' : lang[__lang][translationString];
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