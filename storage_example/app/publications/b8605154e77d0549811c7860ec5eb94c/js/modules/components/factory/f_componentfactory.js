function ComponentFactory(){}

ComponentFactory.createComponentByType = function( type, model ){
	switch(type){
		case 'text':
			return ComponentFactory.createTextComponent(model);
			break;

		case 'image':
			return ComponentFactory.createImageComponent(model);
			break;

		case 'video':
			return ComponentFactory.createVideoComponent(model);
			break;	

		case 'quiz':
			return ComponentFactory.createQuizComponent(model);
			break;

		case 'quiz-selectone':
			return ComponentFactory.createQuizSelectOneComponent(model);
			break;

		case 'quiz-fillinblanks':
			return ComponentFactory.createQuizFillInBlanksComponent(model);
			break;

		case 'quiz-dnd':
			return ComponentFactory.createQuizDnDComponent(model);
			break;

		case 'quiz-connectlines':
			return ComponentFactory.createQuizConnectLinesComponent(model);
			break;

		case 'scroller':
			return ComponentFactory.createScrollerComponent(model);
			break;	

		case 'crossword':
			return ComponentFactory.createCrosswordComponent(model);
			break;	
			
		case 'form-inputtext':
			return ComponentFactory.createFormInputTextComponent(model);
			break;

		case 'form-upload':
			return ComponentFactory.createFormUploadComponent(model);
			break;	

		case 'form-textarea':
			return ComponentFactory.createFormTextareaComponent(model);
			break;

		case 'form-select':
			return ComponentFactory.createFormSelectComponent(model);
			break;

		case 'form-checkbox':
			return ComponentFactory.createFormCheckboxComponent(model);
			break;

		case 'form-radio':
			return ComponentFactory.createFormRadioComponent(model);
			break;

		case 'form-submit':
			return ComponentFactory.createFormSubmitComponent(model);
			break;

		case 'iframe':
			return ComponentFactory.createIframeComponent(model);
			break;

		case 'swf':
			return ComponentFactory.createSwfComponent(model);
			break;

		case 'drawedinfopoint-link':
			return ComponentFactory.createDrawedInfoPointLinkComponent(model);
			break;

		case 'drawedinfopoint-download':
			return ComponentFactory.createDrawedInfoPointDownloadComponent(model);
			break;

		case 'drawedinfopoint-gallery':
			return ComponentFactory.createDrawedInfoPointGalleryComponent(model);
			break;

		case 'drawedinfopoint-popup':
			return ComponentFactory.createDrawedInfoPointPopupComponent(model);
			break;

		case 'infopoint-popup':
			return ComponentFactory.createInfoPointPopupComponent(model);
			break;

		case 'infopoint-link':
			return ComponentFactory.createInfoPointLinkComponent(model);
			break;

		case 'infopoint-sound':
			return ComponentFactory.createInfoPointSoundComponent(model);
			break;

		case 'infopoint-sound-control':
			return ComponentFactory.createInfoPointSoundControlComponent(model);
			break;

		case 'infopoint-soundrecord':
			return ComponentFactory.createInfoPointSoundRecordComponent(model);
			break;

		case 'infopoint-gallery':
			return ComponentFactory.createInfoPointGalleryComponent(model);
			break;

		case 'infopoint-download':
			return ComponentFactory.createInfoPointDownloadComponent(model);
			break;

        case 'timer':
            return ComponentFactory.createTimerComponent(model);
            break;

		case 'quiz-wordsearch':
			return ComponentFactory.createQuizWordsearchComponent(model);
			break;

        case 'quiz-result':
            return ComponentFactory.createQuizResultComponent(model);
            break;

        case 'quiz-inputtext':
			return ComponentFactory.createQuizInputTextComponent(model);
			break;   

		case 'quiz-select':
			return ComponentFactory.createQuizSelectComponent(model);
			break;   	 

		default:
			console.log("No component: " + type);
		  break;			
	}
}

ComponentFactory.createQuizSelectComponent = function( model ) {

	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new QuizSelectComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizInputTextComponent = function( model ) {

	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new QuizInputTextComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createFormInputTextComponent = function( model ) {

	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new FormInputTextComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createFormUploadComponent = function( model ) {

	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new FormUploadComponentView( { model: model } );

	return componentView;
}



ComponentFactory.createFormTextareaComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new FormTextareaComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createFormSelectComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new FormSelectComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createFormCheckboxComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new FormCheckboxComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createFormRadioComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new FormRadioComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createFormSubmitComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new FormSubmitComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createIframeComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new IframeComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createSwfComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new SwfComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createDrawedInfoPointLinkComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new DrawedInfoPointLinkComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createDrawedInfoPointDownloadComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new DrawedInfoPointDownloadComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createDrawedInfoPointGalleryComponent = function( model ){

	

	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new DrawedInfoPointGalleryComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createDrawedInfoPointPopupComponent = function( model ){

	


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new DrawedInfoPointPopupComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointPopupComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new InfoPointPopupComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointLinkComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new InfoPointLinkComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointSoundComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new InfoPointSoundComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointSoundControlComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new InfoPointSoundControlComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointSoundRecordComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new InfoPointSoundRecordComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointGalleryComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new InfoPointGalleryComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointDownloadComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new InfoPointDownloadComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createComponentByModel = function( model ){

	var type = model.get('type');

	return ComponentFactory.createComponentByType( type, model );

}

ComponentFactory.createTextComponent = function( model ){


	//var textEditorView = EditorsFactory.createTextEditor();

	var componentView = new TextComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createImageComponent = function ( model ){

	//var imageEditorView = EditorsFactory.createImageEditor();

	var componentView = new ImageComponentView( { model: model  } );

	return componentView;
}

ComponentFactory.createVideoComponent = function( model ){

	//var videoEditorView = EditorsFactory.createVideoEditor();

	var componentView = new VideoComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizComponent = function( model ){

	//var quizEditorView = EditorsFactory.createQuizEditor();

	var componentView = new QuizComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizSelectOneComponent = function( model ){

	//var quizEditorView = EditorsFactory.createQuizEditor();

	var componentView = new QuizSelectOneComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizFillInBlanksComponent = function( model ){

	//var quizEditorView = EditorsFactory.createQuizEditor();

	var componentView = new QuizFillInBlanksComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizDnDComponent = function( model ){

	//var quizEditorView = EditorsFactory.createQuizEditor();

	var componentView = new QuizDnDComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizConnectLinesComponent = function( model ){

	//var quizEditorView = EditorsFactory.createQuizEditor();

	var componentView = new QuizConnectLinesComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createScrollerComponent = function( model ){

	//var quizEditorView = EditorsFactory.createQuizEditor();

	var componentView = new ScrollerComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createCrosswordComponent = function( model ){

	//var crosswordEditorView = EditorsFactory.createCrosswordEditor();

	var componentView = new CrosswordComponentView( { model: model } );

	return componentView;

}

ComponentFactory.createQuizWordsearchComponent = function( model ){

	var componentView = new QuizWordsearchComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createTimerComponent = function( model ){

    

    //var crosswordEditorView = EditorsFactory.createCrosswordEditor();

    var componentView = new TimerComponentView( { model: model } );

    return componentView;

}

ComponentFactory.createQuizResultComponent = function( model ){

    var componentView = new QuizResultComponentView( { model: model } );

    return componentView;

}



