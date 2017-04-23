var AnaliticsPieChartView = AnaliticsChartView.extend({

    tagName: 'div',
    className : 'analitics-chart analitics-pie-chart',

    events: {

    },

    template: _.template( $('#analitics-pie-chart-template').html() ),

    onRender: function() {


        var displayData = this.model.get('chartData');

        _log('displayData PIE 2', displayData);

        var chart =  this.$el.find('#analitics-pie-chart');
        chart.html('');

        if(displayData && displayData.length > 0){
            setTimeout(function(){

                Morris.Donut({
                    element: chart,
                    data: displayData,
                    resize: true,
                    hideHover: 'auto',
                    colors: ['#009900', '#BB3737', '#5082A5']
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