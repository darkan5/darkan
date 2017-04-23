var QuizInputTextComponentView = ComponentView.extend({

	className : 'component quizinputtext-component',

	template: _.template($('#quizinputtext-component-template').html()),


    prepareChartData: function(){

        var scormData = this.model.get('scormdata');



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
    }
});