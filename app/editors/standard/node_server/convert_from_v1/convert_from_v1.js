module.exports = ConvertFromV1;

var path = require('path');
var fs = require('fs.extra');
var Project = require('../project/project.js');
var Utils = require('../utils/Utils.js');
//var PDFImage = require("pdf-image").PDFImage;
var nodeDir = require('node-dir');
// var jsdom = require('jsdom');
// var jQuery = require('jquery');
var cheerio = require('cheerio');



function ConvertFromV1(socket) {
    this.socket = socket;
    this.DIRNAME = path.join(__dirname, '../','../', 'projects');

    console.log('-- sprawdzenie projektu --');
}

ConvertFromV1.prototype.checkProjectVersion = function(projectID, ownerID) {

    console.log('sprawdzam project ID: ' + projectID);
    // var env = require('jsdom').env;

    // var html = '<html><body><h1>Hello World!</h1><p class="hello">Heya Big World!</body></html>';


    // $ = cheerio.load('<h2 class="title">Hello world</h2>');
 
    // $('h2.title').text('Hello there!');
    // $('h2').addClass('welcome');
     
    // console.log($.html());


    this.ownerID = ownerID.toString();
    this.projectID = projectID.toString();

    this.projectPath = path.join(this.DIRNAME, this.ownerID, this.projectID);
    this.fileMapPath = path.join(this.projectPath, 'sitemap', 'map.json');

    console.log('path: ' + this.fileMapPath);

    var abc = path.join(this.projectPath, 'sitemap');

    this.fileMapJson = Utils.jsonParse(fs.readFileSync(this.fileMapPath, 'utf8'));

    if (typeof this.fileMapJson.scorm_score_required !== 'undefined') {

        console.log('przerabiam projekt');

        this.convertMapFile();
        this.createOptionsFile();

        this.convertPageFiles();

    }

};

ConvertFromV1.prototype.convertMapFile = function() {

    this.newMapJson = {
        pages: []
    }

    for (var page in this.fileMapJson.pages) {

        this.newMapJson.pages.push(this.fileMapJson.pages[page].pageid);

    }

    var newF = path.join(this.projectPath, 'sitemap', 'map.json');
    fs.writeFileSync(newF, Utils.jsonStringify(this.newMapJson));

    console.log('newMapJson', this.newMapJson);

};

ConvertFromV1.prototype.createOptionsFile = function() {
    
    var optionsJson = {};

    for (var opt in this.fileMapJson) {

        if (opt !== 'pages') {

            optionsJson[opt] = this.fileMapJson[opt];

        }

    }

    var fileOptionsPath = path.join(this.projectPath, 'sitemap', 'options.json');

    fs.writeFileSync(fileOptionsPath, Utils.jsonStringify(optionsJson));

};

ConvertFromV1.prototype.convertPageFiles = function() {

    var pageFilePath;
    
    for (var pageID in this.newMapJson.pages) {

        console.log('page id: ' + this.newMapJson.pages[pageID]);

        pageFilePath = path.join(this.projectPath, 'sitemap', this.newMapJson.pages[pageID] + '.json');

        this.pageJson = Utils.jsonParse(fs.readFileSync(pageFilePath, 'utf8'));

        this.newPageJson = {
            'lines': this.convertLines(),
            'options': this.convertOptions()
        }

        this.convertComponents();

        //page2FilePath = path.join(this.projectPath, 'sitemap', this.newMapJson.pages[pageID] + '-2.json');

        fs.writeFileSync(pageFilePath, Utils.jsonStringify(this.newPageJson));

    }

};

ConvertFromV1.prototype.convertOptions = function() {
    
    var newOptions = this.pageJson.options;

    return newOptions;
};

ConvertFromV1.prototype.convertLines = function() {

    var newLines = [];

    for (var line in this.pageJson.lines) {

        if (line !== 'inc') {

            var newLine = {
                'objects': [],
                'options': {
                    id : parseInt(this.pageJson.lines[line].opts.id.replace('line-', '')),
                    hidden: false,
                    locked: false,
                    delay: 0
                },
                'type': 'line',
                'action': ''
            };

            for (var obj in this.pageJson.lines[line]['objs']) {

                newLine.objects.push({ actionkey: this.pageJson.lines[line]['objs'][obj] });

            }

            newLines.push(newLine);

        }

    }

    return newLines;
};

ConvertFromV1.prototype.convertComponents = function() {
    
    for (var component in this.pageJson.points) {

        this.addComponentToNewLine(this.pageJson.points[component]);

    }

    for (var component in this.pageJson.questions) {

        this.addComponentToNewLine(this.pageJson.questions[component]);

    }

    for (var component in this.pageJson.swf) {

        this.addComponentToNewLine(this.pageJson.swf[component]);

    }

};

ConvertFromV1.prototype.addComponentToNewLine = function(component) {
    
    var actionkey = typeof component.actionkey !== 'undefined' ? component.actionkey : component.qID;

    for (var line in this.newPageJson.lines) {

        for (var obj in this.newPageJson.lines[line]['objects']) {


            if (this.newPageJson.lines[line]['objects'][obj].actionkey === actionkey) {

                var objInNewLine = this.newPageJson.lines[line]['objects'][obj];

                objInNewLine.type                   = this.convertComponentType(component.action);
                objInNewLine.action                 = 99;
                objInNewLine.x                      = component.x;
                objInNewLine.y                      = component.y;
                objInNewLine.width                  = component.width;
                objInNewLine.height                 = component.height;
                objInNewLine.opacity                = component.opacity;
                objInNewLine.hidden                 = component.hidden;




                objInNewLine.animations             = {

                    animIn: {
                        animationName               : component['animation-in'],
                        animationPrettyName         : component['animation-in'],
                        animationTime               : component['animationin-exec-time']
                    },

                    animOut: {
                        animationName               : component['animation-out'],
                        animationPrettyName         : component['animation-out'],
                        animationTime               : component['animationout-exec-time']
                    },

                    animOver: {
                        animationName               : component['animation-over'],
                        animationPrettyName         : component['animation-over'],
                        animationTime               : component['animationover-exec-time']
                    },

                    animEndless: {
                        animationName               : component['animation-actionend'],
                        animationPrettyName         : component['animation-actionend'],
                        animationTime               : component['animationconstant-exec-time']
                    }

                };

                objInNewLine.border                 = {

                    top                             : 0,
                    left                            : 0,
                    right                           : 0,
                    bottom                          : 0,
                    style                           : 'solid',
                    color                           : '#000'

                };

                objInNewLine.borderRadius           = {

                    topLeft                         : 0,
                    topRight                        : 0,
                    bottomLeft                      : 0,
                    bottomRight                     : 0

                };

                objInNewLine.shadow                 = {

                    x                               : 0,
                    y                               : 0,
                    size                            : 0,
                    blur                            : 0,
                    color                           : '#FFF'

                };

                objInNewLine['premade-style']       = [];



                /* przypisane stale */

                objInNewLine.draggable              = true;
                objInNewLine.aspectRatio            = false;
                objInNewLine.aspectRatioProportions = 1;
                objInNewLine['selected-by']         = -1;
                objInNewLine.volume                 = 100;
                objInNewLine['require-credit']      = false;
                objInNewLine['credit-points']       = 0;
                objInNewLine['point-sound']         = '';
                objInNewLine.lifetime               = 0;
                objInNewLine.locked                 = false;


                /* indywidualne */

                if (typeof component.link !== 'undefined') {
                    objInNewLine.link = component.link;
                }

                if (typeof component['point-sound'] !== 'undefined') {
                    objInNewLine['point-sound'] = component['point-sound'];
                }

                if (typeof component.title !== 'undefined') {
                    objInNewLine.title = component.title;
                }

                if (typeof component.message !== 'undefined') {
                    objInNewLine.text = component.message;
                }

                if (typeof component.image !== 'undefined') {
                    objInNewLine.imageFileName = component.image;
                }

                if (typeof component.qFeedbackGood !== 'undefined') {
                    objInNewLine.feedbackGood = component.qFeedbackGood;
                }

                if (typeof component.qFeedbackBad !== 'undefined') {
                    objInNewLine.feedbackBad = component.qFeedbackBad;
                }

                if (typeof component.sound !== 'undefined' && component.action == 17) {
                    objInNewLine.fileToDownload = component.sound;
                }

                if (typeof component.sound !== 'undefined' && (component.action == 2 || component.action == 3)) {
                    objInNewLine.sound = component.sound;
                }

                if (component.action == 1) {
                    objInNewLine.openInIframe = false;
                }

                if (component.action == 11) {
                    objInNewLine.openInIframe = true;
                }

                if (component.action == 4) {
                    // sprawdzenie plikow gallerii na dysku

                    objInNewLine.galleryFiles = [];

                    var pageID = this.newPageJson.options.pageid.toString();
                    var galleryPath = path.join(this.projectPath, 'pre', 'exported_view', pageID, 'gallery', component.actionkey);

                    if (fs.existsSync(galleryPath)) {

                        var galleryFiles = fs.readdirSync(galleryPath);

                        for (var fileIndex in galleryFiles) {
                            objInNewLine.galleryFiles.push(galleryFiles[fileIndex]);
                        }
                    }
                }

                this.convertBorderAndShadow(objInNewLine, component);
                this.convertDataFromHTML(objInNewLine, component);
            }
        }

    }

};

ConvertFromV1.prototype.convertBorderAndShadow = function(objInNewLine, component) {

    $ = cheerio.load(typeof component.html !== 'undefined' ? component.html : component.qHTML);

    var mainDiv = $('.div-point, .div-point-resizable, .div-point-image, .div-point-video, .quiz');

    var border = mainDiv.css('border');

    if (border !== undefined) {

        /* tutaj brakuje jakiegos regexa do ciecia bordera */

    }

    var borderColor = mainDiv.css('border-color');

    if (borderColor !== undefined) {
        objInNewLine.border.color = borderColor;
    }

    var borderStyle = mainDiv.css('border-style');

    if (borderStyle !== undefined) {
        objInNewLine.border.style = borderStyle;
    }

    var borderWidth = mainDiv.css('border-width');

    if (borderWidth !== undefined) {

        _borderWidth = borderWidth.split(' ');

        if (_borderWidth.length === 4) {
            objInNewLine.border.top = parseInt(_borderWidth[0]);
            objInNewLine.border.left = parseInt(_borderWidth[3]);
            objInNewLine.border.right = parseInt(_borderWidth[1]);
            objInNewLine.border.bottom = parseInt(_borderWidth[2]);
        }

        if (_borderWidth.length === 3) {
            objInNewLine.border.top = parseInt(_borderWidth[0]);
            objInNewLine.border.left = parseInt(_borderWidth[1]);
            objInNewLine.border.right = parseInt(_borderWidth[1]);
            objInNewLine.border.bottom = parseInt(_borderWidth[2]);
        }

        if (_borderWidth.length === 2) {
            objInNewLine.border.top = parseInt(_borderWidth[0]);
            objInNewLine.border.left = parseInt(_borderWidth[1]);
            objInNewLine.border.right = parseInt(_borderWidth[1]);
            objInNewLine.border.bottom = parseInt(_borderWidth[0]);
        }

    }

    /* brakuje bordera */

    var borderRadius = mainDiv.css('border-radius');

    if (borderRadius !== undefined) {

        _borderRadius = borderRadius.split(' ');

        if (_borderRadius.length === 1) {

            objInNewLine.borderRadius.topLeft = parseInt(borderRadius);
            objInNewLine.borderRadius.topRight = parseInt(borderRadius);
            objInNewLine.borderRadius.bottomLeft = parseInt(borderRadius);
            objInNewLine.borderRadius.bottomRight = parseInt(borderRadius);

        } else if (_borderRadius.length === 4) {

            objInNewLine.borderRadius.topLeft = parseInt(_borderRadius[0]);
            objInNewLine.borderRadius.topRight = parseInt(_borderRadius[1]);
            objInNewLine.borderRadius.bottomLeft = parseInt(_borderRadius[3]);
            objInNewLine.borderRadius.bottomRight = parseInt(_borderRadius[2]);

        }

    }

    var shadow = mainDiv.css('box-shadow');

    if (shadow !== undefined) {

        var shadow_values = shadow.match(/(-?\d+px)|(rgb\(.+\))/g);

        console.log('shadow');

        objInNewLine.shadow.x = parseInt(shadow_values[1]);
        objInNewLine.shadow.y = parseInt(shadow_values[2]);
        objInNewLine.shadow.size = parseInt(shadow_values[3]);
        objInNewLine.shadow.blur = parseInt(shadow_values[4]);
        objInNewLine.shadow.color = shadow_values[0];
    }

};

ConvertFromV1.prototype.convertDataFromHTML = function(objInNewLine, component) {
    
    switch (parseInt(component.action)) {

        case 16:
            /* mozna dodac do modelu atrybut library i wtedy w gotowych stylach
            bedzie mozna przegladac inne image z bilbioteki, nie wiem tylko
            co sie stanie jesli zmieni sie struktura folderow w bibliotece */
            break;

        case 18:
            $ = cheerio.load(component.html);

            var videoType = parseInt($('.div-point-video').attr('video-type'));

            switch (videoType) {

                case 1:
                    objInNewLine.videoFileName = component.videofile;
                    objInNewLine.videoType = 1;
                    break;

                case 2:
                    objInNewLine.videoLink = component.videofile;
                    objInNewLine.videoType = 2;
                    break;

                case 3:
                    objInNewLine.videoLink = component.videofile;
                    objInNewLine.videoType = 3;
                    break;

            }

            var videoAutoplay = parseInt($('.div-point-video').attr('video-autoplay'));
            objInNewLine.videoAutoplay = videoAutoplay === 0 ? false : true;

            var videoControls = parseInt($('.div-point-video').attr('video-controls'));
            objInNewLine.videoControls = videoControls === 0 ? false : true;

            var videoLoop = parseInt($('.div-point-video').attr('video-loop'));
            objInNewLine.videoLoop = videoLoop === 0 ? false : true;

            break;

        case 22:
            $ = cheerio.load(component.qHTML);

            var fsign = $('.quiz-multiple-wrapper').attr('fsign');
            objInNewLine.feedbackSign = fsign === 'true' ? true : false;

            var feedbacks = $('.quiz-multiple-wrapper').attr('feedbacks');
            objInNewLine.feedbackShow = feedbacks === 'true' ? true : false;

            var ssub = $('.quiz-multiple-wrapper').attr('ssub');
            if (ssub !== undefined) {
                objInNewLine.buttonShow = ssub === 'true' ? true : false;
            } else {
                objInNewLine.buttonShow = true;
            }

            objInNewLine.answers = {};

            var i = 0;
            for (var answer in component.qAnswers) {

                objInNewLine.answers['#' + i] = {
                    choosen: false,
                    goodAnswer: component.qAnswers[answer].isCorrect === 'true' ? true : false,
                    text: component.qAnswers[answer].label,
                    top: parseInt($('.quiz-multiple-wrapper').find('#multiple-answer-' + i).css('top')),
                    left: $('.quiz-multiple-wrapper').find('#multiple-answer-' + i).css('left') !== undefined ? (parseInt($('.quiz-multiple-wrapper').find('#multiple-answer-' + i).css('left')) + 32) : 47
                };

                i++;
            }

            objInNewLine.width = parseInt($('.quiz-multiple-wrapper').css('width'));
            objInNewLine.height = parseInt($('.quiz-multiple-wrapper').css('height'));

            objInNewLine.submitButton = {
                top: $('.question-submit-btn').css('top') !== undefined ? parseInt($('.question-submit-btn').css('top')) : 157,
                left:$('.question-submit-btn').css('left') !== undefined ? parseInt($('.question-submit-btn').css('left')) : 185,
                text: $('.question-submit-btn').text()
            }

            objInNewLine.multiselect = component.qtype === 'checkbox' ? true : false;

            if ($('.answers-wrapper').css('color') !== undefined) {
                objInNewLine.textColor = $('.answers-wrapper').css('color');
            }
            if ($('.answers-wrapper').css('background') !== undefined) {
                objInNewLine.backgroundColor = $('.answers-wrapper').css('background');
            }
            if ($('.question-submit-btn').css('color') !== undefined) {
                objInNewLine.buttonTextColor = $('.question-submit-btn').css('color');
            }
            if ($('.question-submit-btn').css('background') !== undefined) {
                objInNewLine.buttonBackgroundColor = $('.question-submit-btn').css('background');
            }

            objInNewLine['premade-style'] = this.convertPremadeStylesQuiz($('.answers-wrapper').attr('class'));
            break;

        case 25:
            var dndObj = Utils.jsonParse(component.qAnswers);

            objInNewLine.opts = dndObj.opts;
            objInNewLine.opts.feedbacks = true;

            objInNewLine.objs = dndObj.objs;

            objInNewLine.answers = dndObj.answers;

            objInNewLine['premade-style'] = 'dnd-template-default';
            break;

        case 99:
            $ = cheerio.load(component.html);

            var textContent = $('.simpletext-wrapper').find('.simpletext-txt').html();

            objInNewLine.contents = textContent;
            break;

    }

};

ConvertFromV1.prototype.convertPremadeStylesQuiz = function(classAttr) {

    if (classAttr !== undefined) {

        var _classAttr = classAttr.split(' ');

        for (var cl in _classAttr) {

            if (_classAttr[cl] !== '' &&
                _classAttr[cl] !== 'answers-wrapper' &&
                _classAttr[cl] !== 'qanswrap') {

                return _classAttr[cl].replace('-answers', '');
            }
        }
    }

    return '';
};

ConvertFromV1.prototype.convertComponentType = function(oldType) {
    
    var newType = 'unnamed';

    switch (parseInt(oldType)) {

        case 1:
        case 11:
            newType = 'infopoint-link';
            break;

        case 2:
            newType = 'infopoint-sound';
            break;

        case 3:
            newType = 'infopoint-soundrecord';
            break;

        case 4:
            newType = 'infopoint-gallery';
            break;

        case 5:
            newType = '';
            break;

        case 6:
            newType = 'infopoint-popup';
            break;

        case 10:
        case 16:
            newType = 'image';
            break;

        case 17:
            newType = 'infopoint-download';
            break;

        case 18:
            newType = 'video';
            break;

        case 22:
            newType = 'quiz';
            break;

        case 25:
            newType = 'quiz-dnd';
            break;

        case 99:
            newType = 'text';
            break;

    }

    return newType;
};


ConvertFromV1.prototype.cropImage = function( data, onResult, onFault ) {

    var userID = this.socket.ownerId.toString();
    var projectID = this.socket.myRoom.toString();

    var filePath = path.join(Project.DIRNAME, userID, projectID, 'pre', 'exported_view', data.link);

    var cropCoords = data.cropCoords;
    var cropCoordsString = cropCoords.w + 'x' + cropCoords.h + '+' + cropCoords.x + '+' + cropCoords.y;

    im.convert([filePath, '-crop', cropCoordsString, filePath],
        function(err, stdout){
            if (!err){

                onResult({ cropCoordsString: cropCoordsString });
            }
        });

};





