var ColorPickerView = Backbone.View.extend({

    tagName: 'div',
    className : 'color-picker-view',

    colorTemplate: _.template($('#color-picker-template').html()),

    events: function(){

    },

    initialize: function(data) {

        var _that = this;

        this.color = data.color;


    },

    updateColorPicker: function(data) {

        this.color = data.color;

        this.render();

    },

    render: function() {
        return this.renderColorPicker();
    }, 

    renderColorPicker: function() {


        var _that = this;

        var template = this.colorTemplate();
        this.$el.html(template);

        this.$el.css('background-color', this.color);

        this.$el.spectrum({

            showAlpha: true,
            color: _that.color,
            showInput: true,
            move: function(color) {
                _that.$el.css('background-color', color.toRgbString());
                _that.trigger('move', { color: color.toRgbString() });
            },
            change: function(color) {
                _that.$el.css('background-color', color.toRgbString());
                _that.trigger('move', { color: color.toRgbString() });
                _that.trigger('change', { color: color.toRgbString() });
            },
            hide: function(color) {
                _that.$el.css('background-color', color.toRgbString());
                _that.trigger('hide', { color: color.toRgbString() });
            }

        });

        return this;
    }

});