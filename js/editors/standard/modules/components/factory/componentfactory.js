function ComponentFactory(){

}

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

		case 'quiz-radio':
			return ComponentFactory.createQuizRadioComponent(model);
			break;

		case 'quiz-truefalse':
			return ComponentFactory.createQuizTruefalseComponent(model);
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

		case 'quiz-wordsearch':
			return ComponentFactory.createQuizWordsearchComponent(model);
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

		case 'form-upload':
			return ComponentFactory.createFormUplaodComponent(model);
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

ComponentFactory.updateOptionsModel = function( model, options ){

    for(var item in options){

        model.set(item, options[item], {silent:true});
    }
}

ComponentFactory.createComponentModelByType = function( type, options ){

    var opts = options || {};

    switch(type){
        case 'text':
            var model = new TextModel();
            this.updateOptionsModel(model, opts);
            return model;
        break;

        case 'image':
            var model = new ImageModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'video':
            var model = new VideoModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'quiz':
            var model = new QuizModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'quiz-radio':
            var model = new QuizRadioModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'quiz-truefalse':
            var model = new QuizTrueFalseModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'quiz-selectone':
            var model = new QuizSelectOneModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'quiz-fillinblanks':
            var model = new QuizFillInBlanksModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'quiz-dnd':
            var model = new QuizDnDModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'quiz-connectlines':
            var model = new QuizConnectLinesModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'quiz-wordsearch':
            var model = new QuizWordsearchModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'scroller':
            var model = new ScrollerModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'crossword':
            var model = new CrosswordModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'form-inputtext':
            var model = new FormInputTextModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'form-textarea':
            var model = new FormTextareaModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'form-select':
            var model = new FormSelectModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'form-checkbox':
            var model = new FormCheckboxModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'form-radio':
            var model = new FormRadioModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'form-submit':
            var model = new FormSubmitModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'form-upload':
            var model = new FormUploadModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;    

        case 'iframe':
            var model = new IframeModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'swf':
            var model = new SwfModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'drawedinfopoint-link':
            var model = new DrawedInfoPointLinkModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'drawedinfopoint-download':
            var model = new DrawedInfoPointDownloadModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'drawedinfopoint-gallery':
            var model = new DrawedInfoPointGalleryModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'drawedinfopoint-popup':
            var model = new DrawedInfoPointPopupModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'infopoint-popup':
            var model = new InfoPointPopupModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'infopoint-link':
            var model = new InfoPointLinkModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'infopoint-sound':
            var model = new InfoPointSoundModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'infopoint-sound-control':
            var model = new InfoPointSoundControlModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'infopoint-soundrecord':
            var model = new InfoPointSoundRecordModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'infopoint-gallery':
            var model = new InfoPointGalleryModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'infopoint-download':
            var model = new InfoPointDownloadModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'timer':
            var model = new TimerModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'quiz-result':
            var model = new QuizResultModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;


        case 'quiz-inputtext':
            var model = new QuizInputTextModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;

        case 'quiz-select':
            var model = new QuizSelectModel();
            this.updateOptionsModel(model, opts);
            return model;
            break;    



        default:
            console.log("No type: " + type);
            break;
    }

}



ComponentFactory.createQuizSelectComponent = function( model ){

	model = model || new QuizSelectModel( );

	var componentView = new QuizSelectComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizInputTextComponent = function( model ){


	model = model || new QuizInputTextModel( );

	var componentView = new QuizInputTextComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createFormInputTextComponent = function( model ){
	
	model = model || new FormInputTextModel( );

	var componentView = new FormInputTextComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createFormTextareaComponent = function( model ){

	model = model || new FormTextareaModel( );

	var componentView = new FormTextareaComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createFormSelectComponent = function( model ){

	model = model || new FormSelectModel( );

	var componentView = new FormSelectComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createFormSubmitComponent = function( model ) {

	model = model ||  new FormSubmitModel( );

	var componentView = new FormSubmitComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createFormUplaodComponent = function( model ) {

	model = model || new FormUploadModel();

	var componentView = new FormUploadComponentView( { model: model } );

	return componentView;
}



ComponentFactory.createFormCheckboxComponent = function( model ) {

	model = model ||  new FormCheckboxModel( );

	var componentView = new FormCheckboxComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createFormRadioComponent = function( model ) {

	model = model || new FormRadioModel( );

	var componentView = new FormRadioComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createIframeComponent = function( model ){

	model = model || new IframeModel( );

	var componentView = new IframeComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createSwfComponent = function( model ){

	model = model || new SwfModel( );

	var componentView = new SwfComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createDrawedInfoPointLinkComponent = function( model ){

	model = model || new DrawedInfoPointLinkModel( );

	var componentView = new DrawedInfoPointLinkComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createDrawedInfoPointDownloadComponent = function( model ){

	model = model ||  new DrawedInfoPointDownloadModel( );

	var componentView = new DrawedInfoPointDownloadComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createDrawedInfoPointGalleryComponent = function( model ){

	model = model || new DrawedInfoPointGalleryModel( );

	var componentView = new DrawedInfoPointGalleryComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createDrawedInfoPointPopupComponent = function( model ){

	model = model ||  new DrawedInfoPointPopupModel( );

	var componentView = new DrawedInfoPointPopupComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointPopupComponent = function( model ){
	
	model = model || new InfoPointPopupModel( );

	var componentView = new InfoPointPopupComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointLinkComponent = function( model ){

	model = model || new InfoPointLinkModel( );

	var componentView = new InfoPointLinkComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointSoundComponent = function( model ){

	model = model || new InfoPointSoundModel( );

	var componentView = new InfoPointSoundComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointSoundControlComponent = function( model ){
	
	model = model || new InfoPointSoundControlModel( );

	var componentView = new InfoPointSoundControlComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointSoundRecordComponent = function( model ){

	model = model || new InfoPointSoundRecordModel( );

	var componentView = new InfoPointSoundRecordComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointGalleryComponent = function( model ){

	model = model || new InfoPointGalleryModel( );

	var componentView = new InfoPointGalleryComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createInfoPointDownloadComponent = function( model ){

	model = model || new InfoPointDownloadModel( );

	var componentView = new InfoPointDownloadComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createComponentByModel = function( model ){

	var type = model.get('type');

	return ComponentFactory.createComponentByType( type, model );

}

ComponentFactory.createTextComponent = function( model ){
	
	model = model || new TextModel( );

	var componentView = new TextComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createImageComponent = function ( model ){

	model = model || new ImageModel( );

	var componentView = new ImageComponentView( { model: model  } );

	return componentView;
}

ComponentFactory.createVideoComponent = function( model ){


	model = model || new VideoModel( );

	var componentView = new VideoComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizComponent = function( model ){

	model = model || new QuizModel( );

	var componentView = new QuizComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizRadioComponent = function( model ){

	model = model ||  new QuizRadioModel();

	var componentView = new QuizComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizTruefalseComponent = function( model ){

	model = model ||  new QuizTrueFalseModel();

	var componentView = new QuizComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizSelectOneComponent = function( model ){

	model = model || new QuizSelectOneModel();

	var componentView = new QuizSelectOneComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizFillInBlanksComponent = function( model ){

	model = model || new QuizFillInBlanksModel( );

	var componentView = new QuizFillInBlanksComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizDnDComponent = function( model ){

	model = model || new QuizDnDModel( );

	var componentView = new QuizDnDComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizConnectLinesComponent = function( model ){

	model = model ||  new QuizConnectLinesModel( );

	var componentView = new QuizConnectLinesComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createQuizWordsearchComponent = function( model ){

	model = model || new QuizWordsearchModel( );

	var componentView = new QuizWordsearchComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createScrollerComponent = function( model ){

	model = model || new ScrollerModel( );

	var componentView = new ScrollerComponentView( { model: model } );

	return componentView;
}

ComponentFactory.createCrosswordComponent = function( model ){

	model = model || new CrosswordModel( );

	var componentView = new CrosswordComponentView( { model: model } );

	return componentView;

}

ComponentFactory.createTimerComponent = function( model ){

    model = model || new TimerModel( );

    var componentView = new TimerComponentView( { model: model } );

    return componentView;

}

ComponentFactory.createQuizResultComponent = function( model ){

    model = model || new QuizResultModel( );

    var componentView = new QuizResultComponentView( { model: model } );

    return componentView;

}



