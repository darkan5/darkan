module.exports = Utils;

function Utils(){

}

Utils.jsonParse = function( string ){

    try{
        return JSON.parse( string );
    }catch (ex){
        return {};
    }
}

Utils.jsonStringify = function( obj ){

    if(obj == undefined) return '';

    try{
        return  JSON.stringify( obj )
    }catch (ex){
        return "";
    }
}

Utils.decodeBase64Image = function(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    return response;
}