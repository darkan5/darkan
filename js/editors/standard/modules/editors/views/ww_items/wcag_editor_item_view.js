var WcagEditorItemView = EditorItemView.extend({

	className: 'wcag-editor-item-view',

	template: _.template($('#editor-item-view-template').html()),


	initialize: function( ) {

		var _that = this;

    	this.model = StageView.instance.model;

        this.wcagEditor = function(){};
        this.wcagEditor.destroy = function(){};
        this.wcagEditor.setModel = function(){};

        this.wcagEditorView = EditorsFactory.createWcagEditor();
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


        if(model instanceof ComponentModel){

            this.wcagEditor.destroy();
            this.wcagEditor = this.wcagEditorView;
            this.wcagEditor.setModel( this.model );
            this.$el.html(this.wcagEditor.render().$el);
            this.wcagEditor.afterRender();

            return;
        }

        if(model instanceof PageModel){

            var options = this.model.get('options');

            this.wcagEditor.destroy();
            this.wcagEditor = this.deafultEditorView;
            this.$el.html(this.wcagEditor.render().$el);
            this.wcagEditor.afterRender();

            return;
        }

        if(model instanceof ComponentCollection){

            this.wcagEditor.destroy();
            this.wcagEditor = this.deafultEditorView;
            this.$el.html(this.wcagEditor.render().$el);
            this.wcagEditor.afterRender();

            this.goToTimelineTab();

            return;
        }

        if(model instanceof TimelineRowModel){

            this.wcagEditor.destroy();
            this.wcagEditor = this.deafultEditorView;
            this.$el.html(this.wcagEditor.render().$el);
            this.wcagEditor.afterRender();

            return;
        }
    },

    setStageModelToEditor: function(pModel){

    
    },

    checkIfDisableEditor: function(model){

        this.enableEditor();


        if(model instanceof PageModel){
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