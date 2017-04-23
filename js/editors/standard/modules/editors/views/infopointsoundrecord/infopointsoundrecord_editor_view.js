var InfoPointSoundRecordEditorView = ImageEditorView.extend({
	template: _.template($('#infopointsoundrecord-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .record-sound' : 'recordSound',

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

	recordSound: function(e) {
	}
});