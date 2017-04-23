var GradientPickerView = ColorPickerView.extend({

    tagName: 'div',
    className : 'color-picker-view',

    pickerType: 'color', // color, gradient

    colorTemplate: _.template($('#color-picker-2-template').html()),
    gradientTemplate: _.template($('#gradient-picker-template').html()),

    events: {
        'click .change-picker-type': 'changePickerType'
    },

    changePickerType: function(e) {

        this.pickerType = $(e.target).attr('picker-type');



        switch(this.pickerType){
            case 'color':
                this.renderGradientPicker();
                this.afterRender();
            break;

            case 'gradient':
                this.renderColorPicker();
            break;
        }
    },

    renderGradientPicker: function() {

        var _that = this;

        var template = this.gradientTemplate();
        this.$el.html(template);

        // gradientContainer.css('background-color', this.color);

        return this;
    },

    afterRender: function() {
        var _that = this;

        // update gradient picker options when editor is opened
        var gradient_colors = new Array(),
            color_to_pass   = new Array(),
            gradient_angle;

        var element_gradient = this.color;
        
        var rgbaRegex = /(rgba?\([^\)]+\)|[a-z\d]*|[a-z]*)/g;

        gradient_colors = jQuery.grep(element_gradient.match(rgbaRegex),function (s) { return jQuery.trim( s )!=''});

        if (gradient_colors.length > 1) {
            for (i = 0; i < gradient_colors.length; ++i) {

                if (gradient_colors[i].substr(0, 3) == 'rgb' || gradient_colors[i].substr(0, 4) == 'rgba'){

                    var gradient_style = gradient_colors[i] + ' ' + gradient_colors[i+1] + '%';

                    color_to_pass.push(gradient_style);
                } 

                if (gradient_colors[i].substr(gradient_colors[i].length - 3) == 'deg'){
                    gradient_angle = gradient_colors[i];
                }

            }
        }

        if (!gradient_angle){
            gradient_angle = '180deg';
        }

        _log('this.color', this.color);
        _log('color_to_pass', color_to_pass);

        if (color_to_pass.push() == 0){
            var colorRgb = this.color;
            if (this.color == "#FFF") {
                colorRgb = 'rgb(255, 255, 255)';
            }
            color_to_pass = [colorRgb + " 0%", colorRgb + " 100%"];
        }

        _log('color_to_pass', color_to_pass);

        var gradientContainer = this.$el.find('.gradient-container');

        gradientContainer.gradientPicker( {
             fillDirection: gradient_angle,
             controlPoints: color_to_pass,
             change: function(points, styles) {
                _that.trigger('gradient-change', { color: styles[0] });
             }
        });
    },

    renderColorPicker: function() {


        var _that = this;

        var template = this.colorTemplate();
        this.$el.html(template);

        var pikcerContainer = this.$el.find('.picker-container');

        pikcerContainer.css('background-color', this.color);

        pikcerContainer.spectrum({

            showAlpha: true,
            color: _that.color,
            showInput: true,
            move: function(color) {

                _that.trigger('move', { color: color.toRgbString() });
            },
            change: function(color) {
                _that.trigger('move', { color: color.toRgbString() });
                _that.trigger('change', { color: color.toRgbString() });
            },
            hide: function(color) {

                _that.trigger('hide', { color: color.toRgbString() });
            }

        });

        return this;
    },

    render: function() {

        var colorType = this.color.indexOf('linear-gradient') !== -1 ? 'gradient' : 'solid';



        switch(colorType){
            case 'solid':
                return this.renderColorPicker();
            break;

            case 'gradient':
                return this.renderGradientPicker();
            break;

            default:
                return this.renderColorPicker();
            break;
        }
    }, 
});