module.exports = File;

//var FileException = require('./exceptions/file_exception.js');

function File(){

}

File.prototype.save = function( fileContent ){
    var fs = require("fs");

    fs.writeFile('file/message.json', fileContent, function (err) {
        if (err) {
            throw err;
        }else{
            console.log('It\'s saved! in same location.');
        }
    });
}

File.prototype.save2 = function( fileContent ){

    throw err;

}
