var SwfComponentView = ComponentView.extend({

	className : 'component swf-component',

	template: _.template($('#swf-component-template').html()),

    putSwf: function() {
        var swfFileName = this.model.get('swfFileName');
        var actionkey = this.model.get('actionkey');
        var swfPath = __meta__.directLocation + 'exported_view/'+actionkey.split('-').pop()+'/swf/'+actionkey+'/'+swfFileName;

        var width = this.model.get('width');
        var height = this.model.get('height');

        this.$el.find('.swf-wrapper').flash({
            swf: swfPath,
            encodeParams: false,
            wmode: 'transparent',
            loop: false
        });

        this.$el.find('.swf-wrapper').css({
            width: width + 'px',
            height: height + 'px',
        });
    },

    afterRender: function() {
        this.putSwf();
    },
});