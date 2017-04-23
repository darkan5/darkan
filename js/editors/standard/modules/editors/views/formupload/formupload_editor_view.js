var FormUploadEditorView = ImageEditorView.extend({
	template: _.template($('#formupload-editor-template').html()),

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

	// bindings: {
 //  		//'input[name="placeholder"]': 'placeholder',
	// },


    afterRender: function() {
        var _that = this;

        // this.goodExtensionsInput = this.$el.find('.formupload-goodextensions');
        // this.goodExtensionsInput.val('');
        // this.goodExtensionsInput.tagsInput({
        //     defaultText: _lang('FORM_INPUT_ADDTAG'),
        //     height: 'auto',
        //     width: 'auto',

        //     onAddTag: function() {
        //         _that.updateGoodExtensions();
        //     }, 
        //     onRemoveTag: function() {
        //         _that.updateGoodExtensions();
        //     }
        // });

        // this.goodExtensionsInput.importTags(this.model.get('goodExtensions'));

    },

    updateGoodExtensions: function() {
        //this.model.set('goodExtensions', this.goodExtensionsInput.val());
    },
    
});