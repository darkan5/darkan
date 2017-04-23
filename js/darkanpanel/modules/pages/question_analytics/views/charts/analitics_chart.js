var AnaliticsChartView = ItemLayoutView.extend({

    tagName: 'div',
    className : 'analitics-chart',

    events: {

    },

    template: _.template($('#analitics-chart-template').html()),

    initialize: function( data ) {
        this.model = data.model;
  	},


    onRender: function() {

    },

    serializeData: function() {
      return this.model.toJSON();
    },
});
