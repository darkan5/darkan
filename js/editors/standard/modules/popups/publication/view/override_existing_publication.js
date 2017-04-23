var OverrideExistingPublicationPopupView = PopupView.extend({

    className : 'window popup override-existing-publicatoin-popup',

    template: _.template($('#override-existing-publicatoin-popup-template').html()),

    initialize: function( data ) {
        this.publicationsToOverride = data.data.publication;
        this.publicationOptions = data.data.publicationOptions;
        this.windowModel = data.windowModel;
        this.runListeners();

    },

    afterRender: function() {
        var _that = this;

        _.each(this.publicationsToOverride, function(projectData) {
            var projectModel = new PublishedItemModel(projectData);
            var projectView = new PublishProjectItemToOverrideView({model: projectModel, publicationOptions: _that.publicationOptions});
            projectView.on('override-publication-complete', function(pModel) {
                _that.overridePublicationComplete(pModel);
            });
            _that.$el.find('.publication-list').append(projectView.render().$el);        
        });
    },

    overridePublicationComplete :function(pModel){
        var _that = this;

        var projectID = __meta__.projectID;

        DataAccess.getPublishedData(
            { projectID: projectID },
            function(data) {
                _that.publicationsToOverride = data.publication;
                _that.render();

                _that.trigger('override-publication-complete');
            },
            function(data) { _log('data', data) }
        );

    },

    onClose : function(){

    }
});

