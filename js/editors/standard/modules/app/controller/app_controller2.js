var AppController2 = Backbone.View.extend({

	className: 'app-controller-2',

	template: _.template($('#app-controller-template').html()),

    keys : [],

    events: {
        drop: 'onFileDrop'
    },

	initialize: function(){

        var _that = this;

		var darkanEditorAplicationAPI = DarkanEditorAplicationAPI.getInstance();
        darkanEditorAplicationAPI.connect();


        $(document).bind("contextmenu", function(e) {

            if(e.currentTarget.activeElement != undefined){

                if (e.currentTarget.activeElement.localName === "input" ||
                    e.currentTarget.activeElement.localName === "textarea" ||
                    e.currentTarget.activeElement.className === 'note-editable'
                    ) {
                    // pokaz menu kontekstowe przegladarki

                } else {

                    return false;
                }
            }else{
                return false;
            }
        });

        $(document).on('mousedown', function(e){

            if( !$(e.target).parents().is('.context-menu') && !$(e.target).is('.context-menu')){
                ContextMenuContainer.closeMenu();
            }
        });


        $(document.body).on('keyup paste', 'input[type="number"]', function(){
            var value = $(this).val();

            if(value == "") $(this).val('');
        });

        $(document).on('keydown', function(e){

            //e.stopPropagation();
            //e.preventDefault();

            //if(e.currentTarget.activeElement != undefined){

                if ((e.currentTarget.activeElement.localName === "input" ||
                    e.currentTarget.activeElement.localName === "textarea" ||
                    e.currentTarget.activeElement.className === 'note-editable') && e.which != 27
                    ) {

                        //return true;
                        _log('Zaznaczony input', {}, _log.error);

                } else {

                    _that.keydown(e);
                    //return false;
                }
            //}else{
               // _that.keydown(e);
            //}



            return true;
        } );

        $(document).on('keyup', function(e){

            //e.stopPropagation();
            //e.preventDefault();

            _that.keyup(e);

            //return false;
        });

	},

    onFileDrop: function(e){

        // _log('onFileDrop e', e);
        // _log('onFileDrop e parent', $(e.target).parent());

        if($(e.target).parent().hasClass('component-inner')){

            return;
        }


        if($('.window-import-view').length > 0){
            return;
        }

        var isDarkanExtension = Utils.isDarkanExtension(e);

        _log('isDarkanExtension', isDarkanExtension);

        if(isDarkanExtension){

            var importWindow = WindowFactory.createImportWindow();
            $('body').append(importWindow.render().$el);

            importWindow.importPsdOnDrop(e);

        }else{
            StageView.instance.uploadOnFileDrop(e);
        }


    },

    keydown: function(e) {

        var _that = this;

        if(this.keys[e.keyCode] == undefined){
            this.keys[e.keyCode] = true;

            if(ProjectView.selected){
                ProjectView.selected.onKeyDown(e);
            }

            //if(this.imageWindow != undefined) { return; }

        }

    },

    keyup: function(e) {
        //console.log('keyup ' + e.which);

        delete this.keys[e.keyCode];
    },

	render: function(){

		this.$el.attr('id', 'darkanapp');

		var template = this.template(this.serializeData());
        this.$el.html(template);

		return this;
	},

	afterRender: function(){

		this.connect();

		
		// var projectView = new ProjectView();
		// this.$el.append(projectView.render().$el);

		// _log('projectView', projectView);

	},


	serializeData: function(){
		return {};
	},

	connect: function(){

		var _that = this;
		
		DataAccess.connect({}, function(){ _that.onConnect() }, function(){ _that.onNoConnect() });

        this.keepSession();

	},

	onConnect: function(){

		var _that = this;

        if(this.isCreated){
            return;
        }

        if(State.isTestDrive()){
            this.showTestDriveState();
        }

		this.topMenuView = TopMenuView.create({ projectModel:ProjectModel.instance });
        this.topMenuView.on('add-new-blank-page', function() {

            if(ProjectView.selected){
                ProjectView.selected.createNewPageTopMenu();
            }

        });

        this.topMenuView.on('open-project-version-window', function() {
            _that.openProjectVersionWindow();
        });
        this.topMenuView.on('open-images-window', function() {

            if(ProjectView.selected){
                ProjectView.selected.openImageWindow(2);
            }

        });
        this.topMenuView.on('open-video-window', function() {

            if(ProjectView.selected){
                ProjectView.selected.openVideoWindow(1);
            }
        });

        this.topMenuView.on('topmenu-action', function(action) {

            if(ProjectView.selected){
                ProjectView.selected.topMenuAction(action);
            }
        });

        

        // this.topMenuView.on('imageupload-link', function(imageUrl) {
        //     _that.addComponent( 'image', function(componentView){
        //         componentView.uploadOnLink(imageUrl, true);
        //     });
            
        // });

        // this.topMenuView.on('clear-project-popup', function(){

        //     var popup = PopupFactory.createStandardPopup( {}, _that.topMenuView );
        //     popup.on('ok-button-click', function(){
        //         _that.topMenuView.clearProject(
        //             function(){


        //                 _that.stageView.resetStage();
        //                 _that.rightMenuView.resetList();

        //                 _that.rightMenuView.loadProject();
        //             },
        //             function(){

        //             });
        //     });

        //     $('body').append(popup.render({title: _lang('POPUP_DELPROJECT_TITLE'), content: _lang('POPUP_DELPROJECT_MESSAGE')}).$el);

        // });
		this.$el.find('#menu-top-wrapper').html(this.topMenuView.render().$el);

		this.leftMenuView = new LeftMenuView({collection: toolbarItemsCollection});
		this.leftMenuView.on('menu-item-click', function(model){

            if(ProjectView.selected){
                ProjectView.selected.onLeftMenuClick(model);
            }
            
        });

		this.$el.find('#menu-left-wrapper').html(this.leftMenuView.render().$el);

        this.projectsController = new ProjectsController();
		this.projectsController.on('disable-top-menu-buttons', this.disableTopMenuButtons, this);
		this.$el.find('#projects-controller-wrapper').html(this.projectsController.render().$el);
		this.projectsController.afterRender();

        this.isCreated = true;

	},

    disableTopMenuButtons: function(projectModel){
        this.topMenuView.disableTopMenuButtons(projectModel);
    },

    openProjectVersionWindow: function(activeTab) {
        var _that = this;
        var projectVersionWindow = WindowFactory.createProjectVersionWindow();

        $('body').append(projectVersionWindow.render().$el);
    },

	onNoConnect: function(){

	},

	keepSession: function(){

		if (__meta__.userID != -1) {
            // keep session
            setInterval(function() {
                DataAccess.keepSession(
                    {},
                    function(data){ 
                        var dataJ = JSON.parse(data);

                        if (!dataJ.login) {
                            window.location.href = "http://" + __meta__.serverLink + "/auth/login";
                        }
                    },
                    function(data){ _log('data fault', data) });
            }, 60000);
        }
	},

	showTestDriveState: function() {

        var _that = this;

        if(!this.getTestDriveAsVisited()){
            var testDriveWindow = WindowFactory.createTestDriveWindow();
            $('body').append(testDriveWindow.render().$el);
        }

        var timerWindow = WindowFactory.createTimerWindow();

        timerWindow.on('onTimerComplete', function(){
            _that.showRestartWindow();
        });


        $('body').append(timerWindow.render().$el);
    },

    getTestDriveAsVisited: function () {

        return Utils.getCookie('testdrive');
    },
});