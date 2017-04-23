var ExportWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-export-view',

    template: _.template($('#window-export-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .window-close-button': 'close',
            'click .export-scorm': 'exportToScorm',
            'click .export-zip': 'exportToHtml',
            'click .export-pdf': 'exportToPdf'
        });
    },

    afterInitialize : function(dataModel) {
        //StageView.instance.createPageThumb();

        var _that = this;

        this.getCapabilities();

        var exportWindowList = this.$el.find('.export-window-list');
        exportWindowList.hide();

        var skin = ProjectModel.instance.get('options').get('skin');

        DataAccess.preparePreview(
            {skin:skin},
            function(data) {
                _log('DONE')

                exportWindowList.show();
            },
            function(data) {
                _log('FAILED preparePreview', data);

                exportWindowList.show();
            }
        );
    
    },

    onCapabilitiesChanged: function(capabilitiesModel) {

        this.capabilitiesParmasList = capabilitiesModel.createParams([
            { name:'exporthtml5', identifier:'.export-zip'},
            { name:'exportpdf', identifier:'.export-pdf'},
            { name:'exportscorm', identifier:'.export-scorm'}
        ]);

        var deleteEventsVisitor = DeleteEventsVisitor.getInstance();
        this.accept(deleteEventsVisitor);
        capabilitiesModel.off();
    },

    exportToScorm: function() {
        var scormExportWindow = WindowFactory.createExportScormWindow();
        $('body').append(scormExportWindow.render().$el);
    },

    exportToHtml: function() {
        var htmlExportWindow = WindowFactory.createExportHtml5Window();
        $('body').append(htmlExportWindow.render().$el);
    },

    exportToPdf: function() {

        var _that = this;

        var pdfExportWindow = WindowFactory.createExportPdfWindow();

        pdfExportWindow.on('on-close', function(){
            _that.close();
        });

        $('body').append(pdfExportWindow.render().$el);
    },

});