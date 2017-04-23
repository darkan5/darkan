var ContextMenuView = WindowView.extend({

    className : 'context-menu',

    template: _.template($('#context-menu-template').html()),

    events: {
        'close': 'close'
    },

    initialize: function( data ) {
        this.windowModel =  new WindowModel;
        this.view = data.view;
        this.model = data.model;
        this.e = data.e;
        this.runListeners();

        this.collection = this.createMenuCollection();
    },

    addMenuItem: function(menuItem) {
        var _that = this;
        var menuItemView = new ContextMenuItemView({ model: menuItem });
        menuItemView.on('item-click', function(model){
            _that.onItemClick(model);
        });
        menuItemView.on('menu-item-click', function(model){
            _that.onItemClick(model);
        });
        this.$el.append(menuItemView.render().el);
    },

    afterRender: function() {
        this.collection.each(this.addMenuItem, this);
    },

    onItemClick: function(model){

    },

    makeContextAction: function(e){

    },

    setWindowPosition: function(position) {

        var documentWidth = $(window).width()
        var documentHeight = $(window).height();

        var width = this.$el.width();
        var height = this.$el.height();

        var left = position.left;
        var top = position.top;

        if (left + width > documentWidth)
            left = left - width;

        if (top + height > documentHeight)
            top = top - height;

        if (left < 0)
            left = 0;

        if (top < 0)
            top = 0;

        this.$el.css({
            top: top + 'px',
            left: left + 'px'
        });
    },

    createMenuCollection: function(){

        var contextMenuItemCollection = new ContextMenuItemCollection([
            new ContextMenuItemModel()
        ]);

        return contextMenuItemCollection;
    }

});
