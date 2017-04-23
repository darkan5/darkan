var TopMenuView = Backbone.View.extend({
	
	//el: _layout.menu_top,

    template: _.template($('#top-menu-template-default-normal').html()),

	events: {
		'click .topmenu-export': 'openExportWindow',
		'click .topmenu-import': 'openImportWindow',
        'click .topmenu-newpage': 'openNewpageWindow',
		'click .topmenu-project-version': 'openProjectVersionWindow',
		'click .topmenu-publish': 'openPublishWindow',
        'click #view': 'openPreviewWindow',
		'click #topmenu-sound-manager': 'openSoundManagerWindow',
		'click #share-project': 'openShareProjectWindow',
		'click #project-options': 'openProjectOptionsWindow',
		'click #topmenu-purge-project': 'tryClearProject',
        'click #close-project': 'closeProject',
        'click #languages-list': 'changeLanguage',
        'click #topmenu-extras-db': 'dropboxIntegration',
        'click #topmenu-extras-fbphoto': 'facebookIntegration',
        'click #topmenu-extras-videosearch': 'openVideoSearchWindow',
        'click #topmenu-extras-imagesearch': 'openImageSearchWindow',
        // 'click .lms': 'openAdminPanel',
        'click .topmenu-variables': 'openCreateNewVariableWindow',

        'click .topmenu-back': 'historyBack',
        'click .topmenu-prev': 'historyPrev',
        'click .topmenu-cut': 'cutComponents',
        'click .topmenu-copy': 'copyComponents',
        'click .topmenu-paste': 'pasteComponents',
        'click .topmenu-paste-special': 'pasteSpecialComponents',
        'click .topmenu-duplicate': 'duplicateComponents',
        'click .topmenu-move-components-to-new-layer': 'moveComponentsToNewLayer',
        'click .topmenu-open-existing-project': 'openExistingProject',

	},

	initialize: function(data) {

        // this.projectModel = data.projectModel;

        this.detectState();
        this.afterInitialize();

        var capabilities = Capabilities.getInstance();
        capabilities.on('change', this.onCapabilitiesChanged, this);
        capabilities.getCapabilities();
	},


    historyBack: function(){
        this.trigger('topmenu-action', 'history-back');
    },

    historyPrev: function(){
        this.trigger('topmenu-action', 'history-prev');
    },

    cutComponents: function(){
        this.trigger('topmenu-action', 'cut-components');
    },

    copyComponents: function(){
        this.trigger('topmenu-action', 'copy-components');
    },

    pasteComponents: function(){
        this.trigger('topmenu-action', 'paste-components');
    },

    pasteSpecialComponents: function(){
        this.trigger('topmenu-action', 'paste-special-components');
    },

    duplicateComponents: function(){
        this.trigger('topmenu-action', 'duplicate-components');
    },

    moveComponentsToNewLayer: function(){
        this.trigger('topmenu-action', 'move-components-to-new-layer');
    },

    openExistingProject: function(){
        this.trigger('topmenu-action', 'open-existing-project');
    },

    openSoundManagerWindow: function(){

        var soundManagerWindow = WindowFactory.createSoundManagerWindow();

        $('body').append(soundManagerWindow.render().$el);
    },

    openCreateNewVariableWindow: function(){

        var createNewVariableWindow = WindowFactory.createCreateNewVariableWindow();

        $('body').append(createNewVariableWindow.render().$el);
    },

    onCapabilitiesChanged: function(capabilitiesModel) {

        this.capabilitiesParmasList = capabilitiesModel.createParams([
            { name:'publish', identifier:'.topmenu-publish'},
            { name:'versioning', identifier:'.topmenu-project-version'},
            { name:'adminPanel', identifier:'.lms'},
        ]);

        var deleteEventsVisitor = DeleteEventsVisitor.getInstance();
        this.accept(deleteEventsVisitor);
        capabilitiesModel.off();
    },

    // openAdminPanel: function(e) {

    //     var href = '../../lms/';
    //     window.open(href);
    // },


    accept: function(visitor) {
        visitor.visit(this);
    },

    afterInitialize: function() {
        // To override
    },


    getUserProfileIcon: function() {
        
    },

    addTitleToButtons: function(){

         this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'bottom',
            width: 300,
            height: 200
        });
    },

    openProjectVersionWindow: function() {
        this.trigger('open-project-version-window')
    },

    openImageSearchWindow: function() {
        var _that = this;

        this.trigger('open-images-window');
    },

    openVideoSearchWindow: function() {
        var _that = this;

        this.trigger('open-video-window');
    },

    dropboxIntegration: function() {
        var _that = this;

        var options = {
            // Required. Called when a user selects an item in the Chooser.
            success: function(files) {
                //alert(files[0].link);

                _that.trigger('imageupload-link', files[0].link);
            },

            // Optional. Called when the user closes the dialog without selecting a file
            // and does not include any parameters.
            cancel: function() {

            },

            // Optional. "preview" (default) is a preview link to the document for sharing,
            // "direct" is an expiring link to download the contents of the file. For more
            // information about link types, see Link types below.
            linkType: "direct",

            // Optional. A value of false (default) limits selection to a single file, while
            // true enables multiple file selection.
            multiselect: false,

            // Optional. This is a list of file extensions. If specified, the user will
            // only be able to select files with these extensions. You may also specify
            // file types, such as "video" or "images" in the list. For more information,
            // see File types below. By default, all extensions are allowed.
            extensions: ['.jpg', '.png', '.jpeg']
        }
        
        Dropbox.choose(options);
    },

    facebookIntegration: function(e) {
        var _that = this;

        var id = null;
        FB.getLoginStatus(function(response) {
                if (response.authResponse) {
                        if ( $(this).attr('data-id') ) id = $(this).attr('data-id');
                        fbphotoSelect(id, _that.uploadFileByLink);
                } else {
                        FB.login(function (response) {
                                if (response.authResponse) {
                                        if ( $(this).attr('data-id') ) id = $(this).attr('data-id');
                                        fbphotoSelect(id, _that.uploadFileByLink);
                                }
                        }, {scope:'user_photos, friends_photos'});
                }
        });


    },

    uploadFileByLink: function(link) {
        alert(link);
    },

    changeLanguage: function(e) {

        var _that = this;
        var language = $(e.target).text();


        DataAccess.changeLanguage(
            { lang: language },
            function(data) {

                _that.eraseCookie('darkanlocale');
                _that.createCookie('darkanlocale', language, 365);

                location.reload();

            },
            function(data) { _log('data', data) }
        );
    },

    closeProject: function() {
        
        // window.location.assign('../../app');

        // DataAccess.calculateProjectSize(
        //     {  },
        //     function(data) {


        //         // _that.eraseCookie('sitelang');
        //         // _that.createCookie('sitelang', language, 365);

        //         // location.reload();


        //         window.location.assign('../../app');

        //     },
        //     function(data) { _log('data', data) }
        // );
    },

	openPreviewWindow: function() {
		var _that = this;

        var previewWindow = WindowFactory.createPreviewWindow();
        // previewWindow.setModel();
        previewWindow.showPreview();

        previewWindow.on('open-publish-window', function() {
        	_that.openPublishWindow();
        });
        previewWindow.on('open-export-window', function() {
        	_that.openExportWindow();
        });

        $('body').append(previewWindow.render().$el);
	},

	openShareProjectWindow: function() {
        var shareWindow = WindowFactory.createShareWindow();

        // var dataToRender = { model: this.projectModel.toJSON(), winType: 'list' };

        // $('body').append(shareWindow.render(dataToRender).$el);


        DataAccess.getSharedUsers(
            { },
            function(data) {

                var dataToRender = { usersList: data.usersList, winType: 'list' };

                $('body').append(shareWindow.render(dataToRender).$el);


            },
            function(data) { _log('data', data) }
        );
	},

	openProjectOptionsWindow: function() {
        var projectOptionsWindow = WindowFactory.createProjectOptionsWindow();
        $('body').append(projectOptionsWindow.render().$el);

	},

	openExportWindow: function() {
        var exportWindow = WindowFactory.createExportWindow();
        $('body').append(exportWindow.render().$el);
	},

	openImportWindow: function() {
        var importWindow = WindowFactory.createImportWindow();
        $('body').append(importWindow.render().$el);
	},

	openNewpageWindow: function() {
		var _that = this;

//        var newpageWindow = WindowFactory.createNewpageWindow();
//
//        newpageWindow.on('add-new-blank-page', function(){
//        	_that.trigger('add-new-blank-page');
//        });
//
//        $('body').append(newpageWindow.render().$el);

        _that.trigger('add-new-blank-page');
	},

	openPublishWindow: function() {


        DataAccess.preparePreview(
            {},
            function(data) {

                var publishWindow = WindowFactory.createPublishWindow();
                $('body').append(publishWindow.render().$el);

            },
            function(data) {
                _log('FAILED preparePreview', data);
            }
        );
	},

    tryClearProject: function(){

        this.trigger('clear-project-popup', {}, this);
    },

    clearProject: function( onClearProjectResult, onClearProjectFault ){

        var _that = this;

        DataAccess.clearProject(
            {  },
            function(data) {
                onClearProjectResult();
            },
            function(data) {
                onClearProjectFault();
            }
        );
    },

    createCookie: function(name, value, days) {
        var expires;

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/;domain=." + __meta__.domain;

    },

    readCookie: function(name) {
        var nameEQ = escape(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
        }
        return null;
    },

    eraseCookie: function(name) {
        this.createCookie(name, "", -1);
    },

    render:function(){

        this.$el.attr('id', 'menu-top');

        var template = this.template(this.serializeData());
        this.$el.html(template);

        this.$el.find('#menu-top-tabs').tabs({
            event: "mousedown",
            select: function(event, ui) {

            },
            create: function(event, ui){

            }
        });

        this.getUserProfileIcon();

        this.addTitleToButtons();

        _layout.text_editor_image = this.$el.find('#text-editor-image');
        _layout.menu_top_tabs = this.$el.find('#menu-top-tabs');

        return this;
    },

    serializeData: function(){
        return {};
    },


    setNormalState: function() {
        this.template = _.template($('#top-menu-template-default-normal').html());
    },

    setBasicState: function() {
        this.template = _.template($('#top-menu-template-default-basic').html());
    },

    setTestDriveState: function() {
        // this.template = _.template($('#top-menu-template-default-normal').html());
        this.template = _.template($('#top-menu-template-default-test-drive').html());
    },

    detectState: function() {

        var state = State.getStateType();

        switch(state){

            case 'normal':
                this.setNormalState();
                break;

            case 'basic':
                this.setBasicState();
                break;

            case 'test-drive':
                this.setTestDriveState();
                break;    

            default :
                this.setNormalState();
                break;

        }
    },

    disableTopMenuButtons: function(projectModel){
        var type = projectModel.type;

        switch(type){
            case 'not-editable':

                this.disableButtons();

                if(projectModel.get('collection').length > 0){
                    this.changeCopyFunction();
                }

                break;

            default:

                this.enableButtons();

                break;
        }
    },

    disableButtons: function(){

        this.capabilitiesParmasList = [
            { value:false, identifier:'.topmenu-back'},
            { value:false, identifier:'.topmenu-prev'},
            { value:false, identifier:'.topmenu-cut'},
            { value:false, identifier:'.topmenu-copy'},
            { value:false, identifier:'.topmenu-paste'},
            { value:false, identifier:'.topmenu-paste-special'},
            { value:false, identifier:'.topmenu-duplicate'},
            { value:false, identifier:'.topmenu-move-components-to-new-layer'},
        ];

        var deletePageEventsVisitor = DeletePageEventsVisitor.getInstance();
        this.accept(deletePageEventsVisitor);
    },

    enableButtons: function(){

        this.capabilitiesParmasList = [
            { value:true, identifier:'.topmenu-back', fun:'historyBack'},
            { value:true, identifier:'.topmenu-prev', fun:'historyPrev'},
            { value:true, identifier:'.topmenu-cut', fun:'cutComponents'},
            { value:true, identifier:'.topmenu-copy', fun:'copyComponents'},
            { value:true, identifier:'.topmenu-paste', fun:'pasteComponents'},
            { value:true, identifier:'.topmenu-paste-special', fun:'pasteSpecialComponents'},
            { value:true, identifier:'.topmenu-duplicate', fun:'duplicateComponents'},
            { value:true, identifier:'.topmenu-move-components-to-new-layer', fun:'moveComponentsToNewLayer'},
        ];

        var addEventsVisitor = AddEventsVisitor.getInstance();
        this.accept(addEventsVisitor);
    },

    changeCopyFunction: function(){

        this.capabilitiesParmasList = [
            { value:true, identifier:'.topmenu-copy', fun:'copyComponentsFromOtherProject'}
        ];

        var addEventsVisitor = AddEventsVisitor.getInstance();
        this.accept(addEventsVisitor);
    },

    copyComponentsFromOtherProject: function(){

        this.trigger('topmenu-action', 'copy-conponents-from-other-project');
    },

    accept: function(visitor) {
        visitor.visit(this);
    },

    showWorkingAsOffline: function(){
        this.$el.find('.online-working-status').attr('status', 'offline');
    },

    showWorkingAsOnline: function(){
        this.$el.find('.online-working-status').attr('status', 'online');
    },

});

TopMenuView.create = function(data){

    var type = Device.getDeviceType();

    switch(type){

        case 'browser':
            return new TopMenuViewBrowser(data);
            break;

        case 'ipad':
            return new TopMenuViewIPad(data);
            break;

        default :
            return new TopMenuView(data);
            break;

    }

}