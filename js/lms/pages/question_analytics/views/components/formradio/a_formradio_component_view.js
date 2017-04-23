var FormRadioComponentView = ComponentView.extend({

	className : 'component formradio-component',

	template: _.template($('#formradio-component-template').html()),


    prepareChartData: function(){

        var scormData = this.model.get('scormdata');

        if (scormData) {
            var chartData = [ ];
            var onlyStringsData = _.filter( scormData.data, function(val) {
                if (_.isBoolean(val)) { return val }
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

            _log('FORM RADIO CHART DATA', chartData);

            this.model.set('chartData', chartData); 
        }
    }
});