var SizeAndPositionEditorItemView = EditorItemView.extend({

    tagName: 'div',
	className: 'size-and-position-editor-item-view',

	template: _.template($('#editor-item-view-template').html()),

	events: {

	},


	initialize: function( ) {

		var _that = this;

    	this.model = StageView.instance.model;

        this.sizeAndPositionEditor = function(){};
        this.sizeAndPositionEditor.destroy = function(){};
        this.sizeAndPositionEditor.setModel = function(){};
        this.sizeAndPositionEditor.setCollection = function(){};

        this.sizeAndPositionEditorView = EditorsFactory.createSizeAndPositionEditorView();
        this.multipleSizeAndPositionEditorView = EditorsFactory.createMultipleSizeAndPositionEditor();
        this.deafultEditorView = new EditorView();
  	},


	afterRender: function(){

	},

    setModelToEditor: function(model){

        this.model = model;

        if(model instanceof ComponentModel){

            this.sizeAndPositionEditor.destroy();
            this.sizeAndPositionEditor = this.sizeAndPositionEditorView;
            this.sizeAndPositionEditor.setModel( this.model );
            this.$el.html(this.sizeAndPositionEditor.render().$el);
            this.sizeAndPositionEditor.afterRender();

            return;
        }

        if(model instanceof PageModel){

            var options = this.model.get('options');

            this.sizeAndPositionEditor.destroy();
            this.sizeAndPositionEditor = this.sizeAndPositionEditorView;
            this.sizeAndPositionEditor.setModel( options );
            this.$el.html(this.sizeAndPositionEditor.render().$el);
            this.sizeAndPositionEditor.afterRender();

            return;
        }

        if(model instanceof ComponentCollection){

            this.sizeAndPositionEditor.destroy();
            this.sizeAndPositionEditor = this.multipleSizeAndPositionEditorView;
            this.sizeAndPositionEditor.setCollection( this.model );
            this.$el.html(this.sizeAndPositionEditor.render().$el);
            this.sizeAndPositionEditor.afterRender();

            return;
        }

        if(model instanceof TimelineRowModel){

            this.sizeAndPositionEditor.destroy();
            this.sizeAndPositionEditor = this.multipleSizeAndPositionEditorView;
            this.sizeAndPositionEditor.setCollection( this.model.get('objects') );
            this.$el.html(this.sizeAndPositionEditor.render().$el);
            this.sizeAndPositionEditor.afterRender();

            return;
        }
    },

    setStageModelToEditor: function(pModel){

    
    }

});