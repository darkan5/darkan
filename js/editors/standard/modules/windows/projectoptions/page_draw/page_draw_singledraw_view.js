var DrawPagesSingleDrawView = Backbone.View.extend({

    tagName: 'div',
    className: 'singledraw',

    template: _.template($('#projectoptions-drawpages-singledraw-template').html()),

    selectedPages: [ ],

    initialize: function(data) {

        // this.projectModel = data.projectModel;
        // this.drawID = data.drawID;
        // this.singleDrawModel = data.singleDrawModel;
    },

    events: {
        'click .drawpages-singledraw-delete': 'deleteDraw',
        'change .drawpages-amounttodrawinput': 'changeAmountToDraw',
        'click .drawpages-deleteselectedfromdraw': 'deleteSelectedPages'
    },

    deleteSelectedPages: function() {

        var pagesToDrawToSave = this.model.get('pagesToDraw');

        _.each(this.selectedPages, function(pageId) {
            pagesToDrawToSave = _.without(pagesToDrawToSave, pageId);
        });


        this.model.set('pagesToDraw', pagesToDrawToSave);
        ProjectModel.instance.get('options').set('pagesDraws', this.model.collection.toJSON());
        this.saveToServer();

        this.selectedPages = [];

        this.$el.trigger('force-render');
    },

    changeAmountToDraw: function(e) {
        var value = $(e.currentTarget).val();

        var maxValue = this.model.get('pagesToDraw').length;
        if (value > maxValue) {
            value = maxValue;
            $(e.currentTarget).val(maxValue);
        }
        var options = this.model.get('opts');
        options.amountToDraw = value;
        this.model.set('opts', options);
        this.saveToServer();
    },

    saveToServer: function() {
        ProjectModel.instance.get('options').trigger('change', ProjectModel.instance.get('options'));
    },

    deleteDraw: function() {
        var _that = this;
        var pagesDraws = this.model.collection;
        this.model.collection.remove(this.model);

        ProjectModel.instance.get('options').set('pagesDraws', pagesDraws.toJSON());
        this.saveToServer();
        this.$el.trigger('force-render');
    },

    render: function () {
        var _that = this;

        this.selectedPages = [ ];

        this.sortPagesByOrder();

        var pageDrawTemplate = this.template(this.model.toJSON());
        this.$el.html(pageDrawTemplate);

        _.each(this.model.get('pagesToDraw'), function(pageID) {
            var pageModel = ProjectModel.instance.getPageModelByPageId(pageID);
            if (pageModel) {
                _that.renderSinglePage(pageModel);
            }
        });

        this.makeDroppable();

        return this;
    },

    renderSinglePage: function(pageModel) {
        var _that = this;

        var singlePageView = new DrawPagesSinglePageView({model: pageModel});
        this.$el.find('.drawpages-singledraw-list-ul').append(singlePageView.render().$el);
        singlePageView.on('select-page', function(dModel) {
            var pageId = dModel.get('options').get('pageid');
            _that.selectedPages.push(pageId);
        });
        singlePageView.on('deselect-page', function(dModel) {
            var pageId = dModel.get('options').get('pageid');
            _that.selectedPages.splice(_that.selectedPages.indexOf(pageId), 1);
        });
    },

    makeDroppable: function() {
        var _that = this;

        this.$el.find('.drawpages-singledraw-list').droppable({
            tolerance: "pointer",

            drop: function(evt, droppableObject) {

                _that.trigger('add-pages', _that.model);

                // var draws = _that.projectModel.get('options').get('pagesDraws');

                // var addedPagesAmount = 0;
                // for (var i = _that.selectedPages.length - 1; i >= 0; i--) {
                //     var pageID = parseInt(_that.selectedPages[i]);
                //     var pageListInDraw = draws[_that.drawID].pagesToDraw;

                //     if (pageListInDraw.indexOf(pageID) === -1) {
                //         pageListInDraw.push(pageID);
                //         // draws[_that.drawID].pagesToDraw = _that.sortPagesByOrder(pageListInDraw);
                //         // draws[_that.drawID].pagesToDraw.reverse();
                //         addedPagesAmount++;
                //     }
                // };

                // if (addedPagesAmount > 0) {
                //     _that.projectModel.get('options').trigger('change', _that.projectModel.get('options'));
                //     _that.trigger('render-draw-window');
                //     // _that.saveData();
                //     // _that.refreshProjectListAvailability();
                //     // _that.options_DeselectAllPages();
                // }
            }
        });
    },


    sortPagesByOrder: function() {
        var pagesArray = this.model.get('pagesToDraw');
        var sortedIDByOrder = [ ];
        var idAndOrderPairs = { };

        _.each(pagesArray, function(pageID) {
            var pageModel = ProjectModel.instance.getPageModelByPageId(pageID);
            var pageOrder = ProjectModel.instance.get('collection').indexOf(pageModel);
            idAndOrderPairs[pageOrder] = pageID;
        });


        for (var pOrder in idAndOrderPairs) {
            sortedIDByOrder.push(idAndOrderPairs[pOrder]);
        }

        this.model.set('pagesToDraw', sortedIDByOrder);
    }
});