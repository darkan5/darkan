var DrawedInfoPointLinkStyleEditorView = StyleEditorView.extend({


    runStylesFactory: function() {

        var styles = StylesFactory.getGradientStyles();
        this.$el.find('.template-styles-container').append(styles);
    }
});
