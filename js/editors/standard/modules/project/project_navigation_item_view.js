var ProjectNavigationItemView = ItemView.extend({

	tagName: 'li',

	className: 'project-navigation-item-view',

	template: _.template($('#project-navigation-item-template').html()),

	events: {
		'click .project-navigation-selector' : 'selectProject',
		'click .project-navigation-close-button' : 'closeProject',

		'mousedown': 'onMouseDown',

		'drop-item': 'dropItem',
	},

	bindings: {
		'.project-navigation-name': 'name'
	},

	initialize: function( ) {
    	
  	},

  	dropItem: function(event, index) {
        this.$el.trigger('update-sort', [this.model, index]);
    },

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);

        this.stickit();

		return this;
	},

	serializeData: function(){
		return {};
	},

	closeProject: function(){
		
	},

	selectProject: function(){

		this.model.collection.each(function(model){
			model.view2.$el.attr('active', false);
		});

        this.$el.attr('active', true);

		this.trigger('select-project', this.model);
	},

	showContextMenu: function(e) {

    },

    closeOthersProjects: function(){

    	var _that = this;

    	var toRemove = [];

    	this.model.collection.each(function(model){
    		if(model.type == 'not-editable' && _that.model.cid != model.cid){
    		
    			toRemove.push(model);
    		}
    	});

    	for (var i = 0; i < toRemove.length; i++) {
    		var model = toRemove[i];

    		_that.trigger('close-project', model);
    	};
    },
});