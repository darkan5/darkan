var ScoreEditorItemView = EditorItemView.extend({

	className: 'score-editor-item-view',

	template: _.template($('#editor-item-view-template').html()),


	initialize: function( ) {

		var _that = this;

    	this.model = StageView.instance.model;

        this.scoreEditor = function(){};
        this.scoreEditor.destroy = function(){};
        this.scoreEditor.setModel = function(){};

        this.scoreExerciseEditor = function(){};
        this.scoreExerciseEditor.destroy = function(){};
        this.scoreExerciseEditor.setModel = function(){};

        this.scoreEditorView = EditorsFactory.createScoreEditor();
        this.scoreExerciseEditorView = EditorsFactory.createScoreExerciseEditor();
        this.deafultEditorView = new EditorView();
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


        this.scoreExerciseEditor.destroy();
        this.scoreEditor.destroy();

        this.$el.html('');


        if(model instanceof ComponentModel){

            var options = StageView.instance.model.get('options');

            this.scoreExerciseEditor = this.scoreExerciseEditorView;
            this.scoreExerciseEditor.setModel( this.model );
            this.$el.append(this.scoreExerciseEditor.render().$el);
            this.scoreExerciseEditor.afterRender();

            this.scoreEditor = this.scoreEditorView;
            this.scoreEditor.setModel( options );
            this.$el.append(this.scoreEditor.render().$el);
            this.scoreEditor.afterRender();

            return;
        }

        if(model instanceof PageModel){

            var options = this.model.get('options');

            this.scoreEditor = this.scoreEditorView;
            this.scoreEditor.setModel( options );
            this.$el.append(this.scoreEditor.render().$el);
            this.scoreEditor.afterRender();

            return;
        }

        if(model instanceof ComponentCollection){

            var options = StageView.instance.model.get('options');

            this.scoreEditor = this.scoreEditorView;
            this.scoreEditor.setModel( options );
            this.$el.append(this.scoreEditor.render().$el);
            this.scoreEditor.afterRender();

            this.goToTimelineTab();

            return;
        }

        if(model instanceof TimelineRowModel){

            var options = StageView.instance.model.get('options');

            this.scoreEditor = this.scoreEditorView;
            this.scoreEditor.setModel( options );
            this.$el.append(this.scoreEditor.render().$el);
            this.scoreEditor.afterRender();
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