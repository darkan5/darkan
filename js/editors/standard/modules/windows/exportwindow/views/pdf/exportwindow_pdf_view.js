var ExportPdfWindowView = WindowView.extend({

    tagName: 'div',
    className : 'window window-export-pdf-view',

    template: _.template($('#window-export-pdf-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .clearmessages': 'clearMessages',
            'click .checkallinfo': 'checkAllInfo',
            'click .checkall': 'checkAll',
            'click .generate': 'generatePDF'
        });
    },

    afterInitialize : function(dataModel) {


    },



    generatePDF: function() {

        var landscape =  this.$el.find('.checklandscape').prop('checked');

        var generatePdfProgressView = WindowFactory.createGeneratePdfProgressWindow({ landscape:landscape });

        $('body').append(generatePdfProgressView.render().$el);

        this.close();
    },

    checkAll: function(e) {

        var _that = this;
        var target = $(e.currentTarget);
        var checked = target.is(':checked');

        var pagesCollection = ProjectModel.instance.get('collection');

        pagesCollection.each(function(model) {
            model.get('options').viewPDF.selectPage(checked);
        });
    },

    checkAllInfo: function(e) {

        var _that = this;
        var target = $(e.currentTarget);
        var checked = target.is(':checked');

        var pagesCollection = ProjectModel.instance.get('collection');

        pagesCollection.each(function(model) {
            model.get('options').viewPDF.checkNotePage(checked);
        });

        // this.$el.find('.page-note-checkbox').each(function() {
        //     $(this).prop('checked', checked);
        // });
    },

    clearMessages: function() {

        var pagesCollection = ProjectModel.instance.get('collection');

        pagesCollection.each(function(model) {

            var options = model.get('options');
            options.set('note', '');

        });

        this.renderPagesList();

    },

    afterRender: function() {
        //this.renderPagesList();

        var _that = this;

        var loader = this.createLoader();
        this.$el.find('.pdf-pages-list-wrapper').append(loader);

        _log('loader', loader);

        StageView.instance.createPageThumb( function(data){
            //var pageID = parseInt(data.pageID);

            _log('_that', _that);

            _that.closeLoaderResult();
            _that.renderPagesList();
        } );
    },

    renderPagesList: function() {
    	var _that = this;

    	var pagesCollection = ProjectModel.instance.get('collection');

        this.pagesList = new ExportPdfListWindowView({collection: pagesCollection});
        this.$el.find('.pdf-pages-list-wrapper').html(this.pagesList.render().$el);

    },

    onClose: function(){
        this.trigger('on-close');
    },

    createLoader: function(){

        var loader = $('<div>');
        loader.addClass('publication-loader-link');
        //loader.html(_lang('EXPORT_PDF_LOADER_MASAGE'));
        loader.append($('<img src="content_template/css/gif-load.gif">'));

        return loader;
    },

    closeLoaderResult: function(){

        var loader = this.$el.find('.publication-loader-link');
        loader.remove();
    },
});