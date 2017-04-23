var FormRadioEditorView = ExerciseEditorView.extend({
	template: _.template($('#formradio-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .feedback-good-edit': 'startEditFeedbackGood',
            'click .feedback-bad-edit': 'startEditFeedbackBad',
            'click .feedback-good-save': 'changeFeedbackGood',
            'click .feedback-bad-save': 'changeFeedbackBad'
        });
    },

	bindings: {
        '.form-radio-size': 'inputSize',
        '.form-radio-correct': 'correctValue',
        '.form-input-default-value': 'defaultValue',
        '.form-radio-group': 'groupName',
        'input[name="checkself"]' : 'checkSelf',
        'input[name="feedback-show"]' : 'feedbackShow'
	}

});