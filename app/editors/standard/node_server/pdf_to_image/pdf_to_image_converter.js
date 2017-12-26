module.exports = PdfToImageConverter;
var path = require('path');
var fs = require('fs.extra');
var Project = require('../project/project.js');
//var PDFImage = require("pdf-image").PDFImage;
nodeDir = require('node-dir');

var im = require('imagemagick');
var exec = require('child_process').exec;

var ConfigController = require('../config_controller/config_controller.js');


function PdfToImageConverter(socket, DIRNAME) {
    this.socket = socket;
    this.canCreateThumb = true;
}

PdfToImageConverter.prototype.deleteTempFolder = function() {

    try{
        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();

        var pdfFileDir = path.join(Project.DIRNAME, userId, projectId, 'pre', 'exported_view', 'temp');

        this.deleteFolder(pdfFileDir);
    }catch (ex){
        this.socket.errorMailer.send(ex);
    }
}

PdfToImageConverter.prototype.deleteFolder = function( path ) {

    try{
        fs.removeSync(path);

    }catch(ex){
        console.log('Delete folder error', path);

        this.socket.errorMailer.send(ex);
    }
}


PdfToImageConverter.prototype.convertPdfPageToImage = function(data, onResult, onFault) {

    var _that = this;

    try{

        var pdfPageId =  data.pdfPageId;
        var pageWidth = data.pageWidth;
        var pageHeight = data.pageHeight;

        console.log('Page Width: ' + pageWidth);

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();
        var pageId = '' + data.pageId;
        var fileName =  data.fileName;

        var exportedView =  path.join(Project.DIRNAME, userId, projectId, 'pre', 'exported_view');

        var pdfFileDir = path.join(exportedView, 'temp/pdf');
        var pdfFilePath = path.join(pdfFileDir, fileName);

        var imageFileDir = path.join(exportedView, pageId, 'imgpage');
        var imageThumbDir = path.join(exportedView, pageId);

        this.createOneImage(pdfFilePath, imageFileDir, imageThumbDir, pdfPageId, pageWidth, pageHeight, onResult, onFault);

    } catch (ex){
        onFault({ error:"Convert pdf page to image fault"});

        this.socket.errorMailer.send(ex);
    }
}



PdfToImageConverter.prototype.stopCreatePdfImageList = function(data, onResult, onFault) {
    this.canCreateThumb = false;

    onResult({});
}

PdfToImageConverter.prototype.createPdfImageList = function(data, onResult, onFault, onProgress, onCopmlete) {

    var _that = this;

    this.canCreateThumb = true;

    try{

        var userId = this.socket.ownerId.toString();
        var projectId = this.socket.myRoom.toString();
        var fileName =  data.fileName;
        this.onProgress =  onProgress;
        this.onCopmlete =  onCopmlete;
        this.allThumbPaths =  [];
        this.createThumbs = data.createThumbs == undefined ? true : data.createThumbs;

 
        var relativePdfFileDir = ConfigController.get('PROJECTS_LINK', false) 
                                    + userId 
                                    + '/' 
                                    + projectId 
                                    + '/pre/exported_view/temp/pdf/';

        var pdfFileDir = path.join(Project.DIRNAME, userId, projectId, 'pre', 'exported_view', 'temp/pdf');
        var imagesFileDir = path.join(pdfFileDir);

        var filePrefix = 'file_';

        var pdfFilePath = path.join(pdfFileDir, fileName);
        var imageFilePath = path.join(imagesFileDir, filePrefix);
        var relativeImageFilePath = relativePdfFileDir + filePrefix;

        var phpFilePath = path.join(__dirname, '..', 'php', 'get_num_pages_pdf.php');

        var files = fs.readdirSync(pdfFileDir);

        var thumbs = files.length - 1;


        exec('php -f '+ phpFilePath + ' "' + pdfFilePath + '"', function (error, stdout, stderr) {

            console.log('stdout', stdout);
            
            var numbOfPage = parseInt( stdout );

            onResult({ max:numbOfPage, thumbs:thumbs, fileName:fileName, projectPath:relativeImageFilePath, extension: '.jpg' });

            if(_that.createThumbs){
                _that.createOneImageThumb(pdfFilePath, imageFilePath, numbOfPage, thumbs);
            }

        });



    } catch (ex){
        onFault({ error:"Create Pdf image list fault"});

        this.socket.errorMailer.send(ex);
    }

}

PdfToImageConverter.prototype.createOneImageThumb = function(pdfFilePath, imageFilePath, numbOfPage, index) {

    var _that = this;

    if(!this.canCreateThumb){
        return;

        this.onCopmlete({ });
    }

    var filePath = imageFilePath + index + '.jpg';

    //['-verbose', '-density', '300', '-alpha', 'off', '-interlace', 'none', pdfFilePath+ '['+ index +']', '-resize', '1024', '-quality', '90', filePath]

    im.convert(['-verbose', '-density', '100', '-alpha', 'off', '-interlace', 'none', pdfFilePath+ '['+ index +']', '-resize', '150', '-quality', '60', filePath],
        function(err, stdout){
            if (!err){

                _that.allThumbPaths.push(index);
                _that.onProgress({ index:index, max:numbOfPage });

                if(index < numbOfPage - 1) {

                    _that.createOneImageThumb(pdfFilePath, imageFilePath, numbOfPage , index+1);

                }else{
                    _that.onCopmlete({ thumbs: _that.allThumbPaths, root:imageFilePath });
                }
            }
        });
}

PdfToImageConverter.prototype.createOneImage = function(pdfFilePath, imageFileDir, imageThumbDir, pdfPageId, pageWidth, pageHeight, onResult, onFault) {

    var _that = this;

    var index = pdfPageId;

    var fileName = 'image_' + index + '.jpg';
    var filePath = path.join( imageFileDir, fileName);

    im.convert(['-verbose', '-density', '300', '-alpha', 'off', '-interlace', 'none', pdfFilePath+ '['+ index +']', '-resize', pageWidth, '-quality', '90', filePath],
        function(err, stdout){
            if (!err){

                var thumbFileName = 'pagethumb.jpg';
                var thumbFilePath = path.join( imageThumbDir, thumbFileName);


                fs.copy(filePath, thumbFilePath, function(){

                    _that.getImageHeight(filePath, fileName, index, onResult, onFault);
                    // onResult({fileName:fileName, index:index+1});
                });

                _that.createPageThumb(imageThumbDir, thumbFilePath, pageWidth, pageHeight);


            }else{
                onFault({});
            }
        });
}


PdfToImageConverter.prototype.createPageThumb = function(imageThumbDir, thumbFilePath, pageWidth, pageHeight) {
    var _that = this;

    this.DIRNAME = Project.DIRNAME;


    var indexFile = path.join(__dirname, '..', 'page_thumbs', 'index.html');
    console.log('createPageThumb pageWidth', pageWidth);
    console.log('createPageThumb pageHeight', pageHeight);
    console.log('createPageThumb indexFile', indexFile);

    fs.readFile(indexFile, 'utf8', function(err, content) {
        if (err) {
            console.log(err);
        } else {
            try {

                //var pagetThumb = _that.mergeContent(content, '<!--CUT-->', data.html);


                var pagetThumb = content;

                    // merge width and height
                    var widthAndHeight = 'width:'+ pageWidth + 'px;height:' + pageHeight + 'px';
                    pagetThumb = _that.mergeContent(pagetThumb, '--=WIDTH_AND_HEIGHT=--', widthAndHeight);

                    // merge background image and color
                    pagetThumb = _that.mergeContent(pagetThumb, '--=BACKGROUND_IMAGE=--', thumbFilePath);
                    pagetThumb = _that.mergeContent(pagetThumb, '--=BACKGROUND_COLOR=--', '');

                    // get thumb pat
                    var htmlPath = path.join(imageThumbDir, 'pagethumb.html');

                    //pagetThumb = pagetThumb.replace(/-webkit-linear-gradient/g, 'linear-gradient');
                    //pagetThumb = pagetThumb.replace(/linear-gradient/g, '-webkit-linear-gradient');

                    fs.writeFile(htmlPath, pagetThumb, function(err) {
                        console.log(err);
                    });

            } catch(ex) {
                console.log(ex);

                _that.socket.errorMailer.send(ex);
            }
        }

    });

};

PdfToImageConverter.prototype.mergeContent = function(wholeContent, delimeter, contentToInsert) {
    var _that = this;

    var splittedContent = wholeContent.split(delimeter);

    var mergedContent = splittedContent[0];
    mergedContent += contentToInsert;
    mergedContent += splittedContent[1];

    return mergedContent;
};

PdfToImageConverter.prototype.getImageHeight = function( filePath, fileName, index, onResult, onFault ) {

    try {
        im.identify(['-format', '%[fx:h]', filePath],
        function(err, stdout){
            if (!err){

                onResult({fileName:fileName, index:index+1, height:parseInt(stdout)});
            }
        });
    } catch(ex) {
        console.log('ex');
        console.log(ex);

        this.socket.errorMailer.send(ex);
    }
};  