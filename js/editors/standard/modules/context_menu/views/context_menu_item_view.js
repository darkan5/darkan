var ContextMenuItemView = Backbone.View.extend({

	tagName: "li",
	
	template: _.template($('#contextmenu-item-template').html()),

	events: {
		'click': 'executeAction',
		'mouseenter': 'showSubitemMenu',
		'mouseleave': 'hideSubitemMenu'
	},

  	executeAction: function(e) {
  		e.stopPropagation();

          if(this.model.get('disabled')){
              return;
          }

  		switch (this.model.get('componentName')) {
  			case 'separator':
  				// just do nothing
  				return false;
  				break;

			default: 
				// Add component
				this.trigger('item-click', this.model, this);
				break;
  		}

  		
    },

    showSubitemMenu:function(e){
        //this.showSingleExtendedMenu( $(e.currentTarget).find('.context-menu-second-lvl') );

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

	render: function(){
		var _that = this;
	    var menuItemTemplate = this.template(this.model.toJSON());
	    this.$el.html(menuItemTemplate);

	    if(this.model.get('subitems').length > 0) {
	    	this.model.get('subitems').each(function(model){
                _that.addSubMenuItem(model, _that);
            });
	    }

	    this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'right',
            width: 300,
            height: 200
        });

        if(this.model.get('disabled')){
            this.$el.attr('disabled', 'disabled');
        }

        if(this.model.get('componentName') == 'extend'){
            this.$el.addClass('extend');
        }

        this.$el.addClass(this.model.get('className'));

		return this;
	},

	addSubMenuItem: function(submenuItem, view) {

		var _that = this;
		var menuSubItemView = new ContextMenuSubItemView({ model: submenuItem });
		menuSubItemView.on('item-click', function(model){
			_that.trigger('menu-item-click', model);
		});
		view.$el.find('.context-menu-second-lvl').append(menuSubItemView.render().el);




        menuSubItemView.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'right',
            width: 300,
            height: 200
        });

        if(submenuItem.get('disabled')){
            menuSubItemView.$el.attr('disabled', 'disabled');
        }

        if(submenuItem.get('componentName') == 'extend'){
            menuSubItemView.$el.addClass('extend');
        }

        menuSubItemView.$el.addClass(submenuItem.get('className'));


        if(submenuItem.get('subitems').length > 0) {
            submenuItem.get('subitems').each(function(model){
                _that.addSubMenuItem(model, menuSubItemView);
            });
        }
	},

	showSingleExtendedMenu: function(menu) {

        if (!menu.length) return;

        menu.css({
            top: '0px',
            left: '100%'
        });

        menu.show();

        // pull top panel if its too high and some icons are not visible for user
        var offsetTop = $(window).height() - (menu.height() + menu.offset().top);

        if (offsetTop < 20) {
            var marginTop = Math.abs(offsetTop) + 20;
            menu.css({
                'top': "-" + marginTop + "px"
            });
        } else {
            menu.css({
                'top': '-10px'
            });
        }

        var offsetLeft = $(window).width() - (menu.width() + menu.offset().left);
        var leftOffset = menu.width();
        if (offsetLeft < 5) {
            var marginLeft = Math.abs(offsetLeft) + 20;
            menu.css({
                'left': "-" + leftOffset + "px" 
            });
        } else {
            menu.css({
                'left': '100%'
            });
        }


	}
});
