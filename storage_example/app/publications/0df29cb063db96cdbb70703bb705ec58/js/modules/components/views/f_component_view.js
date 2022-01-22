var ComponentView = Backbone.View.extend({

    tagName: 'div',
    className : 'component main-component',

    events: {
        'click ': 'setActive',
        'mouseenter' : 'onMouseOver',
        'mouseleave': 'onMouseOut',
        'keyup': 'onKeyUp',
        'focus': 'focusingElement'
    },

    template: _.template($('#component-template').html()),

    activeAnimation: '',

    animationOverEnabled: false,
    endlessAnimationTime: 0,
    hiddenByTrigger: false,

		
	initialize: function( data ) {

        this.model.view = this;

        // var _that = this;

        // this.addListeners();

        this.afterInitialize();

        // this.model.view = this;

        this.applyTriggers(false, true);

        this.saveStartingAttempts();
        this.initUserSelectionObject();

        // this.prepareComponent();

  	},

    focusingElement: function() {
        if (this.model.get('wcag')) {
            StageView.instance.lastActiveWcagIndex = this.$el.attr('tabindex');
        }
    },
 
    onKeyUp: function(e) {
        switch(e.keyCode) {
            case 32:
                this.$el.trigger('click');
                break;
        }
    },

    prepareComponent: function(data) {
        var _that = this;

        this.addListeners();

        // this.afterInitialize();

        this.model.view = this;
        this.delegateEvents();

        this.hiddenByTrigger = false;


        this.applyTriggers(true, false);
    },

    saveStartingAttempts: function() {
        this.startingAttempts = this.model.get('attempts');
    },

    resetAttempts: function() {

        this.model.set('attempts', this.startingAttempts);
    },

    resetCompl: function() {

        this.model.set('compl', 0);
    },

    initUserSelectionObject: function() {
        var userSelection = this.model.get('userSelection');

        if (_.isUndefined(userSelection)) {
            
            this.model.set('userSelection', { });
        }
    },

    setActive: function() {
        this.$el.attr('active', 'true');
    },

    allObjectsAreInitialized: function() {
        var componentStatus = parseInt(this.model.get('compl'));

        if ( _.isNumber(componentStatus) ) {
            switch (componentStatus) {
                case 1:
                    this.markAsCompleted();
                    break;
                case 2:
                    this.markAsFailed();
                    break;
                default:
                    this.renderAsReadyToUse();
                    break;
            }
        }

        this.afterAllInitialized();
    },

    afterAllInitialized: function() {
        // to override
    },

    applyParallax: function() {
        var _that = this;

        var stage = StageView.instance.stageWrapper;

        var parallax_obj = this.model.get('parallax');

        var screenOb = this.$el;

        if ( _.isObject(parallax_obj) ) {

            if (parallax_obj.cursor.on === true || parallax_obj.scroll.on === true) {

                this.parallax = {
                    width: screenOb.width(),
                    height: screenOb.height(),
                    top: parseInt(screenOb.css('top')) - stage.scrollTop(),
                    left: parseInt(screenOb.css('left')),
                    last_y: 0,
                    last_x: 0
                };

                $('#stage').bind('scroll mousemove', function(e){
                    var cont = $(this);

                    var parallax = _that.parallax;
                    var parallax_obj = _that.model.get('parallax');
                    
                    var cursor_new_left = null;
                    var cursor_new_top = null;
                    
                    if (parallax_obj.scroll.on === true) {
                        if (parseInt(parallax_obj.scroll.sens) == 0) {
                            parallax_obj.scroll.sens = 10;
                        }
                        
                        var scroll_sens = parseInt(parallax_obj.scroll.sens) * 0.1;
                        
                        cursor_new_top = (parallax.top + (cont.scrollTop() * scroll_sens));
                    } else {
                        cursor_new_top = parallax.top;
                    }

                    if (parallax_obj.cursor.on === true) {
                        var cursor_sens = (101 - parseInt(parallax_obj.cursor.sens));


                        var x = ((e.pageX - parallax.left - (screenOb.width() / 2) ) / (cursor_sens));
                        var y = ((e.pageY - cursor_new_top - (screenOb.height() / 2) ) / (cursor_sens));

                        // x -= stage.offset().left;
                        // y -= stage.offset().top - stage.scrollTop();
                        
                        if (isNaN(x) || isNaN(y)) {
                            y = parallax.last_y;
                            x = parallax.last_x;
                        }
                        if (parallax_obj.cursor.dir === false) {
                            cursor_new_left = parallax.left - x;
                            cursor_new_top = cursor_new_top - y;
                        } else {
                            cursor_new_left = parallax.left + x;
                            cursor_new_top = cursor_new_top + y;
                        }
                        
                        parallax.last_y = y;
                        parallax.last_x = x;
                        
                    }

                    // wyswietlanie 
                    if (parallax_obj.cursor.on === true) {
                        if (cursor_new_left !== null) {
                            screenOb.css({
                                left: cursor_new_left + "px"
                            });
                        }

                    }
                    screenOb.css({
                        top: cursor_new_top + "px"
                    });
                });

            }
        }
    },

    applyTriggers: function(aplayEl, applyCustom){

        // aplayEl = (aplayEl == undefined) ? true : aplayEl; 
        // applyCustom = (applyCustom == undefined) ? true : applyCustom; 

        var _that = this;

        var triggers = this.model.get('triggers') || [];


        if (triggers.length) {
            this.$el.css({
                cursor: 'pointer'
            })
        }

        var i = 0;

        var applyTrigger = function() {
            if (i == triggers.length) {
                return;
            }

            var trigger = triggers[i];


            var whendoit = trigger.whendoit;
            var opts = trigger.opts;
            var conditions = trigger.conditions;
            var elseactions = trigger.elseactions;
            var subtriggers = trigger.subtriggers;

            var exist = _that.checkElOnFunction(whendoit);




            if(exist){

                if (aplayEl) {
                    _that.$el.on(_that.mapWhenDoIt(whendoit), function(val){
                        var condition = _that.checkCondition(conditions);

                        if(condition){
                             _that.runTriggerAction( subtriggers, val, opts, whendoit );
                        }else{
                            _that.runTriggerAction( elseactions, val, opts, whendoit );
                        }
                    });   
                }

            }else{

                if (applyCustom) {
                    _that.on(whendoit, function(val){

                        val = val || { };

                        var condition = _that.checkCondition( conditions );

                        if(condition){
                            _that.runTriggerAction( subtriggers, val, opts, whendoit );
                        }else{
                            _that.runTriggerAction( elseactions, val, opts, whendoit );
                        }
                    });
                }

            }
            i++;
            applyTrigger();

        };

        applyTrigger();
    },

    

    mapWhenDoIt: function( whendoit ){

        switch(whendoit){
            case 'mouseenter':
               return 'mouseenter';
            break;

             case 'mouseleave':
               return 'mouseleave';
            break;

            default:
                 return whendoit;
            break;
        }
    },

    runTriggerAction: function( triggerAction, val, whenopts, whendoit ){



        for (var j = 0; j < triggerAction.length; j++) {
            var action = triggerAction[j];

            var whattodo = action.whattodo;
            var objs = action.objs;
            var opts = action.opts;
            var delay = parseFloat(action.opts.delay);

            if (_.isNumber(delay) && delay > 0) {
                (function(whattodo, _this, objs, opts, val) {
                    setTimeout(function() {

                        TriggerController.instance.execute(whattodo, _this, objs, opts, val, whenopts, whendoit);

                    }, delay*1000);
                })(whattodo, this, objs, opts, val, whenopts, whendoit);
            } else {

                TriggerController.instance.execute(whattodo, this, objs, opts, val, whenopts, whendoit);
            }
        }
    },

    checkElOnFunction: function(funName){

        var arr = ['click', 'mouseenter', 'mouseleave'];
        var exist = arr.indexOf(funName);

        return exist == -1 ? false : true;
    },

    checkCondition: function(conditions){
        return TriggerController.instance.checkConditions(this, conditions);
    },

    afterInitialize: function() {
      // TO OVERRIDE
      return false;
    },

    addListeners :function() {

    },

    getAssets: function() {
        var componentAssets = [ ];

        // var soundFile = this.getComponentSoundFile();
        // if (soundFile){
        //     componentAssets.push(soundFile);
        // }

        componentAssets = componentAssets.concat(this.getPrivateAssets());

        return componentAssets;
    },

    getPrivateAssets: function() {
        // to override
        return [];
    },

    userHasMoreAttempts: function() {
        var userAttempts = parseInt(this.model.get('attempts'));
        if (_.isNumber(userAttempts) && userAttempts <= 0) {
            return false;
        }
        return true;
    },

    decrementAttempts: function() {
        var userAttempts = parseInt(this.model.get('attempts'));
        if (_.isNumber(userAttempts) && userAttempts > 0) {
            userAttempts -= 1;
            this.model.set('attempts', userAttempts);
        }
    },

    showFeedbackWindow: function(title, content, success) {

        StageView.instance.showFeedbackWindow(title, content, success);
    },


    validateQuestion: function(sender) {


        if(this.model.get('compl') == 1) return true;
        if(this.model.get('compl') == 2) return false;

        if(this.model.get('compl') != 0) return;



        this.decrementAttempts();

        var success = this.checkAnswers();


        if (this.model.get('feedbackShow')) {
            var content = success ? this.model.get('feedbackGood') : this.model.get('feedbackBad');
            var title = success ? 'Dobra odpowiedź!' : 'Zła odpowiedź...';
            this.showFeedbackWindow(title, content, success);
        }

        // good Answer!
        if (success) {
            this.markAsCompleted();

        // bad answer...
        } else {
            // user has no more attempts, mark as failed!

            var isTimerSender = (sender && sender.model && sender.model.get('type')) == 'timer' ? true : false;



            if(isTimerSender){

                this.markAsFailed();

            }else{

                var attempts = this.userHasMoreAttempts();

                if (!attempts) {
                    this.markAsFailed();
                    // user has more attempts
                } else {

                    this.trigger('custom_questionbadanswer');

                    this.animateQuestionBadAnswer();

                    this.showAtempts();
                }
            }
        }

        var passedQuizComponents = ProjectModel.instance.getPassedQiuzComponents();
        var failedQuizComponents = ProjectModel.instance.getFailedQiuzComponents();

        ProjectModel.instance.changeProjectStaticVariable('_passed_qiuz_count', passedQuizComponents.length);
        ProjectModel.instance.changeProjectStaticVariable('_failed_qiuz_count', failedQuizComponents.length);

        var pageModel = StageView.instance.model;
        ProjectModel.instance.changeProjectStaticVariable('_passed_qiuz_on_stage_count', pageModel.getPassedQiuzComponents().length);
        ProjectModel.instance.changeProjectStaticVariable('_failed_qiuz_on_stage_count', pageModel.getFailedQiuzComponents().length);

        return success;
    },

    showAtempts: function() {

        var attempts = this.model.get('attempts');

        if(attempts){
            _Notify(_lang('QUIZ_ATTEMPTS') + attempts);
        }
        
    },

    animateQuestionBadAnswer: function() {

        var _that = this;

        if(this.model.get('markQuestions') != true){
            return;
        }

        var oldDuration = this.$el.css('-webkit-animation-duration');
        var newDuration = '0.5s';

        this.$el.css('-webkit-animation-duration', newDuration);
        this.$el.addClass('quiz-custom-question-bad-answer');

        clearTimeout(this.shackeTimeout);

        this.shackeTimeout = setTimeout(function(){
            _that.$el.removeClass('quiz-custom-question-bad-answer');
            _that.$el.css('-webkit-animation-duration', oldDuration);
        }, 500);

        
    },

  	render: function() {

        var _that = this;
        this.$el.html("");

        var componentTemplate = this.template(this.model.toJSON());
        this.$el.html(componentTemplate);
        this.$el.attr({
            actionkey: this.model.get('actionkey')
        });


        // this.setPositionToComponent();
        this.renderComponentDimentions();

        // this.applyPremadeStyle();
        // this.renderBorder();
        // this.renderRadius();
        // this.renderShadow();
        this.renderStyle();
        this.renderCss();
        this.renderRotate();
        this.renderFlip();
        this.applyWcag();

        this.$el.on('remove', function() {
            _that.onRemove();
        });

        return this;
  	},

    applyWcag: function() {
        var wcag = this.model.get('wcag');
        if (wcag) {
            var wcagText = this.model.get('wcagMessage');
            this.$el.attr('aria-label', wcagText);
            this.$el.attr('tabindex', --StageView.instance.wcagTabIndex);
        }
    },

    renderRotate: function() {
        var angle = this.model.get('rotate') || 0;
        this.$el.find('.component-inner').css('transform','rotate(' + angle + 'rad)');
        this.$el.find('.component-inner').css('-moz-transform','rotate(' + angle + 'rad)');
        this.$el.find('.component-inner').css('-webkit-transform','rotate(' + angle + 'rad)');
        this.$el.find('.component-inner').css('-o-transform','rotate(' + angle + 'rad)');
    },

    renderCss: function() {
        // To override
    },

    renderStyle: function( className ) {
        
        var _that = this;
        var styles = this.model.get('styles');

        _.each(styles, function(style, className) {

            _that.$el.find('.' + className).css(styles[className]);

        });
    },

    renderBorder :function(){
        var borderData = this.model.get('border');
        this.$el.find('.component-inner').css({
            'border-top-width': borderData.top + 'px',
            'border-bottom-width': borderData.bottom + 'px',
            'border-left-width': borderData.left + 'px',
            'border-right-width': borderData.right + 'px',
            'border-color': borderData.color,
            'border-style': borderData.style
        });
    },
    renderRadius :function(){
        var radiusData = this.model.get('borderRadius');
        this.$el.find('.component-inner').css({
            'border-top-right-radius': radiusData.topRight + 'px',
            'border-top-left-radius': radiusData.topLeft + 'px',
            'border-bottom-right-radius': radiusData.bottomRight + 'px',
            'border-bottom-left-radius': radiusData.bottomLeft + 'px'
        });
    },
    renderShadow :function(){
        var shadowData = this.model.get('shadow');

        this.$el.find('.component-inner')
            .css('box-shadow', shadowData.color + ' ' + shadowData.x + 'px ' + shadowData.y + 'px ' + shadowData.blur + 'px ' + shadowData.size + 'px')
            .css('-moz-box-shadow', shadowData.color + ' ' + shadowData.x + 'px ' + shadowData.y + 'px ' + shadowData.blur + 'px ' + shadowData.size + 'px')
            .css('-webkit-box-shadow', shadowData.color + ' ' + shadowData.x + 'px ' + shadowData.y + 'px ' + shadowData.blur + 'px ' + shadowData.size + 'px');

    },


    onRemove: function() {
        // to override
    },

    afterRender: function() {
        // to overide
    },

    applyPremadeStyle: function( ){
        var premadeStyles = this.model.get('premade-style').toString().replace(',', ' ');
        this.$el.find('.component-inner').attr('class', this.model.get('type') + '-component-inner ' +  'component-inner ' + premadeStyles);
        // this.$el.find('.component-inner').attr('class', this.model.get('type') + '-component-inner ' +  'component-inner ' + this.model.get('premade-style'));
    },


    // applyPremadeStyle: function() {
    //     var premadeStyle = this.model.get('premade-style');
    //     this.$el.find('.component-inner').addClass(premadeStyle);
    // },

    showComponentWithTrigger: function(customAnimationData) {
        var _that = this;

        if (this.alternativeShow()) { return; }

        this.resetToOriginalPosition();
        this.renderComponentDimentions();

        this.hiddenByTrigger = false;

        this.$el.removeClass(this.activeAnimation);

        var animationIn, animationTime;


        animationIn = customAnimationData.animationType.animationName;
        animationTime = customAnimationData.animationType.animationTime;

        // if animation is set to nothing - set animation time to 0
        // default value for animation time in component model is 1.3s
        // we need to check if its valid
        if (animationIn == "none") { animationTime = 0 }

        if (animationTime > 0) {
            // change animation time property
            this.$el.css("animation-duration", animationTime + "s");
            this.$el.css("-webkit-animation-duration", animationTime + "s");   
        }

        this.activeAnimation = animationIn;

        var componentShowtime = parseFloat(this.model.get('showtime'));
        if (isNaN(componentShowtime)) {
            componentShowtime = 0;
        }

        clearTimeout(this.showTimeTO);
        this.showTimeTO = setTimeout(function() {
            // add animationIn class and show element!
            _that.$el.addClass(animationIn);
            _that.$el.show();
            _that.onShow();
        }, componentShowtime*1000);

        clearTimeout(this.animationTO);
        this.animationTO = setTimeout(function() {
            _that.$el.removeClass(animationIn);

            _that.addEndlessAnimation();
            _that.addOverAnimation();
            _that.afterShow();
            _that.applyParallax();
            setTimeout(function() {
                _that.trigger('onShow');
            }, 5);

        }, animationTime*1000);



        // hide component after lifetime if its is set
        var componentLifetime = parseFloat(this.model.get('lifetime'));

        if (componentLifetime > 0) {
            clearTimeout(this.triggerHideTimeout);
            this.triggerHideTimeout = setTimeout(function() {
                _that.hideComponent();
            }, (componentLifetime+componentShowtime/*-animationOutTime*/)*1000);
        }

        if (this.model.get('autoplaySound')) {
            this.playComponentAudio();
        }
    },

    resetToOriginalPosition: function() {
        this.$el.css({
            width: this.model.get('width') + "px",
            height: this.model.get('height') + "px",
            opacity: this.model.get('opacity'),
            left: this.model.get('x') + "px",
            top: this.model.get('y') + "px",
            transform: ''
        });
    },

    alternativeShow: function() {
        // to override
        return false;
    },

    onShow: function() {
        // to override
    },

    hideComponent: function() {
        var _that = this;

        this.removeOverAnimation();
        this.removeEndlessAnimation();

        this.$el.removeClass(this.activeAnimation);
        
        this.$el.addClass('animated');

        var animationOut, animationTime;


        // get animation name and time
        animationOut = this.model.get('animations').animOut.animationName;
        animationTime = parseFloat(this.model.get('animations').animOut.animationTime);

        if (animationOut !== "none") {
            // change animation time property
            this.$el.css("animation-duration", animationTime + "s");
            this.$el.css("-webkit-animation-duration", animationTime + "s");

            this.$el.addClass(animationOut);

            this.activeAnimation = animationOut;

            clearTimeout(this.animationTO);
            this.animationTO = setTimeout(function() {
                _that.$el.css("display", "none");
                _that.$el.removeClass(animationOut);
                _that.trigger('onHide');
                _that.afterHide();
            }, animationTime*1000 );
        } else {
            this.$el.hide();
            this.trigger('onHide');
            _that.afterHide();
        }
    },

    hideComponentWithTrigger: function(customAnimationData) {
        var _that = this;


        this.removeOverAnimation();
        this.removeEndlessAnimation();

        this.$el.removeClass(this.activeAnimation);


        this.hiddenByTrigger = true;

        this.$el.addClass('animated');

        var animationOut, animationTime;

        // get animation name and time
        animationOut = customAnimationData.animationType.animationName;
        animationTime = parseFloat(customAnimationData.animationType.animationTime);


        if (animationOut !== "none") {
            // change animation time property
            this.$el.css("animation-duration", animationTime + "s");
            this.$el.css("-webkit-animation-duration", animationTime + "s");

            this.$el.addClass(animationOut);

            this.activeAnimation = animationOut;

            clearTimeout(this.animationTO);
            this.animationTO = setTimeout(function() {
                        _that.$el.css("display", "none");
                        _that.$el.removeClass(animationOut);
                        _that.trigger('onHide');
                        _that.afterHide();
                    }, animationTime*1000);
        } else {
            this.$el.hide();
            this.trigger('onHide');
            _that.afterHide();
        }


    },

    afterHide: function() {
        // to override
    },

    delayAndShowComponent: function() {
        var _that = this;

        if (this.model.get('hidden')) { return false; }

        var showtime = parseFloat(this.model.get('showtime'));

        if(showtime == 0){
            _that.showComponent();
        } else{
            setTimeout(function() {
                _that.showComponent();
            }, showtime*1000);
        }
    },

    showComponent: function() {

        var _that = this;

        if(this.hiddenByTrigger) return;

        this.$el.removeClass(this.activeAnimation);

        // add ANIMATED class
        this.$el.addClass('animated');


        var animationIn, animationOut, animationTime;

        // get animation name and time
        animationIn = this.model.get('animations').animIn.animationName;
        animationOut = this.model.get('animations').animOut.animationName;
        animationTime = parseFloat(this.model.get('animations').animIn.animationTime);
        animationOutTime = parseFloat(this.model.get('animations').animOut.animationTime);

        if(animationOut == 'none'){
            animationOutTime = 0;
        }
        if(animationIn == 'none'){
            animationTime = 0;
        }


        if (animationOut !== "none" && this.$el.hasClass(animationOut)) {
            screenOb.removeClass(animationOut);
            screenOb.css("display", "none");
        }

        // change animation time property
        this.$el.css("animation-duration", animationTime + "s");
        this.$el.css("-webkit-animation-duration", animationTime + "s");

        this.activeAnimation = animationIn;


        // add animationIn class and show element!
        this.$el.addClass(animationIn);
        this.$el.show();

        // remove animationIn class after show
        clearTimeout(this.animationTO);
        this.animationTO = setTimeout(function() {
            _that.$el.removeClass(animationIn);

            // add over and endless animations
            _that.addEndlessAnimation();
            _that.addOverAnimation();
            _that.afterShow();
            _that.applyParallax();
            setTimeout(function() {
                _that.trigger('onShow');
            }, 5);
        }, animationTime*1000);

        // hide component after lifetime if its is set
        var componentLifetime = parseFloat(this.model.get('lifetime'));
        var componentShowtime = parseFloat(this.model.get('showtime'));

        if (componentLifetime > 0) {
            setTimeout(function() {
                _that.hideComponent();
            }, (componentLifetime/*+componentShowtime-animationOutTime*/)*1000);
        }

        this.onShow();


        if (this.model.get('autoplaySound')) {
            this.playComponentAudio();
        }

    },

    afterShow: function() {
        // to override
        return false;
    },

    addOverAnimation: function() {
        // get animation name and time
        var animationOver = this.model.get('animations').animOver.animationName;
        var animationTime = parseFloat(this.model.get('animations').animOver.animationTime);

        if (animationOver !== "none") {
            if (!this.$el.hasClass(animationOver)) {
                this.$el.addClass(animationOver);
                this.animationOverEnabled = true;
            }
        }
    },

    removeOverAnimation: function() {
        var animationOver = this.model.get('animations').animOver.animationName;
        if (animationOver !== "none") {
            if (this.$el.hasClass(animationOver)) {
                this.$el.removeClass(animationOver);
                this.animationOverEnabled = false;
            }
        }
    },

    removeEndlessAnimation: function() {
        var animEndless = this.model.get('animations').animEndless.animationName;
        if (animEndless !== "none") {
            if (this.$el.hasClass(animEndless)) {
                this.$el.removeClass(animEndless);
            }
        }
    },

    onMouseOver: function() {
        if (!this.animationOverEnabled) return;

        var animationOverTime = parseFloat(this.model.get('animations').animOver.animationTime);
        if (this.endlessAnimationTime) {
            this.removeEndlessAnimation();
        }

        // change animation time property
        this.$el.css("animation-duration", animationOverTime + "s");
        this.$el.css("-webkit-animation-duration", animationOverTime + "s");
    },

    onMouseOut: function() {
        if (!this.animationOverEnabled) return;

        if (this.endlessAnimationTime) {
            this.addEndlessAnimation();
            // change animation time property
            this.$el.css("animation-duration", this.endlessAnimationTime + "s");
            this.$el.css("-webkit-animation-duration", this.endlessAnimationTime + "s");
        }
    },

    addEndlessAnimation: function() {

        // get animation name and time
        var animationEndless = this.model.get('animations').animEndless.animationName;
        var animationTime = parseFloat(this.model.get('animations').animEndless.animationTime);

        // add endless animation
        if (animationEndless !== "none") {
            if (!this.$el.hasClass(animationEndless)) {

                // change animation time property
                this.$el.css("animation-duration", animationTime + "s");
                this.$el.css("-webkit-animation-duration", animationTime + "s");

                this.endlessAnimationTime = animationTime;

                this.$el.addClass(animationEndless);
            }
        }
    },

    setPositionToComponent: function() {
        this.$el.css({
            position: 'absolute',
            top: this.model.get('y') + 'px',
            left: this.model.get('x') + 'px',
            width: this.model.get('width') + 'px',
            height: this.model.get('height') + 'px'
        });
    },

    getHeightRatio: function() {
        return StageView.instance.getHeightRatio();
    },
    getWidthRatio: function() {
        return StageView.instance.getWidthRatio();
    },

    getSmallerRatio: function() {
        return StageView.instance.getSmallerRatio();
    },

    renderComponentDimentions: function() {
        var autoScale = ProjectModel.instance.isAutoScale();

        if (autoScale) {
            if (StageView.instance && StageView.instance.model) {
                var fontRatio = this.getSmallerRatio();

                var widthRatio = this.getWidthRatio();
                var heightRatio = this.getHeightRatio();

                this.$el.css({
                    position: 'absolute',
                    top: this.model.get('y')*heightRatio + 'px',
                    left: this.model.get('x')*widthRatio + 'px',
                    width: this.model.get('width')*widthRatio + 'px',
                    height: this.model.get('height')*heightRatio + 'px'
                });

                var styles = this.model.get('styles');
                var componentInner = this.$el.find('.component-inner');

                if (styles && styles['component-inner']) {
                    var componentInnerStyles = styles['component-inner'];

                    componentInner.css({
                        'border-top-width': parseFloat(componentInnerStyles['border-top-width'])*fontRatio + 'px',
                        'border-right-width': parseFloat(componentInnerStyles['border-right-width'])*fontRatio + 'px',
                        'border-bottom-width': parseFloat(componentInnerStyles['border-bottom-width'])*fontRatio + 'px',
                        'border-left-width': parseFloat(componentInnerStyles['border-left-width'])*fontRatio + 'px',

                        'border-bottom-left-radius': parseFloat(componentInnerStyles['border-bottom-left-radius'])*fontRatio + 'px',
                        'border-top-left-radius': parseFloat(componentInnerStyles['border-top-left-radius'])*fontRatio + 'px',
                        'border-bottom-right-radius': parseFloat(componentInnerStyles['border-bottom-right-radius'])*fontRatio + 'px',
                        'border-top-right-radius': parseFloat(componentInnerStyles['border-top-right-radius'])*fontRatio + 'px',
                    });
                }

                this.specialRenderDimentions();
            }
        } else {
            this.setPositionToComponent();
        }
    },

    specialRenderDimentions: function() {
        // to override
    },

    markAsCompleted: function() {
        var complStatus = this.model.get('compl');
        if (complStatus != 1) {
            this.model.set('compl', 1);
            this.trigger('custom_questionpassed', {blockPoints: false});
        } else {
            this.trigger('custom_questionpassed', {blockPoints: true});
        }

        
        
        this.renderAsCompleted();
        this.$el.trigger('check-course-status');

        //this.disabledComponent();
    },

    markAsFailed: function() {
        var complStatus = this.model.get('compl');
        if (complStatus != 2) {
            this.model.set('compl', 2);
            this.trigger('custom_questionfailed', {blockPoints: false});
        } else {
            this.trigger('custom_questionfailed', {blockPoints: true});
        }


        this.renderAsFailed();
        this.$el.trigger('check-course-status');

        //this.disabledComponent();
    },

    disabledComponent: function() {
        // to override
    },

    renderAsCompleted: function() {
        // to override
    },

    renderAsFailed: function() {
        // to override
    },

    renderAsReadyToUse: function() {
        // to override
    },

  	getModel: function() {
    	return this.model;
  	},

    playComponentAudio: function() {
        var soundFile = this.getComponentSoundFile();

        if (soundFile) {
            this.$el.trigger('play-component-audio', [soundFile, this]);
        }
    },

    stopComponentAudio: function() {
        var soundFile = this.getComponentSoundFile();

        if (soundFile) {
            this.$el.trigger('stop-component-audio', [soundFile, this]);
        }
    },

    pauseComponentAudio: function() {
        var soundFile = this.getComponentSoundFile();

        if (soundFile) {
            this.$el.trigger('pause-component-audio', [soundFile, this]);
        }
    },

    makeTransition: function(options) {

        var _that = this;

        var opts = options == undefined ? {} : options;

        var delay = opts.delay == undefined ? 0 : parseInt(opts.delay);

        setTimeout(function() {

            // var classes = _that.removeClassAnimations();

            // setTimeout(function(){
            //     _that.executeTransition(opts, classes);
            // },50);

        _that.executeTransition(opts);

            
        }, delay*1000);

    },

    // removeClassAnimations: function() {

    //     var animations = this.model.get('animations');

    //     var types = ['animEndless', 'animIn', 'animOut', 'animOver'];
    //     //var types = ['animEndless'];
    //     var classes = [];

    //     for (var i = 0; i < types.length; i++) {
    //         var type = types[i];

    //         var animation = animations[type];

    //         if(animation){
    //             var animationName = animation['animationName'];

    //             if(animationName && animationName != "" && animationName != "none"){
                    
    //                 if(type == 'animEndless'){
    //                     classes.push(animationName);
    //                 }

    //                 this.$el.removeClass(animationName);
    //             }
    //         }
    //     };

    //     // if(classes.length > 0){
    //     //     classes.push('animated');
    //     // }

    //     _log('classes', classes);

    //     return classes;
    // },

    // addClassAnimations: function(classes) {

    //     for (var i = 0; i < classes.length; i++) {
    //         var c = classes[i];

    //         this.$el.addClass(c);
    //     }
    // },

    executeTransition: function(opts, classes) {

        var _that = this;

        var componentTransition = this.$el;//.find('.component-transition');

        var transition =  opts.transition == undefined ? {} : opts.transition;

        var x = transition.x == undefined ? this.model.get('x') : parseInt(transition.x);
        var y = transition.y == undefined ? this.model.get('y') : parseInt(transition.y);
        var width = transition.width == undefined ? this.model.get('width') : parseInt(transition.width);
        var height = transition.height == undefined ? this.model.get('height') : parseInt(transition.height);
        var rotate = (!$.isNumeric( transition.rotate )) ? 0 : parseInt(transition.rotate);
        var time = transition.time == undefined ? 0 : parseInt(transition.time);
        var ease = transition.ease == undefined ? '0.250, 0.250, 0.750, 0.750' : transition.ease;
        var axis = transition.axis == undefined ? 'center-center' : transition.axis;
        var scale = (!$.isNumeric( transition.scale )) ? 1 : transition.scale;
        var opacity = (!$.isNumeric( transition.opacity )) ? 1 : transition.opacity;

        ease = 'cubic-bezier('+ ease +')';



        var animation = 'opacity time ease, top time ease, left time ease, width time ease, height time ease, transform time ease';

        animation = animation.replace(/time/g, (time +'s'));
        animation = animation.replace(/ease/g, ease);


        componentTransition.css('-webkit-transition', animation);
        componentTransition.css('-moz-transition', animation);
        componentTransition.css('-o-transition', animation);
        componentTransition.css('transition', animation);

        //componentTransition.css("animation-duration", 2 + "s");
        //componentTransition.css("-webkit-animation-duration", 2 + "s");


        componentTransition.css('left', x + 'px');
        componentTransition.css('top', y + 'px');
        componentTransition.css('width', width + 'px');
        componentTransition.css('height', height + 'px');
        componentTransition.css('opacity', opacity);



        componentTransition.css('-webkit-transform', 'rotate('+ rotate +'deg) ' + 'scale('+ scale +')');
        componentTransition.css('-moz-transform', 'rotate('+ rotate +'deg) ' + 'scale('+ scale +')');
        componentTransition.css('-o-transform', 'rotate('+ rotate +'deg) ' + 'scale('+ scale +')');
        componentTransition.css('-ms-transform', 'rotate('+ rotate +'deg) ' + 'scale('+ scale +')');
        componentTransition.css('transform', 'rotate('+ rotate +'deg) ' + 'scale('+ scale +')');

        //componentTransition.css('transform-style:', 'preserve-3D');

        var axisX = axis.split('-')[0];
        var axisY = axis.split('-')[1];

        componentTransition.css('-webkit-transform-origin', axisY + ' ' + axisX);
        componentTransition.css('-ms-transform-origin', axisY + ' ' + axisX);

        clearTimeout(this.transitionTimeout);
        this.transitionTimeout = setTimeout(function(){

            componentTransition.css('-webkit-transition', '');
            componentTransition.css('-moz-transition', '');
            componentTransition.css('-o-transition', '');
            componentTransition.css('transition', '');

            //_that.addClassAnimations(classes);

        }, time * 1000);

    },

    getComponentSoundFile: function() {
        var actionkey = this.model.get('actionkey');

        // get component sound file
        var componentSound = this.model.get('point-sound') || [];

        if (componentSound.length) {
            var audioSrc = __meta__.directLocation + 'exported_view/'+ actionkey.split('-').pop() +'/sounds/'+ actionkey +'/'+ componentSound;
            return audioSrc;
        }
        return false;
    },

    addSoundListener: function(sound){

        var _that = this;

        if(!sound){
            return;
        }

        sound.off()

        sound.on('ended', function(e){

            _that.onSoundEnded();
            
            _that.trigger('onSoundEnded');
        }); 
    },

    onSoundEnded: function(){
        // To override
    },

    resetExerciseApproach: function(){

        this.resetPoints();
        this.resetAttempts();
        this.resetCompl();

        this.resetExerciseApproachSpecial();
        
        this.model.set('userSelection', undefined);


        this.initUserSelectionObject();

        this.renderAsReadyToUse();

    },

    resetPoints: function(){

        var model = this.model;

        var compl = model.get('compl');

        if(compl == 1){
            this.subScorePoints('custom_questionpassed', model);
        }

        if(compl == 2){
            this.subScorePoints('custom_questionfailed', model);  
        }
    },

    subScorePoints: function( whenDoItSearcher, model ){


        var subtriggers = this.findSubtriggers(whenDoItSearcher, model);
        if(subtriggers.length == 1){

            var firstSubtrigger = _.first(subtriggers);

            var varValue = parseInt(firstSubtrigger.objs.varValue);

            if(_.isNumber(varValue)){
                var scoreVariable = ProjectModel.instance.getScoreVariable();
                scoreVariable.pvarvalue -= varValue;

                ProjectModel.instance.get('options').trigger('change');
            }
        }
    },

    findSubtriggers: function( whenDoItSearcher, model ){

        var triggers = model.get('triggers');

        var finedSubtriggers = [];

        if(triggers == undefined){
            return finedSubtriggers;
        }

        for (var i = 0; i < triggers.length; i++) {
            var trigger = triggers[i];

            var subtriggers = trigger.subtriggers;

            var whenDoIt = trigger.whendoit;

            if(whenDoIt == whenDoItSearcher){
                for (var j = 0; j < subtriggers.length; j++) {
                    var subtrigger = subtriggers[j];

                    var whattodo = subtrigger.whattodo;
                    var objs = subtrigger.objs;

                    if(whattodo == 'changevarvalue' && objs.varName == '00000000000000000000000000000000' && objs.varAction == 'add'){

                        finedSubtriggers.push(subtrigger);
                    }
                }
            }
        }

        return finedSubtriggers;
    },

    renderFlip: function(){

        var flipX = this.model.get('flipX');
        var flipY = this.model.get('flipY');

        var componentFlips = this.$el.find('.component-flips');

        componentFlips.removeClass('xnormal-ynormal xflip-ynormal xnormal-yflip xflip-yflip');
        componentFlips.addClass(flipX+'-'+flipY);
    },

    changeStyle: function(opts){
        var style = opts.style || {};
        var background = style.background;
        

        var element;

        switch(this.model.get('type')){
            case 'quiz': 
            case 'quiz-selectone': 

                element = this.$el.find('.quiz-body');

                break;

            default:

                element = this.$el.find('.component-inner');

                break;
        }

        if(!_.isUndefined(background)){
            element.css('background', background);
        }

        var borderWeight = style.borderWeight;
        var borderColor = style.borderColor;
        var borderType = style.borderType || 'solid';

        _log('borderWeight', borderWeight);
        _log('borderColor', borderColor);


        if(!_.isUndefined(borderWeight) && _.isNumber(borderWeight)){
            element.css('border-width', borderWeight + 'px');
            element.css('border-style', borderType);
        }

        if(!_.isUndefined(borderColor)){
            element.css('border-color', borderColor);
            element.css('border-style', borderType);
        }

    },

    resetExerciseApproachSpecial: function(){
        // To override
    },

    checkExercise: function(){
        // To override
    },

    beforeDestroy: function(){
        // To override
    },

    getSpecialScormData: function(){
        // To override
    },

    setSpecialScormData: function(){
        // To override
    },


    destroy: function(){
        this.beforeDestroy();
        // this.unbind();
        this.remove();
    }
});
