var CourseController = Backbone.Controller.extend({

	timeline: new TimelineController(),

	model: new ProjectModel(),

    swipeOptions: {
        minDistance: 100,
        maxDuration: 200
    },

	initialize: function() {
		var _that = this;

        var darkanCourseAplicationAPI = DarkanCourseAplicationAPI.getInstance();
        darkanCourseAplicationAPI.connect();


		// init stage and view first page


		//this.scormController = new ScormController({model: this.model});

		ScormController.create( { model: this.model }, function(scormController){ 
			_that.onConnectedToScorm(scormController);
		} );

		// this.scormController.model = this.model;

        var saved = false;
		window.onbeforeunload = function(e) {
            if (!saved) {
    			_that.checkCompletionStatus();
    			_that.saveScorm(false);
                _that.quitScorm();
                saved = true;
            }
            
            return null;
		}
		window.unload = function(e) {
            if (!saved) {
    			_that.checkCompletionStatus();
    			_that.saveScorm(false);
                _that.quitScorm();
                saved = true;
            }
            return null;
		}

	},

	onConnectedToScorm: function( scormController ){

		var _that = this;

		this.scormController = scormController;
        ScormController.instance = this.scormController;

		this.scormController.on('go-to-page-order', function(order) { _that.goToPageByOrder(order); });
		this.scormController.on('on-load-scorm-data', function() { _that.onLoadScormData(); });

		// listen to course status chage
		this.listenTo(this.model.get('options'), 'change:courseStatus', this.saveScorm);

        // set trigger page model
        TriggerController.instance.setProjectModel(this.model);

		this.scormController.loadScorm();

        this.addKeyboardListener();

        var darkanCourseAplicationAPI = DarkanCourseAplicationAPI.getInstance();
        var pagesLength = this.model.get('pages').length;
        darkanCourseAplicationAPI.projectLoaded({ pagesLength:pagesLength });


	},

    addKeyboardListener : function(){

        var _that = this;

        // $('#stage').swipe( {
        //     swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        //         if (duration < _that.swipeOptions.maxDuration && distance > _that.swipeOptions.minDistance) {
        //             switch(direction) {
        //                 case 'left':
        //                     _that.goToNextPage();
        //                     break;

        //                 case 'right':
        //                     _that.goToPreviousPage();
        //                     break;
        //             }

        //         }
        //     }
        // });

        // $(document).on('keyup', function(e){

        //     switch (e.which){

        //         case 33: // prew

        //             _that.goToPreviousPage();
        //             break;

        //         case 34: // next

        //             _that.goToNextPage();
        //             break;

        //         case 37: // prew

        //             if (e.currentTarget.activeElement.localName === "input" ||
        //                 e.currentTarget.activeElement.localName === "textarea" ||
        //                 e.currentTarget.activeElement.className === 'note-editable'
        //                 ) {

        //             } else {
        //                 _that.goToPreviousPage();
        //             }

        //             break;

        //         case 39: // next

        //             if (e.currentTarget.activeElement.localName === "input" ||
        //                 e.currentTarget.activeElement.localName === "textarea" ||
        //                 e.currentTarget.activeElement.className === 'note-editable'
        //                 ) {

        //             } else {
        //                 _that.goToNextPage();
        //             }

        //             break;
        //     }


        // });
    },

    onPageLiveTimeAreGone : function(pageModel){

        var options = pageModel.get('options');

        var goToNextPage = options.get('goToNextPage');
        var highlightButtons= options.get('highlightButtons');
        var locknavi = options.get('locknavi');

        if(goToNextPage) {
            this.goToNextPage();
        }

        if(highlightButtons) {
            this.highlightNavigationButtons();
        }

        if(locknavi) {
            this.unlockNavigationButtons();
        }
    },


    highlightNavigationButtons: function( ){

        $('#next').attr('highlight', true);
        $('#previous').attr('highlight', true);
    },

    unlockNavigationButtons: function( ){

        this.stage.unlockNavigationButtons();
    },

	onLoadScormData: function(){

        var _that = this;

        var soundController = null;

        if(this.model.get('options').get('load_every_sound_at_start')){
            soundController = new AudioManager();
            $(__meta__.darkanContainer).append(soundController.render().$el);

        }else{
            soundController = new SoundController();
        }


        //this.autoLoadFirstPage();

        this.stage = new StageView();
        StageView.instance = this.stage;
        this.stage.soundController = soundController;

        // this.stage.on('check-course-status', this.checkCompletionStatus, this);
        this.stage.on('check-course-status', function() {
            _that.checkCompletionStatus();
        });
        this.stage.on('save-lesson-location', function() {
            _that.saveLessonLocation();
        });
        this.stage.on('on-page-live-time-are-gone', this.onPageLiveTimeAreGone, this);
        this.stage.on('on-before-page-load', this.onBeforePageLoad, this);
        this.stage.on('on-before-page-load2', this.onBeforePageLoad2, this);
        this.stage.hideProgressBar();


        

        // init skin
        this.skin = new SkinController({model: this.model});
        this.skin.on('go-to-next-page', function() { _that.goToNextPage(); });
        this.skin.on('go-to-previous-page', function() { _that.goToPreviousPage(); });
        this.skin.on('go-to-page-order', function(order) { _that.goToPageByOrder(order); });
        this.skin.on('mute-all-sounds', function() { _that.stage.muteAllSounds(); });
        this.skin.on('unmute-all-sounds', function() { _that.stage.unmuteAllSounds(); });

        // model event listeners
        this.model.on('go-to-page-model', function(pageModel) { _that.goToPageByModel(pageModel); });
        this.model.on('go-to-next-page', function() { _that.goToNextPage(); });
        this.model.on('go-to-previous-page', function() { _that.goToPreviousPage(); });
        
        
        var pageToLoad = this.getFirstPageToLoad();

        if ( Utils.isMobile() && this.pageHasAnySound(pageToLoad)) {
            // Show start button
            this.showStartButton();
            this.stage.on('mobile-start', function() { 
                _that.startFirstLoad();
            });
        } else {
            _that.startFirstLoad();
        }

        this.showContinueWindow();
	},

    

    pageHasAnySound: function(pageModel) {
        var hasAnySound = false;

        var pageSound = this.stage.getPageSoundPath(pageModel);
        if (pageSound) { hasAnySound = true; }

        var projectSound = this.stage.getProjectSoundPath();
        if (projectSound) { hasAnySound = true; }


        var allPageComponents = this.stage.getAllPageComponents(pageModel);
        allPageComponents.each(function(componentModel) {
            var componentView = componentModel.view;
            var componentSound = componentView.getComponentSoundFile();
            if (componentSound) { 
                hasAnySound = true;
                return;
            }
        });

        return hasAnySound;
    },

    startFirstLoad: function() {
        var _that = this;

        if(this.model.get('options').get('load_every_sound_at_start')){


            if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){


                  this.stage.soundController.createComponetsAudios();
                  this.stage.soundController.createPagesAudios();
                  this.stage.soundController.createProjectAudios();
                  this.stage.soundController.playAndPauseAllAudiosForMobile();  

                  this.activeFirstPage();

            }else{

                this.stage.soundController.on('on-proggress', function(data){
                _log('on-proggress data', data);
                },this);

                this.stage.soundController.on('on-complete', this.activeFirstPage, this);

                this.stage.soundController.createComponetsAudios();
                this.stage.soundController.createPagesAudios();
                this.stage.soundController.createProjectAudios();
                this.stage.soundController.playAndPauseAllAudiosForMobile();
            }
            
           

            
        }


        if(!this.model.get('options').get('load_every_sound_at_start')){
            this.activeFirstPage();
        }
    },

    activeFirstPage: function() {

        var pageToLoad = this.getFirstPageToLoad();

        var loadEveryPageAtStart = ProjectModel.instance.get('options').get('load_every_page_at_start');

        // if(loadEveryPageAtStart){
        //     var proggressBar = this.createProggressBar();
        //     proggressBar.on('on-complete', function(e){ _that.onCompleteLoading(e) });
        //     proggressBar.loadAllPeges();

        // }else{

            //var proggressBar = this.createProggressBar();
            //proggressBar.on('on-complete', function(e){ _that.onCompleteLoading(e) });
            this.stage.beforeLoadPage( pageToLoad );

            // this.autoLoadFirstPage();
        // }

        this.skin.showCourse(); 
        this.stage.renderDimentions(pageToLoad);
    },

    onBeforePageLoad: function(pageToLoad){
        // alert('BEFORE');

        this.stage.model = pageToLoad;

        var _that = this;

        if(!pageToLoad.isLoaded){

            var proggressBar = this.createProggressBar();
            proggressBar.on('on-complete', function(e){ _that.onCompleteLoading(e) }, this);
            proggressBar.loadPage( pageToLoad );
            

        }else{
            this.resetProgressBar();
            this.stage.loadPage3(pageToLoad);
        }

       this.skin.highlightActiveTocItem(pageToLoad);
    },

    onBeforePageLoad2: function(pageToLoad){
        // alert('BEFORE');

        this.stage.model = pageToLoad;

        var _that = this;

        if(!pageToLoad.isLoaded){

            var proggressBar = this.createProggressBar();
            proggressBar.on('on-complete', function(e){ _that.onCompleteLoading(e) }, this);
            proggressBar.loadPage( pageToLoad );
            

        }else{
            this.resetProgressBar();
            this.stage.loadPage2(pageToLoad);
        }

       this.skin.highlightActiveTocItem(pageToLoad);
    },

    onCompleteLoading: function(pageToLoad) {
        _log('pageToLoad', pageToLoad);
        // alert('COMPLETE LOADING');
        this.resetProgressBar();
        this.stage.loadPage2(pageToLoad);

        if(!this.skin.skinInitialied){
           this.stage.renderDimentions(pageToLoad);
           this.skin.skinInitialied = true;
        }

        var pageIndex = pageToLoad.collection.indexOf(pageToLoad);
        var pageId = pageToLoad.get('options').get('pageid');

        var darkanCourseAplicationAPI = DarkanCourseAplicationAPI.getInstance();
        darkanCourseAplicationAPI.onCompleteLoadingPage({ pageIndex:pageIndex, pageId:pageId });

        //_log('aaaaaaaaaaaaaa onCompleteLoading', pageToLoad);
    },

    resetProgressBar: function(e) {
        if(this.proggressBar){
            this.proggressBar.cancel();
        }
    },

    closeProgressBar: function(e) {
        if(this.proggressBar){
            this.proggressBar.close();
        }
    },

    createProggressBar: function(e) {
        this.resetProgressBar();

        var proggressBar = this.proggressBar || WindowFactory.createProggressBarWindow();
        this.skin.$el.append(proggressBar.render().$el);

        this.proggressBar = proggressBar;

        return proggressBar;
    },

    createProggressBarNoModal: function(e) {

        // if(this.proggressBar){
        //     this.proggressBar.reset();
        // }

        _log('createProggressBar');

        var proggressBar = this.proggressBar;

        _log('proggressBar', proggressBar, _log.error);

        if (proggressBar) {
            proggressBar.cancel();
        }

        proggressBar = WindowFactory.createProggressBarWindowNoModal();
        this.skin.$el.append(proggressBar.render().$el);

        this.proggressBar = proggressBar;

        return proggressBar;
    },


    saveScorm: function(async) {
        this.scormController.saveScorm(async);
    },


    quitScorm: function() {
        this.scormController.quitScorm();
    },

	saveLessonLocation: function() {
		var pageOrderToSave = this.stage.model.collection.indexOf(this.stage.model);
		this.scormController.saveLessonLocation(pageOrderToSave);
		this.checkCompletionStatus();
		this.saveScorm(true);
	},

	checkCompletionStatus: function() {
		var pagesCompleted = true;
		var scoreCompleted = true;

		var pagesCompletionStatus = this.getPagesCompletionStatus();
		var scoreCompletionStatus = this.getScoreCompletionStatus();
        var projectOptions = this.model.get('options').toJSON();

        if (projectOptions.require_pages && !pagesCompletionStatus) {
			pagesCompleted = false;
        }

        if (projectOptions.require_score && !scoreCompletionStatus) {
			scoreCompleted = false;
        }

        // alert('kurs status: pages-' + pagesCompleted + ", score-" + scoreCompleted);

        // content is completed!
        if (pagesCompleted && scoreCompleted) {
        	this.model.get('options').set('courseStatus', 'passed');
            // this.quitScorm();
        	return;
        }

        // content is failed...
        if (this.allQuizComponentsAreAnswered() && !scoreCompleted) {
        	this.model.get('options').set('courseStatus', 'failed');
            // this.quitScorm();
        	return;
        }

	},

    allQuizComponentsAreAnswered: function(collection, maxPoints, collectionType) {
    	var _that = this;

    	var allQuestionsAreAnswered = true;

    	var pagesCollection = this.model.get('pages');

		pagesCollection.each(function(pModel) {

            var lines = pModel.get('lines');

            lines.each(function(lModel) {

                var components = lModel.get('objects');

                components.each(function(cModel) {

                	if ( cModel.get('type').substr(0, 4) === "quiz"){
	                	if (_that.questionHasScoreApplied(cModel) && cModel.get('compl') == 0) {
	                		allQuestionsAreAnswered = false;
	                	}
                	}


                    
                });
            });
        });

        return allQuestionsAreAnswered;
    },

    questionHasScoreApplied: function(qModel) {
    	var _that = this;

    	var questionHasScoreApplied = false;

        var triggers = qModel.get('triggers');

        _.each(triggers, function(trigger) {

            var subtriggers = trigger.subtriggers;

            _.each(subtriggers, function(subtrigger) {

                var objs = subtrigger.objs;

                if (objs.varName === '00000000000000000000000000000000' && objs.varAction === 'add') {

                    var varValue = parseInt(objs.varValue);
                    if (varValue > 0) {
                    	questionHasScoreApplied = true;
                    }
                }
            });

        });

        return questionHasScoreApplied;
    },


	getPagesCompletionStatus: function() {
		var allPagesAreCompleted = true;
        var pagesCollection = this.model.get('pages');

        pagesCollection.each(function(pModel) {
            if ( pModel.get('options').get('compl') !== 1 ) {
                allPagesAreCompleted = false;
            }
        });

        return allPagesAreCompleted;
	},

	getScoreCompletionStatus: function() {
        var userScoreObject = TriggerController.instance.getVariableByHash("00000000000000000000000000000000");
        var userScoreValue = parseFloat(userScoreObject.pvarvalue);

        var projectOptions = this.model.get('options').toJSON();
        var maxScore = parseFloat(projectOptions.max_points_number);
        var requiredScore = parseFloat(projectOptions.require_score_points);

        if (userScoreValue >= requiredScore) {
        	return true;
        }

        return false;
	},

	showStartButton: function() {
		var _that = this;

		var startButton = $('.mobilestart-btn');

        $('.mobilestart-overlay').css({
            height: $(document).height() + 'px'
        });

		startButton.click(function() {
			_that.startFirstLoad();
			$('.mobilestart-overlay').fadeOut(500);
		})

		$('.mobilestart-overlay').show();
	},

	autoLoadFirstPage: function() {


		// auto load page
		var pageToLoad = this.getFirstPageToLoad();
		this.stage.loadPage(pageToLoad);

		this.showContinueWindow();
	},

	showContinueWindow: function() {

        var _that = this;

        var options = this.model.get('options');
        

        var lessonLocationNavigation = options.get('lessonLocationNavigation');

        switch(lessonLocationNavigation){
            case '0':

                break;

            case '1':

                var pageOrder = parseInt(options.get('lessonLocation'));

                if(isNaN(pageOrder)){
                    return;
                }

                if(!_.isNumber(pageOrder)){
                    return;
                }

                if(pageOrder == 0){
                    return;
                }

                setTimeout(function(){
                   _that.goToPageByOrder(pageOrder); 
                }, 1000);

                break;

            case '2':

                var pageOrder = parseInt(options.get('lessonLocation'));

                if(isNaN(pageOrder)){
                    return;
                }

                if(!_.isNumber(pageOrder)){
                    return;
                }

                if(pageOrder == 0){
                    return;
                }
                
                var windowData = {
                    title: options.get('useLessonLocationDefaultPopupTitle') ? _lang('PUB_LASTPAGE_CONTINUE') : options.get('lessonLocationPopupTitle'),
                    content: options.get('useLessonLocationDefaultPopupDescription') ? _lang('PUB_LASTPAGE') + (pageOrder+1) + " )" : options.get('lessonLocationPopupDescription')
                };

                var windowModel = new ContinueWindowModel( { type:"modal", modal:true } );
                var windowView = new ContinueWindowView( { windowModel: windowModel } );
                windowView.on('open-last-visited-page', function() {

                    _that.goToPageByOrder(pageOrder);
                });
                $(__meta__.darkanContainer).append(windowView.render(windowData).$el);
                windowView.centerWindow();
                
                break;
        }

        // if(pageOrder && pageOrder != 0){

	       //  if ( !isNaN(pageOrder) && _.isNumber(pageOrder) ) {

	       //      var windowData = {
	       //          title: _lang('PUB_LASTPAGE_CONTINUE'),
	       //          content: _lang('PUB_LASTPAGE') + (pageOrder+1) + " )"
	       //      };

	       //      var windowModel = new ContinueWindowModel( { type:"modal", modal:true } );
	       //      var windowView = new ContinueWindowView( { windowModel: windowModel } );
	       //      windowView.on('open-last-visited-page', function() {

	       //          _that.goToPageByOrder(pageOrder);
	       //      });
	       //      $(__meta__.darkanContainer).append(windowView.render(windowData).$el);
	       //      windowView.centerWindow();
	       //  }
        // }
    },

	goToPageByOrder: function(order) {
		var pageToLoad = this.model.get('pages').at(order);
		if (pageToLoad) {
			this.stage.loadPage(pageToLoad);
		}
	},

	goToPageByModel: function(pageToLoad, direction) {

        _log('Go to page', pageToLoad);
		if (pageToLoad && this.checkPageVisible(pageToLoad)) {
			this.stage.loadPage(pageToLoad);
		}else{

            var activePageOrder = pageToLoad.collection.indexOf(pageToLoad);

            if(activePageOrder != -1 && direction){

                if(direction == 'next'){
                    pageToLoad = this.model.get('pages').at( activePageOrder + 1 );
                }

                if(direction == 'prev'){
                    pageToLoad = this.model.get('pages').at( activePageOrder - 1 );
                }

                this.goToPageByModel(pageToLoad, direction);
            }
        }
	},

	getFirstPageToLoad: function() {
        var par = Utils.getURLParam();
        for (var paramName in par) {
            if (paramName == 'p') {
                var pageOrder = parseInt(par[paramName]) - 1;
                var pageModel = this.model.get('pages').at( pageOrder );
                if (pageModel) {
                    return pageModel;
                }
            }
            if (paramName == 'darkan_p') {
                var pageOrder = parseInt(par[paramName]);
                var pageModel = this.model.get('pages').at( pageOrder );
                if (pageModel) {
                    return pageModel;
                }
            }
        }

		var firstPage = this.model.get('pages').at(0);
		return firstPage;
	},

	goToNextPage: function() {
		var activePageOrder = this.stage.model.collection.indexOf(this.stage.model);
		var pageToLoad = this.model.get('pages').at( activePageOrder + 1 );
		if (pageToLoad) {
			this.goToPageByModel(pageToLoad, 'next');
		}
	},

	goToPreviousPage: function() {

		var activePageOrder = this.stage.model.collection.indexOf(this.stage.model);
		var pageToLoad = this.model.get('pages').at( activePageOrder - 1 );
		if (pageToLoad) {
            this.goToPageByModel(pageToLoad, 'prev');
		}
	},

    checkPageVisible: function(pageModel) {

        if(pageModel.get('options').get('active')){
            return true;
        } else{
            return false;
        }
    }
});