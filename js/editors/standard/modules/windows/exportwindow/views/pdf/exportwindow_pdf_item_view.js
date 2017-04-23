var ExportPdfItemWindowView = Backbone.View.extend({

    tagName: 'li',
    className : 'export-pdf-item-view',

    template: _.template($('#window-export-pdf-item-template').html()),

	bindings: {
	    // '[name="require-credit"]': 'require-credit',
	    '.page-note': 'note'
	},

    events: {
        'click .select-page': 'clickSelectPage',
        'click .page-note-checkbox': 'clickCheckNote'
    },

    initialize: function() {

        this.model.viewPDF = this;

        this.model.viewPDF.selectPage(true);

    },

    clickCheckNote: function(e) {

        var target = $(e.currentTarget);

        this.checkNotePage(target.is(':checked'));
    },

    clickSelectPage: function(e) {

        var target = $(e.currentTarget);

        this.selectPage(target.is(':checked'));

    },

    selectPage: function(check) {

        this.model.pdfSelected = check;

        this.$el.find('.select-page').prop('checked', check);

    },

    checkNotePage: function(check) {

        this.model.pdfNoteSelected = check;

        this.$el.find('.page-note-checkbox').prop('checked', check);

    },

    render: function() {

        var pageTemplate = this.template(this.model.toJSON());
        this.$el.html(pageTemplate);
        this.stickit();
        return this;
    }

});