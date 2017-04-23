var ComponentModel = Backbone.Model.extend({

	defaults:function(){
        return {
            actionkey: null,
    		type:"",
    		x: 10,
    		y: 10,
            compl: 0,
    		action: 99,
        	width : 0,
        	height : 0,
            draggable : true,
            aspectRatio : false,
            aspectRatioProportions : 0,
    		'require-credit' : false,
    		'credit-points' : 0,
            'selected-by': -1,
            triggers: [],
            'point-sound' : '',
            'volume': 100,
            autoplaySound: true,
            // 'premade-style' : [ ],
            // border: {
            //     top: 0,
            //     left: 0,
            //     right: 0,
            //     bottom: 0,
            //     style: 'solid',
            //     color: '#000'
            // },
            // borderRadius: {
            //     topLeft: 0,
            //     topRight: 0,
            //     bottomLeft: 0,
            //     bottomRight: 0
            // },
            // shadow: {
            //     x: 0,
            //     y: 0,
            //     size: 0,
            //     blur: 0,
            //     color: '#fff'
            // },
            title : '',
            wcag : false,
            wcagMessage : '',
            lifetime: 0,
            showtime: 0,
            hidden: false,
            locked: false,
            flipX: 'xnormal',
            flipY: 'ynormal'
            // animations: {
            //     animIn: {
            //         animationName: 'none',
            //         animationPrettyName: 'none',
            //         animationTime: 1.3
            //     },
            //     animOut: {
            //         animationName: 'none',
            //         animationPrettyName: 'none',
            //         animationTime: 1.3
            //     },
            //     animOver: {
            //         animationName: 'none',
            //         animationPrettyName: 'none',
            //         animationTime: 1.3
            //     },
            //     animEndless: {
            //         animationName: 'none',
            //         animationPrettyName: 'none',
            //         animationTime: 1.3
            //     }
            // }
        }
	},

    active: false,
    startX: 0,
    startY: 0,
    

    initialize: function(){

        this.checkStyles();


        // create animation objects
        var animationExsists = this.get('animations');
        if (!animationExsists) {
            var blankAnimationsObject = this.createAnimationsObject();
            this.set('animations', blankAnimationsObject, {silent:true});
        }

        // // create border objects
        // var borderExsists = this.get('border');
        // if (!borderExsists) {
        //     var blankBorderObject = this.createBorderObject();
        //     this.set('border', blankBorderObject, {silent:true});
        // }

        // // create radius objects
        // var borderRadiusExsists = this.get('borderRadius');
        // if (!borderRadiusExsists) {
        //     var blankBorderRadiusObject = this.createBorderRadiusObject();
        //     this.set('borderRadius', blankBorderRadiusObject, {silent:true});
        // }

        // // create shadow objects
        // var shadowExsists = this.get('shadow');
        // if (!shadowExsists) {
        //     var blankShadowObject = this.createShadowObject();
        //     this.set('shadow', blankShadowObject, {silent:true});
        // }

        // create premade styles
        var premadeStylesExsists = this.get('premade-style');
        if (!premadeStylesExsists) {
            var blankPremadeStyleObject =  [ ];
            this.set('premade-style', blankPremadeStyleObject, {silent:true});
        }

        var parallaxExsists = this.get('parallax');
        if (!parallaxExsists) {
            var blankParallaxObject =  this.createParallaxObject();
            this.set('parallax', blankParallaxObject, {silent:true});
        }

        this.afterInitialize();
    },

    setActionkey: function(actionkey){
        this.set('actionkey', actionkey, { silent:true });

        this.onActionkeySet();
    },

    onActionkeySet: function(actionkey){
        // To override
    },

    pasteStyle: function(style, silent){

        if(style == undefined) { return; }

        silent = silent == undefined ? false : silent;

        var type = this.get('type');

        var componentStyle = style[type];

        if(componentStyle != undefined){

            this.set( { styles: JSON.parse(componentStyle) }, {silent:silent});
            this.forceRender();
        }
    },

    pastePosition: function(position, silent){

        silent =  silent == undefined ? false : silent;

        var x = position.x;
        var y = position.y;

        this.set( {x:x, y:y }, {silent:silent});
        this.forceRender();
    },

    pasteDimension: function(dimensions, silent){

        silent = silent == undefined ? false : silent;

        var width = dimensions.width;
        var height = dimensions.height;

        this.set( {width:width, height:height }, {silent:silent});
        this.forceRender();
    },

    pasteTrigger: function(triggers, silent){

        silent = silent == undefined ? false : silent;

        this.set('triggers', JSON.parse(JSON.stringify(triggers)), {silent:silent});
    },

    toPasteTrigger: function(triggerActions, silent){

        silent = silent == undefined ? false : silent;

        var triggers = this.get('triggers');


        for (var i = 0; i < triggerActions.length; i++) {

            var triggerAction = JSON.parse(JSON.stringify(triggerActions[i]));

            _log('toPasteTrigger', triggerAction);

            triggers.push(triggerAction);
        };

        this.set('triggers', triggers, { silent:silent });

        
    },

    checkStyles: function() {
        var stylesExsists = this.get('styles');
        if (!stylesExsists) {
            var blankStylesObject = this.createStylesObject();
            this.set('styles', blankStylesObject, {silent:true});
        }
    },

    createStylesObject: function() {
        return {};
    },

    createShadowObject: function() {
        // var shadow = {
        //     x: 0,
        //     y: 0,
        //     size: 0,
        //     blur: 0,
        //     color: '#fff'
        // };

        // return shadow;
    },

    createBorderRadiusObject: function() {
        // var borderRadius = {
        //     topLeft: 0,
        //     topRight: 0,
        //     bottomLeft: 0,
        //     bottomRight: 0
        // };

        // return borderRadius;
    },

    createBorderObject: function() {
        // var border = {
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     style: 'solid',
        //     color: '#000'
        // };

        // return border;
    },

    createParallaxObject: function() {
        var parallax = {
            cursor:{
                sens:0,
                dir:false,
                on:false
            },
            scroll:{
                sens:0,
                on:false
            }
        }
        return parallax;
    },

    createAnimationsObject: function() {
        var animations = {
            animIn: {
                animationName: 'none',
                animationPrettyName: _lang('ANIMATION_NONE'),
                animationTime: 1.3
            },
            animOut: {
                animationName: 'none',
                animationPrettyName: _lang('ANIMATION_NONE'),
                animationTime: 1.3
            },
            animOver: {
                animationName: 'none',
                animationPrettyName: _lang('ANIMATION_NONE'),
                animationTime: 1.3
            },
            animEndless: {
                animationName: 'none',
                animationPrettyName: _lang('ANIMATION_NONE'),
                animationTime: 1.3
            }
        }
        return animations;
	},

    active: false,

    afterInitialize: function(){

        // to override

    },

    onComponentDrag: function(data){
        this.trigger('on-component-drag', data);
    },

    onComponentResize: function(data){
        this.trigger('on-component-resize', data);
    },

    onComponentRotate: function(data){
        this.trigger('on-component-rotate', data);
    },

    setActive :function( active, multiSelectedModels, params ){


        if(this.active != active) {
            this.trigger('set-active', active, multiSelectedModels, params);
        }

        this.active = active;
    },

//    createActionkey :function(){
//        return new Date().getTime();
//    },


    setProportions: function() {
        this.set(
            'aspectRatioProportions', 
            (parseInt(this.get('height'))*100) / parseInt(this.get('width'))
            , { silent:true });
    },


    selectedByMiniature : function(value){
        this.trigger('selected-by-miniature', value);
    },

    selectedByPickerMiniature : function(value){
        this.trigger('selected-by-picker-miniature-1', value);
        this.trigger('selected-by-picker-miniature-2', value);
    },



    selectedByTrigger : function(value){
        this.trigger('selected-by-trigger', value);
    },

    setZIndex : function(zIndex){
        this.trigger('set-zindex', zIndex);
    },

    setSelectedBy :function( options ){

        this.trigger('set-selected-coming', options);
    },

    updateComing :function( options ){
        this.trigger('update-coming', options);
    },

    deleteComing :function( ){
        this.trigger('delete-coming');
    },
    
    forceRender :function( ){
        this.trigger('force-render');
    },

    getTriggerWhenDoIt :function(){

        var triggerWhenDoIt = new TriggerActionsCollection();

        var triggerActionModel = new TriggerActionsCollection();
        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_EVENT_TIMELINE'), options: [
            { name: _lang('TRIGGER_EVENT_ON_SHOW'), value: 'onShow' },
            { name: _lang('TRIGGER_EVENT_ON_HIDE'), value: 'onHide' }
        ] });

        triggerWhenDoIt.add( triggerActionModel );

        var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_EVENT_SOUND'), options: [
            { name: _lang('TRIGGER_EVENT_ON_SOUND_ENDED'), value: 'onSoundEnded' },
        ] });

        triggerWhenDoIt.add( triggerActionModel );

        var isDndElement = this.isDndElement();

        _log('isDndElement', isDndElement);

        if(isDndElement){

            var triggerActionModel = new TriggerActionsCollection();
            var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_EVENT_ON_DRAG'), options: [
                { name:_lang('TRIGGER_EVENT_ON_START_DRAG'), value:'onStartDrag' },
                { name:_lang('TRIGGER_EVENT_ON_STOP_DRAG'), value:'onStopDrag' }
            ] });

            triggerWhenDoIt.add( triggerActionModel );

            var triggerActionModel = new TriggerActionsCollection();
            var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_EVENT_ON_DROP'), options: [
                { name:_lang('TRIGGER_EVENT_ON_DROP_GOOD'), value:'onDropGoodAnswer' },
                { name:_lang('TRIGGER_EVENT_ON_DROP_WRONG'), value:'onDropWrongAnswer' },
            ] });

            triggerWhenDoIt.add( triggerActionModel );

        }

        var isDndElementDropable = this.isDndElementDropable();

        if(isDndElementDropable){
            var triggerActionModel = new TriggerActionsCollection();
            var triggerActionModel = new TriggerActionModel({ group: _lang('TRIGGER_EVENT_ON_DROP'), options: [
                { name:_lang('TRIGGER_EVENT_ON_DROP_TO_OBJECT'), value:'onDropToObject' },
            ] });

            triggerWhenDoIt.add( triggerActionModel );
        }

        

        return triggerWhenDoIt.toJSON();

    },

    getTriggerWhatToDo :function(){

        return [];
    },

    getStyles :function(){

        return [];

    },
    setFileName: function(data) {
        // to override
    },

    setSoundFileName: function(data) {
        this.set('point-sound', data.fileName);
    },

    setAudioFileName: function(data) {
        this.set('sound', data.fileName);
    },

    setStyle: function(allStyles, templateStyles){

        var styleClass = 'unnamed';

        var componentStyles = this.get('styles');
        if (Array.isArray(componentStyles)) {
            componentStyles = { };
        }

        _.each(allStyles[templateStyles], function(st, className) {

            styleClass = className;

            var sty = JSON.stringify(allStyles[templateStyles][styleClass]);

            componentStyles[styleClass] = JSON.parse(sty);
        });


        this.set('styles', componentStyles);
        this.trigger('change:styles');
        this.trigger('change');

        // change:style wykonuje sie tylko przy pierwszej zmianie stylu

    },

    refreshTimelineEditor: function() {
        this.trigger('refresh-timeline-editor-numbers');
    },

    disable: function(){
        this.trigger('disable-component');
    },

    refreshEditor: function() {
        this.trigger('refresh-bottom-editor');
    },

    getExtensionPageSoundArray : function(){
        // sound, folder: audio
        return [];
    },

    getExtensionPageImageArray: function(){
        return [];
    },

    getExtensionFilesArray : function(){
        // sound, folder: files
        return [];
    },

    getExtensioAudioArray : function(){  // Punkt z dzwiekiem
        // sound, folder: audio
        return [];
    },

    getExtensionImagesArray : function(){
        return [];
    },

    getExtensionSoundsArray : function(){ // Wszystkie komponenty
        // point-sound, folder: sounds
        return ['mp3'];
    },

    getExtensionVideosArray : function(){
        return [];
    },

    getExtensionSwfArray : function(){
        return [];
    },

    getExtensionGalleryArray : function(){
        return [];
    },

    getAcceptTypeFormat: function() {
        // to overide
        return '.mp3';
    },

    triggerChanged: function() {
         this.trigger('trigger-changed', this);
    },

    isDndElement: function() {

        var _that = this;

        var exist = false;

        var dndsComponents = StageView.instance.model.getDndsComponents();

        dndsComponents.each(function(model){
            _log('dnd el', model.toJSON());

            var draggableObjs = model.get('draggableObjs');
            var answers = model.get('answers');

            for (var i = 0; i < draggableObjs.length; i++) {
                var actionkey = draggableObjs[i];

                if(actionkey == _that.get('actionkey')){
                    exist = true;
                    break;
                }
            };

            for (var item in answers) {
                var pa = answers[item].pa;

                if(pa){
                    for (var j = 0; j < pa.length; j++) {
                        var actionkey = pa[j];

                        if(actionkey == _that.get('actionkey')){
                            exist = true;
                            break;
                        }
                    };
                }
            };
        });

        return exist;
    },

    isDndElementDropable: function() {

        var _that = this;

        var exist = false;

        var dndsComponents = StageView.instance.model.getDndsComponents();

        dndsComponents.each(function(model){
            _log('dnd el', model.toJSON());

            var answers = model.get('answers');

            for (var item in answers) {
               if(item == _that.get('actionkey')){
                    exist = true;
                    break;
                }
            };
        });

        return exist;
    },

    isExercise: function(){

        var type = this.get('type');

        switch(type){
            case 'crossword' :
            case 'quiz' :
            case 'quiz-connectlines' :
            case 'quiz-dnd' :
            case 'quiz-inputtext' :
            case 'quiz-select' :
            case 'quiz-wordsearch' :

                return true;

                break;
        }

        return false;

    },

    flipX: function(){

        var flipX = this.get('flipX');
        var flipY = this.get('flipY');

        if(flipX == 'xnormal'){

            this.set('flipX', 'xflip');
        }else{
            this.set('flipX', 'xnormal');
        }
    },

    flipY: function(){

        var flipX = this.get('flipX');
        var flipY = this.get('flipY');

        if(flipY == 'ynormal'){
            this.set('flipY', 'yflip');
        }else{
            this.set('flipY', 'ynormal');
        }
    },


});






