var PublishProjectItemToOverrideView = Backbone.View.extend({

    tagName: 'li',
    className : 'publish-project-item',

    template: _.template($('#publish-project-item-tooverride-template').html()),

    events: {
        'click .override-publication-button': 'overridePublication'
    },

    initialize: function(data) {
        this.model = data.model;
        this.publicationOptions = data.publicationOptions;
    },

    overridePublication: function(e) {

        var _that = this;


        var loader = this.createLoader();
        this.$el.append(loader);

        var pModel = this.model;

        var request = {
            type: 'overwritePublication',
            bannerID: pModel.get('id_banner'),
            hash: pModel.get('path'),
            projectID: __meta__.projectID,
            skin: ProjectModel.instance.get('options').get('skin'),
            requirements: _that.getCourseCompletionRequirements(),

            title: this.publicationOptions.title,
            description: this.publicationOptions.description,
            zoom: this.publicationOptions.zoom,
            fullscreen: this.publicationOptions.fullscreen,
            share: this.publicationOptions.share,
            resetProgress: this.publicationOptions.resetProgress,
            joinSource: this.publicationOptions.joinSource,
            thumb: this.publicationOptions.thumb,

            questiondata: this.getQuestionsObject()
        };


        DataAccess.publicationRequest(
            {
                request: JSON.stringify(request)
            },
            function(data) {
                _that.closeLoaderResult();
                _that.trigger('override-publication-complete', _that.model);


                // _log('kkkkk', _that.model);
                // _that.render();
            },
            function(data) {
                _log('data', data);
                _that.closeLoaderFault();
            }
        );
    },

    getQuestionsObject: function() {
        return ProjectModel.instance.getQuestionsObject();
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
    

    render: function() {
        var projectBlock = this.template(this.model.toJSON());
        this.$el.html(projectBlock);
    	return this;
    },

    closeLoaderResult: function(){

        var loader = this.$el.find('.publication-loader-link');
        loader.html(_lang('OVERRIDE_PUBLICATION_MASAGE_RESULT'));

        setTimeout(function(){
            loader.remove();
        }, 2500);
    },

    closeLoaderFault: function(){

        var loader = this.$el.find('.publication-loader-link');
        loader.html(_lang('OVERRIDE_PUBLICATION_MASAGE_FAULT'));

//        setTimeout(function(){
//            loader.remove();
//        }, 1000);
    },

    createLoader: function(){

        var loader = $('<div>');
        //loader.attr('src', 'content_template/css/gif-load.gif');
        loader.addClass('publication-loader-link');
        loader.html(_lang('OVERRIDE_PUBLICATION_MASAGE'));

        return loader;
    },
});