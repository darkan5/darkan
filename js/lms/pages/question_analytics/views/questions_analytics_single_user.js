var QuestionsAnalyticsSingleUserView = QuestionsAnalyticsView.extend({
    template: '#questions-analytics-template',


    initialize: function(data){

    	        _log('WOW QuestionsAnalyticsSingleUserView', data);


        this.model = new QuestionsAnalyticsSingleUserModel(data);
        this.model.on('change', this.onModelChanged, this);
    },

});