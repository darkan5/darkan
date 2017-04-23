var ExportPdfListWindowView = Backbone.View.extend({

    tagName: 'div',
    className : 'export-pdf-list-wrapper-view',

    template: _.template($('#window-export-pdf-list-template').html()),


    render: function() {
    	var projectList = this.template();
        this.$el.html(projectList);
    	this.collection.each(this.renderSinglePage, this);
    	return this;
    },

    renderSinglePage: function(pageModel) {

        _log('renderPagesList pageModel', pageModel);
        
        var pageView = new ExportPdfItemWindowView({model: pageModel.get('options')});
        this.$el.find('.export-pdf-list').append(pageView.render().$el);
        var thumbPath = __meta__.projects_link + __meta__.ownerID + '/' + __meta__.projectID + '/pre/exported_view/' + pageModel.get('options').get('pageid') + '/pagethumb.jpg?r=' + new Date().getUTCMilliseconds();
        pageView.$el.find('.pagethumb').css('background-image', 'url(' + thumbPath + ')');
    }

});