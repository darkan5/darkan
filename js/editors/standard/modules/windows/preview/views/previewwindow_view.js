var PreviewWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-preview-view',

    template: _.template($('#window-preview-template').html()),

    afterInitialize: function() {

        var capabilities = Capabilities.getInstance();
        capabilities.on('change', this.onCapabilitiesChanged, this);
        capabilities.getCapabilities();
    },

    onCapabilitiesChanged: function(capabilitiesModel) {

        this.capabilitiesParmasList = capabilitiesModel.createParams([
            { name:'publish', identifier:'.banners'}
        ]);

        var deleteEventsVisitor = DeleteEventsVisitor.getInstance();
        this.accept(deleteEventsVisitor);
        capabilitiesModel.off();
    },

    setModel: function(model) {

    },

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .window-close-button': 'close',
            'click .banners': 'openPublishWindow',
            'click .openexportwindow': 'openExportWindow',
            'click .skin': 'changeSkin'
        });
    },

    changeSkin: function(e) {


        var dimentionsFolder = $(e.currentTarget).attr('dimensionsfolder');
        var skinName = $(e.currentTarget).attr('skinname');

        ProjectModel.instance.get('options').set('dimentions', dimentionsFolder);
        ProjectModel.instance.get('options').set('skin', skinName);
        ProjectModel.instance.saveProjectOptions(ProjectModel.instance.get('options'));
        console.log(skinName); 
        this.showPreview();
    },

    showPreview: function(failedIterator) {
        var _that = this;

        failedIterator = failedIterator || 0;
        failedIterator++;


        var dimentions = ProjectModel.instance.get('options').get('dimentions');
        var skin = ProjectModel.instance.get('options').get('skin');
        var activePage = ProjectModel.instance.get('collection').indexOf(StageView.instance.model) + 1;

        this.showPreviewProjectLoader();

        DataAccess.preparePreview(
            {skin:skin},
            function(data) {
                console.log("ok-2");
                var viewContent = _that.$el.find('.view-content');

                viewContent.on('load', function(){

                     _that.hidePreviewProjectLoader();
                   
                });
                

                viewContent.css({
                            'background-color': 'black'
                        })
                        .attr({
                            src: __meta__.projects_link + __meta__.ownerID + '/' + __meta__.projectID + '/pre/index.html?skin=' + skin + '&p=' + activePage
                        });
                        

                _that.$el.find('.linktoblankpreview a')
                        .attr({
                            href: __meta__.projects_link + __meta__.ownerID + '/' + __meta__.projectID + '/pre/index.html?skin=' + skin + '&p=' + activePage
                        });

               
            },
            function(data) {

                _that.hidePreviewProjectLoader();

                _log('FAILED preparePreview', data);

                _log('failedIterator', failedIterator);

                if(failedIterator <= 3){

                    _that.showPreview(failedIterator);
                }   
            },
            function(data){
                _log('preparePreviewProgress', data);
            }
        );
    },

    afterRender: function() {
        if (State.isTestDrive()) { 
            this.$el.find('.banners').hide();
        }

    },

    openPublishWindow: function() {
        if (State.isTestDrive()) { return; }
        this.trigger('open-publish-window');
    },

    openExportWindow: function() {
        this.trigger('open-export-window');
    },

    showPreviewProjectLoader: function(){

        this.previewProjectLoader = PreloaderFactory.createPreviewProjectLoader();
        $('body').append(this.previewProjectLoader.render().$el);
    },

    hidePreviewProjectLoader: function(){
        if(this.previewProjectLoader){
            this.previewProjectLoader.remove();
        }
    }
});
