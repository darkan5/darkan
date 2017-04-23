var FormSubmitComponentView = TextComponentView.extend({

    className : 'component formsubmit-component form',

    template: _.template($('#formsubmit-component-template').html()),


    afterRender: function() {
        this.objectOnResize();
    },

    objectOnResize: function() {

        var fontSize = (this.$el.height()/6) < 15 ? 15 : (this.$el.height()/6);

        this.$el.find('.formsubmit-component-inner').css({
            'font-size': fontSize + "px"
        });
    },

    onRenderStyle: function() {
        this.objectOnResize();
    }

});

var FormSubmitComponentViewNotEditable = ComponentView.createNotEditableComponentClass(FormSubmitComponentView);