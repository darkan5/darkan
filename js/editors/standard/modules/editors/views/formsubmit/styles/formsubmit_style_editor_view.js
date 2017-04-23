var FormSubmitStyleEditorView = StyleEditorView.extend({


    template: _.template($('#have-style-editor-template').html()),

    runStylesFactory: function() {

        var styles = StylesFactory.getDndStyles();
        this.$el.find('.template-styles-container').append(styles);
    }
});
