var ParallaxEditorItemView = EditorItemView.extend({

	className: 'parallax-editor-item-view',

	template: _.template($('#editor-item-view-template').html()),


	initialize: function( ) {

		var _that = this;

    	this.model = StageView.instance.model;

        this.parallaxEditor = function(){};
        this.parallaxEditor.destroy = function(){};
        this.parallaxEditor.setModel = function(){};

        this.parallaxeEditorView = EditorsFactory.createParallaxeEditor();
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

            this.parallaxEditor.destroy();
            this.parallaxEditor = this.parallaxeEditorView;
            this.parallaxEditor.setModel( model );
            this.$el.html(this.parallaxEditor.render().$el);
            this.parallaxEditor.afterRender();

            return;
        }

        if(model instanceof PageModel){

            var options = this.model.get('options');

            this.parallaxEditor.destroy();
            this.parallaxEditor = this.deafultEditorView;
            this.$el.html(this.parallaxEditor.render().$el);
            this.parallaxEditor.afterRender();

            return;
        }

        if(model instanceof ComponentCollection){

            this.parallaxEditor.destroy();
            this.parallaxEditor = this.deafultEditorView;
            this.$el.html(this.parallaxEditor.render().$el);
            this.parallaxEditor.afterRender();

            this.goToTimelineTab();

            return;
        }

        if(model instanceof TimelineRowModel){

            this.parallaxEditor.destroy();
            this.parallaxEditor = this.deafultEditorView;
            this.$el.html(this.parallaxEditor.render().$el);
            this.parallaxEditor.afterRender();

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