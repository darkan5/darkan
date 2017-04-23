var QuestionsAnalyticsItemView = Marionette.LayoutView.extend({
    
    template: '#questions-analytics-item-template',

    regions: {
        //preview: '#question-component-preview-area',
        chart: '#question-chart-area',
        chartPercent: '#question-passed-percent-area',
    },

    initialize: function(){

   //  	switch(componentType) {
   //  		case 'quiz':
   //  			this.template = '#quiz-questions-analytics-item-template';
   //  			break;
   //  		case 'quiz-dnd':
   //  			this.template = '#dnd-questions-analytics-item-template';
   //  			break;
   //  		case 'quiz-selectone':
   //  			this.template = '#selectone-questions-analytics-item-template';
   //  			break;
			// default: 
			// 	// do nothing
			// 	break;	
   //  	}

    },

    onRender :function() {
        
        // component preview
        var componentPreview = AnaliticComponentFactory.createComponentByModel(this.model);
        componentPreview.prepareChartData();
        //this.preview.show(componentPreview);

        // scorm data chart
        var chart = AnaliticChartsFactory.createChartByModel(this.model);
        this.chart.show(chart);

        // passed percent chart
        var componentType = this.model.get('type');
        switch(componentType) {
            case 'quiz':
            case 'quiz-dnd':
            case 'quiz-selectone':
            case 'quiz-inputtext':
            case 'quiz-select':
            case 'quiz-connectlines':
                var passedPercentChart = AnaliticChartsFactory.createFormPassedPercentChart(this.model);
                this.chartPercent.show(passedPercentChart);
                break;
            default:
                break;
        }

    },

    serializeData: function() {
    	return this.model.toJSON();
    }

});