var NoteEditorItemView = EditorItemView.extend({

	className: 'note-editor-item-view',

	template: _.template($('#editor-item-view-template').html()),

	events: {

	},


	initialize: function( ) {

		var _that = this;

    	this.model = StageView.instance.model;

        this.noteEditor = function(){};
        this.noteEditor.destroy = function(){};
        this.noteEditor.setModel = function(){};

        this.pagenoteEditorView = EditorsFactory.createPagenoteEditor();
        this.deafultEditorView = new EditorView();
  	},


	afterRender: function(){

	},

    setModelToEditor: function(model){

        this.model = model;

        this.checkIfDisableEditor(model);

        if(!this.isSelected){
            return;
        }

        if(model instanceof ComponentModel){

            this.noteEditor.destroy();
            this.noteEditor = this.deafultEditorView;
            this.$el.html(this.noteEditor.render().$el);
            this.noteEditor.afterRender();

            return;
        }

        if(model instanceof PageModel){

            var options = this.model.get('options');

            this.noteEditor.destroy();
            this.noteEditor = this.pagenoteEditorView;
            this.noteEditor.setModel( options );
            this.$el.html(this.noteEditor.render().$el);
            this.noteEditor.afterRender();

            return;
        }

        if(model instanceof ComponentCollection){

            this.noteEditor.destroy();
            this.noteEditor = this.deafultEditorView;
            this.$el.html(this.noteEditor.render().$el);
            this.noteEditor.afterRender();

            this.goToTimelineTab();

            return;
        }

        if(model instanceof TimelineRowModel){

            this.noteEditor.destroy();
            this.noteEditor = this.deafultEditorView;
            this.$el.html(this.noteEditor.render().$el);
            this.noteEditor.afterRender();

            return;
        }
    },

    setStageModelToEditor: function(pModel){

    
    },

    checkIfDisableEditor: function(model){

        this.enableEditor();

        if(model instanceof ComponentModel){
            this.disableEditor();
            return;
        }

        if(model instanceof ComponentCollection){
            this.disableEditor();
            return;
        }

        if(model instanceof TimelineRowModel){
            this.disableEditor();
            return;
        }
    },

    

});