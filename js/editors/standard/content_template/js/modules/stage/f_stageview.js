var StageView = Backbone.View.extend({

	el: $('#stage-content'),

	stageWrapper: $('#stage'),

	progressBar: $('#page-load-progress'),

	allPageComponents: new ComponentsCollection(),

	//soundController: new SoundController(),
    soundController : null,

	projectSoundLaunched: false,

	timeOnPage: 0,

    triggersArray : [],

    lineIndex: 0,
    wcagTabIndex: 98,
    wcagTabIndexDefault: 98,
    lastActiveWcagIndex: 0,

	events: {
        'play-component-audio': 'playComponentAudio',
        'stop-component-audio': 'stopComponentAudio',
        'pause-component-audio': 'pauseComponentAudio',
		'scroll-top': 'scrollTop',
        // 'touchstart': 'onTouchStart',
        // 'touchend': 'onTouchEnd',
        // 'touchmove': 'onTouchMove'
		// 'check-course-status': 'checkCourseStatus'
	},

    // onTouchStart: function(e) {

    // },

    // onTouchEnd: function(e) {

    // },

    // onTouchMove: function(e) {
    //     _log('move', e);

    //     try {
    //         var component = $(e.originalEvent.touches[0].target).closest('.component');
    //         var actionkey = component.attr('actionkey');


    //         if (this.activeActionkey != actionkey) {
    //             component.trigger('mouseenter');
    //             _log('TRIGGERING mouseenter', actionkey, _log.error);
    //         } else {
    //             // _log('not triggering mouseenter', actionkey);
    //         }
                


    //         this.activeActionkey = actionkey;
    //     } catch(err) {}
        

    // },

	checkCourseStatus: function() {
		this.trigger('check-course-status');
	},

	initialize: function() {
		var _that = this;
	    window.onresize = function () {
	    	_that.renderDimentions();
	    };

        this.timeline = new TimelineController();

        $(window).focus(function() {
            _that.pageHandlerTimer('start', _that.model);
        });
        $(window).blur(function() {
            _that.pageHandlerTimer('stop', _that.model);
        });
	},

	scrollTop: function(e, data) {
		this.stageWrapper
			.animate({ scrollTop: parseInt(data.scrollTopValue) }, { duration: data.scrollTime*1000, easing: 'easeInOutQuart' });
	},

	playComponentAudio: function(e, soundPath, sender) {
		this.soundController.playComponentSound(soundPath, sender);
	},

    stopComponentAudio: function(e, soundPath, sender) {
        this.soundController.stopComponentSound(soundPath, sender);
    },

    pauseComponentAudio: function(e, soundPath, sender) {
        this.soundController.pauseComponentSound(soundPath, sender);
    },

	pageHandlerTimer: function(cmd, pageModel) {

		var _that = this;

		switch (cmd) {

			case 'start':
                this.timeIsCounting = true;
				var date = new Date();
				this.timeOnPage = date.getTime();
				break;

			case 'stop':
                this.timeIsCounting = false;
				var date = new Date();
				var time = date.getTime();

                if(!pageModel){
                    return;
                }

				var pageTime = !isNaN(pageModel.get('options').get('timeOnPage')) ? parseInt(pageModel.get('options').get('timeOnPage')) : 0;

				var newTime = parseInt(pageTime + ((time - this.timeOnPage) / 1000));

				pageModel.get('options').set('timeOnPage', newTime);

				break;

		}
	},

    resetSounds: function(pageModel) {

        this.soundController.stopAllSounds();
        this.soundController.clearComponentsSounds();


        this.prepareSounds(pageModel);
    },

    prepareSounds: function(pageModel) {

        var pageSound = this.getPageSoundPath(pageModel);
        if ( pageSound ) { this.soundController.preparePageSound( pageSound ); }

        if (!this.projectSoundLaunched) {
            var projectSound = this.getProjectSoundPath();
            if ( projectSound ) { 
                this.soundController.prepareProjectSound( projectSound ); 
                this.soundController.playProjectSound( ProjectModel.instance ); 
            }   
            this.projectSoundLaunched = true;
        }

        // get all page components and save it to global stage variable
        this.allPageComponents = this.getAllPageComponents(pageModel);
        this.prepareComponentSound( this.allPageComponents );
    },

    beforeLoadPage: function(pageModel) {

        this.resetSounds(pageModel);
        this.destroyStage();
        this.closeFeedbackWindows();
        this.renderDimentions(pageModel);
        
        this.$el.trigger('stage-model-changed', [pageModel]);
        this.trigger('on-before-page-load', pageModel);
    },

	loadPage: function(pageModel) {
		var _that = this;

        this.resetSounds(pageModel);
        this.destroyStage();
        this.closeFeedbackWindows();
        this.renderDimentions(pageModel);
        
        this.$el.trigger('stage-model-changed', [pageModel]);
        this.trigger('on-before-page-load2', pageModel);
	},

    loadPage2: function(pageModel) {
        var _that = this;

        this.onPageLoadCompleted(pageModel);
    },

    loadPage3: function(pageModel) {
        var _that = this;

        this.resetSounds(pageModel);
        this.onPageLoadCompleted(pageModel);
    },

    onPageLoadCompleted: function(pageModel) {

        var _that = this;

        //this.hideProgressBar();

        this.wcagTabIndex = this.wcagTabIndexDefault;
        this.lastActiveWcagIndex = 0;
       
        if (this.timeOnPage !== 0) {
            if (!this.previousPageModel) {
                this.previousPageModel = this.model;
            }
            this.pageHandlerTimer('stop', this.previousPageModel);
        }

        this.model = pageModel;

        this.lineIndex = 0;

        this.turnOffListeners();

        this.unhighlightNavigationButtons();

        var locknavi = pageModel.get('options').get('locknavi');

        if(locknavi){
            this.lockNavigationButtons();
        }else{
            this.unlockNavigationButtons();
        }

        // clearInterval(this.TEMP);
        // this.TEMP = setInterval(function() {
        //  var date = new Date();
        //  var time = date.getTime();

        //  var pageTime = !isNaN(pageModel.get('options').get('timeOnPage')) ? parseInt(pageModel.get('options').get('timeOnPage')) : 0;
        //  var newTime = pageTime + ((time - _that.timeOnPage) / 1000);

        //  $('#previous').text(newTime);
        // }, 1000);



        this.pageHandlerTimer('start', pageModel);
        

        // set model
        this.setModel(pageModel);


        // set trigger page model
        TriggerController.instance.setPageModel(pageModel);

    
        //_log('assetsToLoad', assetsToLoad);

        this.render();


        // this.addTimer();




        //$('body, html').css({overflow: 'auto'});
        this.$el.attr('anim', 'showpage');

        clearTimeout(this.showAnimationTimeout);
        this.showAnimationTimeout = setTimeout(function() {
            _that.$el.attr('anim', 'hidepage');
        }, 200);
        
        

        var pageSound = this.getPageSoundPath(pageModel);
        if ( pageSound ) { this.soundController.playPageSound(this); }

        this.renderBackgroundColor();
        this.renderBackgroundImage();



        
        // this.renderDimentions();

        this.setPageAsCompleted(this.model);


        this.startPageLiveTimer();

        var pageIndex = this.model.collection.indexOf(this.model);

        var darkanCourseAplicationAPI = DarkanCourseAplicationAPI.getInstance();
        darkanCourseAplicationAPI.pageSelected({ pageIndex:pageIndex });

        var timelineElements = this.timeline.run();

        this.applyTriggers();
        this.trigger('onPageLoaded');

        this.selectFirstWcagElement();

        this.previousPageModel = pageModel;

        var result = ProjectModel.instance.changeProjectStaticVariable('_slide_number', (pageIndex + 1).toString());
        ProjectModel.instance.changeProjectStaticVariable('_components_in_page_count', timelineElements.components.length);
        ProjectModel.instance.changeProjectStaticVariable('_lines_in_page_count', timelineElements.lines.length - 1);

        ProjectModel.instance.changeProjectStaticVariable('_passed_qiuz_on_stage_count', this.model.getPassedQiuzComponents().length);
        ProjectModel.instance.changeProjectStaticVariable('_failed_qiuz_on_stage_count', this.model.getFailedQiuzComponents().length);
        ProjectModel.instance.changeProjectStaticVariable('_qiuz_on_stage_count', this.model.getExercisesComponents().length);

        _log('result', result);
    },

    selectFirstWcagElement: function() {
        var firstElement = this.$el.find('[tabindex=1]');

        var tabindexes = $("[tabindex]").map(function() {
            return this.tabIndex;
        }).get();

        var lowest = Math.min.apply( Math, tabindexes );
        $("[tabindex="+ lowest +"]").focus();
    },

    selectLastActiveWcagElement: function() {
        var firstElement = this.$el.find('[tabindex='+ this.lastActiveWcagIndex +']');
        if (firstElement.push() > 0) {
            firstElement.focus();
        }
    },


    prepareComponentSound: function( allPageComponents ){

        var _that = this;

        allPageComponents.each(function(componentModel) {

            var componentView = componentModel.view;

            var componentSound = componentView.getComponentSoundFile();
            if (componentSound) { 
                var sound = _that.soundController.prepareComponentSound(componentSound, componentView);

                if(sound){
                    componentView.addSoundListener(sound); 
                }
            }
        });

    },

    unhighlightNavigationButtons: function( ){

        $('#next').attr('highlight', false);
        $('#previous').attr('highlight', false);
    },

    lockNavigationButtons: function( ){

        $('#next').attr('locked', true);
        $('#previous').attr('locked', true);
    },

    unlockNavigationButtons: function( ){

        if(this.isOneScreen()){
            $('#previous').attr('locked', true);
            $('#next').attr('locked', true);
        }else{
            if(this.isFirstScreen() ) {
                $('#previous').attr('locked', true);
                $('#next').attr('locked', false);
            }else if (this.isLastScreen()) {
                $('#previous').attr('locked', false);
                $('#next').attr('locked', true);
            }else{
                $('#previous').attr('locked', false);
                $('#next').attr('locked', false);
            }
        }


    },

    isOneScreen: function(){

        return this.model.collection.length > 1 ? false : true;
    },

    isFirstScreen: function(){

        var index = this.model.collection.indexOf(this.model);
        return index == 0 ? true : false;
    },

    isLastScreen: function(){
        var index = this.model.collection.indexOf(this.model);
        return (index == this.model.collection.length - 1) ? true : false;
    },


//    turnOffNavigationButtons: function( ){
//
//        $('#next').attr('off', true);
//        $('#previous').attr('off', true);
//    },
//
//    turnOffNextNavigationButton: function( ){
//
//        $('#next').attr('off', true);
//    },
//
//    turnOffPreviousNavigationButton: function( ){
//
//        $('#previous').attr('off', true);
//    },

    checkElOnFunction: function(funName){

        var arr = ['click', 'mouseenter', 'mouseleave'];
        var exist = arr.indexOf(funName);

        return exist == -1 ? false : true;
    },

    checkIfKeybordFunction: function(funName){

        var arr = ['keydown'];
        var exist = arr.indexOf(funName);

        return exist == -1 ? false : true;
    },

    checkKeyboardCondition: function(e, opts){

        var opts = opts || {};
        var keyboard = opts.keyboard || {};
        var key = keyboard.key || '';

        return e.which == key ? true : false;
    },

    checkCondition: function(conditions){

        return TriggerController.instance.checkConditions(this, conditions);
    },

    checkIfHideComponents: function(triggerAction){
        for (var j = 0; j < triggerAction.length; j++) {
            var action = triggerAction[j];

            var whattodo = action.whattodo;

            if(whattodo == 'showNextLine'){
                this.hideAllLines();
            }
        }
    },

    hideAllLines: function(){

        var lines = this.model.get('lines');

        lines.each(function(rowModel) {
            rowModel.get('objects').each(function(cModel) {

                setTimeout(function() {
                    cModel.view.hideComponent();
                }, 0);
            });
        });
    },

    hideAllLinesWithOutFirst: function(){

        var lines = this.model.get('lines');

        lines.each(function(rowModel, i) {

            if(i > 0){

                rowModel.get('objects').each(function(cModel) {

                    setTimeout(function() {
                        cModel.view.hideComponent();
                    }, 0);
                });
            }
        });
    },

    applyTriggers: function(){

        var _that = this;

        var triggers = this.model.get('options').get('triggers');

        var i = 0;

        var applyTrigger = function() {
            if (i == triggers.length ) {
                return;
            }

            var trigger = triggers[i];


            var whendoit = trigger.whendoit;
            var opts = trigger.opts;
            var conditions = trigger.conditions;
            var elseactions = trigger.elseactions;
            var subtriggers = trigger.subtriggers;

            _that.checkIfHideComponents(subtriggers);
            _that.checkIfHideComponents(elseactions);

            var isKeyboardFunction = _that.checkIfKeybordFunction(whendoit);

            if(isKeyboardFunction){

                var subtriggerAction = function(e){

                    var condition = _that.checkCondition(conditions);
                    var keybordCondition = _that.checkKeyboardCondition(e, opts);

                    if(keybordCondition){
                        if(condition){
                            _that.runTriggerAction( subtriggers, e);
                        }else{
                            _that.runTriggerAction( elseactions, e);
                        }
                    }
                }

                    _that.triggersArray.push({ el:true, whendoit:whendoit, action:subtriggerAction});

                $(document).on(whendoit, subtriggerAction);

                _that.$el.focus();

            }else{



                var exist = _that.checkElOnFunction(whendoit);


                if(exist){

                    var subtriggerAction = function(e){
                        var condition = _that.checkCondition(conditions);

                        if(condition){
                            _that.runTriggerAction( subtriggers, e, opts);
                        }else{
                            _that.runTriggerAction( elseactions, e, opts);
                        }
                    }

                    _that.triggersArray.push({ el:true, whendoit:whendoit, action:subtriggerAction});

                    _that.$el.on(_that.mapWhenDoIt(whendoit), subtriggerAction);

                }else{

                    var elseAction = function(e){

                        var condition = _that.checkCondition( conditions );

                        if(condition){
                            _that.runTriggerAction( subtriggers, e, opts);
                        }else{
                            _that.runTriggerAction( elseactions, e, opts);
                        }
                    }

                    _that.triggersArray.push({ el:false, whendoit:whendoit, action:elseAction});

                    _that.on(whendoit, elseAction);

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
               return 'mouseenter touchstart';
            break;

             case 'mouseleave':
               return 'mouseleave touchend';
            break;

            default:
                 return whendoit;
            break;
        }
    },

    runTriggerAction: function( triggerAction, e, whenopts ){


        for (var j = 0; j < triggerAction.length; j++) {
            var action = triggerAction[j];

            var whattodo = action.whattodo;
            var objs = action.objs;
            var opts = action.opts;
            var delay = parseFloat(action.opts.delay);


            if (_.isNumber(delay) && delay > 0) {
                (function(whattodo, _this, objs, opts) {
                    setTimeout(function() {
             
                        TriggerController.instance.execute(whattodo, _this, objs, opts, e, whenopts);
      
                    }, delay*1000);
                })(whattodo, this, objs, opts, whenopts);
            } else {

                TriggerController.instance.execute(whattodo, this, objs, opts, e, whenopts);

            }
        }
    },


	addTimer: function() {
		var timer = $('<div>0</div>');
		timer.css({
			position: 'absolute',
			top: '0px',
			left: '0px',
			width: '100px',
			height: '30px'
		});
		this.$el.append(timer);
		var time = 0;
		setInterval(function(e) { time++; timer.text(time)}, 1000) 
	},

	getAssetsToLoad: function() {
		
		return this.model.getAssetsToLoad();
	},

	render: function() {
		var _that = this;

		this.$el.html("");
		// this.renderDimentions();

		return this;
	},

	renderBackgroundColor: function() {
		var bgcolor = this.model.get('options').get('bgcolor');
		bgcolor !== '' ? bgcolor : '#fff';
        this.$el.css('background-color', bgcolor);
	},

    getFirstPageToLoad: function() {
        var par = Utils.getURLParam();
        for (var paramName in par) {
            if (paramName == 'p') {
                var pageOrder = parseInt(par[paramName]) - 1;
                var pageModel = ProjectModel.instance.get('pages').at( pageOrder );
                if (pageModel) {
                    return pageModel;
                }
            }
            if (paramName == 'darkan_p') {
                var pageOrder = parseInt(par[paramName]);
                var pageModel = ProjectModel.instance.get('pages').at( pageOrder );
                if (pageModel) {
                    return pageModel;
                }
            }
        }

        var firstPage = ProjectModel.instance.get('pages').at(0);
        return firstPage;
    },

    renderDimentions: function(pageModel) {
        var _that = this;

        var modelToRender = pageModel || this.model;
        // if (!this.model) {
        //     modelToRender = this.getFirstPageToLoad();
        // }

    	if (modelToRender) {

            var autoScale = ProjectModel.instance.isAutoScale();

            if (autoScale) {
                var wrapperWidth = $(window).width();
                var wrapperHeight = $(window).height();


                var sceneHeight = parseInt(modelToRender.get('options').get('height'));
                var sceneWidth = parseInt(modelToRender.get('options').get('width'));

                var newSceneWidth = wrapperWidth;
                var newSceneHeight = ((sceneHeight * newSceneWidth) / sceneWidth);


                if (newSceneHeight < 10) {
                    newSceneHeight = 10;
                }

                if (newSceneHeight > wrapperHeight) {
                    newSceneHeight = wrapperHeight;
                    newSceneWidth = (sceneWidth * newSceneHeight) / sceneHeight;
                }

                this.$el.css({
                    width: '100%',
                    height: '100%'
                });

                $('#stage').css({
                    width:  newSceneWidth + "px",
                    height: newSceneHeight + "px"
                });


                this.renderAllPageComponents();
            } else {
                var maxHeight = $(document).height() - 30;
                var skinHeight = parseInt(modelToRender.get('options').get('height'));

                var maxWidth = $(document).width() - 30;
                var skinWidth = parseInt(modelToRender.get('options').get('width'));

                var outputHeight = maxHeight < skinHeight ? maxHeight : skinHeight;
                var outputWidth = maxWidth < skinWidth ? maxWidth : skinWidth;


                this.$el.css({
                    width: modelToRender.get('options').get('width') + "px",
                    height: modelToRender.get('options').get('height') + "px"
                });

                $('#stage').css({
                    width:  outputWidth+2 + "px",
                    height: outputHeight+2 + "px"
                });
                $('#stage').scrollTop(0);

                var skinWidth = parseInt(outputWidth) + $('.leftbar').width() + $('.rightbar').width() + 2;
                var skinHeight = parseInt(outputHeight) + $('.botbar').height() + $('.topbar').height();
                $('#skin').css({
                    width:  skinWidth+2 + "px",
                    height: skinHeight+2 + "px"
                });
                this.$el.trigger('skin-update-scrollbar');
                this.$el.trigger('skin-update-position');
            }
    	}
    },

    renderAllPageComponents: function() {
        this.allPageComponents.each(function(componentModel) {

            var componentView = componentModel.view;
            if (componentView) {
                componentView.renderComponentDimentions();
            }
        });
    },

    renderBackgroundImage: function(  ){
        var pageBackground = this.getPageBackgroundPath();

        if (pageBackground) {
            this.$el.css({
                'background-image': 'url(\'' + pageBackground + '\')',
                'background-repeat': 'no-repeat',
                'background-position': '50% 50%',
                'background-size': '100% 100%'
            });
        } else {
            this.$el.css('background-image', '');
        }
    },

    getPageBackgroundPath: function() {

        return this.model.getPageBackgroundPath();
    },

    clearBackground: function() {
        this.$el.css({
        	'background-image': '',
        	'background-color': '#fff'
        });
    },

	

    startPageLiveTimer: function() {

        var _that = this;

        var stageLifetime = parseInt(this.model.get('options').get('stageLifetime'));

        if(stageLifetime >= 0){
            if(this.pageLiveTime != undefined){
                clearTimeout(this.pageLiveTime);
            }

            this.pageLiveTime = setTimeout(function(){
                _that.pageLiveTimeAreGone();
            },stageLifetime*1000);
        }
    },

    pageLiveTimeAreGone: function() {

        this.trigger('on-page-live-time-are-gone', this.model);
    },

	setPageAsCompleted: function(pageModel) {

		var options = pageModel.get('options');

		options.set('compl', 1);


		this.checkCourseStatus();
		this.trigger('save-lesson-location');
	},

    getProjectSoundPath: function() {
        
        return ProjectModel.instance.getProjectSoundPath();
    },

	getPageSoundPath: function(pageModel) {
        
        return pageModel.getPageSoundPath();
	},

	getAllPageComponents: function(pageModel) {
		
		return pageModel.getAllPageComponents();
	},

	hideProgressBar: function(callback) {
		this.progressBar.hide();
	},

	setModel: function(model) {
		this.model = model;
		this.timeline.setModel({model: model, stage: this});
	},

	unmuteAllSounds: function() {
		this.soundController.unmuteAllSounds();
	},

	muteAllSounds: function() {
		this.soundController.muteAllSounds();
	},

    turnOffListeners: function() {

        for (var i = 0; i < this.triggersArray.length; i++) {
            var oneTrigger = this.triggersArray[i];

            _log('off whendoit', oneTrigger.whendoit);
            _log('off action', oneTrigger.action);


            if(oneTrigger.el){

                if(oneTrigger.whendoit == 'keydown'){
                    $(document).off(oneTrigger.whendoit, oneTrigger.action);
                }else{
                    this.$el.off(oneTrigger.whendoit, oneTrigger.action);
                }
                
            } else{
                this.off(oneTrigger.whendoit, oneTrigger.action);
            }

        };

        this.triggersArray = [];
    },

    destroyStage: function(){
        if(this.model){
            this.timeline.destroy();
        }
    },

    showFeedbackWindow: function(title, content, success) {
        var _that = this;

        if (content.length > 0) {

            this.closeFeedbackWindows();

            var feedbackWindow = new FeedbackView();
            $(__meta__.darkanContainer).append(feedbackWindow.render({content: content, title: title, success: success}).$el);
            feedbackWindow.scaleWindow();
            feedbackWindow.centerWindow();
            feedbackWindow.on('close', function() {
                _that.selectLastActiveWcagElement();
            });
            feedbackWindow.$el.find('.window-close-button').attr({
                'aria-label': content + ', click to close.'
            });
            feedbackWindow.$el.find('.window-close-button').focus();

            this.feedbackWindow = feedbackWindow;
        }
    },

    closeFeedbackWindows: function(){

        if(this.feedbackWindow) {
            this.feedbackWindow.close();
            this.selectFirstWcagElement();
            this.feedbackWindow = undefined;
        } 
    },

    getHeightRatio: function() {
        return (this.$el.height() / this.model.get('options').get('height'));
    },
    getWidthRatio: function() {
        return (this.$el.width() / this.model.get('options').get('width'));
    },

    getSmallerRatio: function() {
        if (this.getHeightRatio() < this.getWidthRatio()) {
            return this.getHeightRatio();
        }
        return this.getWidthRatio();
    },
});