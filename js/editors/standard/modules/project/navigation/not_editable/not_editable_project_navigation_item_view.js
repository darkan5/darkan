var NotEditableProjectNavigationItemView = ProjectNavigationItemView.extend({

	template: _.template($('#not-editable-project-navigation-item-template').html()),


	closeProject: function(){
		this.trigger('close-project', this.model);
	},

	showContextMenu: function(e) {

        var contextMenuView = new NotEditableNavigationItemViewContextMenuView({ model: this.model, view: this});

        ContextMenuContainer.addMenu(contextMenuView, e);
    },

    closeAllProjects: function(){

    	var _that = this;

    	var toRemove = [];

    	this.model.collection.each(function(model){

            _log('closeAllProjects', model);

    		if(model.type == 'not-editable'){
    		
    			toRemove.push(model);
    		}
    	});


    	for (var i = 0; i < toRemove.length; i++) {
    		var model = toRemove[i];

    		_that.trigger('close-project', model);
    	};	
    }
});