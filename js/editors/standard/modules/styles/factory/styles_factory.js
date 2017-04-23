function StylesFactory(){

}

StylesFactory.createAllStyles  = function( ){

    this.allStyles = {};

    StylesFactory.createImageStyles();
    StylesFactory.createSimpletextStyles();
    StylesFactory.createQuestionsStyles();
    // StylesFactory.createShapeStyles();
    StylesFactory.createDndStyles();
    // StylesFactory.createFormSubmitStyles();
    // StylesFactory.createQuizResultsStyles();
    // StylesFactory.createGradientStyles();

    StylesFactory.createInputTextStyles();

}

StylesFactory.getImageStyles  = function( ){

    return this.allStyles['image'];
}

StylesFactory.getSimpletextStyles  = function( ){

    return this.allStyles['text'];
}

StylesFactory.getQuestionsStyles  = function( ){

    return this.allStyles['questions'];
}

StylesFactory.getShapeStyles  = function( ){

    return this.allStyles['shape'];
}

StylesFactory.getDndStyles  = function( ){

    return this.allStyles['dnd'];
}

StylesFactory.getInputTextStyles  = function( ){

    return this.allStyles['inputtext'];
}

StylesFactory.getFormSubmitStyles  = function( ){

    return this.allStyles['form-submit'];
}

StylesFactory.getQuizResultsStyles  = function( ){

    return this.allStyles['quiz-result'];
}

StylesFactory.getGradientStyles  = function( ){

    return this.allStyles['gradient'];
}


// StylesFactory.createGradientStyles = function( ){

//     var type = 'gradient';
//     var prefix = 'gradient-template';
//     var defaultStyle = 'gradient-template';

//     var styles = ['style-0', 'style-1', 'style-2','style-3', 'style-4', 'style-5', 'style-6', 'style-7', 'style-8', 'style-9', 
//     'style-10', 'style-11', 'style-12','style-13', 'style-14', 'style-15', 'style-16', 'style-17', 'style-18', 'style-19', 
//     'style-20', 'style-21', 'style-22','style-23', 'style-24', 'style-25', 'style-26', 'style-27', 'style-28', 'style-29', 
//     'style-30', 'style-31', 'style-32','style-33', 'style-34', 'style-35', 'style-36', 'style-37', 'style-38', 'style-39', 
//     'style-40', 'style-41', 'style-42','style-43', 'style-44', 'style-45', 'style-46', 'style-47', 'style-48', 'style-49', 
//     'style-50', 'style-51', 'style-52','style-53', 'style-54', 'style-55', 'style-56', 'style-57', 'style-58', 'style-59', 
//     'style-60', 'style-61', 'style-62','style-63', 'style-64', 'style-65', 'style-66', 'style-67', 'style-68', 'style-69', 
//     'style-70', 'style-71', 'style-72','style-73', 'style-74', 'style-75', 'style-76', 'style-77', 'style-78', 'style-79', 
//     'style-80', 'style-81', 'style-82','style-83', 'style-84', 'style-85', 'style-86', 'style-87', 'style-88', 'style-89', 
//     'style-90', 'style-91', 'style-92','style-93', 'style-94', 'style-95', 'style-96', 'style-97', 'style-98', 'style-99', 
//     'style-100', 'style-101', 'style-102','style-103', 'style-104', 'style-105', 'style-106', 'style-107', 'style-108', 'style-109',
//     'style-110', 'style-111', 'style-112','style-113', 'style-114', 'style-115', 'style-116', 'style-117', 'style-118', 'style-119',
//     'style-120', 'style-121', 'style-122','style-123', 'style-124', 'style-125', 'style-126', 'style-127', 'style-128', 'style-129',
//     'style-130', 'style-131', 'style-132','style-133', 'style-134', 'style-135', 'style-136'
//     ]; 

//     StylesFactory.createStyleOld(type, styles, prefix, defaultStyle);
// }



StylesFactory.createImageStyles = function( ){

    var type = 'image';
    // var prefix = 'img-template';
    var defaultStyle = 'img-template';

    // var styles = ['default',
    //     'one',
    //     'two',
    //     'three',
    //     'four',
    //     'five',
    //     'six',
    //     'seven',
    //     'eight',
    //     'nine',
    //     'ten'];

    // StylesFactory.createStyle(type, styles, prefix, defaultStyle);

    this.allStyles[type] = StylesFactory.createStyle(stylesImage, defaultStyle, type);
}

StylesFactory.createStyle = function(styles, defaultStyle, type) {

    var container = $('<div>', {
        class: 'style-container'
    });

    _.each(styles, function(style, index) {

        var div = $('<div>', {
            class: defaultStyle + ' style-template',
            st: index,
            type: type
        });

        div.css(style['component-inner']);

        container.append(div);

    });

    return container;
}


StylesFactory.createStyleText = function(styles, defaultStyle, type) {

    var container = $('<div>', {
        class: 'style-container'
    });

    _.each(styles, function(style, index) {

        var div = $('<div>', {
            class: defaultStyle + ' style-template',
            st: index,
            type: type
        });

        div.css(style['component-styles']);

        var htmlText = 'A B C';

        div.html(htmlText);

        container.append(div);

    });

    return container;
}

StylesFactory.createStyleDnd = function(styles, defaultStyle, type) {

    var container = $('<div>', {
        class: 'style-container'
    });

    _.each(styles, function(style, index) {

        var div = $('<div>', {
            class: defaultStyle + ' style-template',
            st: index,
            type: type
        });

        div.css(style['component-inner']);

        var htmlText = 'A B C';

        div.html(htmlText);

        container.append(div);

    });

    return container;
}

StylesFactory.createStyleInputText = function(styles, defaultStyle, type) {

    var container = $('<div>', {
        class: 'style-container'
    });

    _.each(styles, function(style, index) {

        var div = $('<div>', {
            class: defaultStyle + ' style-template',
            st: index,
            type: type
        });

        div.css(style['quizinputtext-input']);

        var htmlText = 'A B C';

        div.html(htmlText);

        container.append(div);

    });

    return container;
}

StylesFactory.createStyleGradient = function(styles, defaultStyle, type) {

    var container = $('<div>', {
        class: 'style-container'
    });

    _.each(styles, function(style, index) {

        var div = $('<div>', {
            class: defaultStyle + ' style-template',
            st: index,
            type: type
        });

        div.css(style['component-gradient']);

        container.append(div);

    });

    return container;
}

StylesFactory.createQuestionStyle = function(styles, defaultStyle, type) {

    // var container = $('<div>', {
    //     class: 'style-container'
    // });

    // _.each(styles, function(style, index) {

    //     var div = $('<div>', {
    //         class: defaultStyle + ' style-template',
    //         st: index,
    //         type: type
    //     });

    //     div.css(style['component-styles']);

    //     var htmlText = 'A B C';

    //     div.html(htmlText);

    //     container.append(div);

    // });

    // return container;



    var container = $('<div>', {
        class: 'style-container'
    });

    //for (var i = 0; i < templateStylesArray.length; i++) {
    _.each(styles, function(style, index) {
        // var templateStyle =  prefix + '-' + templateStylesArray[i];

        var div = $('<div>', {
            class: defaultStyle + ' style-template',
            style: "position:relative",
            st: index,
            type: type
        });

        var quizBody = $('<div>', {
            class: 'quiz-body',
            style: 'width:100%;height:100%;'
        });
        quizBody.css(style['quiz-body']);
        div.append(quizBody);

        var quizSubmitButton = $('<div>', {
            class: 'quiz-submit-button',
            style: 'position:absolute;right:10px;bottom:10px;width:60px;height:15px;text-align:center;',
            text: 'ok'
        });
        quizSubmitButton.css(style['quiz-submit-button']);
        quizBody.append(quizSubmitButton);

        var answer1 = $('<div>', {
            class: 'quiz-answer-template',
            style: 'top:15px',
            text: 'lorem...'
        });
        quizBody.append(answer1);

        var answer2 = $('<div>', {
            class: 'quiz-answer-template',
            style: 'top:35px;',
            text: 'ipsum...'
        });
        quizBody.append(answer2);

        //div.attr('templatestyle', templateStyle);

        container.append(div);
    });

    //this.allStyles[type] = container;

    return container;
}

StylesFactory.createSimpletextStyles = function( ){

    var type = 'text';
    // var prefix = 'simpletext-sfs';
    var defaultStyle = 'simpletext-sfs';

    // var styles = ['glowred',
    //     'heading',
    //     'adobe',
    //     'heading2',
    //     'shadow1',
    //     'shadow2',
    //     'shadow3',
    //     'vintage_retro',
    //     'neon',
    //     'inset',
    //     'anaglyphic',
    //     'fire',
    //     'board_game',
    //     '3D',
    //     'letterpress',
    //     'backshadow',
    //     'inset_typo',
    //     'apple_style',
    //     'photoshop_emboss',
    //     'drop_cap',
    //     'subtle_glow_white',
    //     'blur',
    //     '3D_lying',
    //     'cloudy',
    //     'embossed',
    //     'another_3D',
    //     'relief',
    //     'two_toned_shadow',
    //     'stereoscopic'
    //     ];

    // var htmlText = 'A B C';

    // StylesFactory.createStyleOld(type, styles, prefix, defaultStyle, htmlText);
    // StylesFactory.createGradientStyles();


    this.allStyles[type] = StylesFactory.createStyleText(stylesText, defaultStyle, type);
    this.allStyles['gradient'] = StylesFactory.createStyleGradient(stylesGradient, defaultStyle, 'gradient');
}

StylesFactory.createQuestionsStyles = function( ){

    var type = 'questions';
    // var prefix = 'qmulti-template';
    var defaultStyle = 'qmulti-template';

    // var styles = ['default',
    //     'first',
    //     'second',
    //     'third',
    //     'fourth',
    //     'fifth',
    //     'sixth',
    //     'seventh',
    //     'eighth',
    //     'ninth',
    //     'tenth',
    //     'eleventh',
    //     'twelfth',
    //     'thirteenth',
    //     'fourteenth',
    //     'fifteenth',
    //     'sixteenth',
    //     'seventeenth',
    //     'eighteenth',
    //     'nineteenth',
    //     'twentieth',
    //     'twenty_first',
    //     'twenty_second',
    //     'twenty_third',
    //     'twenty_fourth',
    //     'twenty_fifth',
    //     'twenty_sixth',
    //     'twenty_seventh',
    //     'twenty_eighth',
    //     'twenty_ninth',
    //     'thirtieth',
    //     'junkers'];

    //StylesFactory.createQuestionStyleBlocks(type, styles, prefix, defaultStyle);

    // StylesFactory.createQuestionStyle(stylesText, defaultStyle, type);

    this.allStyles[type] = StylesFactory.createQuestionStyle(stylesQuestion, defaultStyle, type);
}

StylesFactory.createShapeStyles = function( ){

    var type = 'shape';
    var prefix = 'shape-template';
    var defaultStyle = 'shape-template';

    var styles = ['image',
        'first',
        'second',
        'third',
        'fourth',
        'fifth',
        'sixth',
        'seventh',
        'eighth',
        'ninth',
        'tenth',
        'eleventh',
        'twelfth',
        'threeteenth',
        'fourteenth',
        'fifteenth',
        'sixteenth',
        'seventeenth',
        'eightennth',
        'nineteenth',
        'pastel1',
        'pastel2',
        'pastel3',
        'pastel4',
        'pastel5',
        'pastel6',
        'pastel7',
        'pastel8',
        'pastel9',
        'pastel10',
        'plastic1',
        'plastic2',
        'plastic3',
        'plastic4'];

    StylesFactory.createStyle(type, styles, prefix, defaultStyle);
}


StylesFactory.createQuizResultsStyles = function( ){

    var type = 'quiz-results';
    var prefix = 'quiz-template';
    var defaultStyle = 'quiz-template';

    var styles = ['defaut','first'];

    StylesFactory.createStyle(type, styles, prefix, defaultStyle);
}

StylesFactory.createDndStyles = function( ){

    var type = 'dnd';
    // var prefix = 'dnd-template';
    var defaultStyle = 'button-template';

    // var styles = ['default',
    //     'first',
    //     'second',
    //     'euroforum',
    //     'euroforum2',
    //     'euroforum3'];


    this.allStyles[type] = StylesFactory.createStyleDnd(stylesDnd, defaultStyle, type);

    // StylesFactory.createStyleOld(type, styles, prefix, defaultStyle);
}

StylesFactory.createInputTextStyles = function( ){

    var type = 'inputtext';
    // var prefix = 'dnd-template';
    var defaultStyle = 'button-template';

    // var styles = ['default',
    //     'first',
    //     'second',
    //     'euroforum',
    //     'euroforum2',
    //     'euroforum3'];


    this.allStyles[type] = StylesFactory.createStyleInputText(stylesInputText, defaultStyle, type);

    // StylesFactory.createStyleOld(type, styles, prefix, defaultStyle);
}

StylesFactory.createFormSubmitStyles = function( ){

    var type = 'form-submit';
    var prefix = 'form-submit';
    var defaultStyle = 'form-submit';

    var styles = ['default',
        'first',
        'second',
        'euroforum',
        'euroforum2',
        'euroforum3'];

    StylesFactory.createStyle(type, styles, prefix, defaultStyle);
}


StylesFactory.createQuestionStyleBlocks = function( type, templateStylesArray, prefix, defaultStyle  ) {
    var container = $('<div>', {
        class: 'style-container'
    });

    for (var i = 0; i < templateStylesArray.length; i++) {
        var templateStyle =  prefix + '-' + templateStylesArray[i];

        var div = $('<div>', {
            class: templateStyle + ' ' + defaultStyle + ' style-template',
            style: "position:relative"
        });

        var quizBody = $('<div>', {
            class: 'quiz-body',
            style: 'width:100%;height:100%;'
        });
        div.append(quizBody);

        var quizSubmitButton = $('<div>', {
            class: 'quiz-submit-button',
            style: 'position:absolute;right:10px;bottom:10px;width:60px;height:15px;text-align:center;',
            text: 'ok'
        });
        quizBody.append(quizSubmitButton);

        var answer1 = $('<div>', {
            class: 'quiz-answer-template',
            style: 'top:15px',
            text: 'lorem...'
        });
        quizBody.append(answer1);

        var answer2 = $('<div>', {
            class: 'quiz-answer-template',
            style: 'top:35px;',
            text: 'ipsum...'
        });
        quizBody.append(answer2);

        div.attr('templatestyle', templateStyle);

        container.append(div);
    };

    this.allStyles[type] = container;
}


StylesFactory.createStyleOld = function( type, templateStylesArray, prefix, defaultStyle, htmlText  ){

    var container = $('<div>', {
        class: 'style-container'
    });

    for (var i = 0; i < templateStylesArray.length; i++) {
        var templateStyle =  prefix + '-' + templateStylesArray[i];

        var div = $('<div>', {
            class: templateStyle + ' ' + defaultStyle + ' style-template'
        });

        var htmlText = htmlText == undefined ? '' : htmlText;
        div.html(htmlText);

        div.attr('templatestyle', templateStyle);

        container.append(div);
    };

    this.allStyles[type] = container;

}

