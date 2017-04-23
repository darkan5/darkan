var InfoPointPopupEditorView = ImageEditorView.extend({
	template: _.template($('#infopointpopup-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .title-edit': 'startEditTitle',
            'click .message-edit': 'startEditMessage',
            'click .title-save': 'changeTitle',
            'click .message-save': 'changeMessage',

            'change input[name="opacity"]': 'onOpacityChanged',
            'click .add-image-file': 'addNewImage',
            'click .editor-crop-image-button': 'showCropWindow',
            'click .editor-resize-to-stage-button': 'resizeToStage',
            'click .editor-original-size-button': 'originalSize',
            'click .editor-add-border-button': 'showBorderWindow'
        });
    },

    startEditTitle: function() {
        var _that = this;
        try {
            this.titleEditor = CKEDITOR.replace( this.$el.find('.ckeditor-replace-title')[0], { height: '50px', plugins: 'basicstyles,wysiwygarea,toolbar,list,blockquote,fakeobjects,stylescombo,dialogui,dialog,undo'});
            this.$el.find('.title-edit').addClass('feedback-save title-save').text(_lang('SAVE'));
        } catch(msg) {
            _log('ckeditor error', msg, _log.error);
        }
    },

    startEditMessage: function() {
        var _that = this;
        try {
            this.messageEditor = CKEDITOR.replace( this.$el.find('.ckeditor-replace-message')[0], { height: '80px', plugins: 'basicstyles,wysiwygarea,toolbar,list,blockquote,fakeobjects,stylescombo,dialogui,dialog,undo'});
            this.$el.find('.message-edit').addClass('feedback-save message-save').text(_lang('SAVE'));
        } catch(msg) {
            _log('ckeditor error', msg, _log.error);
        }
    },
    
    changeTitle: function() {
        var feedback = this.titleEditor.getData();
        this.model.set('title', feedback);
        this.render();
    },

    changeMessage: function() {
        var feedback = this.messageEditor.getData();
        this.model.set('text', feedback);
        this.render();
    },

    onSetModel: function() {
        this.titleEditor = null;
        this.messageEditor = null;
    }
});