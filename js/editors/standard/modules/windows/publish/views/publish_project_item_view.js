var PublishProjectItemView = Backbone.View.extend({

    tagName: 'li',
    className : 'publish-project-item',

    template: _.template($('#publish-project-item-template').html()),

    fbButtonEnabled: true,

    events: {
        'sort-rows': 'sortRows',
        'click .project-visible': 'changeVisibility',
        'click .project-options': 'showOptionsWindow',
        'click .project-links': 'showShareWindow',
        'click .project-delete': 'showDeleteConfirm',
        'click .published-project-name': 'editProjectName',
        'click .published-project-description': 'editProjectDescription',
        'keyup .name-edit': 'keyupCheck',
        'keyup .description-edit': 'keyupCheck',
        'focusout .name-edit': 'finishEditProjectName',
        'focusout .description-edit': 'finishEditProjectName',
        'click .published-project-thumb-wrapper': 'uploadOnFileClick',
        'drop .loaded-dropzone': 'uploadOnFileDrop',
        'click .project-mailing': 'openMailingWindow',
        'click .open-in-new-tab': 'openPublicationInNewTab',
        'click .facebook-share': 'openSharingWindowFB'
    },

    initialize: function() {
        this.model.on('render-hide', this.hide, this);
        this.model.on('render-show', this.show, this);
        this.listenTo(this.model, 'change:ord', this.saveToServer );

        
    },

    onCapabilitiesChanged: function() {

        var capabilitiesModel = Capabilities.getInstance();

        this.capabilitiesParmasList = capabilitiesModel.createParams([
            { name:'publishfacebook', identifier:'.facebook-share'},
            { name:'mailing', identifier:'.project-mailing'},
        ]);

        var deleteEventsVisitor = DeleteEventsVisitor.getInstance();
        this.accept(deleteEventsVisitor);
        capabilitiesModel.off();
    },

    accept: function(visitor) {
        visitor.visit(this);
    },

    bindings: {
        '.name-value': 'name',
        '.name-edit': 'name',
        '.description-value': 'summary',
        '.description-edit': 'summary'
    },

    openMailingWindow: function() {
        var bannerId = this.model.get('id_banner');
        var mailingLink = "../lms/elearning/mailing/" + bannerId;
        window.open(mailingLink);
        // var mailingWindow = WindowFactory.createMailingWindow(this.model);
        // $('body').append( mailingWindow.render().$el );
        // mailingWindow.initEditors();
    },

    openSharingWindowFB: function() {
        var _that = this;

        if (this.fbButtonEnabled) {

            this.disableFbButton();

            var picture = _that.model.get('thumb') != "none" ? _that.model.get('thumb') : window.location.protocol + "//" +__meta__.serverLink + "/assets/img/logo_normal.png";

                // $.post(
                //     'https://graph.facebook.com',
                //     {
                //         id: _that.getFbDirectLink(),
                //         scrape: true
                //     },
                //     function(response){

                        // setTimeout(function() {
                            window.open(
                                "https://www.facebook.com/sharer/sharer.php?u=" +
                                    _that.getFbDirectLink()
                                ,
                                "share_window",
                                'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=500');

                            _that.enableFbButton();
                        // }, 2000);
                //     }
                // );


        }

        // FB.ui({
        //     method: "feed",
        //     name: _that.model.get('name'),
        //     link: _that.getFbDirectLink(),
        //     picture: _that.model.get('thumb') != "none" ? _that.model.get('thumb') : window.location.protocol + "//" +__meta__.serverLink + "/assets/img/logo_normal.png",
        //     description: _that.model.get('summary'),
        //     caption: _that.model.get('name')
        // }, function(response){});
    },    

    enableFbButton: function() {
        this.fbButtonEnabled = true;
        this.$el.find('.facebook-share').removeAttr('disabled');
        this.$el.find('.facebook-share').css({
            opacity: '1'
        });
    },

    disableFbButton: function() {
        this.fbButtonEnabled = false;
        this.$el.find('.facebook-share').attr('disabled', 'disabled');
        this.$el.find('.facebook-share').css({
            opacity: '.4'
        });
    },

    getFbDirectLink: function() {
        return __meta__.facebook_link + this.model.get('path');
    },

    openPublicationInNewTab: function() {
        var link = __meta__.content_link + this.model.get('path');
        window.open(link);
    },

    renderImage: function(){
        this.renderPath();
    },

    renderPath: function() {

        var hash = this.model.get('path');

        _log('Publication Model', this.model);

         if(hash != undefined && hash != ""){

            // var src = __meta__.APP_LINK + '../banners/' + hash + '/thumb/' + thumb;
            var thumb = __meta__.publications_link + hash + '/thumb/thumb.png';


            this.$el.find('.published-project-thumb').css('background-image', 'url( ' + thumb +  ' )');
         }
    },

    uploadOnFileDrop: function(e){

        this.$el.find('.loaded-dropzone').fadeOut(500);
        var properties = this.getDropProperties(e);
        this.runUploadProcess( properties );
    },

    uploadOnFileClick: function(e){
        var _that = this;


        var acceptTypeFormat = this.getAcceptTypeFormat();
        var input = $('<input type="file" name="files[]" accept="'+ acceptTypeFormat +'">');
        input.css({
            display: 'none'
        });

        this.$el.append(input);
        input.click();

        input.change(function(e) {

            _that.uploadOnInputData(e, this, false);
            $(this).remove();
        });
    },

    getAcceptTypeFormat: function() {
        var _imageTypes = this.getExtensionArray();
        var acceptTypeString = '';

        _.each(_imageTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        return acceptTypeString;
    },

    runUploadProcess :function( properties ){

        if(this.model.uploadingNow){
            return;
        }

        var specialData = this.getSpecialProperties();
        var toSend = $.extend({}, properties, specialData);

        this.fileUploader =  FileUploader.createPublishBannerIconLoader( properties.data.name, this.model, this );

        if(this.fileUploader == undefined){

            this.showPupup({ message:"Extension file is no allowed" }, this);
            return;
        }

        this.fileUploader.sendFile( toSend );
        this.fileUploader.on('on-result', this.onResult,  this);
        this.fileUploader.on('on-fault', this.onFault,  this);
        this.fileUploader.on('on-complete', this.onComplete,  this);
        this.fileUploader.on('on-progress', this.onProgress,  this);

    },

    onResult: function(data) {

        if(data.key == 1){
            this.showPupup({message:'Extension file is no allowed'}, this);
            return;
        }
    },

    onFault: function(data) {

        this.showPupup(data, this);
    },

    onComplete: function(data) {

        this.hideProgressPercent(data);
        this.fileUploader.off();
        this.fileUploader = undefined;
    },

    onProgress: function(data) {
        this.showProgressPercent( data );
    },

    getSpecialProperties: function() {
        return {};
    },

    showProgressPercent :function(data){

        FileUploader.showProgressPercent(data, this);
    },

    hideProgressPercent :function(data){

        FileUploader.hideProgressPercent(data, this);
    },

    showPupup :function(data, sender){

        var popup = PopupFactory.createStandardPopup( data, sender );

        $('body').append(popup.render().$el);
    },

    getExtensionArray: function(){
       return ['*'];
    },

    uploadOnInputData: function(e, input, resizeImage) {

        var properties = this.getInputProperties(e, input);

        this.runUploadProcess( properties );
    },

    getDropProperties: function(e){
        return FileUploader.getDropProperties(e);
    },

    getInputProperties: function(e, input){
        return FileUploader.getInputProperties(e, input);
    },



    sortRows: function(event, position){
        this.$el.trigger('sort-rows-back', [this.model, position]);
    },
    

    keyupCheck: function(e) {
        if (e.keyCode === 27) {
            this.finishEditProjectName();
        }
    },

    editProjectName: function() {
        this.$el.find('.name-value').hide();
        this.$el.find('.name-edit').show().focus();
    },

    finishEditProjectName: function() {
        this.$el.find('.name-value').show();
        this.$el.find('.name-edit').hide();
        this.$el.find('.description-value').show();
        this.$el.find('.description-edit').hide();

        this.saveToServer();
    },

    editProjectDescription: function() {
        this.$el.find('.description-value').hide();
        this.$el.find('.description-edit').show().focus();
    },

    changeVisibility: function() {
        var active = this.model.get('active');
        this.model.set('active', !active);
        this.renderVisibility();
        
        this.saveToServer();
    },

    saveToServer: function() {
        DataAccess.setPublicationOptions(
            this.model.toJSON(),
            function(data) {
            },
            function(data) {
                _log('Publication data NOT updated!', data, _log.dataaccessOutFault);
            }
        );
    },

    hide: function() {
        this.$el.css({display: "none"});
    },

    show: function() {
        this.$el.css({display: "block"});
    },

    showOptionsWindow: function(e) {
        var _that = this;
        if(this.optionsWindow == undefined){
            this.optionsWindow = new PublicationOptionsWindow({ projectModel: this.model });
            this.optionsWindow.on('on-close', function(){
                _that.optionsWindow = undefined;
            });

            var dataToRender = this.model.toJSON();

            var windowPosition = {
                left: e.pageX,
                top: e.pageY
            };
            $('body').append( this.optionsWindow.render(dataToRender).$el );
            this.optionsWindow.setWindowPosition(windowPosition);
        }
    },

    showShareWindow: function(e) {
        var _that = this;
        if(this.sharingWindow == undefined){
            this.sharingWindow = new PublicationSharingWindow({ projectModel: this.model });
            this.sharingWindow.on('on-close', function(){
                _that.sharingWindow = undefined;
            });

            var dataToRender = this.model.toJSON();

            var windowPosition = {
                left: e.pageX,
                top: e.pageY
            };
            $('body').append( this.sharingWindow.render(dataToRender).$el );
            this.sharingWindow.setWindowPosition(windowPosition);
        }
    },

    showDeleteConfirm: function() {
        var _that = this;
        var popup = PopupFactory.createStandardPopup( {} );
        popup.on('ok-button-click', function(){
            _that.deletePublication(_that.model);
        });
        $('body').append(popup.render({title: _lang('BANNER_DELETE_MSG'), content: _lang('BANNER_DELETE_CONTENT')}).$el);
    },

    renderVisibility: function() {
        var active = this.model.get('active');
        if (active) {
            this.$el.css({opacity: '1'});
            this.$el.find('.published-project-thumb').removeClass('notactive');
            this.$el.find('.published-project-options > .project-visible').attr({
                class: 'project-visible publish-option visible'
            });
        }else {
            this.$el.css({opacity: '.2'});
            this.$el.find('.published-project-thumb').addClass('notactive');
            this.$el.find('.published-project-options > .project-visible').attr({
                class: 'project-visible publish-option notvisible'
            })
        }
    },

    render: function() {
        var projectBlock = this.template(this.model.toJSON());
        this.$el.html(projectBlock);
        this.renderVisibility();
        this.renderPath();
        this.stickit();

        this.$el.find('.tooltip-ready').tooltip({
            html: true,
            animated: 'fade',
            placement: 'left'
        });

    	return this;
    },

    afterRender: function(){

        this.onCapabilitiesChanged();

    },

    closeLoaderResult: function(){

        var loader = this.$el.find('.publication-loader-link');
        loader.html(_lang('DELETE_PUBLICATION_MASAGE_RESULT'));

        setTimeout(function(){
            loader.remove();
        }, 2500);
    },

    closeLoaderFault: function(){

        var loader = this.$el.find('.publication-loader-link');
        loader.html(_lang('DELETE_PUBLICATION_MASAGE_FAULT'));

//        setTimeout(function(){
//            loader.remove();
//        }, 1000);
    },

    createLoader: function(){

        var loader = $('<div>');
        //loader.attr('src', 'content_template/css/gif-load.gif');
        loader.addClass('publication-loader-link');
        loader.html(_lang('DELETE_PUBLICATION_MASAGE'));

        return loader;
    },

    deletePublication: function(pModel) {
        var _that = this;

        var img = this.createLoader();
        this.$el.append(img);


        var request = {
            type: 'deletePublication',
            bannerID: pModel.get('id_banner'),
            hash: pModel.get('path'),
            projectID: __meta__.projectID
        };

        DataAccess.publicationRequest(
            {
                request: JSON.stringify(request)
            },
            function(data) {

                _that.$el.hide(500, function() {
                    // _that.trigger('get-published-data');
                });

                _that.closeLoaderResult();

                // _that.removeModelAndUpdateOrders(pModel.collection);
            },
            function(data) {
                _log('data', data);
                _that.closeLoaderFault();
            }
        );

        // DataAccess.deletePublication(
        //     pModel.toJSON(),
        //     function(data) {
        //         _that.$el.hide(500, function() {
        //             _that.trigger('render-whole-list');
        //         });
        //         _that.removeModelAndUpdateOrders(pModel.collection);
        //     },
        //     function(data) { _log('Error deleting publication', data) }
        // );
    },

    removeModelAndUpdateOrders: function(collection) {
        collection.remove(this.model);
        collection.each(function(pModel, i) {
            pModel.set('ord', i+1);
        });
    }

});