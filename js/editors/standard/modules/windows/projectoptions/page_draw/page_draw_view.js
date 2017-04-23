var DrawPagesWindowView = Backbone.View.extend({

    template: _.template($('#projectoptions-drawpages-template').html()),

    selectedPages: [ ],
    pagesViewsToSelect: [ ],

    initialize: function(data) {
        var _that = this;

        // ProjectModel.instance = data.projectModel;

        var pageDraws = ProjectModel.instance.get('options').get('pagesDraws');

        this.drawsCollection = new PageDrawCollection();


        _.each(pageDraws, function(draw, i) {

            _that.drawsCollection.add(new PageDrawModel(draw));

        });

        this.render();
    },

    events: {
        'click .drawpages-pages-list-selectall': 'selectAllPages',
        'click .drawpages-pages-list-deselectall': 'deselectAllPages',
        'click .drawpages-add-new-draw': 'addNewDraw',
        'force-render': 'render'
    },

    saveToServer: function() {
        ProjectModel.instance.get('options').trigger('change', ProjectModel.instance.get('options'));
    },

    addNewDraw: function() {
        this.drawsCollection.add(new PageDrawModel());
        this.saveToServer();

        this.render();
    },

    selectAllPages: function() {
        _.each(this.pagesViewsToSelect, function(pageView) {
            pageView.forceActive();
        })
    },

    deselectAllPages: function() {
        _.each(this.pagesViewsToSelect, function(pageView) {
            pageView.forceDeactive();
        })
    },

    render: function () {
        var _that = this;

        this.selectedPages = [ ];
        this.pagesViewsToSelect = [ ];

        var pageDrawTemplate = this.template({draws: ProjectModel.instance.get('options').get('pagesDraws')});
        this.$el.html(pageDrawTemplate);

        this.drawsCollection.each(this.renderSingleDraw, this);

        ProjectModel.instance.get('collection').each(this.renderSinglePage, this);
    },

    renderSingleDraw: function(dModel) {
        var _that = this;

        var singleDraw = new DrawPagesSingleDrawView({model: dModel});
        this.$el.find('.drawpages-draws-wrapper').append(singleDraw.render().$el);

        singleDraw.on('add-pages', function(dModel) {
            var pagesToDraw = dModel.get('pagesToDraw');
            var concatArrays = pagesToDraw.concat(_that.selectedPages);
            var arrayToSave = _.uniq(concatArrays);
            dModel.set('pagesToDraw', arrayToSave);

            ProjectModel.instance.get('options').set('pagesDraws', _that.drawsCollection.toJSON());

            _that.saveToServer();
            _that.render();
        });
    },

    renderSinglePage: function(pModel) {
        var _that = this;

        if (this.isPageAvailable(pModel)) {
            var singlePageView = new DrawPagesSinglePageView({model: pModel});

            this.pagesViewsToSelect.push(singlePageView);

            var singlePageEl = singlePageView.render().$el;
            this.$el.find('.drawpages-pages-list').append(singlePageEl);
            singlePageView.on('select-page', function(dModel) {
                var pageId = dModel.get('options').get('pageid');
                if (_that.selectedPages.indexOf(pageId) === -1) {
                    _that.selectedPages.push(pageId);
                }
            });
            singlePageView.on('deselect-page', function(dModel) {
                var pageId = dModel.get('options').get('pageid');
                _that.selectedPages.splice(_that.selectedPages.indexOf(pageId), 1);
            });

            this.makeDraggable(singlePageEl);
        }
    },

    isPageAvailable: function(pModel) {
        var _that = this;

        var available = true;

        var pageID = pModel.get('options').get('pageid');

        this.drawsCollection.each(function(draw) {
            if (draw.get('pagesToDraw').indexOf(pageID) !== -1) {
                available = false;
            }
        });

        return available;
    },

    makeDraggable: function(singlePageEl) {
        var _that = this;

        singlePageEl.draggable({
            zIndex: 6000,
            delay: 100,

            start: function() {
                if (_that.selectedPages.length === 0) {
                    return false;
                }
            },

            helper: function() {
                var helperWrapper = $('<div>', {
                    'class': 'drawpages-draggablehelper'
                });
                helperWrapper.text( _lang('NUMBER_OF_PAGES') + ': ' + _that.selectedPages.length);
                return helperWrapper;
            }
        });
    }

});