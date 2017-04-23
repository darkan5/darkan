var ComponentView = Backbone.View.extend({

    tagName: 'div',
    className : 'component-selector',

    initialize: function( data ) {

        var _that = this;
    },

    events: {
        'mousedown': 'onMouseDown',
        'mouseup': 'onMouseUp'
    },

    onMouseDown :function(e){

        e.stopPropagation();
    },

    onMouseUp :function(){

    },

    render: function(){

    },

    makeDraggable: function() {

        var _that = this;

        this.$el.draggable( {
            cursor: 'move',
            stop: function(){

            }
        } );

    },
    makeResizable: function() {

        var _that = this;

        this.$el.resizable({
            handles: "n, e, s, w, nw, ne, sw, se",
            resize: function(){

            }
        });
    }
});
