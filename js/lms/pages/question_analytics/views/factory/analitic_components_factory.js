function AnaliticComponentFactory(){

}

AnaliticComponentFactory.createComponentByType = function( type, model ){


	switch(type){
		

		case 'quiz':
			return AnaliticComponentFactory.createQuizComponent(model);
			break;

		case 'quiz-radio':
			return AnaliticComponentFactory.createQuizRadioComponent(model);
			break;

		case 'quiz-truefalse':
			return AnaliticComponentFactory.createQuizTruefalseComponent(model);
			break;

		case 'quiz-selectone':
			return AnaliticComponentFactory.createQuizSelectOneComponent(model);
			break;

		case 'quiz-fillinblanks':
			return AnaliticComponentFactory.createQuizFillInBlanksComponent(model);
			break;

		case 'quiz-dnd':
			return AnaliticComponentFactory.createQuizDnDComponent(model);
			break;

		case 'quiz-connectlines':
			return AnaliticComponentFactory.createQuizConnectLinesComponent(model);
			break;

		case 'quiz-wordsearch':
			return AnaliticComponentFactory.createQuizWordsearchComponent(model);
			break;

		case 'crossword':
			return AnaliticComponentFactory.createCrosswordComponent(model);
			break;	

        case 'quiz-inputtext':
			return AnaliticComponentFactory.createQuizInputTextComponent(model);
			break; 

		case 'quiz-select':
			return AnaliticComponentFactory.createQuizSelectComponent(model);
			break; 

		case 'form-inputtext':
			return AnaliticComponentFactory.createFormInputTextComponent(model);
			break;

		case 'form-textarea':
			return AnaliticComponentFactory.createFormTextareaComponent(model);
			break;

		case 'form-select':
			return AnaliticComponentFactory.createFormSelectComponent(model);
			break;

		case 'form-checkbox':
			return AnaliticComponentFactory.createFormCheckboxComponent(model);
			break;

		case 'form-radio':
			return AnaliticComponentFactory.createFormRadioComponent(model);
			break;

		case 'form-radio-group':
			return AnaliticComponentFactory.createFormRadioGroupComponent(model);
			break;

		case 'form-checkbox-group':
			return AnaliticComponentFactory.createFormCheckboxGroupComponent(model);
			break;	

			
	

			


		default:
			console.log("No component: " + type);
		  break;			
	}
}

AnaliticComponentFactory.createComponentByModel = function( model ){

	var type = model.get('type');

	return AnaliticComponentFactory.createComponentByType( type, model );

}

AnaliticComponentFactory.createQuizSelectComponent = function( model ){

	var componentView = new QuizSelectComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createQuizInputTextComponent = function( model ){

	var componentView = new QuizInputTextComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createQuizComponent = function( model ){

	var componentView = new QuizComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createQuizRadioComponent = function( model ){

	var componentView = new QuizComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createQuizTruefalseComponent = function( model ){

	var componentView = new QuizComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createQuizSelectOneComponent = function( model ){


	var componentView = new QuizSelectOneComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createQuizFillInBlanksComponent = function( model ){

	var componentView = new QuizFillInBlanksComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createQuizDnDComponent = function( model ){

	var componentView = new QuizDnDComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createQuizConnectLinesComponent = function( model ){

	var componentView = new QuizConnectLinesComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createQuizWordsearchComponent = function( model ){

	var componentView = new QuizWordsearchComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createCrosswordComponent = function( model ){

	var componentView = new CrosswordComponentView( { model: model } );

	return componentView;

}



AnaliticComponentFactory.createFormInputTextComponent = function( model ){


	var componentView = new FormInputTextComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createFormTextareaComponent = function( model ){

	var componentView = new FormTextareaComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createFormSelectComponent = function( model ){


	var componentView = new FormSelectComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createFormCheckboxComponent = function( model ) {

	var componentView = new FormCheckboxComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createFormRadioComponent = function( model ) {

	var componentView = new FormRadioComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createFormRadioGroupComponent = function( model ) {

	var componentView = new FormRadioGroupComponentView( { model: model } );

	return componentView;
}

AnaliticComponentFactory.createFormCheckboxGroupComponent = function( model ) {

	var componentView = new FormCheckboxGroupComponentView( { model: model } );

	return componentView;
}







