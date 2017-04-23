var ReaportsEditorItemView = EditorItemView.extend({

	className: 'reaports-editor-item-view',

	template: _.template($('#editor-item-view-template').html()),


	initialize: function( ) {

		var _that = this;

    	this.model = StageView.instance.model;

        this.reportEditor = function(){};
        this.reportEditor.destroy = function(){};
        this.reportEditor.setModel = function(){};

        this.reportEditorView = EditorsFactory.createReportEditor();
        this.multipleReportEditorView = EditorsFactory.createMultipleReportEditor();
        this.deafultReportEditorView = new EditorView();
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

            var type = model.get('type');

            this.reportEditor.destroy();

            switch (type){
                
                case 'quiz':
                    this.reportEditor = this.reportEditorView;
                    break;
                case 'quiz-selectone':
                    this.reportEditor = this.reportEditorView;
                    break;
                case 'quiz-fillinblinds':
                    this.reportEditor = this.reportEditorView;
                    break;
                case 'quiz-dnd':
                    this.reportEditor = this.reportEditorView;
                    break;
                case 'quiz-connectlines':
                    this.reportEditor = this.reportEditorView;
                    break;
                case 'quiz-wordsearch':
                    this.reportEditor = this.reportEditorView;
                    break;
                case 'crossword':
                    this.reportEditor = this.reportEditorView;
                    break;
                case 'form-inputtext':
                    this.reportEditor = this.reportEditorView;
                    break;
                case 'form-textarea':
                    this.reportEditor = this.reportEditorView;
                    break;
                case 'form-select':
                    this.reportEditor = this.reportEditorView;
                    break;
                case 'form-checkbox':
                    this.reportEditor = this.reportEditorView;
                    break;
                case 'form-radio':
                    this.reportEditor = this.reportEditorView;
                    break;
                case 'quiz-inputtext':
                    this.reportEditor = this.reportEditorView;
                    break;   
                case 'quiz-select':
                    this.reportEditor = this.reportEditorView;
                    break;  

                case 'quiz-fillinblanks':
                    this.reportEditor = this.reportEditorView;
                    break;     

                default :
                    this.reportEditor = this.deafultReportEditorView;

                    console.log("No editor");
                    break;
            }

            this.reportEditor.setModel( model );
            this.$el.html(this.reportEditor.render().$el);
            this.reportEditor.afterRender();
            return;
        }

        if(model instanceof PageModel){

            this.reportEditor = this.deafultReportEditorView;
            this.reportEditor.setModel( model );
            this.$el.html(this.reportEditor.render().$el);
            this.reportEditor.afterRender();
            return;
        }

        if(model instanceof ComponentCollection){

            this.reportEditor = this.deafultReportEditorView;
            this.reportEditor.setModel( model );
            this.$el.html(this.reportEditor.render().$el);
            this.reportEditor.afterRender();

            this.goToTimelineTab();
            
            return;
        }

        if(model instanceof TimelineRowModel){

            this.reportEditor = this.deafultReportEditorView;
            this.reportEditor.setModel( model );
            this.$el.html(this.reportEditor.render().$el);
            this.reportEditor.afterRender();
            return;
        }

    },

    setStageModelToEditor: function(pModel){

    
    },

    checkIfDisableEditor: function(model){

        this.enableEditor();

        if(model instanceof ComponentModel){
            var type = model.get('type');

            switch (type){
                case 'quiz':
                case 'quiz-selectone':
                case 'quiz-fillinblinds':
                case 'quiz-dnd':
                case 'quiz-connectlines':
                case 'quiz-wordsearch':
                case 'crossword':
                case 'form-inputtext':
                case 'form-textarea':
                case 'form-select':
                case 'form-checkbox':
                case 'form-radio':
                case 'quiz-inputtext': 
                case 'quiz-select':
                case 'quiz-fillinblanks':
        
                    break;

                default:
                    this.disableEditor();
                    break;
            }

            return;
        }

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