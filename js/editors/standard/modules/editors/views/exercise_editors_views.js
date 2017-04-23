var ExerciseEditorView = EditorView.extend({

    startEditFeedbackGood: function() {
        var _that = this;
        try {
            this.feedbackGoodEditor = CKEDITOR.replace( this.$el.find('.feedback-good')[0], { height: '100px', plugins: 'basicstyles,wysiwygarea,toolbar,list,blockquote,fakeobjects,stylescombo,dialogui,dialog,undo'});
            this.$el.find('.feedback-good-edit').attr('class', 'feedback-save feedback-good-save').text(_lang('SAVE'));
        } catch(msg) {
            _log('ckeditor error', msg, _log.error);
        }
    },

    startEditFeedbackBad: function() {
        var _that = this;
        try {
            this.feedbackBadEditor = CKEDITOR.replace( this.$el.find('.feedback-bad')[0], { height: '100px', plugins: 'basicstyles,wysiwygarea,toolbar,list,blockquote,fakeobjects,stylescombo,dialogui,dialog,undo'});
            this.$el.find('.feedback-bad-edit').attr('class', 'feedback-save feedback-bad-save').text(_lang('SAVE'));
        } catch(msg) {
            _log('ckeditor error', msg, _log.error);
        }
    },

    changeFeedbackGood: function() {
        var feedback = this.feedbackGoodEditor.getData();
        this.model.set('feedbackGood', feedback);
        this.render();
    },

    changeFeedbackBad: function(feedback) {
        var feedback = this.feedbackBadEditor.getData();
        this.model.set('feedbackBad', feedback);
        this.render();
    },
});

