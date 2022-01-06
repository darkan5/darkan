var TextStyleEditorView = StyleEditorView.extend({

    template: _.template($('#have-style-editor-template').html()),

    events: {
        'click .template-styles-container .style-template': 'setTextStyleToComponentModel',
        'click .template-styles-container2 .style-template': 'setBgStyleToComponentModel'
    },

    setTextStyleToComponentModel: function(e){
        var templateStyle = $(e.currentTarget).attr('templatestyle');
        var actualStyles = this.model.get('premade-style');
        actualStyles[0] = templateStyle;
        this.model.setStyle(actualStyles);
    },

    setBgStyleToComponentModel: function(e){
        var templateStyle = $(e.currentTarget).attr('templatestyle');
        var actualStyles = this.model.get('premade-style');
        actualStyles[1] = templateStyle;
        this.model.view.$el.find('.component-inner').css('background', '');
        this.model.setStyle(actualStyles);
        this.model.set('bgcolor', '');
    },

    runStylesFactory: function() {

        var stylesText = StylesFactory.getSimpletextStyles();
        var stylesGradients = StylesFactory.getGradientStyles();
        this.$el.find('.template-styles-container').append(stylesText);

        var gradientContainer = $('<div>', {
        	class: 'template-styles-container2'
        });
        gradientContainer.append(stylesGradients);
        this.$el.append(gradientContainer);

        this.$el.find('.template-styles-container, .template-styles-container2').css({
        	width: '50%',
        	float: 'left'
        });
    }
});
