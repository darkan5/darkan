var DrawPagesSinglePageView = Backbone.View.extend({

    tagName: 'li',
    className: 'drawpages-singlepage-wrapper',

    template: _.template($('#projectoptions-drawpages-singlepage-template').html()),

    initialize: function(data) {
        var _that = this;

        this.active = false;

        this.model.on('drawpages-select', function() {
            _that.forceActive();
        });
        this.model.on('drawpages-deselect', function() {
            _that.forceDeactive();
        });
    },

    events: {
        'click': 'renderActive'
    },

    forceActive: function() {
        this.active = true;
        this.$el.addClass('drawpages-selectedpage');
        this.trigger('select-page', this.model);
    },

    forceDeactive: function() {
        this.active = false;
        this.$el.removeClass('drawpages-selectedpage');
        this.trigger('deselect-page', this.model);
    },

    renderActive: function() {
        this.active = !this.active;
        if (this.active) {
            this.$el.addClass('drawpages-selectedpage');
            this.trigger('select-page', this.model);
        } else {
            this.$el.removeClass('drawpages-selectedpage');
            this.trigger('deselect-page', this.model);
        }
    },

    render: function() {
        var pageBlock = this.template({options: this.model.get('options').toJSON(), order: this.model.collection.indexOf(this.model)});
        this.$el.html(pageBlock);
        return this;
    },
});