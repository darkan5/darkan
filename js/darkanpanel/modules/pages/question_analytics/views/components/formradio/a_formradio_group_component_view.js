var FormRadioGroupComponentView = ComponentView.extend({

	className : 'component formradio-component',

	template: _.template($('#formradio-component-template').html()),


    prepareChartData: function(){

        var _that = this;

        var groupedModels = this.model.get('groupedModels');

        var chartData = [ ];

        _log('groupedModels', groupedModels);

        _.each(groupedModels, function(model){

             
            var scormDataCountedSummary = [];
        
            var scormData = model.get('scormdata');
            var reportName = model.get('reportName');
            

            _log('scormData', scormData);

            if (!scormData) { return }

            var onlyStringsData = _.filter( scormData.data, function(val) {

                _log('val', val);


                if (_.isBoolean(val)) { return val }
            });

            _log('onlyStringsData', onlyStringsData);

            var scormDataCounted = _.countBy( onlyStringsData, _.identity );

            if(scormDataCounted['true']){
                scormDataCountedSummary.push(scormDataCounted);
            }

            _log('scormDataCounted', scormDataCounted);

            

            _log('scormDataCountedSummary', scormDataCountedSummary);

            var hits = 0;

            for (var i = scormDataCountedSummary.length - 1; i >= 0; i--) {
                var hit = parseInt(scormDataCountedSummary[i].true);

                if(hit){
                    hits+= hit;
                }
            };


            chartData.push({
                        label: reportName,
                        value: hits
                    });

        });

        _log('prepareChartData chartData', chartData);

        this.model.set('chartData', chartData); 
    }
});