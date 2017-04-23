var SoundsEditorItemView = EditorItemView.extend({

	className: 'sounds-editor-item-view',

	template: _.template($('#editor-item-view-template').html()),


	initialize: function( ) {

		var _that = this;

    	this.model = StageView.instance.model;

        this.soundEditor = function(){};
        this.soundEditor.destroy = function(){};
        this.soundEditor.setModel = function(){};

        this.soundEditorView = EditorsFactory.createSoundEditor();
        this.multipleSoundEditorView = EditorsFactory.createMultipleSoundEditor();
  	},


	afterRender: function(){

	},

    setModelToEditor: function(model){

        this.model = model;

        this.checkIfDisableEditor(model);

        if(this.editorItemModel.get('isBinding')){

            if(!this.isSelected){
                return;
            }
        }


        if(model instanceof ComponentModel){

            this.soundEditor.destroy();
            this.soundEditor = this.soundEditorView;
            this.soundEditor.setModel( this.model );
            this.$el.html(this.soundEditor.render().$el);
            this.soundEditor.afterRender();

            return;
        }

        if(model instanceof PageModel){

            var options = this.model.get('options');

            this.soundEditor.destroy();
            this.soundEditor = this.soundEditorView;
            this.soundEditor.setModel( options );
            this.$el.html(this.soundEditor.render().$el);
            this.soundEditor.afterRender();

            return;
        }

        if(model instanceof ComponentCollection){

            this.soundEditor.destroy();
            this.soundEditor = this.multipleSoundEditorView;
            this.$el.html(this.soundEditor.render().$el);
            this.soundEditor.afterRender();

            this.goToTimelineTab();

            return;
        }

        if(model instanceof TimelineRowModel){

            this.soundEditor.destroy();
            this.soundEditor = this.multipleSoundEditorView;
            this.$el.html(this.soundEditor.render().$el);
            this.soundEditor.afterRender();

            return;
        }
    },

    setStageModelToEditor: function(pModel){

    
    },

    checkIfDisableEditor: function(model){

        this.enableEditor();


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