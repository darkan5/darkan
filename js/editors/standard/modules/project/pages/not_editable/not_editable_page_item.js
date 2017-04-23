var NotEditablePageItem = PageItem.extend({

	template: _.template($('#not-editable-page-item-template').html()),

	events: {

		'click .page-thumb': 'onClick',
        'click .dinamic-page-thumb-overlay': 'onClick',
        'mousedown': 'onMouseDown',
	},

	initialize: function( ) {
    	
  	},

  	showContextMenu: function(e) {

        var itemsSelectedNumb = 0;

        this.model.collection.each(function(model){
            if(model.isSelected){
                itemsSelectedNumb++;

            }
        });

        if(itemsSelectedNumb <= 1){

            this.unselectAllPages();

            this.model.isSelected = true;
            this.model.view.setCheckboxSelected(true);
        }

        var contextMenuView = new SecondPageContextMenuView({ model: this.getModel(), view: this});

        ContextMenuContainer.addMenu(contextMenuView, e);
    },

    serializeData: function(){

        var options = this.model.toJSON();
        options.order = this.model.collection.indexOf(this.model) + 1;
        options.isSelected = this.model.isSelected;

        options.options.userId = this.model.ownerId;
        options.options.projectId = this.model.projectId;

        return options;
    },

});