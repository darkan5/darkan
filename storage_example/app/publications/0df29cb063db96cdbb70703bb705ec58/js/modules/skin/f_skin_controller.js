var SkinController = Backbone.View.extend({

	el: $('#skin'),

	muted: false,

	events: {
		'click #next': 'goToNextPage',
		'click #previous': 'goToPreviousPage',
		'skin-update-scrollbar': 'updateScroller',
		'skin-update-position': 'centerCourseScreen',
		'stage-model-changed': 'stageModelChanged',
		'click #helpbtn': 'showHelpWindow',
		'click #glossarybtn': 'showGlossaryWindow',
		'click #glossarybtn-demo': 'showGlossaryWindowDemo',
		'click #speakerbtn': 'muteUnmute',
		'click #speakerbtn': 'muteUnmute',
		'click #fullscreen': 'handleFullscreen',
		'click #closebtn': 'closeWindow',
		'click #toc': 'showTableOfContents'
	},

	fullscreenMode: false,

	showCourse: function() {
		this.$el.css({
			visibility: 'visible',
			overflow: 'visible'
		});
	},

	closeWindow: function() {
		top.close();
	},

	muteUnmute: function() {
		if (this.muted) {
			this.unmute();
			this.$el.find('#speakerbtn').attr('off', false);
			this.trigger('unmute-all-sounds');
		} else {
			this.mute();
			this.$el.find('#speakerbtn').attr('off', true);
			this.trigger('mute-all-sounds');
		}
	},

	mute: function() {
		// alert('mute!');
		this.muted = true;
	},

	unmute: function() {
		// alert('unmute!');
		this.muted = false;
	},

	stageModelChanged: function(e, pageModel) {
		var pageOrder = pageModel.collection.indexOf(pageModel) + 1;
		this.updateCounter(pageOrder, pageModel.collection.length);
		this.updateProgressbar(pageOrder, pageModel.collection.length);
	},

	updateCounter: function(pageNumber, allPagesNumber) {
		this.$el.find('#counter').text(pageNumber + "/" + allPagesNumber);
	},

	updateProgressbar: function(pageNumber, allPagesNumber) {
		var progressbar = this.$el.find('#progressbar');
		progressbar.find('#progressbar-inside').css({
			width: ((pageNumber / allPagesNumber) * 100) + "%"
		});
	},

	updateScroller: function() {
        // this.$el.find('#stage').perfectScrollbar();
        // this.$el.find('#stage').perfectScrollbar('update');
	},

	showHelpWindow: function() {

		var content = '';

		var windowData = {
			title: "Help",
			content: content
		};

		var windowModel = new WindowModel( { type:"modal", modal:true } );
		var windowView = new WindowView( { windowModel: windowModel } );
		$(__meta__.darkanContainer).append(windowView.render(windowData).$el);
		windowView.$el.addClass('helpwindow');
		windowView.centerWindow();
	},

	showGlossaryWindow: function(isDemo) {
		var domain = 'http://darkan.local/'
		var url = domain+'dictionary/';
		if (isDemo === true) {
			url = domain+'demodict/';
		}
		var content = '<iframe width="800" frameBorder="0" height="100%" src="'+ url +'"></iframe>';

		var windowData = {
			title: "Słownik",
			content: content
		};

		var windowModel = new WindowModel( { type:"modal", modal:true } );
		var windowView = new WindowView( { windowModel: windowModel } );
		$(__meta__.darkanContainer).append(windowView.render(windowData).$el);

		windowView.$el.find('.window-content').css({
			'padding': '0px',
			'overflow': 'hidden',
		});
		windowView.$el.css({
			'height': '500px'
		});

		windowView.centerWindow();
	},

	showGlossaryWindowDemo: function() {
		this.showGlossaryWindow(true);
	},

	centerCourseScreen: function() {
		var autoScale = ProjectModel.instance.isAutoScale();
		if (!autoScale) {
	    	var skinHeight = this.$el.height();
	    	var windowHeight = $(window).height();
	    	var topCalculated = ((windowHeight/2) - (skinHeight/2));

	    	if (topCalculated < 0) {
	    		topCalculated = 0;
	    	}
	    	this.$el.css({
	    		top: topCalculated + "px"
	    	});

	    	if (this.fullscreenMode) {
	    		this.setScale(this.$el, this.fullscreenScale());
	    	}
		}
	},

	initialize: function() {
		var _that = this;

		this.applyScrollbar();
		this.centerCourseScreen();

		this.addFullscreenEvents();

		this.renderSidebarToc();

	    // window.onresize = function () {
	    // 	_that.centerCourseScreen();
	    // }
	    // window.onresize();
	},

	highlightActiveTocItem: function(pageModel) {
		_log('page model highlightActiveTocItem', pageModel);
		var pageId = pageModel.get('options').get('pageid');
		this.$el.find('.sidebar-toc .sidebar-toc-item').removeClass('active');
		this.$el.find('.sidebar-toc .toc-item[pid="'+pageId+'"] .sidebar-toc-item').addClass('active');
	},

	renderSidebarToc: function() {
		var _that = this;
        var pages = this.model.get('pages');

        var tocList = this.$el.find('.sidebar-toc ul');

        pages.each(function(pModel, order) {
        
            var pageName = pModel.get('options').get('pagename');
            var pageOrder = pModel.collection.indexOf(pModel) + 1;
            var pageID = pModel.get('options').get('pageid');
            var listItem = $('<li></li>', {
                ord: order,
                pid: pageID,
                class: 'toc-item'
            });
            listItem.html('<div class="sidebar-toc-item">' + pageName + '</div>');
            listItem.click(function() {
                // tocList.hide();
                _that.trigger('go-to-page-order', parseInt($(this).attr('ord')));
            })
            tocList.append(listItem);
        });
	},

	showTableOfContents: function() {
		var _that = this;
		var windowModel = new TocWindowModel( { type:"modal", modal:true } );
        var windowView = new TocWindowView( { windowModel: windowModel, model: this.model } );
        windowView.on('go-to-page-order', function(pageOrder) {
            _that.goToPageByOrder(pageOrder);
        });
        $(__meta__.darkanContainer).append(windowView.render().$el);
        windowView.centerWindow();

	},

	goToPageByOrder: function(order) {
		this.trigger('go-to-page-order', order);
	},

	goToNextPage: function(e) {
        var locked = $(e.target).attr('locked') == "true" ? true : false;

        if(!locked){
            this.trigger('go-to-next-page');
        }
	},

	goToPreviousPage: function(e) {
        var locked = $(e.target).attr('locked') == "true" ? true : false;

        if(!locked){
		    this.trigger('go-to-previous-page');
        }
	},

	applyScrollbar: function() {
		// this.$el.find('#stage').perfectScrollbar({
  //           useKeyboard: false,
  //           swipePropagation: false
  //       });
		// this.$el.find('.toc-visible.sidebar-toc').perfectScrollbar({
  //           useKeyboard: false,
  //           swipePropagation: false
  //       });

		// $('body, html').perfectScrollbar({
  //           useKeyboard: false
  //       });
	},

	handleFullscreen: function(e) {
		var _that = this;
        if (typeof document.fullscreen !== "undefined") { (document.fullscreen) ? _that.exitFullscreen() : _that.launchFullscreen(document.documentElement); }
        if (typeof document.mozFullScreen !== "undefined") { (document.mozFullScreen) ? _that.exitFullscreen() : _that.launchFullscreen(document.documentElement); }
        if (typeof document.webkitIsFullScreen !== "undefined") { (document.webkitIsFullScreen) ? _that.exitFullscreen() : _that.launchFullscreen(document.documentElement); }
        if (typeof document.msFullscreenElement !== "undefined") { (document.msFullscreenElement) ? _that.exitFullscreen() : _that.launchFullscreen(document.documentElement); }
	},

	addFullscreenEvents: function() {
		var _that = this;

	    document.addEventListener("fullscreenchange", function () {
	        setTimeout(function() {
	            var frame = _that.$el;
	            (document.fullscreen) ? _that.setScale(frame, _that.fullscreenScale()) : _that.setScale(frame, 1);
	        }, 500);
	    }, false);
	     
	    document.addEventListener("mozfullscreenchange", function () {
	        setTimeout(function() {
	            var frame = _that.$el;
	            (document.mozFullScreen) ? _that.setScale(frame, _that.fullscreenScale()) : _that.setScale(frame, 1);
	        }, 500);
	    }, false);
	     
	    document.addEventListener("webkitfullscreenchange", function () {
	        setTimeout(function() {
	            var frame = _that.$el;
	            (document.webkitIsFullScreen) ? _that.setScale(frame, _that.fullscreenScale()) : _that.setScale(frame, 1);
	        }, 500);
	        
	    }, false);
	     
	    document.addEventListener("MSFullscreenChange", function () {
	        setTimeout(function() {
	            var frame = _that.$el;
	            (document.msFullscreenElement) ? _that.setScale(frame, _that.fullscreenScale()) : _that.setScale(frame, 1);
	        }, 500);
	    }, false);
	},

	setScale: function(obj, val)
	{
	    var scaleValue = 'scale(' + val + ')';
	    
	    obj .css("-webkit-transform", scaleValue)
	        .css("-moz-transform", scaleValue)
	        .css("-ms-transform", scaleValue)
	        .css("-o-transform", scaleValue)
	        .css("transform", scaleValue);
	             
		scaleFactor = val;
		_log('scaleFactor: ' + scaleFactor);
	},

	launchFullscreen: function(element) {
		this.fullscreenMode = true;
		$('#fullscreen').addClass('fullscreen-exit');
	    if(element.requestFullscreen) {
	        element.requestFullscreen();
	    } else if(element.mozRequestFullScreen) {
	        element.mozRequestFullScreen();
	    } else if(element.webkitRequestFullscreen) {
	        element.webkitRequestFullscreen();
	    } else if(element.msRequestFullscreen) {
	        element.msRequestFullscreen();
	    }
	},

	exitFullscreen: function() {
		var _that = this;
		this.fullscreenMode = false;

		$('#fullscreen').removeClass('fullscreen-exit');
	    if(document.exitFullscreen) {
	        document.exitFullscreen();
	    } else if(document.mozCancelFullScreen) {
	        document.mozCancelFullScreen();
	    } else if(document.webkitExitFullscreen) {
	        document.webkitExitFullscreen();
	    } else if(document.msExitFullscreen) {
	        document.msExitFullscreen();
	    }

	    // _that.L.zoomSlider.trigger('change');
	},

	fullscreenScale: function() {
	    var ifcontent =  $('#skin');

	    var ww = $(window).width() - 20;
	    var wh = $(window).height() - 20;
	    var iw = ifcontent.width();
	    var ih = ifcontent.height();
	    var w = ww / iw;
	    var h = wh / ih;

	    if (w > h) {
	        w = h;
	    }
	    return w;
	}



});