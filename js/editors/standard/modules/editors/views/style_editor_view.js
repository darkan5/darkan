var StyleEditorView = EditorView.extend({

    template: _.template($('#style-editor-template').html()),

    events: {
        'click .style-template': 'setStyleToComponentModel',
        'click .reset-style-template': 'resetStyleTemplate'
    },

    resetStyleTemplate: function(){

        var style = this.model.createStylesObject();

        this.model.set('styles', style );
        this.model.view.renderStyle();
    },

    disableIfNotActive: function() {

    },

    setStyleToComponentModel: function(e){
        // var templateStyle = $(e.currentTarget).attr('templatestyle');
        // this.model.setStyle([templateStyle]);

        var st = $(e.currentTarget).attr('st');
        var type = $(e.currentTarget).attr('type');

        var style = stylesImage;

        switch (type) {
            case 'image':
                sytle = stylesImage;
                break;

            case 'text':
                style = stylesText;
                break;

            case 'gradient':
                style = stylesGradient;
                break;

            case 'questions':
                style = stylesQuestion;
                break;

            case 'dnd':
                style = stylesDnd;
                break;

            case 'inputtext':
                style = stylesInputText;
                break;
        }

        this.model.setStyle(style, st);

        this.model.refreshEditor();

    },

    onSetModel: function() {
        // this.runStylesFactory();
    },

    afterRender: function() {
        this.runStylesFactory();
    },

    runStylesFactory: function() {

        //var styles = StylesFactory.getGradientStyles();
        //this.$el.find('.template-styles-container').append(styles);
    }
});
