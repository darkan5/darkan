var QuizEditorView = ExerciseEditorView.extend({
	template: _.template($('#quiz-editor-template').html()),

    events: function(){
        return _.extend({},EditorView.prototype.events,{
            // 'keyup .feedback-good' : 'changeFeedbackGood',
            // 'keyup .feedback-bad' : 'changeFeedbackBad',
            // 'click input[name="multiselect"]' : 'changeMultiselect',
            'click .feedback-good-edit': 'startEditFeedbackGood',
            'click .feedback-bad-edit': 'startEditFeedbackBad',
            'click .feedback-good-save': 'changeFeedbackGood',
            'click .feedback-bad-save': 'changeFeedbackBad',
            'change .quiz-font-size': 'changeFontSize'
        });
    },

	bindings: {
		'input[name="multiselect"]' : {
			observe: 'multiselect',
			onSet: function(val) {
				if ( !val ) {
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
				return val;
			}
		},
		'input[name="feedback-show"]' : 'feedbackShow',
		'input[name="feedback-sign"]' : 'feedbackSign',
		'input[name="attempts"]' : 'attempts',
		'input[name="button-show"]' : 'buttonShow',
		'input[name="mark-questions"]' : 'markQuestions',
		'input[name="quiz-font-size"]' : 'fontSize'
	},

	changeFontSize: function(e){
		var value = parseInt($(e.target).val());

		this.model.set('fontSize', value);

		this.model.view.render();	
		this.model.view.startEditing();	
	},

	onSetModel: function() {
		this.feedbackBadEditor = null;
		this.feedbackGoodEditor = null;
	}
});