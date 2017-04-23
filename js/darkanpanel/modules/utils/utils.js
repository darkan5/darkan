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



Utils.generateUniqueHash = function() {
    var ra = Math.floor((Math.random() * 100000));
    var da = new Date().getTime();
    var str = ra.toString() + da.toString();
    var ha = CryptoJS.MD5(str).toString();

    return ha;
}


function _lang(translationString, data) {
    return Lang.get('darkanpanel.' + translationString);//_.isUndefined(DARKAN_LANG[translationString]) ? 'Brak tłumaczenia :(' : vsprintf(DARKAN_LANG[translationString], data);
}


Utils.arrayAreEqual = function(array1, array2){
    return array1.length == array2.length && array1.every(function(element, index) {
        return element === array2[index];
    });
}

Utils.reduce = function(arr) {
    arr.reduce(function(a, b){return (a === b)?a:"";});
}

Utils.escapeHtml = function(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
 
Utils.ObjectLength = function(obj) {
    var length = 0;
    for (var o in obj) {
        length++;
    }
    return length;
}