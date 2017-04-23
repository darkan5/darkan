var ComponentView = ItemLayoutView.extend({

    tagName: 'div',
    className : 'component',

    events: {

    },

    template: _.template($('#component-template').html()),


		
    initialize: function( data ) {
        this.model = data.model;

        _log('vomponent model', this.model.toJSON());
  	},

    renderStyle: function( className ){

        var _that = this;
        var styles = this.model.get('styles');

        _.each(styles, function(style, className) {

            _that.$el.find('.' + className).css(styles[className]);

        });

        this.$el.css({
            position: 'relative'
        });
    },

    renderWidth :function() {
        this.$el.css('width', this.model.get('width') +'px');
    },
    renderHeight :function() {
        this.$el.css('height', this.model.get('height') +'px');
    },

  	// render: function() {

   //      var _that = this;
   //      this.$el.html("");

   //      var componentTemplate = this.template(this.model.toJSON());

   //      return this;
  	// },

    onRender: function() {
        // this.renderStyle();
        // this.renderWidth();
        // this.renderHeight();
    },

    serializeData: function() {
      return this.model.toJSON();
    },

    prepareChartData: function(){
       // To override
    }
});
