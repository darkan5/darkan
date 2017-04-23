var QuizSelectComponentView = ComponentView.extend({

	className : 'component quizselect-component',

	template: _.template($('#quizselect-component-template').html()),

    prepareChartData: function(){

        var scormData = this.model.get('scormdata');

        _log('scormData SELECT QUIZ', scormData);

        if (scormData) {
            var chartData = [ ];

            var onlyStringsData = _.filter( scormData.data, function(val) {
                if (_.isString(val)) { return val }
            });
            var scormDataCounted = _.countBy( onlyStringsData, _.identity );

            for (var s in scormDataCounted) {
                if (s.length) {
                    chartData.push({
                        name: s,
                        hits: scormDataCounted[s]
                    });   
                }
            }

            this.model.set('chartData', chartData); 
        }
    },

    serializeData: function() {
        return this.model.toJSON();
    },

});