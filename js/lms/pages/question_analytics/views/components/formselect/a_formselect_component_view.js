var FormSelectComponentView = ComponentView.extend({

	className : 'component formselect-component',

	template: _.template($('#formselect-component-template').html()),

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
                        label: s,
                        value: scormDataCounted[s]
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