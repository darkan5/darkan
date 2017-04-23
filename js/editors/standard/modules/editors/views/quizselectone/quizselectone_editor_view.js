var QuizSelectOneEditorView = ExerciseEditorView.extend({
	template: _.template($('#quizselectone-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            // 'keyup .feedback-good' : 'changeFeedbackGood',
            // 'keyup .feedback-bad' : 'changeFeedbackBad',
            'click input[name="multiselect"]' : 'changeMultiselect',
            'click .feedback-good-edit': 'startEditFeedbackGood',
            'click .feedback-bad-edit': 'startEditFeedbackBad',
            'click .feedback-good-save': 'changeFeedbackGood',
            'click .feedback-bad-save': 'changeFeedbackBad'
        });
    },

	bindings: {
		'input[name="multiselect"]' : 'multiselect',
		'input[name="feedback-show"]' : 'feedbackShow',
		'input[name="feedback-sign"]' : 'feedbackSign',
		'input[name="attempts"]' : 'attempts',
		'input[name="button-show"]' : 'buttonShow',
		'input[name="mark-questions"]' : 'markQuestions'
	},

	changeMultiselect: function(e) {
		if ($(e.target).is(':checked')) {

		} else {
			var iter = 0;
			var answers = this.model.get('answers');

			_.each(answers, function(option, i) {
				if (iter === 0) {
					answers[i].goodAnswer = true;
				} else {
					answers[i].goodAnswer = false;
				}
				iter++;
			});

			this.model.set('answers', answers);
			this.model.trigger('change');
		}
		this.render();
	},

	onSetModel: function() {
		this.feedbackBadEditor = null;
		this.feedbackGoodEditor = null;
	}
});