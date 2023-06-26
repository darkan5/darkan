module.exports = PageThumb;
var path = require('path');
const { exec } = require('child_process');
var fs = require('fs.extra');
var wkhtmltoimage = require('wkhtmltoimage');
var ConfigController = require('../config_controller/config_controller.js');


function PageThumb(socket) {
    this.socket = socket;
    // this.DIRNAME = path.join(__dirname);
    this.DIRNAME = ConfigController.get('PROJECTS_PATH');
}

PageThumb.prototype.createPageThumb = function(data, onResult, onFault, onChangeResult) {
    var _that = this;

    var indexFile = path.join(__dirname, 'index.html');

    var statuses = [];
    var errors = [];

    fs.readFile(indexFile, 'utf8', function(err, content) {
        if (err) {
            errors.push(err);
        } else {
            try {

                data.html = data.html.replace(/(<img src=")[^"]*(")/g, function(fullMatch, startTag, endTag) {
                    let oldSrc = fullMatch.slice(startTag.length, -endTag.length); // Stara ścieżka
                    let newSrc = oldSrc.replace(/.*images/, "images"); // Nowa ścieżka
                    return startTag + newSrc + endTag; // Zwraca tag img z nowym src
                });
                    console.log('DATA: ', data);

                var pagetThumb = _that.mergeContent(content, '<!--CUT-->', data.html);

                var userId = _that.socket.ownerId.toString();;
                var projectId = _that.socket.myRoom.toString();
                
                if (data.pageOptions.pageid) {
                    var pageId = data.pageOptions.pageid.toString();
                    var pageBackgroundFile = data.pageOptions.image.toString();

                    console.log('WIDTH: ', data.pageOptions.width);

                    // merge width and height
                    var widthAndHeight = 'width:'+ data.pageOptions.width + 'px;height:' + data.pageOptions.height + 'px';
                    pagetThumb = _that.mergeContent(pagetThumb, '--=WIDTH_AND_HEIGHT=--', widthAndHeight);

                    // get background image
                    var backgroundImagePath = path.join(_that.DIRNAME, userId, projectId, 'pre', 'exported_view', pageId, 'imgpage', pageBackgroundFile);
                    backgroundImagePath = backgroundImagePath.replace(/\\/g,"/");

                    // merge background image and color
                    pagetThumb = _that.mergeContent(pagetThumb, '--=BACKGROUND_IMAGE=--', backgroundImagePath);
                    pagetThumb = _that.mergeContent(pagetThumb, '--=BACKGROUND_COLOR=--', data.pageOptions.bgcolor);

                    // get thumb path
                    var thumbPath = path.join(_that.DIRNAME, userId, projectId, 'pre', 'exported_view', pageId, 'pagethumb.jpg');
                    var htmlPath = path.join(_that.DIRNAME, userId, projectId, 'pre', 'exported_view', pageId, 'pagethumb.html');

                    pagetThumb = pagetThumb.replace(/-webkit-linear-gradient/g, 'linear-gradient');
                    pagetThumb = pagetThumb.replace(/linear-gradient/g, '-webkit-linear-gradient');
                    pagetThumb = pagetThumb.replace(/transform/g, '-webkit-transform');

                    var fileToSaveUrl  = path.join(_that.DIRNAME, 'temp', 'index.html');
                    fs.writeFile(htmlPath, pagetThumb, function(err) {
                         console.log(err);
                    });

                    var width = data.pageOptions.width;
                    var height = data.pageOptions.height;

                    // if(height > width) {

                    //     //794 X 1123

                    //     width = 794;
                    //     height = 1123;
                    // }


                    wkhtmltoimage.generate("file://"+htmlPath, { width: width, height: height, output: thumbPath }, function() {
                        if(errors.length > 0){
                            onFault({errors:errors, error:'error'});
                        }else{
                            statuses.push('Page thumb created correctly!');
                            onResult({ statuses:statuses, pageID: data.pageOptions.pageid });

                            onChangeResult( {
                                status:'Page thumb created ',
                                name:'thumb',
                                event: 'updatePageThumb',
                                pageId: pageId
                            } );
                        }
                        fs.chmod(thumbPath, 0o777, function(err) {
                            if (err) {
                              console.error(err);
                            } else {
                              console.log('The permissions for file "out.png" have been changed!');
                            }
                          });
                    });
            

                }
            } catch(ex) {
                errors.push(ex);
                console.log(ex);

                _that.socket.errorMailer.send(ex);
            }
            
        }



    });

};

PageThumb.prototype.mergeContent = function(wholeContent, delimeter, contentToInsert) {
    var _that = this;

    var splittedContent = wholeContent.split(delimeter);

    var mergedContent = splittedContent[0];
    mergedContent += contentToInsert;
    mergedContent += splittedContent[1];

    return mergedContent;
};