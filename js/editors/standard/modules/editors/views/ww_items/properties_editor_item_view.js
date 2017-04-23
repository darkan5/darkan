var PropertiesEditorItemView = EditorItemView.extend({

	className: 'properties-editor-item-view',

	template: _.template($('#editor-item-view-template').html()),



	initialize: function( ) {

		var _that = this;

    	this.model = StageView.instance.model;

        this.editor = function(){};
        this.editor.destroy = function(){};
        this.editor.setModel = function(){};

        this.styleEditor = function(){};
        this.styleEditor.destroy = function(){};
        this.styleEditor.setModel = function(){};

        this.stageEditorView = EditorsFactory.createStageEditor();
        this.deafultEditorView = new EditorView();

  	},


	afterRender: function(){

	},

    setModelToEditor: function(model){

        _log('set model to proprties', model);

        this.model = model;

        this.checkIfDisableEditor(model);

        if(this.editorItemModel.get('isBinding')){

            if(!this.isSelected){
                return;
            }
        }

        _log('render proprties', model);


        if(model instanceof ComponentModel){

            this.editor.destroy();

            var type = model.get('type');

            switch (type){
                case 'text':
                case 'quiz-result':
                    this.editor = EditorsFactory.createTextEditor();
                    //this.textToolbarEditorView.setModel(model);
                    break;

                case 'timer':
                    this.editor = EditorsFactory.createTimerEditor();
                    //this.textToolbarEditorView.setModel(model);
                    break;

                case 'image':
                    this.editor = EditorsFactory.createImageEditor();
                    break;
                case 'video':
                    this.editor = EditorsFactory.createVideoEditor();
                    break;
                case 'quiz':
                    this.editor = EditorsFactory.createQuizEditor();
                    break;
                case 'quiz-selectone':
                    this.editor = EditorsFactory.createQuizSelectOneEditor();
                    break;
                case 'quiz-dnd':
                    this.editor = EditorsFactory.createQuizDnDEditor(this.stageView);
                    break;
                case 'quiz-connectlines':
                    this.editor = EditorsFactory.createQuizConnectLinesEditor(this.stageView);
                    break;
                case 'quiz-wordsearch':
                    this.editor = EditorsFactory.createQuizWordsearchEditor(this.stageView);
                    break;
                case 'scroller':
                    this.editor = EditorsFactory.createScrollerEditor();
                    break;
                case 'crossword':
                    this.editor = EditorsFactory.createCrosswordEditor();
                    break;
                case 'form-inputtext':
                    this.editor = EditorsFactory.createFormInputTextEditor();
                    break;

                case 'form-upload':
                    this.editor = EditorsFactory.createFormUploadEditor();
                    break;
                        
                case 'form-textarea':
                    this.editor = EditorsFactory.createFormTextareaEditor();
                    break;
                case 'form-select':
                    this.editor = EditorsFactory.createFormSelectEditor();
                    break;
                case 'form-checkbox':
                    this.editor = EditorsFactory.createFormCheckboxEditor();
                    break;
                case 'form-radio':
                    this.editor = EditorsFactory.createFormRadioEditor();
                    break;
                case 'form-submit':
                    this.editor = EditorsFactory.createFormSubmitEditor(this.stageView);
                    break;
                case 'iframe':
                    this.editor = EditorsFactory.createIframeEditor();
                    this.styleEditor = StyleEditorsFactory.createIframeEditor();
                    break;
                case 'swf':
                    this.editor = EditorsFactory.createSwfEditor();
                    break;
                case 'drawedinfopoint-link':
                    this.editor = EditorsFactory.createDrawedInfoPointLinkEditor();
                    break;
                case 'drawedinfopoint-download':
                    this.editor = EditorsFactory.createDrawedInfoPointDownloadEditor();
                    break;
                case 'drawedinfopoint-gallery':
                    this.editor = EditorsFactory.createDrawedInfoPointGalleryEditor();
                    break;
                case 'drawedinfopoint-popup':
                    this.editor = EditorsFactory.createDrawedInfoPointPopupEditor();
                    break;
                case 'infopoint-popup':
                    this.editor = EditorsFactory.createInfoPointPopupEditor();
                    break;
                case 'infopoint-link':
                    this.editor = EditorsFactory.createInfoPointLinkEditor();
                    break;
                case 'infopoint-sound':
                    this.editor = EditorsFactory.createInfoPointSoundEditor();
                    break;
                case 'infopoint-soundrecord':
                    this.editor = EditorsFactory.createInfoPointSoundRecordEditor();
                    break;
                case 'infopoint-gallery':
                    this.editor = EditorsFactory.createInfoPointGalleryEditor();
                    break;
                case 'infopoint-download':
                    this.editor = EditorsFactory.createInfoPointDownloadEditor();
                    break;

                case 'quiz-inputtext':
                    this.editor = EditorsFactory.createQuizInputTextEditor();
                    break;   

                case 'quiz-select':
                    this.editor = EditorsFactory.createQuizSelectEditor();
                    break;  

                case 'infopoint-sound-control':
                    this.editor = EditorsFactory.createInfoPointSoundControlEditor();
                    break;  

                case 'quiz-fillinblanks':
                    this.editor = EditorsFactory.createQuizFillInBlanksEditor();
                    break;   

                default :
                    this.editor = this.deafultEditorView;

                    console.log("No editor");
                    break;
            }

            this.editor.setModel( model );

            this.$el.html(this.editor.render().$el);
            this.editor.afterRender();

            return;
        }

        if(model instanceof PageModel){

            var options = this.model.get('options');

            this.editor.destroy();

            this.editor = this.stageEditorView;
            this.editor.setModel( options );
            this.$el.html(this.editor.render().$el);
            this.editor.afterRender();

            return;
        }

        if(model instanceof ComponentCollection){

            this.editor.destroy();

            this.editor = this.deafultEditorView;
            this.$el.html(this.editor.render().$el);
            this.editor.afterRender();

            this.goToTimelineTab();

            return;
        }

        if(model instanceof TimelineRowModel){


            this.editor.destroy();

            this.editor = this.deafultEditorView;
            this.$el.html(this.editor.render().$el);
            this.editor.afterRender();

            return;
        }

    },

    setStageModelToEditor: function(pModel){

    },

    checkIfDisableEditor: function(model){

        this.enableEditor();

        // if(model instanceof ComponentModel){
        //     var type = model.get('type');

        //     }

        //     return;
        // }

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