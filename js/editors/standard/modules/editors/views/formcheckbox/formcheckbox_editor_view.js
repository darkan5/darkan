var FormCheckboxEditorView = ExerciseEditorView.extend({
	template: _.template($('#formcheckbox-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            'click .feedback-good-edit': 'startEditFeedbackGood',
            'click .feedback-bad-edit': 'startEditFeedbackBad',
            'click .feedback-good-save': 'changeFeedbackGood',
            'click .feedback-bad-save': 'changeFeedbackBad'
        });
    },

	bindings: {
        '.form-checkbox-size': 'inputSize',
        '.form-input-correct': 'correctValue',
        '.form-radio-group': 'groupName',
        '.form-input-default-value': 'defaultValue',
        'input[name="checkself"]' : 'checkSelf',
        'input[name="feedback-show"]' : 'feedbackShow'
	},

    afterRender: function() {
    	
    },

});