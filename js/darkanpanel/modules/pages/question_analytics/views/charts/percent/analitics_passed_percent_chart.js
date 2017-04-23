var AnaliticsPassedPercentChartView = AnaliticsChartView.extend({

    tagName: 'div',
    className : 'analitics-chart analitics-passed-percent-chart',

    events: {

    },

    template: _.template($('#analitics-passed-percent-chart-template').html()),

    onRender: function() {


    },

    serializeData: function() {
        var scormData = this.model.get('scormdata');

        var percentCompleted = 0,
            timesCompleted = 0,
            percentFailed = 0,
            timesFailed = 0;

            _log('scormData', scormData);

        if ( scormData && scormData.compl && scormData.compl.length ) {
            var answers = _.countBy(scormData.compl, _.identity);
            percentCompleted = parseFloat(answers['1'] / scormData.compl.length * 100).toFixed(1);
            timesCompleted = answers['1'];
            percentFailed = parseFloat(answers['2'] / scormData.compl.length * 100).toFixed(1);
            timesFailed = answers['2'];
        }

        return {
            percentCompleted: percentCompleted,
            timesCompleted: timesCompleted,
            percentFailed: percentFailed,
            timesFailed: timesFailed
        }
    },
});