var LeftMenuItemModel = Backbone.Model.extend({
	defaults:{
		componentName: 'text',
		className: 'big-btn',
		subitems: [ ]
	}
});

var LeftMenuItemCollection = Backbone.Collection.extend({
	model: LeftMenuItemModel
});

var LeftMenuView = Backbone.View.extend({

	//el: $('.menu-left-toolbar-buttons'),

	template: _.template($('#left-menu-template').html()),
		
	initialize: function() {
    	this.render();
  	},

	render: function(){

		this.$el.attr('id', 'menu-left');

		var template = this.template(this.serializeData());
        this.$el.html(template);

		this.collection.each(this.addMenuItem, this);
		return this;
	},

	serializeData: function(){
		return {};
	},

	addMenuItem: function(menuItem) {
		var _that = this;
		var menuItemView = new LeftMenuItemView({ model: menuItem });
		menuItemView.on('item-click', function(model){
			_that.trigger('menu-item-click', model);
		});
		menuItemView.on('menu-item-click', function(model){
			_that.trigger('menu-item-click', model);
		});
		this.$el.find('.menu-left-toolbar-buttons').append(menuItemView.render().el);
	},

    turnOnDeleteButton: function(){
        this.$el.find('#toolbar-remove').removeAttr('disabled');
    },

    turnOffDeleteButton: function(){
        this.$el.find('#toolbar-remove').attr('disabled', 'disabled');
    }

});

var LeftMenuItemView = Backbone.View.extend({

	tagName: "li",
	
	template: _.template($('#leftmenu-template').html()),

	events: {
		'click': 'addComponent'
	},

  	addComponent: function(e) {
  		e.stopPropagation();

  		switch (this.model.get('componentName')) {
  			case 'separator':
  				// just do nothing
  				return false;
  				break;

  			case 'extend':
  				var active = this.$el.find('> a').hasClass('active');

  				this.hideAllExtendedMenus();

  				if (active) {
  					this.hideAllExtendedMenus();
  				} else {
  					this.$el.find('> a').addClass('active');
  					this.showSingleExtendedMenu( this.$el.find('.menu-left-second-lvl') );
  				}
  				break;

			default: 
				// Add component
				this.hideAllExtendedMenus();
				this.trigger('item-click', this.model, this);
				break;
  		}

  		
    },

	render: function(){
		var _that = this;
	    var menuItemTemplate = this.template(this.model.toJSON());
	    this.$el.html(menuItemTemplate);

	    if(this.model.get('subitems').length > 0) {
	    	this.model.get('subitems').each(this.addSubMenuItem, this);
	    }

	    this.$el.find('[title]').tooltip({
            html: true,
            animated: 'fade',
            placement: 'right',
            width: 300,
            height: 200
        });

		return this;
	},

	addSubMenuItem: function(submenuItem) {

		var _that = this;
		var menuSubItemView = new LeftMenuSubItemView({ model: submenuItem });
		menuSubItemView.on('item-click', function(model){
			_that.trigger('menu-item-click', model);
			_that.hideAllExtendedMenus();
		});
		this.$el.find('.menu-left-second-lvl').append(menuSubItemView.render().el);
	},

	hideAllExtendedMenus: function() {

		this.$el.parent().find('.active').removeClass('active');
		this.$el.parent().find('.menu-left-second-lvl').hide(/*'drop'*/);
	},

	showSingleExtendedMenu: function(menu) {
		menu.css({
            'margin-top': '0px'
        });

		menu.show(/*'drop'*/);

		// pull top panel if its too high and some icons are not visible for user
        var offset = $(document).height() - (menu.height() + menu.offset().top);

        if (offset < 20) {
            var marginTop = Math.abs(offset) + 20;

            menu.css({
                'margin-top': "-" + marginTop + "px"
            });
        } else {
            menu.css({
                'margin-top': '0px'
            });
        }
	}
});

var LeftMenuSubItemView = Backbone.View.extend({

	tagName: "li",
	
	template: _.template($('#leftmenusubitem-template').html()),

	events: {
		'click': 'addComponent'
	},

	render: function(){
	    var menuSubItemTemplate = this.template(this.model.toJSON());
	    this.$el.html(menuSubItemTemplate);
		return this;
	},

	addComponent: function(e) {
		e.stopPropagation();

		// this.hideAllExtendedMenus();
		this.trigger('item-click', this.model, this);
	},

	hideAllExtendedMenus: function() {
		this.$el.find('.active').removeClass('active');
		this.$el.find('.menu-left-second-lvl').hide(/*'drop'*/);
	}
});




var toolbarItemsCollection = new LeftMenuItemCollection([
	new LeftMenuItemModel({
		componentName: 'text',
		icon: 'text',
		className: 'big-btn',
		title: _lang('TOOLTIP_0003')
	}),


	new LeftMenuItemModel({
		componentName: 'image',
		icon: 'image',
		className: 'big-btn',
		title: _lang('TOOLTIP_0004')
	}),
	new LeftMenuItemModel({
		componentName: 'video',
		icon: 'video',
		className: 'big-btn',
		title: _lang('TOOLTIP_0005')
	}),
	new LeftMenuItemModel({
		componentName: 'separator',
		className: 'separator'
	}),
	new LeftMenuItemModel({
		componentName: 'extend',
		icon: 'infopoints',
		className: 'big-btn extend',
		title: _lang('TOOLTIP_0006'),
		subitems: new LeftMenuItemCollection([
				new LeftMenuItemModel({
					componentName: 'infopoint-popup',
					prettyName: _lang('COMPONENTNAME_POPUP'),
					icon: 'infopoints-popup',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0009')
				}),
				new LeftMenuItemModel({
					componentName: 'infopoint-gallery',
					prettyName: _lang('COMPONENTNAME_GALLERY'),
					icon: 'infopoints-gallery',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0008')
				}),
				new LeftMenuItemModel({
					componentName: 'infopoint-link',
					prettyName: _lang('COMPONENTNAME_LINK'),
					icon: 'infopoints-link',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0007')
				}),
				new LeftMenuItemModel({
					componentName: 'infopoint-download',
					prettyName: _lang('COMPONENTNAME_DOWNLOAD'),
					icon: 'infopoints-download',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0010')
				}),
				new LeftMenuItemModel({
					componentName: 'form-upload',
					prettyName: 'Wgraj plik',
					icon: 'upload',
					className: 'small-btn-ext',
					title: _lang('')
				}),
				new LeftMenuItemModel({
					componentName: 'infopoint-sound',
					prettyName: _lang('COMPONENTNAME_AUDIO'),
					icon: 'infopoints-soundfile',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0011')
				}),
				new LeftMenuItemModel({
					componentName: 'infopoint-sound-control',
					prettyName: _lang('COMPONENTNAME_AUDIO_CONTROL'),
					icon: 'infopoints-soundfile',
					className: 'small-btn-ext',
					title: _lang('COMPONENTNAME_AUDIO_CONTROL')
				}),
				// new LeftMenuItemModel({
				// 	componentName: 'infopoint-soundrecord',
				// 	prettyName: _lang('COMPONENTNAME_RECORD'),
				// 	icon: 'infopoints-soundrecorded',
				// 	className: 'small-btn-ext',
				// 	title: _lang('TOOLTIP_0012')
				// })
		])
	}),
	// new LeftMenuItemModel({
	// 	componentName: 'extend',
	// 	className: 'big-btn extend',
	// 	icon: 'drawedinforpoints',
	// 	subitems: new LeftMenuItemCollection([
	// 			new LeftMenuItemModel({
	// 				componentName: 'drawedinfopoint-popup',
	// 				icon: 'drawedinforpoints-popup',
	// 				className: 'small-btn-ext'
	// 			}),
	// 			new LeftMenuItemModel({
	// 				componentName: 'drawedinfopoint-gallery',
	// 				icon: 'drawedinforpoints-gallery',
	// 				className: 'small-btn-ext'
	// 			}),
	// 			new LeftMenuItemModel({
	// 				componentName: 'drawedinfopoint-link',
	// 				icon: 'drawedinforpoints-link',
	// 				className: 'small-btn-ext'
	// 			}),
	// 			new LeftMenuItemModel({
	// 				componentName: 'drawedinfopoint-download',
	// 				icon: 'drawedinforpoints-download',
	// 				className: 'small-btn-ext'
	// 			})
	// 	])
	// }),
	new LeftMenuItemModel({
		componentName: 'extend',
		icon: 'quiz',
		className: 'big-btn extend',
		title: _lang('TOOLTIP_0115'),
		subitems: new LeftMenuItemCollection([
				new LeftMenuItemModel({
					componentName: 'quiz',
					prettyName: _lang('COMPONENTNAME_QUIZMULTI'),
					icon: 'quiz-multiselect',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0031')
				}),
				new LeftMenuItemModel({
					componentName: 'quiz-radio',
					prettyName: _lang('COMPONENTNAME_QUIZRADIO'),
					icon: 'quiz-radio',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0032')
				}),
				new LeftMenuItemModel({
					componentName: 'quiz-truefalse',
					prettyName: _lang('COMPONENTNAME_QUIZTRUEFALSE'),
					icon: 'quiz-truefalse',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0033')
				}),
				new LeftMenuItemModel({
					componentName: 'quiz-selectone',
					prettyName: _lang('COMPONENTNAME_QUIZSELECTONE'),
					icon: 'quiz-selectone',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0034')
				}),
                new LeftMenuItemModel({
					componentName: 'quiz-inputtext',
					prettyName: _lang('COMPONENTNAME_QUIZ_INPUT'),
					icon: 'inputtext',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0141')
				}),
				new LeftMenuItemModel({
					componentName: 'quiz-select',
					prettyName: _lang('COMPONENTNAME_QUIZ_SELECT'),
					icon: 'select',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0142')
				}),
				new LeftMenuItemModel({
					componentName: 'quiz-fillinblanks',
					prettyName: _lang('COMPONENTNAME_QUIZ_FILLINBLANKS'),
					icon: 'select',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0142')
				}),
				new LeftMenuItemModel({
					componentName: 'quiz-dnd',
					prettyName: _lang('COMPONENTNAME_QUIZDND'),
					icon: 'quiz-dnd',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0126')
				}),
				new LeftMenuItemModel({
					componentName: 'quiz-wordsearch',
					prettyName: _lang('COMPONENTNAME_QUIZWORDSEARCH'),
					icon: 'quiz-wordsearch',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0127')
				}),
				new LeftMenuItemModel({
					componentName: 'crossword',
					prettyName: _lang('COMPONENTNAME_QUIZCROSSWORD'),
					icon: 'quiz-crossword',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0128')
				}),
				// new LeftMenuItemModel({
				// 	componentName: 'quiz-boardgame',
				// 	icon: 'quiz-boardgame',
				// 	className: 'small-btn-ext',
					// title: _lang('')
				// }),
				// new LeftMenuItemModel({
				// 	componentName: 'quiz-memory',
				// 	icon: 'quiz-memory',
				// 	className: 'small-btn-ext',
					// title: _lang('')
				// }),
				new LeftMenuItemModel({
					componentName: 'quiz-connectlines',
					prettyName: _lang('COMPONENTNAME_QUIZQCL'),
					icon: 'quiz-connectlines',
					className: 'small-btn-ext',
					title: _lang('TOOLTIP_0129')
				}),
                new LeftMenuItemModel({
                    componentName: 'quiz-result',
                    prettyName: _lang('COMPONENTNAME_QUIZRESULT'),
                    icon: 'quiz-results',
                    className: 'small-btn-ext',
                    title: _lang('TOOLTIP_0130')
                }),
				// new LeftMenuItemModel({
				// 	componentName: 'quiz-results',
				// 	icon: 'quiz-results',
				// 	className: 'small-btn-ext',
					// title: _lang('')
				// })
		])
	}),

	new LeftMenuItemModel({
		componentName: 'extend',
		icon: 'forms',
		className: 'big-btn extend',
		title: _lang('TOOLTIP_0116'),
		subitems: new LeftMenuItemCollection([
			new LeftMenuItemModel({
				componentName: 'form-inputtext',
				prettyName: _lang('COMPONENTNAME_FORMSINPUT'),
				icon: 'inputtext',
				className: 'small-btn-ext',
					title: _lang('TOOLTIP_0118')
			}),
			new LeftMenuItemModel({
				componentName: 'form-textarea',
				prettyName: _lang('COMPONENTNAME_FORMSTA'),
				icon: 'textarea',
				className: 'small-btn-ext',
				title: _lang('TOOLTIP_0119')
			}),
			new LeftMenuItemModel({
				componentName: 'form-select',
				prettyName: _lang('COMPONENTNAME_FORMSSELECT'),
				icon: 'select',
				className: 'small-btn-ext',
				title: _lang('TOOLTIP_0120')
			}),
			new LeftMenuItemModel({
				componentName: 'form-checkbox',
				prettyName: _lang('COMPONENTNAME_FORMSCHECKBOX'),
				icon: 'checkbox',
				className: 'small-btn-ext',
				title: _lang('TOOLTIP_0121')
			}),
			new LeftMenuItemModel({
				componentName: 'form-radio',
				prettyName: _lang('COMPONENTNAME_FORMSRADIO'),
				icon: 'radio',
				className: 'small-btn-ext',
				title: _lang('TOOLTIP_0122')
			}),
			
			// Przycisk do usunięcia

			// new LeftMenuItemModel({
			// 	componentName: 'form-submit',
			// 	prettyName: _lang('COMPONENTNAME_FORMSSUBMIT'),
			// 	icon: 'submit',
			// 	className: 'small-btn-ext',
			// 	title: _lang('TOOLTIP_0123')
			// })
		]),
	}),

	new LeftMenuItemModel({
		componentName: 'library',
		icon: 'library',
		className: 'big-btn',
		title: _lang('TOOLTIP_0017')
	}),
	new LeftMenuItemModel({
		componentName: 'separator',
		className: 'separator'
	}),

	// small buttons
	// new LeftMenuItemModel({
	// 	componentName: 'drawimage',
	// 	icon: 'drawimage',
	// 	className: 'small-btn'
	// }),
	new LeftMenuItemModel({
		componentName: 'swf',
		icon: 'swf',
		className: 'small-btn',
		title: _lang('TOOLTIP_0019')
	}),
	// new LeftMenuItemModel({
	// 	componentName: 'hidebackground',
	// 	icon: 'hidebackground',
	// 	className: 'small-btn'
	// }),
	new LeftMenuItemModel({
		componentName: 'scroller',
		icon: 'scroller',
		className: 'small-btn',
		title: _lang('TOOLTIP_0020')
	}),
	// new LeftMenuItemModel({
	// 	componentName: 'shapes',
	// 	icon: 'shapes',
	// 	className: 'small-btn',
	// 	title: _lang('TOOLTIP_0021')
	// }),
	new LeftMenuItemModel({
		componentName: 'iframe',
		icon: 'iframe',
		className: 'small-btn',
		title: _lang('TOOLTIP_0117')
	}),
    new LeftMenuItemModel({
        componentName: 'timer',
        prettyName: _lang('COMPONENTNAME_TIMER'),
        icon: 'timer',
        className: 'small-btn',
        title: _lang('TOOLTIP_0134')
    }),
	// remove
	new LeftMenuItemModel({
		componentName: 'remove',
		icon: 'remove',
		className: 'big-btn',
		title: _lang('TOOLTIP_0022')
	})
]);
