var ContextMenuSubItemView = Backbone.View.extend({

    tagName: "li",

    //template: _.template($('#contextmenusubitem-template').html()),
    template: _.template($('#contextmenu-item-template').html()),

    events: {
        'click': 'executeAction',
        'mouseenter': 'showSubitemMenu',
        'mouseleave': 'hideSubitemMenu'
    },

    render: function(){
        var menuSubItemTemplate = this.template(this.model.toJSON());
        this.$el.html(menuSubItemTemplate);

        if(this.model.get('disabled')){
            this.$el.attr('disabled', 'disabled');
        }

        this.$el.find('.context-menu-second-lvl').hide();

        return this;
    },

    executeAction: function(e) {
        e.stopPropagation();

        if(this.model.get('disabled')){
            return;
        }

        // this.hideAllExtendedMenus();
        this.trigger('item-click', this.model, this);
    },

    hideAllExtendedMenus: function() {
        this.$el.find('.active').removeClass('active');
        this.$el.find('.menu-left-second-lvl').hide(/*'drop'*/);
    },

    showSubitemMenu:function(e){
        this.$el.find('.context-menu-second-lvl').show(/*'drop'*/);
    },

    hideSubitemMenu:function(e){
        var submenu = $(e.currentTarget).find('.context-menu-second-lvl');
        submenu.css({
            'top': '0px',
            'left': '100%'
        });
        submenu.hide();
    },
});
