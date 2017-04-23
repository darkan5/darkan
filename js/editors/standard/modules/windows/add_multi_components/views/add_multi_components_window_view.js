var AddMultiComponentsWindowView = WindowView.extend({

    tagName: 'div',
    className : 'add-multi-components-window-view',

    template: _.template($('#window-add-multi-components-template').html()),

    events: function(){
        return _.extend({},WindowView.prototype.events,{
            'click .add-multi-components-ok-button' : 'addComponents'
        });
    },

    afterInitialize : function(data) {
        
    },

    addComponents : function(e) {

    
        var values = this.$el.find('.add-multi-components-input-values').val().split(', ');
        var width = parseFloat(this.$el.find('.component-width').val());
        var height = parseFloat(this.$el.find('.component-height').val());

        _log('values', values);
        _log('width', width);
        _log('height', height);

        if(!_.isArray(values)){
            return;
        }

        if(!_.isNumber(width)){
            return;
        }

        if(!_.isNumber(height)){
            return;
        }

        this.trigger('add-multi-components', { values:values, width:width, height: height });
  
        this.close();
    },

    onClose : function(){

        
    },

    afterRender: function() {
        //this.makeResizable();

        this.$el.find('.add-multi-components-input-values').focus();
    },

    makeResizable: function() {

        var _that = this;

        this.$el.resizable({
            handles: "n, e, s, w, nw, ne, sw, se",

            resize: function(e){

            }
        });

    },

});
