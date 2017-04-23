var BottomMenuView = Backbone.View.extend({

    el: _layout.menu_bottom,

    events: {
        'click #bottom-menu-tabs-showhide': 'showHideMenuButtonClick',
        'click li[role="tab"]': 'showMenuIfHidden',
        'click li[role="tab"] a[href="#botmenu-editors-container"]': 'forceRefreshEditorView',
        'resize': 'onResize',
        'hideMenu': 'hideMenu',
        'showMenu': 'showMenu'
    },

    initialize: function() {
        var _that = this;

        this.$el.find('#menu-bottom-tabs').tabs({
            event: "mousedown",
            select: function(event, ui) {

            },
            create: function(event, ui) {
                // _log('CREATING TAB:', ui);
            }
        });

        this.$el.resizable({
            handles: 'n',
            resize: function(event, ui) {
                _that.onResize();
            }
        });

        if ($(document).width() < 1380) {
            this.hideMenu();
        }

    },

    forceRefreshEditorView: function() {
        this.$el.find('#botmenu-editors-container > div').trigger('force-refresh-editor-view');
    },

    onResize: function() {
        var _that = this;

        _layout.pages_list_wrapper.css({
            height: 'calc(100% - ' + _that.$el.height() + 'px)'
        });

        var topmenuHeight = _layout.menu_top.height() + 20;
        
        var subtractFromSceneHeight = topmenuHeight + _that.$el.height();
        _layout.scene_wrapper.css({
            height: 'calc(100% - ' + subtractFromSceneHeight + 'px)'
        });
        _that.$el.css('top', 'auto');

        var menuHeight = _that.$el.height();


        if (menuHeight > 34) {
            _that.$el.find('#bottom-menu-tabs-showhide').html('&#9660;');
        } else {
            _that.$el.find('#bottom-menu-tabs-showhide').html('&#9650;');
        }
    },


    showHideMenuButtonClick: function() {
        var menuHeight = this.$el.height();

        if (menuHeight >= 34) {
            this.hideMenu();
        } else {
            this.showMenu();
        }
    },

    showMenuIfHidden: function(e) {

        if ($(e.target).attr('href') == '#botmenu-timeline-wrapper') {
            StageView.instance.timeline.render();
            StageView.instance.timeline.afterRender();
        }

        var menuHeight = this.$el.height();

        if (menuHeight <= 34) {
            this.showMenu();
        }
    },

    hideMenu: function(onComplete) {
        var _that = this;
        this.$el.animate({height: '30px'}, 300, function(){

            if(_.isFunction(onComplete)){
                onComplete();
            }

            _that.onResize();
        });
    },

    showMenu: function() {
        var _that = this;
        this.$el.animate({height: '220px'}, 300, function(){
            _that.onResize();
        });
    }
});

BottomMenuView.instance = {};


