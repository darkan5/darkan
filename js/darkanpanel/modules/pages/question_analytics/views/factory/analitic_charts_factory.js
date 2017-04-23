function AnaliticChartsFactory(){

}

AnaliticChartsFactory.createChartByType = function( type, model ){


	switch(type){
		

		case 'quiz':
			return AnaliticChartsFactory.createQuizChart(model);
			break;

		case 'quiz-radio':
			return AnaliticChartsFactory.createQuizRadioChart(model);
			break;

		case 'quiz-truefalse':
			return AnaliticChartsFactory.createQuizTruefalseChart(model);
			break;

		case 'quiz-selectone':
			return AnaliticChartsFactory.createQuizSelectOneChart(model);
			break;

		case 'quiz-fillinblanks':
			return AnaliticChartsFactory.createQuizFillInBlanksChart(model);
			break;

		case 'quiz-dnd':
			return AnaliticChartsFactory.createQuizDnDChart(model);
			break;

		case 'quiz-connectlines':
			return AnaliticChartsFactory.createQuizConnectLinesChart(model);
			break;

		case 'quiz-wordsearch':
			return AnaliticChartsFactory.createQuizWordsearchChart(model);
			break;

		case 'crossword':
			return AnaliticChartsFactory.createCrosswordChart(model);
			break;	

        case 'quiz-inputtext':
			return AnaliticChartsFactory.createQuizInputTextChart(model);
			break; 

		case 'quiz-select':
			return AnaliticChartsFactory.createQuizSelectChart(model);
			break; 

		case 'form-inputtext':
			return AnaliticChartsFactory.createFormInputTextChart(model);
			break;

		case 'form-textarea':
			return AnaliticChartsFactory.createFormTextareaChart(model);
			break;

		case 'form-select':
			return AnaliticChartsFactory.createFormSelectChart(model);
			break;

		case 'form-checkbox':
			return AnaliticChartsFactory.createFormCheckboxChart(model);
			break;

		case 'form-radio':
			return AnaliticChartsFactory.createFormRadioChart(model);
			break;

		case 'form-radio-group':
			return AnaliticChartsFactory.createFormRadioGroupChart(model);
			break;	

		case 'form-checkbox-group':
			return AnaliticChartsFactory.createFormCheckboxGroupChart(model);
			break;	


		default:
			console.log("No Chart: " + type);
		  break;			
	}
}

AnaliticChartsFactory.createChartByModel = function( model ){

	var type = model.get('type');

	return AnaliticChartsFactory.createChartByType( type, model );

}

AnaliticChartsFactory.createQuizSelectChart = function( model ){

	var chartView = new AnaliticsLineChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createQuizInputTextChart = function( model ){

	var chartView = new AnaliticsLineChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createQuizChart = function( model ){

	var chartView = new AnaliticsLineChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createQuizRadioChart = function( model ){

	var chartView = new AnaliticsPieChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createQuizTruefalseChart = function( model ){

	var chartView = new AnaliticsPieChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createQuizSelectOneChart = function( model ){


	var chartView = new AnaliticsPieChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createQuizFillInBlanksChart = function( model ){

	var chartView = new AnaliticsPieChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createQuizDnDChart = function( model ){

	var chartView = new AnaliticsPieChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createQuizConnectLinesChart = function( model ){

	var chartView = new AnaliticsPieChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createQuizWordsearchChart = function( model ){

	var chartView = new AnaliticsPieChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createCrosswordChart = function( model ){

	var chartView = new AnaliticsPieChartView( { model: model } );

	return chartView;
}



AnaliticChartsFactory.createFormInputTextChart = function( model ){

	var chartView = new AnaliticsListChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createFormTextareaChart = function( model ){

	var chartView = new AnaliticsListChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createFormSelectChart = function( model ){

	var chartView = new AnaliticsPieChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createFormCheckboxChart = function( model ) {

	var chartView = new AnaliticsLineChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createFormRadioChart = function( model ) {

	var chartView = new AnaliticsLineChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createFormRadioGroupChart = function( model ) {

	var chartView = new AnaliticsPieChartView( { model: model } );

	return chartView;
}

AnaliticChartsFactory.createFormCheckboxGroupChart = function( model ) {

	var chartView = new AnaliticsPieChartView( { model: model } );

	return chartView;
}





AnaliticChartsFactory.createFormPassedPercentChart = function( model ) {

	var chartView = new AnaliticsPassedPercentChartView( { model: model } );

	return chartView;
}



