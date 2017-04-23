function StyleEditorsFactory(){

}

StyleEditorsFactory.createQuizSelectEditor = function(){

	var editor = new QuizSelectStyleEditorView( );

	return editor;
}


StyleEditorsFactory.createQuizInputTextEditor = function(){

	var editor = new QuizInputTextStyleEditorView( );

	return editor;
}


StyleEditorsFactory.createFormInputTextEditor = function(){

	var editor = new FormInputTextStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createFormUploadEditor = function(){

	var editor = new FormUploadStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createFormTextareaEditor = function(){

	var editor = new FormTextareaStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createFormSelectEditor = function(){

	var editor = new FormSelectStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createFormCheckboxEditor = function(){

	var editor = new FormCheckboxStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createFormRadioEditor = function(){

	var editor = new FormRadioStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createFormSubmitEditor = function(){

	var editor = new FormSubmitStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createIframeEditor = function(){

	var editor = new IframeStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createSwfEditor = function(){

	var editor = new SwfStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createDrawedInfoPointLinkEditor = function(){

	var editor = new DrawedInfoPointLinkStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createDrawedInfoPointDownloadEditor = function(){

	var editor = new DrawedInfoPointDownloadStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createDrawedInfoPointGalleryEditor = function(){

	var editor = new DrawedInfoPointGalleryStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createDrawedInfoPointPopupEditor = function(){

	var editor = new DrawedInfoPointPopupStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createInfoPointPopupEditor = function(){

	var editor = new InfoPointPopupStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createInfoPointLinkEditor = function(){

	var editor = new InfoPointLinkStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createInfoPointSoundEditor = function(){

	var editor = new InfoPointSoundStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createInfoPointSoundControlEditor = function(){

	var editor = new InfoPointSoundControlStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createInfoPointSoundRecordEditor = function(){

	var editor = new InfoPointSoundRecordStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createInfoPointGalleryEditor = function(){

	var editor = new InfoPointGalleryStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createInfoPointDownloadEditor = function(){

	var editor = new InfoPointDownloadStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createSizeAndPositionEditorView = function(){

	var editor = new SizeAndPositionStyleEditorView( );

	return editor;
}


StyleEditorsFactory.createTextEditor = function(){

	var editor = new TextStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createTimerEditor = function(){

    var editor = new TimerStyleEditorView( );

    return editor;
}

StyleEditorsFactory.createTextToolbarEditor = function(){

	var editor = new TextToolbarStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createImageEditor = function(){

	var editor = new ImageStyleEditorView(  );

	return editor;
}

StyleEditorsFactory.createVideoEditor = function(){

	var editor = new VideoStyleEditorView( );

	return editor;
}

StyleEditorsFactory.createQuizEditor = function(){

	var editor = new QuizStyleEditorView(  );

	return editor;
}

StyleEditorsFactory.createQuizSelectOneEditor = function(){

	var editor = new QuizSelectOneStyleEditorView(  );

	return editor;
}

StyleEditorsFactory.createQuizFillInBlanksEditor = function(){

	var editor = new QuizFillInBlanksStyleEditorView(  );

	return editor;
}

StyleEditorsFactory.createQuizDnDEditor = function(stageView){

	var editor = new QuizDnDStyleEditorView({stageView: stageView});

	return editor;
}

StyleEditorsFactory.createQuizConnectLinesEditor = function(stageView){

	var editor = new QuizConnectLinesStyleEditorView({stageView: stageView});

	return editor;
}

StyleEditorsFactory.createQuizWordsearchEditor = function(stageView){

    var editor = new QuizWordsearchStyleEditorView({stageView: stageView});

    return editor;
}


StyleEditorsFactory.createScrollerEditor = function(){

	var editor = new ScrollerStyleEditorView();

	return editor;
}

StyleEditorsFactory.createCrosswordEditor = function(){

	var editor = new CrosswordStyleEditorView(  );

	return editor;
}

StyleEditorsFactory.createStageEditor = function(){

    var editor = new StageStyleEditorView(  );

    return editor;
}