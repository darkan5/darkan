var InfoPointSoundRecordComponentView = ImageComponentView.extend({

	className : 'component infopointsoundrecord-component',

	template: _.template($('#infopointsoundrecord-component-template').html()),

    renderCss: function() {
        this.$el.css('cursor', 'pointer');
    }

});