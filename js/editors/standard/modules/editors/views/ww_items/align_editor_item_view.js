var AlignEditorItemView = EditorItemView.extend({

    tagName: 'div',
	className: 'align-editor-item-view',

	template: _.template($('#editor-item-view-template').html()),

	events: {

	},


	initialize: function( ) {

		var _that = this;

    	this.model = StageView.instance.model;

        this.alignEditor = function(){};
        this.alignEditor.destroy = function(){};
        this.alignEditor.setCollection = function(){};
        this.alignEditor.deactivate = function(){};

        this.alignEditorView = EditorsFactory.createAlignEditorView();
        this.deafultEditorView = new EditorView();

        this.alignEditor = this.alignEditorView;
  	},


	afterRender: function(){

        this.$el.html(this.alignEditor.render().$el);
        this.alignEditor.afterRender();
	},

    setModelToEditor: function(model){

        this.model = model;

        var options = this.model.get('options');

        if(options){

            this.alignEditor.deactivate();
            return;

        }else{

            var type = model.get('type');

            if(type){

                this.alignEditor.deactivate();
                return;

            }else{

                this.alignEditor.setCollection( this.model );
                this.alignEditor.render();
                this.alignEditor.afterRender();
            }
        }

    },

    setStageModelToEditor: function(pModel){

    
    }

});