var PublishWindowView = LoadedWindowView.extend({

    tagName: 'div',
    className : 'window window-publish-view',

    template: _.template($('#window-publish-template').html()),



    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'close': 'close',
            'click .window-close-button': 'close',
            'click .publish-as-new': 'newPublication',
            'click .override.active': 'overridePublication',
            'change .banner-page-thumb-select': 'changeThumbnailPreviewOnChange',
            'dragenter': 'onFileDragOver',
            'dragleave .loaded-dropzone': 'onFileDragOut',
            'click .upload': 'uploadOnClick',
            'click .edit-project-icon-preview': 'uploadOnClick',
            'drop .loaded-dropzone': 'uploadOnFileDrop',
            // 'click .open-lms-btn': 'openAdminPanel'
        });
    },

    afterInitialize : function(dataModel) {

        var _that = this;

        this.getCapabilities();

        StageView.instance.createPageThumb( function(data){

            if(data != undefined){
                var pageID = parseInt(data.pageID);
                var selectedPageID = parseInt(_that.$el.find('.banner-page-thumb-select').val());

                if(pageID == selectedPageID){

                    _that.renderImage();
                }

                //if('.banner-page-thumb-select').val();
            }
        } );

    },

    onCapabilitiesChanged: function(capabilitiesModel) {

        this.capabilitiesParmasList = capabilitiesModel.createParams([
            { name:'adminPanel', identifier:'.open-lms-btn'},
        ]);

        var deleteEventsVisitor = DeleteEventsVisitor.getInstance();
        this.accept(deleteEventsVisitor);
        capabilitiesModel.off();
    },

    // openAdminPanel: function(e) {

    //     var href = '../../lms/';
    //     window.open(href);
    // },


    getAcceptTypeFormat: function() {
        var _imageTypes = this.getExtensionArray();
        var acceptTypeString = '';

        _.each(_imageTypes, function(option) {
            acceptTypeString += '.' + option + ',';
        });

        return acceptTypeString;
    },

    getExtensionArray: function(){
        return ['*'];
    },

    runUploadProcess :function( properties ){

        if(this.windowModel.uploadingNow){
            return;
        }

        var specialData = this.getSpecialProperties();
        var toSend = $.extend({}, properties, specialData);

        this.fileUploader =  FileUploader.createPublishIconLoader( properties.data.name, this.windowModel, this );

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

    renderAfterComplete: function() {

        var thumb = this.windowModel.get('thumb');

        var projectModelOptions = ProjectModel.instance.get('options');
        projectModelOptions.set('thumb', thumb);

        this.renderImage();

    },

    renderImage: function(){
        this.renderPath();
    },

    renderPath: function(){

        var thumb = ProjectModel.instance.get('options').get('thumb').replace('projects', '');
        thumb = __meta__.projects_link + thumb;

        var r = this.makeR();

        if(thumb != undefined && thumb != ""){

            this.$el.find('.edit-project-icon-preview').css('background-image', 'url(' + thumb +  '?r=' + r + ')');
        }
    },

    makeR: function(){
        return Math.floor((Math.random() * 10000) + 1);
    },

    renderScoreEditor : function(){

        var publishScoreEditorView = EditorsFactory.createPublishScoreEditor();

        var optionsScoreSection = this.$el.find('.options-score-section');
        optionsScoreSection.html(publishScoreEditorView.render().$el);
        publishScoreEditorView.afterRender();
    },

    afterRender : function(){
        var _that = this;

        this.checkIfThumbIsSelected();

        this.$el.find('.darkan-tabs').tabs();

        this.getPublishedData();

        this.renderPagesThumbsList();

        this.renderPath();

        this.renderScoreEditor();

        this.showThumbnail();
        setTimeout(function(){
            _that.$el.find('.edit-project-title-input').focus();
        }, 10);


        _log('getQuestionObject', this.getQuestionsObject());

    },

    checkIfThumbIsSelected: function(e) {

        var projectModelOptions = ProjectModel.instance.get('options');
        
        if(projectModelOptions.get('thumb') == ""){

            var pModel = ProjectModel.instance.get('collection').first();
            var pageId = pModel.get('options').get('pageid');

            this.changeThumbnailPreview(pageId);
        }
    },

    changeThumbnailPreviewOnChange: function(e) {
        var selectedPageID = $(e.currentTarget).val();
        this.changeThumbnailPreview(selectedPageID);
    },

    changeThumbnailPreview: function(selectedPageID) {

        var thumbLink = __meta__.projects_link + __meta__.ownerID +'/'+ __meta__.projectID +'/pre/exported_view/'+ selectedPageID +'/pagethumb.jpg';
        var thumbToModel = '/projects/' + __meta__.ownerID +'/'+ __meta__.projectID +'/pre/exported_view/'+ selectedPageID +'/pagethumb.jpg';

        var projectModelOptions = ProjectModel.instance.get('options');
        projectModelOptions.set('thumb', thumbToModel);

        this.renderPath();
    },

    showThumbnail: function() {

        var projectModelOptions = ProjectModel.instance.get('options');

        if (projectModelOptions.get('thumb') === '') {
             this.thumbnailSelect.trigger('change');
        }

    },

    renderPagesThumbsList: function() {

        var _that = this;

        this.thumbnailSelect = this.$el.find('.banner-page-thumb-select');
        this.thumbnailSelect.html("");

        var pageThumb = ProjectModel.instance.get('options').get('thumb');
        var peID = '';

        if (pageThumb.indexOf('pagethumb.jpg') !== -1) {

            var base = pageThumb.substring(pageThumb.lastIndexOf('/') + 1);
            var root = pageThumb.substring(0, pageThumb.lastIndexOf('/'));
            peID = root.substring(root.lastIndexOf('/') + 1);
        } else {
            var option = $('<option>', { 
                value: 0
            });
            option.text('---');
            _that.thumbnailSelect.append(option);
        }

        ProjectModel.instance.get('collection').each(function(pModel, i) {
            var option;

            if (peID !== '' && peID == pModel.get('options').get('pageid')) {
                var option = $('<option>', { 
                    value: pModel.get('options').get('pageid'),
                    selected: 'selected'
                });
            } else {
                var option = $('<option>', { 
                    value: pModel.get('options').get('pageid')
                });
            }

            option.text((i+1)+". " + pModel.get('options').get('pagename'));
            _that.thumbnailSelect.append(option);
        });
       
    },

    getPublicationOptions: function() {
        return {
            title: this.$el.find('.edit-project-title-input').val(),
            description: this.$el.find('.edit-project-desc-input').val(),

            zoom: this.$el.find('.edit-zoom-checkbox').is(':checked') ? 1 : 0,
            fullscreen: this.$el.find('.edit-fullscreen-checkbox').is(':checked') ? 1 : 0,
            share: this.$el.find('.edit-share-checkbox').is(':checked') ? 1 : 0,
            resetProgress: this.$el.find('.edit-reset-checkbox').is(':checked') ? 1 : 0,
            joinSource: this.$el.find('.edit-join-source').is(':checked') ? 1 : 0,
            thumb: ProjectModel.instance.get('options').get('thumb')
        }
    },

    overridePublication: function() {

        var _that = this;

        var projectID = __meta__.projectID;

        var publicationOptions = this.getPublicationOptions();

        var popup = PopupFactory.createOverrideExistingPublicationPopup( { publication: _that.responseData.publication, publicationOptions: publicationOptions } );
        popup.on('override-publication-complete', function(){
            // refresh list

            _that.getPublishedData();
        });
        $('body').append(popup.render({title: _lang('POPUP_OVERRIDE_PUBLICATION_TITLE'), content: _lang('POPUP_OVERRIDE_PUBLICATION_MESSAGE')}).$el);
    },

    getCourseCompletionRequirements: function() {
        var courseOptions = ProjectModel.instance.get('options');

        var requirements = {
            pages: courseOptions.get('require_pages'),
            score: courseOptions.get('require_score'),
            scoreRequired: courseOptions.get('require_score_points'),
            scoreMax: courseOptions.get('max_points_number')
        }
        return requirements;
    },

    getQuestionsObject: function() {
        return ProjectModel.instance.getQuestionsObject();
    },

    newPublication: function() {

        var _that = this;

        var projectID = __meta__.projectID;

        var publicationOptions = this.getPublicationOptions();

        var request = {
            type: 'newPublication',
            projectID: projectID,
            title: publicationOptions.title,
            description: publicationOptions.description,
            zoom: publicationOptions.zoom,
            fullscreen: publicationOptions.fullscreen,
            share: publicationOptions.share,
            resetProgress: publicationOptions.resetProgress,
            joinSource: publicationOptions.joinSource,
            thumb: publicationOptions.thumb,
            skin: ProjectModel.instance.get('options').get('skin'),
            requirements: this.getCourseCompletionRequirements(),
            questiondata: this.getQuestionsObject()
        };


        if (publicationOptions.title.length > 0) {

            this.showModal();

            DataAccess.publicationRequest(
                {
                    request: JSON.stringify(request)
                },
                function(data) {
                    _that.hideModal();
                    _log('ERROR', data);

                    var returnData = JSON.parse(data);

                    if (returnData.error) {
                        var errorPopup = PopupFactory.createErrorPopup();
                        $('body').append(errorPopup.render({title: _lang('MODAL_INFO_ERROR'), content: _lang('PUBLICATION_LIMIT')}).$el);
                        return;
                    }

                    _that.getPublishedData();
                    _that.$el.find('.darkan-tabs').tabs("option", "active", 1);
                    _that.$el.find('#publish-window-list')
                            .animate({ scrollTop: 99999 }, { duration: 1000, easing: 'easeInOutQuart' });

                    


                    // _that.getPublishedData();
                },
                function(data) { _log('data', data); _that.hideModal(); }
            );   
        } else {
            this.$el.find('.publish-window-new').scrollTop(0);
            this.$el.find('.edit-project-title-input').addClass('animated float error');
            this.$el.find('.edit-project-title-input').focus();
            clearTimeout(this.errorTimeout);
            this.errorTimeout = setTimeout(function() {
                _that.$el.find('.edit-project-title-input').removeClass('animated float error');
            }, 1000);
        }
    },

    showModal: function() {
        this.$el.find('.window-inner-modal').fadeIn(400);
    },

    hideModal: function() {
        this.$el.find('.window-inner-modal').fadeOut(400);
    },

    getPublishedData: function() {

        var _that = this;

        var projectID = __meta__.projectID;

        DataAccess.getPublishedData(
            { projectID: projectID },
            function(data) {

                if (data.publication.length) {
                    var lastPublication = data.publication[data.publication.length-1];
                    _that.$el.find('.edit-project-title-input').val(lastPublication.name);
                    _that.$el.find('.edit-project-desc-input').val(lastPublication.summary);
                    _that.$el.find('.publish-button.override').addClass('active');
                }

                _that.renderPublicationList(data.publicationsList);
                _that.responseData = data;
            },
            function(data) { _log('data', data) }
        );
    },

    renderPublicationList: function(list) {
        var _that = this;

        var projectsCollection = new PublishedItemsCollection();

        _.each(list, function(project, index) {
            project.id = index;
            var projectModel = new PublishedItemModel(project);
            projectsCollection.add(projectModel);
        });

        this.publishedProjectList = new PublishProjectListView({collection: projectsCollection});
        this.publishedProjectList.on('delete-publication', function(pModel) {
            _that.deletePublication(pModel);
        });
        this.publishedProjectList.on('get-published-data', function() {
            _that.getPublishedData();
        });
        this.$el.find('#publish-window-list').html(this.publishedProjectList.render().$el);
    }
});