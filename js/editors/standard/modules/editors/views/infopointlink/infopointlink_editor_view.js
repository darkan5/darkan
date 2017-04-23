var InfoPointLinkEditorView = ImageEditorView.extend({
	template: _.template($('#infopointlink-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'keyup input[name="link"]' : 'changeLink',
            'click input[name="iframe"]' : 'changeIframe',

            'change input[name="opacity"]': 'onOpacityChanged',
            'click .add-image-file': 'addNewImage',
            'click .editor-crop-image-button': 'showCropWindow',
            'click .editor-resize-to-stage-button': 'resizeToStage',
            'click .editor-original-size-button': 'originalSize',
            'click .editor-add-border-button': 'showBorderWindow'
        });
    },

	bindings: {

	},

    changeIframe: function(e) {
        this.model.set('openInIframe', $(e.target).is(':checked'));
    },

    changeLink: function(e) {
        this.model.set('link', $(e.target).val());
    }
});