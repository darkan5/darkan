var StylesEditorItemView = EditorItemView.extend({

	className: 'styles-editor-item-view',

	template: _.template($('#editor-item-view-template').html()),

	initialize: function( ) {

		var _that = this;

    	this.model = StageView.instance.model;


        this.styleEditor = function(){};
        this.styleEditor.destroy = function(){};
        this.styleEditor.setModel = function(){};


        StylesFactory.createAllStyles();

        this.stageStyleEditor = StyleEditorsFactory.createStageEditor();
        this.deafultStyleEditor = new StyleEditorView();

  	},


	afterRender: function(){

	},

    setModelToEditor: function(model){

        _log('render styles 1', model);

        this.model = model;

        
        this.checkIfDisableEditor(model);

        if(this.editorItemModel.get('isBinding')){

            if(!this.isSelected){
                return;
            }
        }


         _log('render styles 2', this.model);

        if(model instanceof ComponentModel){

            this.styleEditor.destroy();

            var type = model.get('type');

            switch (type){
                case 'text':
                case 'quiz-result':
                    this.styleEditor = StyleEditorsFactory.createTextEditor();
                    break;

                case 'timer':
                    this.styleEditor = StyleEditorsFactory.createTimerEditor();
                    break;

                case 'image':
                    this.styleEditor = StyleEditorsFactory.createImageEditor();
                    break;
                case 'video':
                    this.styleEditor = StyleEditorsFactory.createVideoEditor();

                    this.disableEditor();

                    break;
                case 'quiz':
                    this.styleEditor = StyleEditorsFactory.createQuizEditor();
                    break;
                case 'quiz-selectone':
                    this.styleEditor = StyleEditorsFactory.createQuizSelectOneEditor();
                    break;
                case 'quiz-dnd':
                    this.styleEditor = StyleEditorsFactory.createQuizDnDEditor(this.stageView);
                    break;
                case 'quiz-connectlines':
                    this.styleEditor = StyleEditorsFactory.createQuizConnectLinesEditor(this.stageView);
                    break;
                case 'quiz-wordsearch':
                    this.styleEditor = StyleEditorsFactory.createQuizWordsearchEditor(this.stageView);
                    break;
                case 'scroller':
                    this.styleEditor = StyleEditorsFactory.createScrollerEditor();
                    break;
                case 'crossword':
                    this.styleEditor = StyleEditorsFactory.createCrosswordEditor();
                    break;
                case 'form-inputtext':
                    this.styleEditor = StyleEditorsFactory.createFormInputTextEditor();
                    break;

                case 'form-upload':
                    this.styleEditor = StyleEditorsFactory.createFormUploadEditor();
                    break;
                        
                case 'form-textarea':
                    this.styleEditor = StyleEditorsFactory.createFormTextareaEditor();
                    break;
                case 'form-select':
                    this.styleEditor = StyleEditorsFactory.createFormSelectEditor();
                    break;
                case 'form-checkbox':
                    this.styleEditor = StyleEditorsFactory.createFormCheckboxEditor();
                    break;
                case 'form-radio':
                    this.styleEditor = StyleEditorsFactory.createFormRadioEditor();
                    break;
                case 'form-submit':
                    this.styleEditor = StyleEditorsFactory.createFormSubmitEditor(this.stageView);
                    break;
                case 'iframe':
                    this.styleEditor = StyleEditorsFactory.createIframeEditor();
                    break;
                case 'swf':
                    this.styleEditor = StyleEditorsFactory.createSwfEditor();
                    break;
                case 'drawedinfopoint-link':
                    this.styleEditor = StyleEditorsFactory.createDrawedInfoPointLinkEditor();
                    break;
                case 'drawedinfopoint-download':
                    this.styleEditor = StyleEditorsFactory.createDrawedInfoPointDownloadEditor();
                    break;
                case 'drawedinfopoint-gallery':
                    this.styleEditor = StyleEditorsFactory.createDrawedInfoPointGalleryEditor();
                    break;
                case 'drawedinfopoint-popup':
                    this.styleEditor = StyleEditorsFactory.createDrawedInfoPointPopupEditor();
                    break;
                case 'infopoint-popup':
                    this.styleEditor = StyleEditorsFactory.createInfoPointPopupEditor();
                    break;
                case 'infopoint-link':
                    this.styleEditor = StyleEditorsFactory.createInfoPointLinkEditor();
                    break;
                case 'infopoint-sound':
                    this.styleEditor = StyleEditorsFactory.createInfoPointSoundEditor();
                    break;
                case 'infopoint-soundrecord':
                    this.styleEditor = StyleEditorsFactory.createInfoPointSoundRecordEditor();
                    break;
                case 'infopoint-gallery':
                    this.styleEditor = StyleEditorsFactory.createInfoPointGalleryEditor();
                    break;
                case 'infopoint-download':
                    this.styleEditor = StyleEditorsFactory.createInfoPointDownloadEditor();
                    break;

                case 'quiz-inputtext':
                    this.styleEditor = StyleEditorsFactory.createQuizInputTextEditor();
                    break;   

                case 'quiz-select':
                    this.styleEditor = StyleEditorsFactory.createQuizSelectEditor();
                    break;  

                case 'infopoint-sound-control':
                    this.styleEditor = StyleEditorsFactory.createInfoPointSoundControlEditor();
                    break;  

                case 'quiz-fillinblanks':
                    this.styleEditor = StyleEditorsFactory.createQuizFillInBlanksEditor();
                    break;    

                default :
                    this.styleEditor = this.deafultStyleEditor;

                    console.log("No editor");
                    break;
            }

            this.styleEditor.setModel( model );

            this.$el.html(this.styleEditor.render().$el);
            this.styleEditor.afterRender();

            return;
        }

        if(model instanceof PageModel){

            var options = this.model.get('options');

            this.styleEditor.destroy();
            this.styleEditor = this.stageStyleEditor;
            this.styleEditor.setModel( options );
            this.$el.html(this.styleEditor.render().$el);
            this.styleEditor.afterRender();


            return;
        }

        if(model instanceof ComponentCollection){

            this.styleEditor.destroy();
            this.styleEditor = this.deafultStyleEditor;
            this.$el.html(this.styleEditor.render().$el);
            this.styleEditor.afterRender();

            this.goToTimelineTab();

            this.disableEditor();

            return;
        }

        if(model instanceof TimelineRowModel){

            this.styleEditor.destroy();
            this.styleEditor = this.deafultStyleEditor;
            this.$el.html(this.styleEditor.render().$el);
            this.styleEditor.afterRender();

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
                case 'video':
                case 'scroller':
                case 'crossword':
                case 'quiz-wordsearch':
                    this.disableEditor();
                    break;
            }
        }

        if(model instanceof ComponentCollection){
            this.disableEditor();
        }

        if(model instanceof TimelineRowModel){
            this.disableEditor();
        }
    },

});