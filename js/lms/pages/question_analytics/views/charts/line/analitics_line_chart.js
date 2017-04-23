var AnaliticsLineChartView = AnaliticsChartView.extend({

    tagName: 'div',
    className : 'analitics-chart analitics-line-chart',

    events: {

    },

    template: _.template($('#analitics-line-chart-template').html()),

    onRender: function() {

        var displayData = this.model.get('chartData');

        var chart =  this.$el.find('#analitics-line-chart');
        chart.html('');

        if(displayData && displayData.length > 0){
            setTimeout(function(){

                Morris.Bar({
                    element: chart,
                    data: displayData,
                    xkey: ['name'],
                    ykeys: ['hits'],
                    labels: [_lang('chart_analytics_answers')],
                    hideHover: 'auto',
                    resize: true,
                    xLabelMargin: 20,
                });

            }, 10);
        } else {
            chart.html(_lang('infoEmpty'));
        }

    },

    serializeData: function() {
        return this.model.toJSON();
    },
});