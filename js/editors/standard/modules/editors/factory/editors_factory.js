function EditorsFactory(){

}

EditorsFactory.createScoreEditor = function(){

    var editor = new ScoreEditorView( );

    return editor;
}

EditorsFactory.createPublishScoreEditor = function(){

    var editor = new PublishScoreEditorView( );

    return editor;
}

EditorsFactory.createScoreExerciseEditor = function(){

    var editor = new ScoreExerciseEditorView( );

    return editor;
}



EditorsFactory.createFormInputTextEditor = function(){

	var editor = new FormInputTextEditorView( );

	return editor;
}

EditorsFactory.createFormUploadEditor = function(){

	var editor = new FormUploadEditorView( );

	return editor;
}

EditorsFactory.createTimerEditor = function(){

    var editor = new TimerEditorView( );

    return editor;
}

EditorsFactory.createFormTextareaEditor = function(){

	var editor = new FormTextareaEditorView( );

	return editor;
}

EditorsFactory.createFormSelectEditor = function(){

	var editor = new FormSelectEditorView( );

	return editor;
}

EditorsFactory.createFormCheckboxEditor = function(){

	var editor = new FormCheckboxEditorView( );

	return editor;
}

EditorsFactory.createFormRadioEditor = function(){

	var editor = new FormRadioEditorView( );

	return editor;
}

EditorsFactory.createFormSubmitEditor = function(stageView){

	var editor = new FormSubmitEditorView({stageView:stageView});

	return editor;
}

EditorsFactory.createIframeEditor = function(){

	var editor = new IframeEditorView( );

	return editor;
}

EditorsFactory.createSwfEditor = function(){

	var editor = new SwfEditorView( );

	return editor;
}

EditorsFactory.createDrawedInfoPointLinkEditor = function(){

	var editor = new DrawedInfoPointLinkEditorView( );

	return editor;
}

EditorsFactory.createDrawedInfoPointDownloadEditor = function(){

	var editor = new DrawedInfoPointDownloadEditorView( );

	return editor;
}

EditorsFactory.createDrawedInfoPointGalleryEditor = function(){

	var editor = new DrawedInfoPointGalleryEditorView( );

	return editor;
}

EditorsFactory.createDrawedInfoPointPopupEditor = function(){

	var editor = new DrawedInfoPointPopupEditorView( );

	return editor;
}

EditorsFactory.createInfoPointPopupEditor = function(){

	var editor = new InfoPointPopupEditorView( );

	return editor;
}

EditorsFactory.createInfoPointLinkEditor = function(){

	var editor = new InfoPointLinkEditorView( );

	return editor;
}

EditorsFactory.createInfoPointSoundEditor = function(){

	var editor = new InfoPointSoundEditorView( );

	return editor;
}

EditorsFactory.createInfoPointSoundControlEditor = function(){

	var editor = new InfoPointSoundControlEditorView( );

	return editor;
}

EditorsFactory.createInfoPointSoundRecordEditor = function(){

	var editor = new InfoPointSoundRecordEditorView( );

	return editor;
}

EditorsFactory.createInfoPointGalleryEditor = function(){

	var editor = new InfoPointGalleryEditorView( );

	return editor;
}

EditorsFactory.createInfoPointDownloadEditor = function(){

	var editor = new InfoPointDownloadEditorView( );

	return editor;
}

EditorsFactory.createSizeAndPositionEditorView = function(){

	var editor = new SizeAndPositionEditorView( );

	return editor;
}

EditorsFactory.createAlignEditorView = function(){

	var editor = new AlignEditorView( );

	return editor;
}

EditorsFactory.createTextEditor = function(){

	var editor = new TextEditorView( );

	return editor;
}

EditorsFactory.createTextToolbarEditor = function(){

	var editor = new TextToolbarEditorView( );

	return editor;
}

EditorsFactory.createImageEditor = function(){

	var editor = new ImageEditorView(  );

	return editor;
}

EditorsFactory.createVideoEditor = function(){

	var editor = new VideoEditorView( );

	return editor;
}

EditorsFactory.createQuizEditor = function(){

	var editor = new QuizEditorView(  );

	return editor;
}

EditorsFactory.createQuizSelectOneEditor = function(){

	var editor = new QuizSelectOneEditorView(  );

	return editor;
}

EditorsFactory.createQuizFillInBlanksEditor = function(){

	var editor = new QuizFillInBlanksEditorView(  );

	return editor;
}

EditorsFactory.createQuizDnDEditor = function(stageView){
	var editor = new QuizDnDEditorView({stageView: stageView});

	return editor;
}

EditorsFactory.createQuizConnectLinesEditor = function(stageView){

	var editor = new QuizConnectLinesEditorView({stageView: stageView});

	return editor;
}

EditorsFactory.createQuizWordsearchEditor = function(stageView){

	var editor = new QuizWordsearchEditorView({stageView: stageView});

	return editor;
}

EditorsFactory.createScrollerEditor = function(){

	var editor = new ScrollerEditorView();

	return editor;
}

EditorsFactory.createCrosswordEditor = function(){

	var editor = new CrosswordEditorView(  );

	return editor;
}

EditorsFactory.createStageEditor = function(){

    var editor = new StageEditorView(  );

    return editor;
}

EditorsFactory.createPagenoteEditor = function(){

    var editor = new PagenoteEditorView(  );

    return editor;
}

EditorsFactory.createSoundEditor = function(){

    var editor = new SoundEditorView(  );

    return editor;
}

EditorsFactory.createProjectSoundEditor = function(){

    var editor = new SoundUploaderEditorView(  );

    return editor;
}

EditorsFactory.createTimelineEditor = function(){

    var editor = new TimelineEditorView(  );

    return editor;
}

EditorsFactory.createTimelineComponentEditor = function(){

    var editor = new TimelineComponentEditorView(  );

    return editor;
}

EditorsFactory.createTimelineComponentsCollectionEditor = function(){

    var editor = new TimelineComponentsCollectionEditorView(  );

    return editor;
}

EditorsFactory.createTimelineRowEditor = function(){

    var editor = new TimelineRowEditorView(  );

    return editor;
}

EditorsFactory.createTimelineStageEditor = function(){

    var editor = new TimelineStageEditorView(  );

    return editor;
}




EditorsFactory.createWcagEditor = function(){

    var editor = new WcagEditorView(  );

    return editor;
}

EditorsFactory.createParallaxeEditor = function(){

    var editor = new ParallaxeEditorView(  );

    return editor;
}



// Multiple

EditorsFactory.createMultipleEditor = function(){

    var editor = new MultipleEditorView(  );

    return editor;
}

EditorsFactory.createMultipleSizeAndPositionEditor = function(){

    var editor = new MultipleSizeAndPositionEditorView(  );

    return editor;
}

EditorsFactory.createMultipleScoreEditor = function(){

    var editor = new MultipleScoreEditorView(  );

    return editor;
}

EditorsFactory.createMultipleWcagEditor = function(){

    var editor = new MultipleWcagEditorView(  );

    return editor;
}

EditorsFactory.createMultipleSoundEditor = function(){

    var editor = new MultipleSoundEditorView(  );

    return editor;
}

EditorsFactory.createMultipleParallaxeEditor = function(){

    var editor = new MultipleParallaxeEditorView(  );

    return editor;
}

EditorsFactory.createQuizInputTextEditor = function(){

	var editor = new QuizInputTextEditorView( );

	return editor;
}

EditorsFactory.createQuizSelectEditor = function(){

	var editor = new QuizSelectEditorView( );

	return editor;
}

EditorsFactory.createReportEditor = function(){

	var editor = new ReportEditorView( );

	return editor;
}

EditorsFactory.createMultipleReportEditor = function(){

	var editor = new MultipleReportEditorView( );

	return editor;
}



















