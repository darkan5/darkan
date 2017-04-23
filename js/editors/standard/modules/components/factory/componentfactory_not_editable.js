function ComponentFactoryNotEditable(){

}

ComponentFactoryNotEditable.createComponentByType = function( type, model ){


	switch(type){
		case 'text':
			return ComponentFactoryNotEditable.createTextComponent(model);
			break;

		case 'image':
			return ComponentFactoryNotEditable.createImageComponent(model);
			break;

		case 'video':
			return ComponentFactoryNotEditable.createVideoComponent(model);
			break;	

		case 'quiz':
			return ComponentFactoryNotEditable.createQuizComponent(model);
			break;

		case 'quiz-radio':
			return ComponentFactoryNotEditable.createQuizRadioComponent(model);
			break;

		case 'quiz-truefalse':
			return ComponentFactoryNotEditable.createQuizTruefalseComponent(model);
			break;

		case 'quiz-selectone':
			return ComponentFactoryNotEditable.createQuizSelectOneComponent(model);
			break;

		case 'quiz-fillinblanks':
			return ComponentFactoryNotEditable.createQuizFillInBlanksComponent(model);
			break;

		case 'quiz-dnd':
			return ComponentFactoryNotEditable.createQuizDnDComponent(model);
			break;

		case 'quiz-connectlines':
			return ComponentFactoryNotEditable.createQuizConnectLinesComponent(model);
			break;

		case 'quiz-wordsearch':
			return ComponentFactoryNotEditable.createQuizWordsearchComponent(model);
			break;

		case 'scroller':
			return ComponentFactoryNotEditable.createScrollerComponent(model);
			break;	

		case 'crossword':
			return ComponentFactoryNotEditable.createCrosswordComponent(model);
			break;	
			
		case 'form-inputtext':
			return ComponentFactoryNotEditable.createFormInputTextComponent(model);
			break;

		case 'form-textarea':
			return ComponentFactoryNotEditable.createFormTextareaComponent(model);
			break;

		case 'form-select':
			return ComponentFactoryNotEditable.createFormSelectComponent(model);
			break;

		case 'form-checkbox':
			return ComponentFactoryNotEditable.createFormCheckboxComponent(model);
			break;

		case 'form-radio':
			return ComponentFactoryNotEditable.createFormRadioComponent(model);
			break;

		case 'form-submit':
			return ComponentFactoryNotEditable.createFormSubmitComponent(model);
			break;

		case 'form-upload':
			return ComponentFactoryNotEditable.createFormUplaodComponent(model);
			break;	

		case 'iframe':
			return ComponentFactoryNotEditable.createIframeComponent(model);
			break;

		case 'swf':
			return ComponentFactoryNotEditable.createSwfComponent(model);
			break;

		case 'drawedinfopoint-link':
			return ComponentFactoryNotEditable.createDrawedInfoPointLinkComponent(model);
			break;

		case 'drawedinfopoint-download':
			return ComponentFactoryNotEditable.createDrawedInfoPointDownloadComponent(model);
			break;

		case 'drawedinfopoint-gallery':
			return ComponentFactoryNotEditable.createDrawedInfoPointGalleryComponent(model);
			break;

		case 'drawedinfopoint-popup':
			return ComponentFactoryNotEditable.createDrawedInfoPointPopupComponent(model);
			break;

		case 'infopoint-popup':
			return ComponentFactoryNotEditable.createInfoPointPopupComponent(model);
			break;

		case 'infopoint-link':
			return ComponentFactoryNotEditable.createInfoPointLinkComponent(model);
			break;

		case 'infopoint-sound':
			return ComponentFactoryNotEditable.createInfoPointSoundComponent(model);
			break;

		case 'infopoint-soundrecord':
			return ComponentFactoryNotEditable.createInfoPointSoundRecordComponent(model);
			break;

        case 'infopoint-sound-control':
            return ComponentFactoryNotEditable.createInfoPointSoundControlComponent(model);
            break;

		case 'infopoint-gallery':
			return ComponentFactoryNotEditable.createInfoPointGalleryComponent(model);
			break;

		case 'infopoint-download':
			return ComponentFactoryNotEditable.createInfoPointDownloadComponent(model);
			break;

        case 'timer':
            return ComponentFactoryNotEditable.createTimerComponent(model);
            break;

        case 'quiz-result':
            return ComponentFactoryNotEditable.createQuizResultComponent(model);
            break;

        case 'quiz-inputtext':
			return ComponentFactoryNotEditable.createQuizInputTextComponent(model);
			break; 

		case 'quiz-select':
			return ComponentFactoryNotEditable.createQuizSelectComponent(model);
			break; 
			  



		default:
			console.log("No component: " + type);
		  break;			
	}
}

ComponentFactoryNotEditable.updateOptionsModel = function( model, options ){

    for(var item in options){

        model.set(item, options[item], {silent:true});
    }
}

ComponentFactoryNotEditable.createComponentModelByType = function( type, options ){

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



ComponentFactoryNotEditable.createQuizSelectComponent = function( model ){

	model = model || new QuizSelectModel( );

	var componentView = new QuizSelectComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createQuizInputTextComponent = function( model ){


	model = model || new QuizInputTextModel( );

	var componentView = new QuizInputTextComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createFormInputTextComponent = function( model ){
	
	model = model || new FormInputTextModel( );

	var componentView = new FormInputTextComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createFormTextareaComponent = function( model ){

	model = model || new FormTextareaModel( );

	var componentView = new FormTextareaComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createFormSelectComponent = function( model ){

	model = model || new FormSelectModel( );

	var componentView = new FormSelectComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createFormSubmitComponent = function( model ) {

	model = model ||  new FormSubmitModel( );

	var componentView = new FormSubmitComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createFormUplaodComponent = function( model ) {

	model = model || new FormUploadModel();

	var componentView = new FormUploadComponentViewNotEditable( { model: model } );

	return componentView;
}



ComponentFactoryNotEditable.createFormCheckboxComponent = function( model ) {

	model = model ||  new FormCheckboxModel( );

	var componentView = new FormCheckboxComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createFormRadioComponent = function( model ) {

	model = model || new FormRadioModel( );

	var componentView = new FormRadioComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createIframeComponent = function( model ){

	model = model || new IframeModel( );

	var componentView = new IframeComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createSwfComponent = function( model ){

	model = model || new SwfModel( );

	var componentView = new SwfComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createDrawedInfoPointLinkComponent = function( model ){

	model = model || new DrawedInfoPointLinkModel( );

	var componentView = new DrawedInfoPointLinkComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createDrawedInfoPointDownloadComponent = function( model ){

	model = model ||  new DrawedInfoPointDownloadModel( );

	var componentView = new DrawedInfoPointDownloadComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createDrawedInfoPointGalleryComponent = function( model ){

	model = model || new DrawedInfoPointGalleryModel( );

	var componentView = new DrawedInfoPointGalleryComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createDrawedInfoPointPopupComponent = function( model ){

	model = model ||  new DrawedInfoPointPopupModel( );

	var componentView = new DrawedInfoPointPopupComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createInfoPointPopupComponent = function( model ){
	
	model = model || new InfoPointPopupModel( );

	var componentView = new InfoPointPopupComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createInfoPointLinkComponent = function( model ){

	model = model || new InfoPointLinkModel( );

	var componentView = new InfoPointLinkComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createInfoPointSoundComponent = function( model ){

	model = model || new InfoPointSoundModel( );

	var componentView = new InfoPointSoundComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createInfoPointSoundControlComponent = function( model ){
    
    model = model || new InfoPointSoundControlModel( );

    var componentView = new InfoPointSoundControlComponentViewNotEditable( { model: model } );

    return componentView;
}

ComponentFactoryNotEditable.createInfoPointSoundRecordComponent = function( model ){

	model = model || new InfoPointSoundRecordModel( );

	var componentView = new InfoPointSoundRecordComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createInfoPointGalleryComponent = function( model ){

	model = model || new InfoPointGalleryModel( );

	var componentView = new InfoPointGalleryComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createInfoPointDownloadComponent = function( model ){

	model = model || new InfoPointDownloadModel( );

	var componentView = new InfoPointDownloadComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createComponentByModel = function( model ){

	var type = model.get('type');

	return ComponentFactoryNotEditable.createComponentByType( type, model );

}

ComponentFactoryNotEditable.createTextComponent = function( model ){
	
	model = model || new TextModel( );

	var componentView = new TextComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createImageComponent = function ( model ){

	model = model || new ImageModel( );

	var componentView = new ImageComponentViewNotEditable( { model: model  } );

	return componentView;
}

ComponentFactoryNotEditable.createVideoComponent = function( model ){


	model = model || new VideoModel( );

	var componentView = new VideoComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createQuizComponent = function( model ){

	model = model || new QuizModel( );

	var componentView = new QuizComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createQuizRadioComponent = function( model ){

	model = model ||  new QuizRadioModel();

	var componentView = new QuizComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createQuizTruefalseComponent = function( model ){

	model = model ||  new QuizTrueFalseModel();

	var componentView = new QuizComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createQuizSelectOneComponent = function( model ){

	model = model || new QuizSelectOneModel();

	var componentView = new QuizSelectOneComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createQuizFillInBlanksComponent = function( model ){

	model = model || new QuizFillInBlanksModel( );

	var componentView = new QuizFillInBlanksComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createQuizDnDComponent = function( model ){

	model = model || new QuizDnDModel( );

	var componentView = new QuizDnDComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createQuizConnectLinesComponent = function( model ){

	model = model ||  new QuizConnectLinesModel( );

	var componentView = new QuizConnectLinesComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createQuizWordsearchComponent = function( model ){

	model = model || new QuizWordsearchModel( );

	var componentView = new QuizWordsearchComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createScrollerComponent = function( model ){

	model = model || new ScrollerModel( );

	var componentView = new ScrollerComponentViewNotEditable( { model: model } );

	return componentView;
}

ComponentFactoryNotEditable.createCrosswordComponent = function( model ){

	model = model || new CrosswordModel( );

	var componentView = new CrosswordComponentViewNotEditable( { model: model } );

	return componentView;

}

ComponentFactoryNotEditable.createTimerComponent = function( model ){

    model = model || new TimerModel( );

    var componentView = new TimerComponentViewNotEditable( { model: model } );

    return componentView;

}

ComponentFactoryNotEditable.createQuizResultComponent = function( model ){

    model = model || new QuizResultModel( );

    var componentView = new QuizResultComponentViewNotEditable( { model: model } );

    return componentView;

}



