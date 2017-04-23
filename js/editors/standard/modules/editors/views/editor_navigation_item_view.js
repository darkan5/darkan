var EditorNavigationItemView = ItemView.extend({

	tagName: 'li',

	className: 'editor-navigation-item-view',

	template: _.template($('#editor-navigation-item-template').html()),

	events: {
		'click .editor-navigation-selector' : 'selectEditor',

		'mousedown': 'onMouseDown',

		'drop-item': 'dropItem',
	},

	initialize: function( ) {

		this.model.off('disable-editor-item', this.disableEditorItem, this);
    	this.model.off('enable-editor-item', this.enableEditorItem, this);

    	this.model.on('disable-editor-item', this.disableEditorItem, this);
    	this.model.on('enable-editor-item', this.enableEditorItem, this);
  	},

  	dropItem: function(event, index) {
        this.$el.trigger('update-sort', [this.model, index]);
    },

	render: function(){

		var template = this.template(this.serializeData());
        this.$el.html(template);

        this.renderIsDisabled();

		return this;
	},

	renderIsDisabled: function(){
		if(this.model.isDisabled){
        	this.$el.attr('editordisabled', true);
        }
	},

	renderIsBinding: function(){
		if(this.model.get('isBinding')){
        	this.$el.show();
        }else{
        	this.$el.hide();
        }
	},

	serializeData: function(){
		return this.model.toJSON();
	},

	closeEditor: function(){
		this.trigger('close-editor', this.model);
	},

	selectEditor: function(){

		if(this.model.isDisabled){
			return;
		}
			

		this.model.collection.each(function(model){
			model.view2.$el.attr('active', false);
		});

        this.$el.attr('active', true);

		this.trigger('select-editor', this.model);
	},

	showContextMenu: function(e) {

        var contextMenuView = new EditorContextMenuView({ model: this.model, view: this});

        ContextMenuContainer.addMenu(contextMenuView, e);
    },

    disableEditorItem: function(){

    	if(!this.model.isDisabled){
    		this.$el.attr('editordisabled', true);
    		this.model.isDisabled = true;
    	}

    	
    },

    enableEditorItem: function(){

    	if(this.model.isDisabled){

	    	this.$el.removeAttr('editordisabled');
	    	this.model.isDisabled = false;
	    }
    },

    unbindEditor: function(){
    	this.trigger('unbind-editor', this.model);
    }
});