var GeneratePdfProgressView = WindowView.extend({

    tagName: 'div',
    className : 'window generate-pdf-progress-window animated pulse',

    template: _.template($('#window-generate-pdf-progress-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events, {
            'click .generate-pdf-progress-cancel': 'generatePdfCancel',
            'click .download-package-button': 'downloadPDF'
        });
    },

    initialize: function( data ) {

        var _that = this;

        this.windowModel = data.windowModel;
        this.landscape = data.data.landscape;

        this.generatePdf();
    },

    downloadPDF: function() {

        window.open(this.downloadLink);

    },

    generatePdf: function(){

        var _that = this;

        var pagesCollection = ProjectModel.instance.get('collection');

        var dataPDF = [];

        pagesCollection.each(function(model) {

            dataPDF.push({
                activePage: model.get('options').pdfSelected,
                pageID: model.get('options').get('pageid'),
                activeNote: model.get('options').pdfNoteSelected,
                note: model.get('options').get('note')
            });

        });

        var request = {
            type: 'exportToPDF',
            projectID: __meta__.projectID,
            dataPDF: dataPDF,
            landscape: this.landscape ? 'L' : 'P'
        };

//        this.$el.find('.window-content').html('<div class="export-options-wrapper"><button class="generate-package-button editor-settings-button"></button></div>');
//        this.$el.find('.generate-package-button')
//                            .addClass('redbutton')
//                            .attr({disabled: 'disabled'})
//                            .text(_lang('EXPORT_GENERATE_PACKAGE_PROGRESS'));

        DataAccess.generatePdf(
            {
                request: JSON.stringify(request)
            },
            function(data) {

                _log('publicationRequest', data);

                _that.$el.removeClass('animated pulse');

                var dataJ = JSON.parse(data);

                _that.downloadLink = dataJ.downloadLink;

                var downloadButton = _that.createDownloadButton();

                _that.$el.find('.generate-pdf-progress-window-content').html(downloadButton);
                _that.$el.find('.generate-pdf-progress-cancel').val(_lang('EXPORTTOPDF_BUTTON_CLOSE'));

            },
            function(data) {
                _that.$el.find('.generate-pdf-progress-cancel').val(_lang('EXPORTTOPDF_BUTTON_CLOSE'));
            }
        );
    },

    createDownloadButton: function( ) {

        var downloadButton = $('<button class="generate-package-button editor-settings-button"></button>');
        downloadButton.removeAttr('disabled')
            .removeClass('redbutton')
            .addClass('download-package-button')
            .text(_lang('BUTTON_DOWNLOAD'));

       return downloadButton;
    },

    onAddPageResult: function( pageModel, fileName, pdfPageId ) {


    },

    showProcessContent: function( index ) {
        //this.$el.find('.add-new-page-progress-text').html(_lang('PDF_PROGRESS_TITLE'));
    },

    showFinishContent: function( ) {
        //this.$el.find('.add-new-page-progress-text').html(_lang('PDF_PROGRESS_FINISHED'));
        // this.$el.addClass('tada-endless-5');
    },

    onAddPageFault: function(responce) {

    },

    generatePdfCancel: function() {

        this.close();
    },

    startUploading: function(){

    },

    onClose: function(){

        this.trigger('on-close');
    },

    showProgressPercent : function(data){

//        this.$el.find('.progress-bar').fadeIn(500);
//        var percentage = parseInt( data.percent );
//        this.$el.find('.progress-bar-text').text(percentage+'%');
//        this.$el.find('.progress-bar-inner').css('width',  percentage +'%');
    },

    hideProgressPercent : function( data ){

//        var _that = this;
//
//        this.$el.find('.progress-bar-text').text('100%');
//        this.$el.find('.progress-bar-inner').css('width',  '100%');
//
//        _that.$el.find('.progress-bar').fadeOut(500, function(){ /*_that.render()*/ });
    }


});