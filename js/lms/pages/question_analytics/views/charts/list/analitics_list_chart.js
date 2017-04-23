var AnaliticsListChartView = AnaliticsChartView.extend({

    tagName: 'div',
    className : 'analitics-chart analitics-list-chart',

    events: {

    },

    template: _.template($('#analitics-list-chart-template').html()),

    onRender: function() {

        var displayData = this.model.get('chartData');

    },

    serializeData: function() {
        return this.model.toJSON();
    },
});